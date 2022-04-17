// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main(buyerAddr,sellerAddr,EthAmt,terms) {
  let provider = ethers.getDefaultProvider('ropsten'); 
  let privateKey = '0x27b6fb552b99a41f99e76df0d37d806e84dd020924b628a2ba79c70fbaa9c5d2'; 
  let wallet = new ethers.Wallet(privateKey, provider);

  // We get the contract to deploy
  const Escrow = await ethers.getContractFactory("EscrowContract",wallet=wallet);
  const escrow = await Escrow.deploy(
    buyerAddr, //'0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // Buyer
    sellerAddr, //'0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // Seller (Same as buyer address to trick the hardhat into thinking we are the seller)
    EthAmt, //'200000000000000000' // value in wei (1 eth = 1*10^18 wei)
    ContractTerms //["fdfds", "erfesfas"] // terms
    );

  console.log("escrow deployed to:", escrow.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
