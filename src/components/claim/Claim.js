import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Web3Context } from "../../context/Web3Context";
import { firebaseDataContext } from "../../context/FirebaseDataContext";
import axios from "axios";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import MyCollection from "../myCollection";
import { ethers } from "ethers";

export default function Claim() {
  const web3Context = React.useContext(Web3Context);
  const { claimCertificate, claimLoading, connectWallet, address } =
    web3Context;

  const firebaseContext = React.useContext(firebaseDataContext);
  const { getMyCollection, getClaimer, claimer } = firebaseContext;

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const [show, setShow] = useState(false);

  const { token } = useParams();

  const [add, setAddress] = useState("");

  useEffect(() => {
    getClaimer(token);
  }, [token]);

  async function switchNetwork(chainId) {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `${chainId}` }], // chainId must be in HEX with 0x in front
    });
    document.location.reload();
  }

  return (
    <section className="banner-one" id="banner">
      <div className="bannercontainer container">
        <div className="banner-one__moc">
          <img src="/images/banner.png" alt="alter text" />
        </div>
        <div className="row">
          <div className="col-xl-6 col-lg-8">
            <div className="banner-one__claimcontent">
              <div className="py-4">
                <div className="mt-4 template-card">
                  {claimer?.type == "badge" ? (
                    <img
                      className="claimBadge"
                      src={claimer?.image?.replace(
                        "ipfs://",
                        "https://nftstorage.link/ipfs/"
                      )}
                    />
                  ) : (
                    <img
                      className="claimCertificate"
                      src={claimer?.image?.replace(
                        "ipfs://",
                        "https://nftstorage.link/ipfs/"
                      )}
                    />
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-12 mx-auto text-center">
                  <div className="row">
                    <div className="col-10 mx-auto text-center">
                      <TextField
                        name="Address"
                        label="Wallet Address"
                        fullWidth
                        className="m-3 address"
                        onChange={(e) => setAddress(e.target.value)}
                        sx={{ background: "white" }}
                      />
                    </div>

                    <div className="col-2 mx-auto text-center">
                      <a
                        className="thm-btn header__cta-btn claimBtn"
                        onClick={async () => {
                          await claimCertificate(token, address);
                        }}
                      >
                        <span>{claimLoading ? "Claiming..." : " Claim"}</span>
                      </a>
                    </div>
                  </div>

                  <div className="mt-2">
                    <a
                      className="thm-btn header__cta-btn"
                      onClick={() => {
                        getMyCollection(add);
                        setShow(true);
                      }}
                    >
                      <span>Browse Collection</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider sx={{ m: 3 }} />
      {show && <MyCollection show={show}></MyCollection>}
    </section>
  );
}
