const { WhiteListCredential } = require("./vcHelpers/WhiteListCredential");

const humanReadableAuthReason = "Must be in the Upper Social Whitelist";

const proofRequest = WhiteListCredential();

module.exports = {
  humanReadableAuthReason,
  proofRequest,
};
