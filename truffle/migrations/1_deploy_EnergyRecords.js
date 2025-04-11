const EnergyRecords = artifacts.require("EnergyRecords");

module.exports = function (deployer) {
  deployer.deploy(EnergyRecords);
};
