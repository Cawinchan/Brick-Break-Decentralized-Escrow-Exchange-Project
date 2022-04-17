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
  var StakeTotal = 0;
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
    staker.methods.withdraw().call();
    console.log("Withdrawed");
  }

  async function update() {
    var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d197e75826f0412195f368cebcf2414e"));
    var total = web3.eth.getBalance(address).then(value => {
      console.log(value); // 👉️ "hello"
      total = value/(10**18);
      console.log(total);
      document.getElementById("stakeTotal").textContent = total;
    });
    
    
  }

  

  return (
    <>
      <h1> Staking</h1>
      <div className="flexbox">{StakeAmt} / <strong id="stakeTotal">{StakeTotal}</strong>Eth <button onClick={update} style={{width:"150px",height:"30px",marginLeft:"30px",fontSize:"14px"}}> Update </button></div>
      <div className="flexbox">
      <button className='BlueButton' style={{margin:"15px"}} onClick={stake}>Stake</button>
      <button className='BlueButton' style={{margin:"15px"}} onClick={withdraw}>Withdraw</button>
      </div>
    </>
  )
}
}

export default Staking