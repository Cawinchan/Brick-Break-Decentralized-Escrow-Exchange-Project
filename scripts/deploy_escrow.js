// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// const hre = require("hardhat");

async function main() {
  let provider = ethers.getDefaultProvider('ropsten'); 
  let privateKey = '0x27b6fb552b99a41f99e76df0d37d806e84dd020924b628a2ba79c70fbaa9c5d2'; 
  let wallet = new ethers.Wallet(privateKey, provider);

  // We get the contract to deploy
  const Escrow = await ethers.getContractFactory("EscrowContract",wallet=wallet);
  const escrow = await Escrow.deploy(
    '0xdCa6F71e0540df223B0884361143208bc55f7694', // Buyer
    '0x3b131Dfd7ACAC990250AfD467AAe714E76989EF3', // Seller (Same as buyer address to trick the hardhat into thinking we are the seller)
    '200000000000000000', // value in wei (1 eth = 1*10^18 wei)
    ["The seller will receive the agreed upon quantity of goods before 3rd April 2023.","The goods must be in satisfactory condition upon delivery."] // terms
    );

  console.log("escrow deployed to:", escrow.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
