const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const Web3 = require("web3");
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();




// Following are the States
// 0: await_confirmation - Waiting for seller to agree to the clauses of the contract
// 1: await_payment - Waiting for Buyer to send funds to escrow account
// 2: await_delivery - Buyer has sent funds, waiting for Seller to send item
// 3: complete - Buyer has received item, funds sent to seller
// 4: dispute_raised - after payment, either buyer or seller can raise this
// 5: cancelled - Buyer decides to not send funds or seller decides to return funds to Buyer

describe("EscrowContract_Approve", function () {
  it("Should create an escrow smart contract and approve contract", async function () {
    const [buyer,seller] = await ethers.getSigners();

    const Escrow = await ethers.getContractFactory("EscrowContract");
    const escrow = await Escrow.deploy(
      buyer.address, // Buyer
      seller.address, // Seller
      '2000000000000000000' // value in wei (1 eth = 1*10^18 wei)
      );

    await escrow.deployed();

    // Wait for seller to approve the contract
    await escrow.connect(seller).approveContract();

    const state1 = await escrow.getState().then();
    expect(state1).to.equal(1);
  });
});

describe("EscrowContract_Payment", function () {
  it("Should create an escrow smart contract and make payment", async function () {
    const [buyer,seller] = await ethers.getSigners();

    const Escrow = await ethers.getContractFactory("EscrowContract");
    const escrow = await Escrow.deploy(
      buyer.address, // Buyer
      seller.address, // Seller
      '2000000000000000000' // value in wei (1 eth = 1*10^18 wei)
      );

    await escrow.deployed();

    // Wait for seller to approve the contract
    await escrow.connect(seller).approveContract();

    const state1 = await escrow.getState().then();
    expect(state1).to.equal(1);

    // const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/26907a93a74c4d028569de987e5dd064"))

    // const past_escrow_balance = await ethers.provider.getBalance(escrow.address);
    // console.log("past escrow balance:",past_escrow_balance);

    // wait till payment is made
    await escrow.connect(buyer).makePayment({value: '2000000000000000000'});
    
    const state2 = await escrow.getState().then();
    expect(state2).to.equal(2);

    // const escrow_balance = await web3.eth.getBalance(buyer).then();
    const escrow_balance = await ethers.provider.getBalance(escrow.address);

    // console.log("escrow balance after payment:",escrow_balance)

    expect(escrow_balance).to.equal(BigNumber.from('2000000000000000000'));
  });
});

describe("EscrowContract_Payment_wrong_amount", function () {
  it("Should create an escrow smart contract and make payment with the wrong amount", async function () {
    const [buyer,seller] = await ethers.getSigners();

    const Escrow = await ethers.getContractFactory("EscrowContract");
    const escrow = await Escrow.deploy(
      buyer.address, // Buyer
      seller.address, // Seller
      '2000000000000000000' // value in wei (1 eth = 1*10^18 wei)
      );

    await escrow.deployed();

    // Wait for seller to approve the contract
    await escrow.connect(seller).approveContract();

    const state1 = await escrow.getState().then();
    expect(state1).to.equal(1);

    // const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/26907a93a74c4d028569de987e5dd064"))

    const past_escrow_balance = await ethers.provider.getBalance(escrow.address);
    // console.log("past escrow balance:",past_escrow_balance);

    // wait till payment is made
    const error = escrow.connect(buyer).makePayment({value: '200000000000000'});
    await expect(error).eventually.to.rejectedWith(Error, "VM Exception while processing transaction: reverted with reason string 'Amount sent must be same as specified in the Escrow Contract!'")
  });
});

describe("EscrowContract_Cancel", function () {
  it("Should create an escrow smart contract and cancel contract", async function () {
    const [buyer,seller] = await ethers.getSigners();

    const Escrow = await ethers.getContractFactory("EscrowContract");
    const escrow = await Escrow.deploy(
      buyer.address, // Buyer
      seller.address, // Seller
      '2000000000000000000' // value in wei (1 eth = 1*10^18 wei)
      );

    await escrow.deployed();

    // Wait for seller to approve the contract
    await escrow.connect(seller).approveContract();

    // wait till payment is made
    await escrow.cancelPayment();
    
    const state = await escrow.getState().then();
    expect(state).to.equal(5);
  });
});

