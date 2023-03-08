require("dotenv").config();

const trustifiedContracts = {
  fevm: {
    transferable: "0xE97b9504D5ecAC587a7c769d613214e96E2abF62",
    nonTransferable: "0xFd5bD185cb9cc2e693D553A4986A238250c6c508",
  },
  mumbai: {
    transferable: "0x8C04FBB496ab6A17109e2CD57Cdaf9245c802Ef3",
    nonTransferable: "0xCBB9ECDCD3B0f63082ef56E76D69ff4eBbB0b84f",
  },
};

const rpcUrls = {
  fevm: "https://api.hyperspace.node.glif.io/rpc/v0",
  mumbai: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
};

module.exports = { trustifiedContracts, rpcUrls };
