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

![alt text](https://github.com/Cawinchan/Brick-Break-Decentralized-Escrow-Exchange-Project/blob/master/images/Gas_reporter.png) 

## Depolying POS staking contract and Etherscan verification

```shell
hardhat run --network ropsten scripts/deploy_staker.js
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS 
```

## Work Flow of Escrow System
![alt text](https://github.com/Cawinchan/Brick-Break-Decentralized-Escrow-Exchange-Project/blob/master/images/Whole_workflow.png) 

## User Journey
![alt text](https://github.com/Cawinchan/Brick-Break-Decentralized-Escrow-Exchange-Project/blob/master/images/DEEP%20Seqeunce%20Diagram.png) 

## States for tracking progress
![alt text](https://github.com/Cawinchan/Brick-Break-Decentralized-Escrow-Exchange-Project/blob/master/images/all_states_diagram.drawio.png) 


## Functionalities
![alt text](https://github.com/Cawinchan/Brick-Break-Decentralized-Escrow-Exchange-Project/blob/master/images/DEEP_uml_diagram.png) 
