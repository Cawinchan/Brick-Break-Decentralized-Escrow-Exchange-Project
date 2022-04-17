// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// const hre = require("hardhat");

async function main() {

  // We get the contract to deploy
  let provider = ethers.getDefaultProvider('ropsten');
  let privateKey = '0x27b6fb552b99a41f99e76df0d37d806e84dd020924b628a2ba79c70fbaa9c5d2';
  let wallet = new ethers.Wallet(privateKey, provider);

  // Deploy Staker Contract
  const StakerContract = await ethers.getContractFactory('Staker',wallet=wallet);
  stakerContract = await StakerContract.deploy();

  console.log("stakerContract deployed to:", stakerContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
