const Attestation = artifacts.require("Attestation");

module.exports = function (deployer) {
  deployer.deploy(Attestation);
};