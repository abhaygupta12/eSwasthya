const Migrations = artifacts.require("Migrations");
const Medical = artifacts.require("Medical");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Medical)
};

