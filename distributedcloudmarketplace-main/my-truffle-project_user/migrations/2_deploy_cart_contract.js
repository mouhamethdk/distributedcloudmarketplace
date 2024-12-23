const CartContract = artifacts.require("CartContract");

module.exports = function (deployer) {
  deployer.deploy(CartContract);
};