describe("EscrowContract_Refund", function () {
  it("Should create an escrow smart contract, make payment to escrow and refund payment back to buyer", async function () {
    const [buyer,seller] = await ethers.getSigners();

    const Escrow = await ethers.getContractFactory("EscrowContract");
    const escrow = await Escrow.deploy(
      buyer.address, // Buyer
      seller.address, // Seller
      '2000000000000000000' // value in wei (1 eth = 1*10^18 wei)
      );

    await escrow.deployed();

    // Wait for seller to approve the contract
    await escrow.connect(seller).approveContract();
    
    // wait till payment is made
    await escrow.makePayment({value: '2000000000000000000'});

    const state = await escrow.getState().then();
    expect(state).to.equal(2);

    // const escrow_balance = await web3.eth.getBalance(buyer).then();
    const escrow_balance = await ethers.provider.getBalance(escrow.address);

    expect(escrow_balance).to.equal(BigNumber.from('2000000000000000000'));

    await escrow.connect(seller).returnPayment();

    const state1 = await escrow.getState().then();
    expect(state1).to.equal(5);

    const updated_escrow_balance = await ethers.provider.getBalance(escrow.address);

    expect(updated_escrow_balance).to.equal(BigNumber.from('0'));

  });
});

describe("EscrowContract_Complete", function () {
  it("Should create an escrow smart contract , make payment to escrow, confirm delivery and transfer funds to seller", async function () {
    const [buyer,seller] = await ethers.getSigners();

    const Escrow = await ethers.getContractFactory("EscrowContract");
    const escrow = await Escrow.deploy(
      buyer.address, // Buyer
      seller.address, // Seller
      '2000000000000000000' // value in wei (1 eth = 1*10^18 wei)
      );

    await escrow.deployed();

    // Wait for seller to approve the contract
    await escrow.connect(seller).approveContract();

    // wait till payment is made
    await escrow.makePayment({value: '2000000000000000000'});

    const state = await escrow.getState().then();
    expect(state).to.equal(2);

    // const escrow_balance = await web3.eth.getBalance(buyer).then();
    const escrow_balance = await ethers.provider.getBalance(escrow.address);

    expect(escrow_balance).to.equal(BigNumber.from('2000000000000000000'));

    // Buyer waits for item to be sent

    // Item has been sent and buyer confirms it
    await escrow.confirmDelivery();

    const state1 = await escrow.getState().then();
    expect(state1).to.equal(3);

    const updated_escrow_balance = await ethers.provider.getBalance(escrow.address);

    expect(updated_escrow_balance).to.equal(BigNumber.from('0'));
  });
});

describe("EscrowContract_Dispute", function () {
  it("Should create an escrow smart contract , make payment to escrow, a dispute is launched by buyer or seller", async function () {
    const [buyer,seller] = await ethers.getSigners();

    const Escrow = await ethers.getContractFactory("EscrowContract");
    const escrow = await Escrow.deploy(
      buyer.address, // Buyer
      seller.address, // Seller
      '2000000000000000000' // value in wei (1 eth = 1*10^18 wei)
      );

    await escrow.deployed();

    // Wait for seller to approve the contract
    await escrow.connect(seller).approveContract();

    // wait till payment is made
    await escrow.makePayment({value: '2000000000000000000'});

    const state = await escrow.getState().then();
    expect(state).to.equal(2);

    // const escrow_balance = await web3.eth.getBalance(buyer).then();
    const escrow_balance = await ethers.provider.getBalance(escrow.address);

    expect(escrow_balance).to.equal(BigNumber.from('2000000000000000000'));

    // Buyer waits for item to be sent

    // Item has been sent and buyer confirms it
    await escrow.launchDispute();

    const state1 = await escrow.getState().then();
    expect(state1).to.equal(4);

    // Should transfer funds to new multi-sig-wallet
    // const updated_escrow_balance = await ethers.provider.getBalance(escrow.address);

    // expect(updated_escrow_balance).to.equal(BigNumber.from('0'));
  });
});