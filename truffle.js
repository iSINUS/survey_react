module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    develop: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*", // Match any network id
      gas: 1000000,
      gasPrice: 1000000000
    }
  }
};
