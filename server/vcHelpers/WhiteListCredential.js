module.exports = {
  WhiteListCredential: () => ({
    circuitId: "credentialAtomicQuerySigV2",
    id: 1695519930,
    query: {
      allowedIssuers: ["*"],
      context:
        "https://raw.githubusercontent.com/0xukhezo/UpperSocial/main/server/crendential.json",
      credentialSubject: {
        whitelisted: {
          $eq: true,
        },
      },
      type: "Whitelist",
    },
  }),
};
