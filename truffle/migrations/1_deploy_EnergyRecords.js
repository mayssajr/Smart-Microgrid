const EnergyRecords = artifacts.require("EnergyRecords");

module.exports = function (deployer) {
  const initialWallet = "0x56bfa8d630c2dd18A81c04C5E7E9b3cEd0B79C65";
  deployer.deploy(EnergyRecords, initialWallet);
};
