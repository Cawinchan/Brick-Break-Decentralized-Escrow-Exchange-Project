// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  let provider = ethers.getDefaultProvider('ropsten');
  let privateKey = '0x27b6fb552b99a41f99e76df0d37d806e84dd020924b628a2ba79c70fbaa9c5d2';
  let wallet = new ethers.Wallet(privateKey, provider);
   // Deploy ExampleExternalContract contract
   ExampleExternalContractFactory = await ethers.getContractFactory('ExampleExternalContract',wallet=wallet);
   exampleExternalContract = await ExampleExternalContractFactory.deploy();

   // Deploy Staker Contract
   const StakerContract = await ethers.getContractFactory('Staker',wallet=wallet);
   stakerContract = await StakerContract.deploy(exampleExternalContract.address);


  // const Staker = await ethers.getContractFactory("Staker",wallet=wallet);
  // const staker = await Staker.deploy(
  //   '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // Buyer
  //   '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // Seller (Same as buyer address to trick the hardhat into thinking we are the seller)
  //   '200000000000000000' // value in wei (1 eth = 1*10^18 wei)
  //   );

  console.log("Greeter deployed to:", stakerContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
