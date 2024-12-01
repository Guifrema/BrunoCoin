const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners(); // Usa o primeiro endereço configurado no Hardhat
  console.log("Deployer Address: ", deployer.address);

  const contractAddress = "0xB89bf47CBE385703085A90cE1383593FA8485aA8"; // Substitua pelo endereço do seu contrato

  const BrunoCoin = await hre.ethers.getContractAt("BrunoCoin", contractAddress);

  const recipient = "0xb2D0fe4C5B4f8D2bb0B29ffF97db6b485B1F4e55"; 
  const amount = hre.ethers.parseUnits("10", 18); 

  const tx = await BrunoCoin.burn(recipient);
  console.log("Mint transaction hash:", tx.hash);

  // Aguarde a confirmação da transação
  const receipt = await tx.wait();
  console.log("Mint transaction confirmed in block:", receipt.blockNumber);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
