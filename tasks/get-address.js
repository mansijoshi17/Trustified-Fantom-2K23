const fa = require("@glif/filecoin-address");

task(
  "get-address",
  "Gets Filecoin f4 address and corresponding Ethereum address."
).setAction(async (taskArgs) => {
  const [deployer] = await hre.ethers.getSigners();

  const f4Address = fa.newDelegatedEthAddress(deployer.address).toString();

  console.log(
    "Ethereum address (this addresss should work for most tools):",
    deployer.address
  );
  console.log("f4address (informational only):", f4Address);
});

module.exports = {};
