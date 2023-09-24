module.exports = {
  WhiteListCredential: () => ({
    circuitId: "credentialAtomicQueryMTPV2",
    id: 1695519198,
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
