const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const Web3 = require("web3");

describe("EscrowContract_Payment", function () {
  it("Should create an escrow smart contract and make payment", async function () {
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

describe("EscrowContract_Cancel", function () {
  it("Should create an escrow smart contract and cancel contract", async function () {
    const Escrow = await ethers.getContractFactory("EscrowContract");
    const escrow = await Escrow.deploy(
      '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // Buyer
      '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // Seller
      '200000000000000000' // value in wei (1 eth = 1*10^18 wei)
      );

    await escrow.deployed();

    // wait till payment is made
    await escrow.cancelPayment();
    
    const state = await escrow.getState().then();
    expect(state).to.equal(4);
  });
});

describe("EscrowContract_Dispute", function () {
  it("Should create an escrow smart contract, make payment to escrow and refund payment back to buyer", async function () {
    const Escrow = await ethers.getContractFactory("EscrowContract");
    const escrow = await Escrow.deploy(
      '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // Buyer
      '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // Seller (Same as buyer address to trick the hardhat into thinking we are the seller)
      '200000000000000000' // value in wei (1 eth = 1*10^18 wei)
      );

    await escrow.deployed();

    // wait till payment is made
    await escrow.makePayment({value: '200000000000000000'});

    const state = await escrow.getState().then();
    expect(state).to.equal(1);

    // const escrow_balance = await web3.eth.getBalance(buyer).then();
    const escrow_balance = await ethers.provider.getBalance(escrow.address);

    expect(escrow_balance).to.equal(BigNumber.from('200000000000000000'));

    await escrow.returnPayment();

    const state1 = await escrow.getState().then();
    expect(state1).to.equal(4);

    const updated_escrow_balance = await ethers.provider.getBalance(escrow.address);

    expect(updated_escrow_balance).to.equal(BigNumber.from('0'));

  });
});

describe("EscrowContract_complete", function () {
  it("Should create an escrow smart contract , make payment to escrow, confirm delivery and transfer funds to seller", async function () {
    const Escrow = await ethers.getContractFactory("EscrowContract");
    const escrow = await Escrow.deploy(
      '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // Buyer
      '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // Seller (Same as buyer address to trick the hardhat into thinking we are the seller)
      '200000000000000000' // value in wei (1 eth = 1*10^18 wei)
      );

    await escrow.deployed();

    // wait till payment is made
    await escrow.makePayment({value: '200000000000000000'});

    const state = await escrow.getState().then();
    expect(state).to.equal(1);

    // const escrow_balance = await web3.eth.getBalance(buyer).then();
    const escrow_balance = await ethers.provider.getBalance(escrow.address);

    expect(escrow_balance).to.equal(BigNumber.from('200000000000000000'));

    // Buyer waits for item to be sent

    // Item has been sent and buyer confirms it
    await escrow.confirmDelivery();

    const state1 = await escrow.getState().then();
    expect(state1).to.equal(2);

    const updated_escrow_balance = await ethers.provider.getBalance(escrow.address);

    expect(updated_escrow_balance).to.equal(BigNumber.from('0'));
  });
});

describe("EscrowContract_complete", function () {
  it("Should create an escrow smart contract , make payment to escrow, a dispute is launched by buyer or seller", async function () {
    const Escrow = await ethers.getContractFactory("EscrowContract");
    const escrow = await Escrow.deploy(
      '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // Buyer
      '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // Seller (Same as buyer address to trick the hardhat into thinking we are the seller)
      '200000000000000000' // value in wei (1 eth = 1*10^18 wei)
      );

    await escrow.deployed();

    // wait till payment is made
    await escrow.makePayment({value: '200000000000000000'});

    const state = await escrow.getState().then();
    expect(state).to.equal(1);

    // const escrow_balance = await web3.eth.getBalance(buyer).then();
    const escrow_balance = await ethers.provider.getBalance(escrow.address);

    expect(escrow_balance).to.equal(BigNumber.from('200000000000000000'));

    // Buyer waits for item to be sent

    // Item has been sent and buyer confirms it
    await escrow.launchDispute();

    const state1 = await escrow.getState().then();
    expect(state1).to.equal(3);

    // Should transfer funds to new multi-sig-wallet
    // const updated_escrow_balance = await ethers.provider.getBalance(escrow.address);

    // expect(updated_escrow_balance).to.equal(BigNumber.from('0'));
  });
});