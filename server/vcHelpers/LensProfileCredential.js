module.exports = {
  LensProfileCredential: () => ({
    circuitId: "credentialAtomicQuerySigV2",
    id: 1695504432,
    query: {
      allowedIssuers: ["*"],
      context: "ipfs://QmXJVAxncYfsRUJT5EHzNYZyyDqM29G7Cx2dYjNhYxymy7",
      credentialSubject: {
        LensProfile: {
          $eq: true,
        },
      },
      type: "LensTokenGate",
    },
  }),
};
