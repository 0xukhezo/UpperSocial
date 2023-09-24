const { WhiteListCredential } = require("./vcHelpers/WhiteListCredential");

const humanReadableAuthReason = "Must be born before this year";

const proofRequest = WhiteListCredential();

module.exports = {
  humanReadableAuthReason,
  proofRequest,
};
