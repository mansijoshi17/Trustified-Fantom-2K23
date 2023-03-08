export const trustifiedContracts = {
  fevm: {
    transferable: "0x0B6D76Be6A95D67F264040E4950aEdB59e61E588",
    nonTransferable: "0x3c3d6B09e64368330be0eaD2a652d1fB86898afa",
    trustifiedCreds: "0x158b0766083915a69916A3865f8914a3Bf4846Bb",
    verifier: "0x7d5f94f32b9C5F525fc97935D9A95F860Ff30F0b",
  },
  mumbai: {
    transferable: "0x8C04FBB496ab6A17109e2CD57Cdaf9245c802Ef3",
    nonTransferable: "0xCBB9ECDCD3B0f63082ef56E76D69ff4eBbB0b84f",
    trustifiedCreds: "",
    verifier: "",
  },
  goerli: {
    transferable: "0x0005A12fFB8edf3D93E49fEb79E3ea45883B1de2",
    nonTransferable: "0x89d050840d9B93AA6E5f73A350921dD1818059f7",
    trustifiedCreds: "",
    verifier: "",
  },
  bsc: {
    transferable: "0x7d5f94f32b9C5F525fc97935D9A95F860Ff30F0b",
    nonTransferable: "0xfA4C0a1B79DbF507f5051943ec61c18d4DaF29eC",
    trustifiedCreds: "",
    verifier: "",
  },
};


export const chain = {
  3141: "fevm",
  80001: "mumbai",
  5: "goerli",
  97: "bsc",
};
