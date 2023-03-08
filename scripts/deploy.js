const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const TrustifiedContract = await hre.ethers.getContractFactory("Trustified");
  const trustifiedContract = await TrustifiedContract.deploy();

  const TrustifiedNonTranferableContract = await hre.ethers.getContractFactory("TrustifiedNonTransferable");
  const trustifiedNonTranferableContract = await TrustifiedNonTranferableContract.deploy();

  console.log("Trustified nft contract address:", trustifiedContract.address);
  console.log("Trustified Non Transferable nft contract address:", trustifiedNonTranferableContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
