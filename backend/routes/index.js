const express = require("express");
const router = express.Router();
const fs = require("fs");
var Web3 = require("web3");
const Provider = require("@truffle/hdwallet-provider");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.REACT_APP_PROJECT_ID,
    privateKey: process.env.REACT_APP_FIREBASE_PRIVATE_KEY
      ? process.env.REACT_APP_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
      : undefined,
    clientEmail: process.env.REACT_APP_CLIENT_EMAIL,
  }),
  databaseURL: process.env.REACT_APP_DATABASE_URL,
});

const db = admin.firestore();

const { trustifiedContracts, rpcUrls } = require("../config");
const trustifiedContractAbi = require("../abi/Trustified.json");
const trustifiedNonTransferableContractAbi = require("../abi/TrustifiedNonTransferable.json");

router.post("/login", async (req, res) => {
  var web3 = new Web3(new Web3.providers.HttpProvider(rpcUrls[req.body.chain]));

  var trustifiedContract = new web3.eth.Contract(
    trustifiedContractAbi.abi,
    trustifiedContracts[req.body.chain].transferable
  );

  var trustifiedNonTransferableContract = new web3.eth.Contract(
    trustifiedNonTransferableContractAbi.abi,
    trustifiedContracts[req.body.chain].nonTransferable
  );

  var balance1 = await trustifiedContract.methods
    .balanceOf(req.body.userAddress)
    .call();

  var balance2 = await trustifiedNonTransferableContract.methods
    .balanceOf(req.body.userAddress)
    .call();

  if (Number(balance1) > 0 || Number(balance2) > 0) {
    res.status(200).json({ status: true });
  } else {
    res.status(200).json({ status: false });
  }
}); // Login with Trustified Token....

// router.get("/get/:claimToken", async (req, res) => {
//   let claimToken = req.params.claimToken;
//   console.log(claimToken);
//   const querySnapshot = await db
//     .collection("Collectors")
//     .where("claimToken", "==", claimToken)
//     .get();
//   let data = {};
//   querySnapshot.forEach((doc) => {
//     data = doc.data();
//   });
//   res.status(200).json(data);
// }); // Get data from claimToken...

// router.post("/claim", async (req, res) => {
//   var provider = new Provider(privatekey, rpcUrls[req.body.chain]);
//   var web3 = new Web3(provider);
//   var trustifiedContract = new web3.eth.Contract(
//     req.body.transferable == "on"
//       ? trustifiedNonTransferableContractAbi.abi
//       : trustifiedContractAbi.abi,
//     req.body.trustifiedContractAddress
//   );

//   try {
//     console.log(req.body);
//     let transferTokenTransaction = await trustifiedContract.methods
//       .transferToken(
//         req.body.trustifiedContractAddress,
//         req.body.claimerAddress,
//         req.body.tokenId
//       )
//       .send({ from: req.body.from });
//     console.log(transferTokenTransaction);
//     res.status(200).json(transferTokenTransaction);
//   } catch (error) {
//     console.log(error);
//   }
// }); // Claim Trustified Token....

module.exports = router;
