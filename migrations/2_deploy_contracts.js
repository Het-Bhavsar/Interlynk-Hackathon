var Migrations = artifacts.require("contracts/Migrations.sol");
var token = artifacts.require("contracts/interlynk.sol")

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(token);
};