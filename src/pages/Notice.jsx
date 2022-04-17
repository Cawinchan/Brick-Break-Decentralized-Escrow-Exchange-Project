import { useState} from 'react'
import React from 'react';
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';
import Web3 from 'web3/dist/web3.min.js'


class Notice extends React.Component {

  async deployContract() {
    const buyerAddr = "0xdCa6F71e0540df223B0884361143208bc55f7694";  // Add buyer address
    const sellerAddr = "0x3b131Dfd7ACAC990250AfD467AAe714E76989EF3"; // Add seller address 
    const Arbitrator1 = '0x39506c2B4cF26de7BE7e9419eAe83Ed811407fAB'; // Add Arbitrator 1 
    const Arbitrator2 = '0x878B545c28Ee1D34cb2ACE6207434bB93cDD579f'; // Add Arbitrator 2 
    const Arbitrator3 = '0xe4Fd07e68f5f37CD3354e31Ad92698EEb54C4F18'; // Add Arbitrator 3
    const required = 2

    var privateKey = "0x27b6fb552b99a41f99e76df0d37d806e84dd020924b628a2ba79c70fbaa9c5d2";
    var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d197e75826f0412195f368cebcf2414e"));

    web3.eth.accounts.wallet.add(privateKey);

    var contract = new web3.eth.Contract([
      {
        "inputs": [
          {
            "internalType": "address payable",
            "name": "_disputer",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "_disputee",
            "type": "address"
          },
          {
            "internalType": "address[]",
            "name": "_arbitrators",
            "type": "address[]"
          },
          {
            "internalType": "uint256",
            "name": "_required",
            "type": "uint256"
          }
        ],
        "stateMutability": "payable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "ApprovalCount",
            "type": "uint256"
          }
        ],
        "name": "Approve",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Deposit",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          }
        ],
        "name": "Execution",
        "type": "event"
      },
      {
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "inputs": [],
        "name": "ApprovalCount",
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
        "name": "ApproveDispute",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "arbitrators",
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
        "name": "depositFunds",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "disputee",
        "outputs": [
          {
            "internalType": "address payable",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "disputer",
        "outputs": [
          {
            "internalType": "address payable",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getBalance",
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
        "name": "getConfirmationCount",
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
        "name": "getResult",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getState",
        "outputs": [
          {
            "internalType": "enum MultiSigWallet.State",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getTimeLeft",
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
            "name": "",
            "type": "address"
          }
        ],
        "name": "isApprover",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "isArbitrator",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "required",
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
        "name": "state",
        "outputs": [
          {
            "internalType": "enum MultiSigWallet.State",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "time_created",
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
        "stateMutability": "payable",
        "type": "receive"
      }
    ]);

    contract.deploy({
        data: "0x6080604052604051620017e1380380620017e1833981810160405281019062000029919062000550565b600081141580156200003d57506000825114155b6200004757600080fd5b60005b825181101562000152576000808483815181106200006d576200006c620005e1565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615620000c857600080fd5b6001600080858481518110620000e357620000e2620005e1565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550808062000149906200063f565b9150506200004a565b5083600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160029080519060200190620001ed92919062000234565b50806005819055506000600860006101000a81548160ff021916908360038111156200021e576200021d6200068c565b5b02179055504260078190555050505050620006bb565b828054828255906000526020600020908101928215620002b0579160200282015b82811115620002af5782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509160200191906001019062000255565b5b509050620002bf9190620002c3565b5090565b5b80821115620002de576000816000905550600101620002c4565b5090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200032382620002f6565b9050919050565b620003358162000316565b81146200034157600080fd5b50565b60008151905062000355816200032a565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620003ab8262000360565b810181811067ffffffffffffffff82111715620003cd57620003cc62000371565b5b80604052505050565b6000620003e2620002e2565b9050620003f08282620003a0565b919050565b600067ffffffffffffffff82111562000413576200041262000371565b5b602082029050602081019050919050565b600080fd5b60006200043682620002f6565b9050919050565b620004488162000429565b81146200045457600080fd5b50565b60008151905062000468816200043d565b92915050565b6000620004856200047f84620003f5565b620003d6565b90508083825260208201905060208402830185811115620004ab57620004aa62000424565b5b835b81811015620004d85780620004c3888262000457565b845260208401935050602081019050620004ad565b5050509392505050565b600082601f830112620004fa57620004f96200035b565b5b81516200050c8482602086016200046e565b91505092915050565b6000819050919050565b6200052a8162000515565b81146200053657600080fd5b50565b6000815190506200054a816200051f565b92915050565b600080600080608085870312156200056d576200056c620002ec565b5b60006200057d8782880162000344565b9450506020620005908782880162000344565b935050604085015167ffffffffffffffff811115620005b457620005b3620002f1565b5b620005c287828801620004e2565b9250506060620005d58782880162000539565b91505092959194509250565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006200064c8262000515565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820362000681576200068062000610565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b61111680620006cb6000396000f3fe6080604052600436106100f75760003560e01c80639f6bd2a91161008a578063dc8452cd11610059578063dc8452cd14610326578063de29278914610351578063e2c41dbc14610368578063fc2ac36714610372576100fe565b80639f6bd2a914610256578063a6430cc014610293578063c19d93fb146102d0578063c7e284b8146102fb576100fe565b80636ac56103116100c65780636ac56103146101985780636d218e48146101c35780636eec35151461020057806391f78e4c1461022b576100fe565b806312065fe0146101005780631865c57d1461012b57806343efa9ec14610156578063639d7a071461016d576100fe565b366100fe57005b005b34801561010c57600080fd5b5061011561039d565b6040516101229190610bfa565b60405180910390f35b34801561013757600080fd5b506101406103e3565b60405161014d9190610c8c565b60405180910390f35b34801561016257600080fd5b5061016b6103fa565b005b34801561017957600080fd5b50610182610713565b60405161018f9190610bfa565b60405180910390f35b3480156101a457600080fd5b506101ad610719565b6040516101ba9190610ce8565b60405180910390f35b3480156101cf57600080fd5b506101ea60048036038101906101e59190610d46565b61073f565b6040516101f79190610d8e565b60405180910390f35b34801561020c57600080fd5b5061021561075f565b6040516102229190610bfa565b60405180910390f35b34801561023757600080fd5b50610240610765565b60405161024d9190610bfa565b60405180910390f35b34801561026257600080fd5b5061027d60048036038101906102789190610d46565b61076f565b60405161028a9190610d8e565b60405180910390f35b34801561029f57600080fd5b506102ba60048036038101906102b59190610dd5565b61078f565b6040516102c79190610e11565b60405180910390f35b3480156102dc57600080fd5b506102e56107ce565b6040516102f29190610c8c565b60405180910390f35b34801561030757600080fd5b506103106107e1565b60405161031d9190610bfa565b60405180910390f35b34801561033257600080fd5b5061033b61084d565b6040516103489190610bfa565b60405180910390f35b34801561035d57600080fd5b50610366610853565b005b610370610a9f565b005b34801561037e57600080fd5b50610387610bbb565b6040516103949190610ce8565b60405180910390f35b600060016018603c80600754426103b49190610e5b565b6103be9190610ebe565b6103c89190610ebe565b6103d29190610ebe565b11156103dd57600080fd5b47905090565b6000600860009054906101000a900460ff16905090565b336000808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1661045057600080fd5b33600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16156104a857600080fd5b60016018603c80600754426104bd9190610e5b565b6104c79190610ebe565b6104d19190610ebe565b6104db9190610ebe565b11156104e657600080fd5b60018060038111156104fb576104fa610c15565b5b600860009054906101000a900460ff16600381111561051d5761051c610c15565b5b1461052757600080fd5b60018060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506001600660008282546105919190610eef565b925050819055507f77b92c0722e5bbe8d1413b7fbec6093bc4dc966a65832498dc8c2c67d9a937cc6006546040516105c99190610bfa565b60405180910390a16005546006541061070e576002600860006101000a81548160ff0219169083600381111561060257610601610c15565b5b02179055506000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff164760405161064f90610f76565b60006040518083038185875af1925050503d806000811461068c576040519150601f19603f3d011682016040523d82523d6000602084013e610691565b606091505b50509050806106d5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106cc90610fe8565b60405180910390fd5b7f33e13ecb54c3076d8e8bb8c2881800a4d972b792045ffae98fdf46df365fed75426040516107049190610bfa565b60405180910390a1505b505050565b60075481565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60016020528060005260406000206000915054906101000a900460ff1681565b60065481565b6000600654905090565b60006020528060005260406000206000915054906101000a900460ff1681565b6002818154811061079f57600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600860009054906101000a900460ff1681565b600060016018603c80600754426107f89190610e5b565b6108029190610ebe565b61080c9190610ebe565b6108169190610ebe565b111561082157600080fd5b603c600754426108319190610e5b565b61083b9190610ebe565b6105a06108489190610e5b565b905090565b60055481565b60016018603c80600754426108689190610e5b565b6108729190610ebe565b61087c9190610ebe565b6108869190610ebe565b1161089057600080fd5b6005546006541015610997576003600860006101000a81548160ff021916908360038111156108c2576108c1610c15565b5b02179055506000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff164760405161090f90610f76565b60006040518083038185875af1925050503d806000811461094c576040519150601f19603f3d011682016040523d82523d6000602084013e610951565b606091505b5050905080610995576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161098c90611054565b60405180910390fd5b505b60055460065410610a9d576002600860006101000a81548160ff021916908360038111156109c8576109c7610c15565b5b02179055506000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1647604051610a1590610f76565b60006040518083038185875af1925050503d8060008114610a52576040519150601f19603f3d011682016040523d82523d6000602084013e610a57565b606091505b5050905080610a9b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a9290610fe8565b60405180910390fd5b505b565b6000806003811115610ab457610ab3610c15565b5b600860009054906101000a900460ff166003811115610ad657610ad5610c15565b5b14610ae057600080fd5b6001600860006101000a81548160ff02191690836003811115610b0657610b05610c15565b5b021790555060003073ffffffffffffffffffffffffffffffffffffffff1634604051610b3190610f76565b60006040518083038185875af1925050503d8060008114610b6e576040519150601f19603f3d011682016040523d82523d6000602084013e610b73565b606091505b5050905080610bb7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bae906110c0565b60405180910390fd5b5050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000819050919050565b610bf481610be1565b82525050565b6000602082019050610c0f6000830184610beb565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60048110610c5557610c54610c15565b5b50565b6000819050610c6682610c44565b919050565b6000610c7682610c58565b9050919050565b610c8681610c6b565b82525050565b6000602082019050610ca16000830184610c7d565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610cd282610ca7565b9050919050565b610ce281610cc7565b82525050565b6000602082019050610cfd6000830184610cd9565b92915050565b600080fd5b6000610d1382610ca7565b9050919050565b610d2381610d08565b8114610d2e57600080fd5b50565b600081359050610d4081610d1a565b92915050565b600060208284031215610d5c57610d5b610d03565b5b6000610d6a84828501610d31565b91505092915050565b60008115159050919050565b610d8881610d73565b82525050565b6000602082019050610da36000830184610d7f565b92915050565b610db281610be1565b8114610dbd57600080fd5b50565b600081359050610dcf81610da9565b92915050565b600060208284031215610deb57610dea610d03565b5b6000610df984828501610dc0565b91505092915050565b610e0b81610d08565b82525050565b6000602082019050610e266000830184610e02565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610e6682610be1565b9150610e7183610be1565b925082821015610e8457610e83610e2c565b5b828203905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610ec982610be1565b9150610ed483610be1565b925082610ee457610ee3610e8f565b5b828204905092915050565b6000610efa82610be1565b9150610f0583610be1565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610f3a57610f39610e2c565b5b828201905092915050565b600081905092915050565b50565b6000610f60600083610f45565b9150610f6b82610f50565b600082019050919050565b6000610f8182610f53565b9150819050919050565b600082825260208201905092915050565b7f4661696c656420746f2073656e642066756e647320746f206469737075746572600082015250565b6000610fd2602083610f8b565b9150610fdd82610f9c565b602082019050919050565b6000602082019050818103600083015261100181610fc5565b9050919050565b7f4661696c656420746f2073656e642066756e647320746f206469737075746565600082015250565b600061103e602083610f8b565b915061104982611008565b602082019050919050565b6000602082019050818103600083015261106d81611031565b9050919050565b7f4661696c656420746f2073656e642066756e647320746f206d756c7469736967600082015250565b60006110aa602083610f8b565b91506110b582611074565b602082019050919050565b600060208201905081810360008301526110d98161109d565b905091905056fea2646970667358221220f190a05337f73b6d868ef9bd72c9f1926fa2d5ba341bbf641bb89949d85efac964736f6c634300080d0033",
        arguments: [buyerAddr,sellerAddr,[Arbitrator1,Arbitrator2,Arbitrator3],required]
    }).send({
        from: buyerAddr,
        gas: 2000000,
        gasPrice: '1500000027'
    }, function (error, transactionHash) {

    }).on('error', function (error) {
        console.log('error', error);
    }).on('transactionHash', function (transactionHash) {
        console.log('transactionHash', transactionHash);
    }).on('receipt', function (receipt) {
        console.log('receipt', receipt.contractAddress);
    }).on('confirmation', function (confirmationNumber, receipt) {
        console.log('confirmation', confirmationNumber);
    });
  }

  render() {
    var WithdrawalAmt = localStorage.getItem("WithdrawalAmt",WithdrawalAmt);
    var WithdrawalAddr = localStorage.getItem("WithdrawalAddr",WithdrawalAddr);
    var WithdrawalReason = localStorage.getItem("WithdrawalReason",WithdrawalReason);
    var RejectionReason = localStorage.getItem("RejectionReason",RejectionReason);

  return (
    <>
      <div className="TopRightDiv">Buyer</div>
      <img src={logo} className="App-logo Home-Button" alt="logo" />
      <Link to="/"><div style={{position:"absolute",top:"2%",left:"2%",width:"12%",height:"20%"}} /></Link>
      <h1> Dispute Notice</h1>
      <div className="BlueRoundDiv">Buyer has disputed the request made by you.  You have made a request to transfer 5.0 Eth to address
0xb794f5ea0ba39494ce839613fffba74279579268. The buyer has rejected the request for the transfer.
<br /><br />
The request will now be forwarded to a group of independent arbitrators to resolve the dispute. Alternatively,
you can cancel the request.</div><br />
      <div className="RedRoundDiv">Note: Arbitration fees may apply.</div>
      <div className="flexbox">Withdrawal Amount <input readOnly className="GreyInputNarrow" value={WithdrawalAmt+" Eth"} /></div>
      <div className="flexbox">Withdrawal Address <input readOnly className="GreyInputNarrow" value={WithdrawalAddr} /></div>
      <div className="flexbox">Withdrawal Request <textarea readOnly className="GreyInputWide" value={WithdrawalReason} /></div>
      <p>The following reason has been provided for the rejection.</p>
      <div className="flexbox">Rejection Reason <textarea className="GreyInputWide" value={RejectionReason} /></div>
      <div className="flexbox">
      <Link to="/Start"><button className='BlueButton' style={{margin:"15px"}}>Cancel Request</button></Link>
      <Link to="/Arbitration"><button className='BlueButton' style={{margin:"15px"}} onClick={this.deployContract}>Dispute Arbitration</button></Link>
      </div>
    </>
    )
  }
}

export default Notice