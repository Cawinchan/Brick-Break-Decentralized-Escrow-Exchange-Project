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
    const MutliSig = await ethers.getContractFactory("MultiSigWallet",wallet=wallet);
    const multisig = await MutliSig.deploy(
       '0xdCa6F71e0540df223B0884361143208bc55f7694', // Disputer - launcher of dispute
       '0x3b131Dfd7ACAC990250AfD467AAe714E76989EF3', // Disputee - person the dispute is launched against
      [
        '0x39506c2B4cF26de7BE7e9419eAe83Ed811407fAB', // Arbitrator 1
        '0x878B545c28Ee1D34cb2ACE6207434bB93cDD579f', // Arbitrator 2
        '0xe4Fd07e68f5f37CD3354e31Ad92698EEb54C4F18' // Arbitrator 3
      ],
      2 // required amount of signatures
    );
  
    console.log("mutlisig deployed to:", multisig.address);
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  