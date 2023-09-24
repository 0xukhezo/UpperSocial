module.exports = {
  WhiteListCredential: () => ({
    circuitId: "credentialAtomicQuerySigV2",
    id: 1695559059,
    query: {
      allowedIssuers: ["*"],
      context:
        "https://raw.githubusercontent.com/0xukhezo/UpperSocial/main/server/crendential.json",
      credentialSubject: {
        whitelisted: {
          $eq: true,
        },
        lensStats: {
          MinFollowing: {
            $gt: 50,
          },
          MinFollowers: {
            $gt: 50,
          },
        },
      },
      type: "UpperWhitelist",
    },
  }),
};
