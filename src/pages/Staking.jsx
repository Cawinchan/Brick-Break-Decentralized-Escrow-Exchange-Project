import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';
import { Contract, ethers } from 'ethers';
import Web3 from 'web3/dist/web3.min.js';
import React from "react";



class Staking extends React.Component {
  
  render() {
  var StakeAmt = 0.1;
  var StakeTotal = -1;
  var address="0x4A5AC1275122e9b1fDc2306D53bf31a0EB6d3bE0";
  

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
          to: address,
          value: '0x16345785D8A0000',
          gasPrice: '0x109682F1B',
          gas: '0x1E8480',
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
  }

  async function withdraw() {
    var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d197e75826f0412195f368cebcf2414e"));
    var staker = new web3.eth.Contract(abi,address);
    staker.methods.withdraw().call();
    console.log("Withdrawed");
  }

  async function update() {
    var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d197e75826f0412195f368cebcf2414e"));
    var total = web3.eth.getBalance(address).then(value => {
      console.log(value); // 👉️ "hello"
    });
    
    console.log(total);
    total = 100;
    StakeTotal = total;
  }

  

  return (
    <>
      <h1> Staking</h1>
      {StakeAmt} / {StakeTotal} Eth <button onClick={update} />
      <div className="flexbox">
      <button className='BlueButton' style={{margin:"15px"}} onClick={stake}>Stake</button>
      <button className='BlueButton' style={{margin:"15px"}} onClick={withdraw}>Withdraw</button>
      </div>
    </>
  )
}
}

export default Staking