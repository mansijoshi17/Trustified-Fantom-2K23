
require("dotenv").config({ path: "./.env" });
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;
const FANTOM_API_KEY = process.env.FANTOM_API_KEY;

module.exports = {
  solidity: '0.8.4',
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    mainnet: {
      url: `https://rpcapi.fantom.network`,
      chainId: 250,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    testnet: {
      url: `https://rpc.testnet.fantom.network`,
      chainId: 4002,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    coverage: {
      url: 'http://localhost:8555'
    },
    localhost: {
      url: `http://127.0.0.1:8545`
    }
  },
  etherscan: {
    apiKey: {
      ftmTestnet: FANTOM_API_KEY,
      opera: FANTOM_API_KEY
    }
  }
};