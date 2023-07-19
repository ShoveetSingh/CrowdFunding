/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    defaultNetwork: 'Mumbai',
    networks:{
      hardhat: {},
      Mumbai : {
      url : 'https://rpc.ankr.com/polygon_mumbai',
      accounts : ['0x${process.env.PRIVATE_KEY}']
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
