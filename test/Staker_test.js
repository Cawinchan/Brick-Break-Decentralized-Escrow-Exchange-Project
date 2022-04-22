const {ethers} = require('hardhat');
const {use, expect} = require('chai');
const {solidity} = require('ethereum-waffle');

use(solidity);

// Utilities methods
const increaseWorldTimeInSeconds = async (seconds, mine = false) => {
  await ethers.provider.send('evm_increaseTime', [seconds]);
  if (mine) {
    await ethers.provider.send('evm_mine', []);
  }
};

describe('Staker dApp', () => {
  let addr1;
  let addr2;
  let addrs;

  let stakerContract;

  beforeEach(async () => {
    // Deploy Staker Contract
    const StakerContract = await ethers.getContractFactory('Staker');
    stakerContract = await StakerContract.deploy();

    // eslint-disable-next-line no-unused-vars
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  });

  describe('Test stake() method', () => {
    it('Stake event emitted', async () => {
      const amount = ethers.utils.parseEther('0.5');

      await expect(
        stakerContract.connect(addr1).stake({
          value: amount,
        }),
      )
        .to.emit(stakerContract, 'Stake')
        .withArgs(addr1.address, amount);

      // Check that the contract has the correct amount of ETH we just sent
      const contractBalance = await ethers.provider.getBalance(stakerContract.address);
      expect(contractBalance).to.equal(amount);

      // Check that the contract has stored in our balances state the correct amount
      const addr1Balance = await stakerContract.balances(addr1.address);
      expect(addr1Balance).to.equal(amount);
    });

    it('Stake 0.5 ETH from single user', async () => {
      const amount = ethers.utils.parseEther('0.5');
      const tx = await stakerContract.connect(addr1).stake({
        value: amount,
      });
      await tx.wait();

      // Check that the contract has the correct amount of ETH we just sent
      const contractBalance = await ethers.provider.getBalance(stakerContract.address);
      expect(contractBalance).to.equal(amount);

      // Check that the contract has stored in our balances state the correct amount
      const addr1Balance = await stakerContract.balances(addr1.address);
      expect(addr1Balance).to.equal(amount);
    });
  });

  describe('Test Withdraw method', () => {
    it('Stake and check if the number of stakers than withdraw and check number of stakers', async () => {

        const amount = ethers.utils.parseEther('0.5');
        const tx = await stakerContract.connect(addr1).stake({
          value: amount,
        });
        await tx.wait();

        const amount1 = ethers.utils.parseEther('0.5');
        const tx1 = await stakerContract.connect(addr2).stake({
          value: amount1,
        });
        await tx1.wait();

        const stakers = await stakerContract.getStakers().then();
        expect(stakers.length).to.equal(2);
        // console.log(stakers);

        // Check that the contract has the correct amount of ETH we just sent
        const contractBalance = await ethers.provider.getBalance(stakerContract.address);
        expect(contractBalance).to.equal('1000000000000000000');

        // Check that the contract has stored in our balances state the correct amount
        const addr1Balance = await stakerContract.balances(addr1.address);
        expect(addr1Balance).to.equal(amount);

        // increase time to allow for withdrawal
        await increaseWorldTimeInSeconds(240);


        await stakerContract.connect(addr1).withdraw();
        const stakers2 = await stakerContract.getStakers().then();
        // console.log(stakers2);
        // check if size and staker removed is correct
        expect(stakers2.length).to.equal(1);
        expect(stakers2[0]).to.equal(stakers[1]);


        const contractBalance2 = await ethers.provider.getBalance(stakerContract.address);
        expect(contractBalance2).to.equal('500000000000000000');

  });

  
});
});