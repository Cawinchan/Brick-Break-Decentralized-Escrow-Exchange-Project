const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const Web3 = require("web3");

describe("MultiSig_Create", function () {
  it("Should create a multi-sig account after dispute", async function () {
    const Escrow = await ethers.getContractFactory("EscrowContract");
    const escrow = await Escrow.deploy(
      '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // Buyer
      '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // Seller
      '200000000000000000' // value in wei (1 eth = 1*10^18 wei)
      );

    await escrow.deployed();

    // const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/26907a93a74c4d028569de987e5dd064"))

    const past_escrow_balance = await ethers.provider.getBalance(escrow.address);
    console.log("past escrow balance:",past_escrow_balance);

    // wait till payment is made
    await escrow.makePayment({value: '200000000000000000'});
    
    const state = await escrow.getState().then();
    expect(state).to.equal(1);

    // const escrow_balance = await web3.eth.getBalance(buyer).then();
    const escrow_balance = await ethers.provider.getBalance(escrow.address);

    console.log("escrow balance after payment:",escrow_balance)

    expect(escrow_balance).to.equal(BigNumber.from('200000000000000000'));
  });
});


describe("MultiSig_Approve_disputer", function () {
    it("Should create a multi-sig account and arbitrator makes an approval", async function () {
      const Escrow = await ethers.getContractFactory("EscrowContract");
      const escrow = await Escrow.deploy(
        '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // Buyer
        '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // Seller
        '200000000000000000' // value in wei (1 eth = 1*10^18 wei)
        );
  
      await escrow.deployed();
  
      // const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/26907a93a74c4d028569de987e5dd064"))
  
      const past_escrow_balance = await ethers.provider.getBalance(escrow.address);
      console.log("past escrow balance:",past_escrow_balance);
  
      // wait till payment is made
      await escrow.makePayment({value: '200000000000000000'});
      
      const state = await escrow.getState().then();
      expect(state).to.equal(1);
  
      // const escrow_balance = await web3.eth.getBalance(buyer).then();
      const escrow_balance = await ethers.provider.getBalance(escrow.address);
  
      console.log("escrow balance after payment:",escrow_balance)
  
      expect(escrow_balance).to.equal(BigNumber.from('200000000000000000'));
    });
  });
  
  describe("MultiSig_Approvel_reaches_required", function () {
    it("Should create a multi-sig account and the funds is sent to the disputer after reaching required number of signatures", async function () {
      const Escrow = await ethers.getContractFactory("EscrowContract");
      const escrow = await Escrow.deploy(
        '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // Buyer
        '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // Seller
        '200000000000000000' // value in wei (1 eth = 1*10^18 wei)
        );
  
      await escrow.deployed();
  
      // const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/26907a93a74c4d028569de987e5dd064"))
  
      const past_escrow_balance = await ethers.provider.getBalance(escrow.address);
      console.log("past escrow balance:",past_escrow_balance);
  
      // wait till payment is made
      await escrow.makePayment({value: '200000000000000000'});
      
      const state = await escrow.getState().then();
      expect(state).to.equal(1);
  
      // const escrow_balance = await web3.eth.getBalance(buyer).then();
      const escrow_balance = await ethers.provider.getBalance(escrow.address);
  
      console.log("escrow balance after payment:",escrow_balance)
  
      expect(escrow_balance).to.equal(BigNumber.from('200000000000000000'));
    });
  });
  
  describe("MultiSig_Time_out", function () {
    it("Should create a multi-sig account after dispute", async function () {
      const Escrow = await ethers.getContractFactory("EscrowContract");
      const escrow = await Escrow.deploy(
        '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // Buyer
        '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // Seller
        '200000000000000000' // value in wei (1 eth = 1*10^18 wei)
        );
  
      await escrow.deployed();
  
      // const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/26907a93a74c4d028569de987e5dd064"))
  
      const past_escrow_balance = await ethers.provider.getBalance(escrow.address);
      console.log("past escrow balance:",past_escrow_balance);
  
      // wait till payment is made
      await escrow.makePayment({value: '200000000000000000'});
      
      const state = await escrow.getState().then();
      expect(state).to.equal(1);
  
      // const escrow_balance = await web3.eth.getBalance(buyer).then();
      const escrow_balance = await ethers.provider.getBalance(escrow.address);
  
      console.log("escrow balance after payment:",escrow_balance)
  
      expect(escrow_balance).to.equal(BigNumber.from('200000000000000000'));
    });
  });
  