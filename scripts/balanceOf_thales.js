
const hre = require("hardhat");

async function main() {
    const contractAddress = "0xB89bf47CBE385703085A90cE1383593FA8485aA8";
    const targetAddress = "0xb2D0fe4C5B4f8D2bb0B29ffF97db6b485B1F4e55"; 
  
    const BrunoCoin = await hre.ethers.getContractAt("BrunoCoin", contractAddress);
  
    const balance = await BrunoCoin.balance(targetAddress);

    console.log(`Saldo de Thales:`, hre.ethers.formatUnits(balance, 18), "BCoin");
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
  