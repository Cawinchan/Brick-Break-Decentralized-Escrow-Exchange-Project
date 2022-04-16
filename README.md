# Brick Break Decentralized Escrow Exchange Project

Open Source Ethereum Smart Contract Dapp with a simple front end that allows 2 transacting parties, a buyer and seller, to trade both physical and crypto items with a POS staking system who act as arbitrators.  

## ⚡ Quick Start

```shell
npm install
npm run build
npm run preview / npm run dev
```

## 💡 Run tests

```shell
npx hardhat test 
```

### Gas usage 

[](https://github.com/Cawinchan/Brick-Break-Decentralized-Escrow-Exchange-Project/blob/master/images/Gas_reporter.png) 

## Depolying POS staking contract and Etherscan verification

```shell
hardhat run --network ropsten scripts/deploy_staker.js
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS 
```

## Work Flow of Escrow System
[](https://github.com/Cawinchan/Brick-Break-Decentralized-Escrow-Exchange-Project/blob/master/images/Whole_workflow.png) 

## User Journey
[](https://github.com/Cawinchan/Brick-Break-Decentralized-Escrow-Exchange-Project/blob/master/images/DEEP_uml_diagram.png) 

## States for tracking progress
[](https://github.com/Cawinchan/Brick-Break-Decentralized-Escrow-Exchange-Project/blob/master/images/final%20state%20diagram.png) 


## Functionalities
[](https://github.com/Cawinchan/Brick-Break-Decentralized-Escrow-Exchange-Project/blob/master/images/DEEP_uml_diagram.png) 
