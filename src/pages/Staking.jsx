import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';
import { Contract, ethers } from 'ethers';
import Web3 from 'web3/dist/web3.min.js'



function Staking() {
  var StakeAmt = 1;
  var StakeTotal = 10;
  var address="0x3DEb67Ea834688DaF9a4D9b190b57Ae0583e5f73";
  var abi =[
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Stake",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balances",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getStakeAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getStakers",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "stake",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "stakers",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d197e75826f0412195f368cebcf2414e"));
  var staker = new web3.eth.Contract(abi,address);

  async function stake() {
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // const signer = await provider.getSigner();
    // const signer_address = await signer.getAddress();
    // await staker.methods.stake().send({from: signer_address,value:'100000000000000000'}).then(console.log);
    ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: account,
          to: '0x3DEb67Ea834688DaF9a4D9b190b57Ae0583e5f73',
          value: '0x29a2241af62c0000',
          gasPrice: '0x09184e72a000',
          gas: '0x2710',
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
  }

  async function withdraw() {
    var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d197e75826f0412195f368cebcf2414e"));
    var staker = new web3.eth.Contract(abi,address);
    const result = await staker.methods.withdraw().call();
    console.log(result);
  }

  return (
    <>
      <h1> Staking</h1>
      {StakeAmt} / {StakeTotal} Eth
      <div className="flexbox">
      <button className='BlueButton' style={{margin:"15px"}} onClick={stake}>Stake</button>
      <button className='BlueButton' style={{margin:"15px"}} onClick={withdraw}>Withdraw</button>
      </div>
    </>
  )
}

export default Staking