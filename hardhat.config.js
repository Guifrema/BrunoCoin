require('dotenv').config()
require("@nomicfoundation/hardhat-toolbox");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks:{
    
    amoy:{

      url: "https://polygon-amoy.g.alchemy.com/v2/WAu9lCgOy8H3UaysYN3u0A6ampsBO0Lh",
      accounts: [`0x${process.env.PRIVATE_KEY}`]

    }

  }

};
