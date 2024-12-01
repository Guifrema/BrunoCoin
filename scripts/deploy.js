const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer Address: ", deployer.address);

  const BrunoCoin = await hre.ethers.getContractFactory("BrunoCoin");

  const brunoToken = await BrunoCoin.deploy(deployer.address);
  await brunoToken.waitForDeployment();

  const contractAddress = await brunoToken.getAddress();
  console.log("Token deployed to:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });