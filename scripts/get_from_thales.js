const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners(); // Usa o primeiro endereço configurado no Hardhat
  console.log("Deployer Address: ", deployer.address);

  // Endereço do contrato implantado
  const contractAddress = "0xB89bf47CBE385703085A90cE1383593FA8485aA8"; // Substitua pelo endereço do seu contrato

  // Anexar ao contrato implantado
  const BrunoCoin = await hre.ethers.getContractAt("BrunoCoin", contractAddress);

  // Chamar a função `mint`
  const thales = "0xb2D0fe4C5B4f8D2bb0B29ffF97db6b485B1F4e55"; // Substitua pelo endereço que receberá os tokens
  const amount = hre.ethers.parseUnits("100", 18); // 1000 tokens (ajuste se necessário)

  const tx = await BrunoCoin.transferTo(thales, deployer.address, amount)
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
