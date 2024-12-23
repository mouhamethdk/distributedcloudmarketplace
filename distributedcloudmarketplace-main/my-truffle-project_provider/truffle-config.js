module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Port de Ganache
      network_id: "*", // Match any network id
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Version de Solidity
    },
  },
};