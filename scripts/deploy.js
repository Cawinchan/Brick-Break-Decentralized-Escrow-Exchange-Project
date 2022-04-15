// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

  // We get the contract to deploy
  const Escrow = await ethers.getContractFactory("EscrowContract");
  const escrow = await Escrow.deploy(
    '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // Buyer
    '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // Seller (Same as buyer address to trick the hardhat into thinking we are the seller)
    '200000000000000000' // value in wei (1 eth = 1*10^18 wei)
    ["fdfds", "erfesfas"] // terms
    );

  console.log("escrow deployed to:", escrow.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
