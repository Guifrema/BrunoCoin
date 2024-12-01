const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer Address: ", deployer.address);

  const BrunoCoin = await hre.ethers.getContractFactory("BrunoCoin");
  
  // Aguarde o deploy
  const brunoToken = await BrunoCoin.deploy(deployer.address);
  await brunoToken.waitForDeployment(); // Aguarda a confirmação na blockchain

  // Obtém o endereço do contrato
  const contractAddress = await brunoToken.getAddress();
  console.log("Token deployed to:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });