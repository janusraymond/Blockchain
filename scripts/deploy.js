const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("Messaging", []);

  await contract.waitForDeployment();

  console.log(`Contract deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});