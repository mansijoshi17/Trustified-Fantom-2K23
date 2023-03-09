import React, { createContext, useEffect, useState } from "react";
import { collection, db, getDocs, query, where } from "../firebase";
import { ethers } from "ethers";
import { chain, trustifiedContracts } from "../config";
import trustifiedContractAbi from "../abi/Trustified.json";
import trustifiedNonTransferableContractAbi from "../abi/TrustifiedNonTransferable.json";
import trustifiedCredsabi from "../abi/TrustifiedCreds.json";
import trustifiedCredabi from "../abi/TrustifiedCred.json";
import { Identity } from "@semaphore-protocol/identity";
import { async } from "@firebase/util";
import { toast } from "react-toastify";
import { firebaseDataContext } from "./FirebaseDataContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Web3Context = createContext(undefined);

export const Web3ContextProvider = (props) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState();
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState();
  const [userId, setUserId] = useState();
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimer, setClaimer] = useState({});
  const [aLoading, setaLoading] = useState(false);

  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();

  const [csvData, setCsvData] = useState([]);

  const firebasedatacontext = React.useContext(firebaseDataContext);
  const { addCollection, addCollectors, updateCollectors } =
    firebasedatacontext;

  useEffect(() => {
    getFirestoreData();
  }, [update]);

  useEffect(() => {
    const initialize = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      setProvider(provider);
      setSigner(signer);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAddress(accounts[0]);
    };
    initialize();
  }, []);

  const connectWallet = async (issuerName) => {
    const { ethereum } = window;
    setaLoading(true);

    if (!ethereum) {
      alert("Please install the Metamask Extension!");
    }
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      // await issueCredId(issuerName, accounts[0]);
      setAddress(accounts[0]);
      window.localStorage.setItem("address", accounts[0]);
      setUpdate(!update);
      setaLoading(false);
    } catch (err) {
      setaLoading(false);
      console.log(err);
      if (err.code === 4902) {
        try {
          setaLoading(true);
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          // await issueCredId(issuerName, accounts[0]);
          setAddress(accounts[0]);
          window.localStorage.setItem("address", accounts[0]);
          setUpdate(!update);
          setaLoading(false);
        } catch (err) {
          setaLoading(false);
          alert(err.message);
        }
      }
    }
  };

  const loginWithTrustified = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please install the Metamask Extension!");
    }

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const { chainId } = await provider.getNetwork();

    let currentChain = chain[chainId];

    let obj = {
      chain: currentChain,
      userAddress: accounts[0],
    };

    const api = await axios.create({
      baseURL: "https://trustified-api-o5zg.onrender.com/trustified/api",
    });
    let response = await api
      .post("/login", obj)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error);
      });

    if (response.data.status == true) {
      setAddress(accounts[0]);
      window.localStorage.setItem("address", accounts[0]);
      setUpdate(!update);
    } else {
      toast.error("You don't have Trustified NFT");
    }
  };

  const disconnectWallet = () => {
    navigate("/");
    window.localStorage.removeItem("address");
    setUpdate(!update);
    window.location.reload();
  };
  const shortAddress = (addr) =>
    addr.length > 10 && addr.startsWith("0x")
      ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
      : addr;

  const getFirestoreData = async () => {
    const add = window.localStorage.getItem("address");
    const q = query(collection(db, "UserProfile"), where("Address", "==", add));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((fire) => {
      setData(fire.data());
      setUserId(fire.id);
    });
  };

  function generateClaimToken(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678910";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const createNFTCollecion = async (data, firebasedata, type) => {
    try {
      const trustifiedContract = new ethers.Contract(
        firebasedata.transferable == "on"
          ? trustifiedContracts.nonTransferable
          : trustifiedContracts.transferable,
        firebasedata.transferable == "on"
          ? trustifiedNonTransferableContractAbi.abi
          : trustifiedContractAbi.abi,
        signer
      );
      console.log(data.tokenUris, "data.tokenUris");
      var transactionMint;
      if (type == "badge") {
        console.log(
          data.tokenUris[0],
          parseInt(firebasedata.quantity),
          "test1"
        );
        transactionMint = await trustifiedContract.bulkMintBadgesERC721(
          data.tokenUris[0],
          parseInt(firebasedata.quantity)
        ); // Bulk Mint NFT collection.
      } else {
        transactionMint = await trustifiedContract.bulkMintERC721(
          data.tokenUris
        ); // Bulk Mint NFT collection.
      }

      let txm = await transactionMint.wait();
      console.log(txm, "txm");
      if (txm) {
        var eventId = await trustifiedContract.newEventId();
        console.log(Number(eventId));
        firebasedata.contract = trustifiedContract.address;
        firebasedata.userId = userId;
        firebasedata.eventId = parseInt(Number(eventId));
        firebasedata.type = type;
        firebasedata.image = data.tokenUris[0];
        await addCollection(firebasedata);

        let tokenIds = await trustifiedContract.getTokenIds(
          parseInt(Number(eventId))
        );

        console.log(tokenIds, "tokenIDs");

        var array = [];
        for (let i = 0; i < tokenIds.length; i++) {
          let obj = {};
          let claimToken = generateClaimToken(5);
          const tokenCID = await trustifiedContract.tokenURI(
            Number(tokenIds[i])
          );

          let d = await axios.get(
            `https://nftstorage.link/ipfs/${tokenCID}/metadata.json`
          );
          // https://trustified.xyz/
          if (type == "badge") {
            array.push([`https://trustified.xyz/claim/${claimToken}`]);
          } else {
            array.push([
              d.data.claimer,
              `https://trustified.xyz/claim/${claimToken}`,
            ]);
          }

          obj.token = claimToken;
          obj.tokenContract = trustifiedContract.address;
          obj.tokenId = parseInt(Number(tokenIds[i]));
          obj.claimerAddress = "";
          obj.ipfsurl = `https://nftstorage.link/ipfs/${tokenCID}/metadata.json`;
          obj.chain = firebasedata.chain;
          obj.name = d.data.claimer;
          obj.type = type;
          obj.claimed = "No";
          obj.eventId = parseInt(Number(eventId));
          obj.transferable = firebasedata.transferable;

          await addCollectors(obj);
        } // Generating CSV file with unique link and storing data in firebase.
        var csv;
        if (type == "badge") {
          csv = "ClaimUrl\n";
        } else {
          csv = "Name,ClaimUrl\n";
        }
        //merge the data with CSV
        array.forEach(function (row) {
          csv += row.join(",");
          csv += "\n";
        });
        var hiddenElement = document.createElement("a");
        hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
        hiddenElement.target = "_blank";
        //provide the name for the CSV file to be downloaded
        hiddenElement.download = `${firebasedata.title}.csv`;
        hiddenElement.click();
        toast.success("Successfully created NFT collection!!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something want wrong!!", err);
    }
  };

  const claimCertificate = async (claimToken, claimerAddress) => {
    setClaimLoading(true);
    const q = query(
      collection(db, "Collectors"),
      where("claimToken", "==", claimToken)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (fire) => {
      try {
        if (fire.data().claimerAddress == "") {
          const trustifiedContract = new ethers.Contract(
            fire.data().tokenContract,
            fire.data().transferable == "on"
              ? trustifiedNonTransferableContractAbi.abi
              : trustifiedContractAbi.abi,
            signer
          );

          let transferTokenTransaction = await trustifiedContract.transferToken(
            fire.data().tokenContract,
            claimerAddress,
            fire.data().tokenId
          );

          const txt = await transferTokenTransaction.wait();

          if (txt) {
            setClaimer(fire.data());
            await updateCollectors({
              id: fire.id,
              claimerAddress: claimerAddress,
              claimed: "Yes",
            });
            toast.success("Claimed Certificate Successfully!");
            setClaimLoading(false);
          }
        } else {
          const trustifiedContract = new ethers.Contract(
            fire.data().tokenContract,
            trustifiedContractAbi.abi,
            signer
          );

          let transferTokenTransaction = await trustifiedContract.transferToken(
            address,
            claimerAddress,
            fire.data().tokenId
          );

          const txt = await transferTokenTransaction.wait();

          if (txt) {
            setClaimer(fire.data());
            await updateCollectors({
              id: fire.id,
              claimerAddress: claimerAddress,
              claimed: "Yes",
            });
            toast.success("Claimed Certificate Successfully!");
            setClaimLoading(false);
          }
        }
      } catch (error) {
        toast.error("This certificate is already claimed!");
        setClaimLoading(false);
        console.log(error);
      }
    });
  };

  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        createNFTCollecion,
        shortAddress,
        disconnectWallet,
        claimCertificate,
        loginWithTrustified,
        getFirestoreData,
        claimLoading,
        setUpdate,
        csvData,
        address,
        update,
        data,
        claimer,
        userId,
        aLoading,
      }}
      {...props}
    >
      {props.children}
    </Web3Context.Provider>
  );
};
