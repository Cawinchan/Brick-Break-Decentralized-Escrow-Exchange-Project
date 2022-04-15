const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const Web3 = require("web3");

  // Following are the States
  // 0: await_deposit - Waiting for EscrowContract to send funds
  // 1: await_approval - Waiting arbitrators to approve contract 
  // 2: dispute_succesful - Disputer application was succesful
  // 3: dispute_failed - Disputer application was not succesful

describe("MultiSig_Create", function () {
  it("Should create a multi-sig account after dispute", async function () {
    const [disputer, disputee, arbitrator1, arbitrator2, arbitrator3, EscrowContract] = await ethers.getSigners();

    const MutliSig = await ethers.getContractFactory("MultiSigWallet");
    const multisig = await MutliSig.deploy(
      disputer.address, // Disputer - launcher of dispute
      disputee.address, // Disputee - person the dispute is launched against
      [
        arbitrator1.address, // Arbitrator 1
        arbitrator2.address, // Arbitrator 2
        arbitrator3.address // Arbitrator 3
      ],
      2 // required amount of signatures
    );
    await multisig.deployed();
  });
});


describe("MultiSig_ArbitratorApprove", function () {
    it("Should create a multi-sig account and arbitrator makes an approval", async function () {
    const [disputer, disputee, arbitrator1, arbitrator2, arbitrator3, EscrowContract] = await ethers.getSigners();

    const MutliSig = await ethers.getContractFactory("MultiSigWallet");
    const multisig = await MutliSig.deploy(
      disputer.address, // Disputer - launcher of dispute
      disputee.address, // Disputee - person the dispute is launched against
      [
        arbitrator1.address, // Arbitrator 1
        arbitrator2.address, // Arbitrator 2
        arbitrator3.address // Arbitrator 3
      ],
      2 // required amount of signatures
    );
    await multisig.deployed();

    await multisig.connect(EscrowContract).depositFunds({value: '2000000000000000000'});
    
    await multisig.connect(arbitrator1).ApproveDispute();
      
    const confirmation_count = await  multisig.getConfirmationCount().then();

    expect(confirmation_count).to.equal(1)
   
    });
  });
   
  describe("MultiSig_Approvel_reaches_required", function () {
    it("Should create a multi-sig account and the funds is sent to the disputer after reaching required number of signatures", async function () {
      const [disputer, disputee, arbitrator1,arbitrator2,arbitrator3, EscrowContract] = await ethers.getSigners();

      const MutliSig = await ethers.getContractFactory("MultiSigWallet");
      const multisig = await MutliSig.deploy(
        disputer.address, // Disputer - launcher of dispute
        disputee.address, // Disputee - person the dispute is launched against
        [
          arbitrator1.address, // Arbitrator 1
          arbitrator2.address, // Arbitrator 2
          arbitrator3.address // Arbitrator 3
        ],
        2 // required amount of signatures
      );
      await multisig.deployed();

    const disputer_balance = await ethers.provider.getBalance(disputer.address);

    await multisig.connect(EscrowContract).depositFunds({value: '2000000000000000000'});

    const multiSig_balance1 = await ethers.provider.getBalance(multisig.address);

    expect(multiSig_balance1).to.equal(BigNumber.from('2000000000000000000'));
    
    await multisig.connect(arbitrator1).ApproveDispute();

    await multisig.connect(arbitrator2).ApproveDispute();

    const confirmation_count = await  multisig.getConfirmationCount().then();

    expect(confirmation_count).to.equal(2);

    const multiSig_balance = await ethers.provider.getBalance(multisig.address);

    expect(multiSig_balance).to.equal(BigNumber.from('0'));

    const state = await multisig.getState().then();
    expect(state).to.equal(2);


    console.log("value gained should be close to value (deposit - gas fee)",(await ethers.provider.getBalance(disputer.address)-disputer_balance))
    });
  });
  
  describe("MultiSig_Time_out", function () {
    it("Should create a multi-sig account after dispute", async function () {
      const [disputer, disputee, arbitrator1, arbitrator2, arbitrator3, EscrowContract] = await ethers.getSigners();

      const MutliSig = await ethers.getContractFactory("MultiSigWallet");
      const multisig = await MutliSig.deploy(
        disputer.address, // Disputer - launcher of dispute
        disputee.address, // Disputee - person the dispute is launched against
        [
          arbitrator1.address, // Arbitrator 1
          arbitrator2.address, // Arbitrator 2
          arbitrator3.address // Arbitrator 3
        ],
        2 // required amount of signatures
      );
      await multisig.deployed();
      
    // Fast forward time
    await network.provider.send("evm_increaseTime", [(10000*24)+1])
    await network.provider.send("evm_mine")
    await multisig.getResult();

    const state = await multisig.getState().then();
    expect(state).to.equal(3);
    });
  });

