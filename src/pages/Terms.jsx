import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';
import React from "react";
import Web3 from 'web3/dist/web3.min.js'


class Terms extends React.Component {
  constructor(props) {
    super(props);
    this.state={contractList:[
      "The seller will receive the agreed upon quantity of goods before 3rd April 2023.",
      "The goods must be in satisfactory condition upon delivery."
    ]};
  }

  async deployContract() {
    const buyerAddr = "0xdCa6F71e0540df223B0884361143208bc55f7694";  // Add buyer address
    const sellerAddr = "0x3b131Dfd7ACAC990250AfD467AAe714E76989EF3"; // Add seller address 
    const EthAmt = localStorage.getItem("EthAmt"); // KX need to multiply this by 1*10^18
    const contractTerms = JSON.parse(localStorage.getItem("terms"));

    var from = buyerAddr;
    var privateKey = "0x27b6fb552b99a41f99e76df0d37d806e84dd020924b628a2ba79c70fbaa9c5d2";

    var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/d197e75826f0412195f368cebcf2414e"));

    web3.eth.accounts.wallet.add(privateKey);

    var contract = new web3.eth.Contract([
      {
        "inputs": [
          {
            "internalType": "address payable",
            "name": "_buyer",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "_sender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
          },
          {
            "internalType": "string[]",
            "name": "_terms",
            "type": "string[]"
          }
        ],
        "stateMutability": "payable",
        "type": "constructor"
      },
      {
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "inputs": [],
        "name": "approveContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "buyer",
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
        "name": "cancelPayment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "completeTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "confirmDelivery",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "getState",
        "outputs": [
          {
            "internalType": "enum EscrowContract.State",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "launchDispute",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "makePayment",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "returnPayment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "seller",
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
        "name": "state",
        "outputs": [
          {
            "internalType": "enum EscrowContract.State",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
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
        "name": "terms",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
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
        "inputs": [],
        "name": "value",
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
        data: "0x6080604052604051620019af380380620019af8339818101604052810190620000299190620005c7565b836000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550816002819055508060039080519060200190620000c992919062000109565b506000600560006101000a81548160ff02191690836005811115620000f357620000f262000658565b5b02179055504260048190555050505050620006eb565b8280548282559060005260206000209081019282156200015d579160200282015b828111156200015c5782518290805190602001906200014b92919062000170565b50916020019190600101906200012a565b5b5090506200016c919062000201565b5090565b8280546200017e90620006b6565b90600052602060002090601f016020900481019282620001a25760008555620001ee565b82601f10620001bd57805160ff1916838001178555620001ee565b82800160010185558215620001ee579182015b82811115620001ed578251825591602001919060010190620001d0565b5b509050620001fd919062000229565b5090565b5b808211156200022557600081816200021b919062000248565b5060010162000202565b5090565b5b80821115620002445760008160009055506001016200022a565b5090565b5080546200025690620006b6565b6000825580601f106200026a57506200028b565b601f0160209004906000526020600020908101906200028a919062000229565b5b50565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620002cf82620002a2565b9050919050565b620002e181620002c2565b8114620002ed57600080fd5b50565b6000815190506200030181620002d6565b92915050565b6000819050919050565b6200031c8162000307565b81146200032857600080fd5b50565b6000815190506200033c8162000311565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620003928262000347565b810181811067ffffffffffffffff82111715620003b457620003b362000358565b5b80604052505050565b6000620003c96200028e565b9050620003d7828262000387565b919050565b600067ffffffffffffffff821115620003fa57620003f962000358565b5b602082029050602081019050919050565b600080fd5b600080fd5b600067ffffffffffffffff82111562000433576200043262000358565b5b6200043e8262000347565b9050602081019050919050565b60005b838110156200046b5780820151818401526020810190506200044e565b838111156200047b576000848401525b50505050565b600062000498620004928462000415565b620003bd565b905082815260208101848484011115620004b757620004b662000410565b5b620004c48482856200044b565b509392505050565b600082601f830112620004e457620004e362000342565b5b8151620004f684826020860162000481565b91505092915050565b6000620005166200051084620003dc565b620003bd565b905080838252602082019050602084028301858111156200053c576200053b6200040b565b5b835b818110156200058a57805167ffffffffffffffff81111562000565576200056462000342565b5b808601620005748982620004cc565b855260208501945050506020810190506200053e565b5050509392505050565b600082601f830112620005ac57620005ab62000342565b5b8151620005be848260208601620004ff565b91505092915050565b60008060008060808587031215620005e457620005e362000298565b5b6000620005f487828801620002f0565b94505060206200060787828801620002f0565b93505060406200061a878288016200032b565b925050606085015167ffffffffffffffff8111156200063e576200063d6200029d565b5b6200064c8782880162000594565b91505092959194509250565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620006cf57607f821691505b602082108103620006e557620006e462000687565b5b50919050565b6112b480620006fb6000396000f3fe6080604052600436106100ec5760003560e01c8063639d7a071161008a578063c0aa0e8a11610059578063c0aa0e8a1461026a578063c19d93fb146102a7578063d8d79700146102d2578063e8baa1f0146102dc576100f3565b8063639d7a07146101e65780637150d8ae146102115780639a40c8331461023c578063b3ae1d2c14610253576100f3565b80633dcfe411116100c65780633dcfe411146101765780633fa4f2451461018d57806343d00d04146101b85780635e10177b146101cf576100f3565b806308551a53146100f557806312065fe0146101205780631865c57d1461014b576100f3565b366100f357005b005b34801561010157600080fd5b5061010a6102f3565b6040516101179190610d1f565b60405180910390f35b34801561012c57600080fd5b50610135610319565b6040516101429190610d53565b60405180910390f35b34801561015757600080fd5b50610160610321565b60405161016d9190610de5565b60405180910390f35b34801561018257600080fd5b5061018b610338565b005b34801561019957600080fd5b506101a26104ce565b6040516101af9190610d53565b60405180910390f35b3480156101c457600080fd5b506101cd6104d4565b005b3480156101db57600080fd5b506101e461059d565b005b3480156101f257600080fd5b506101fb610733565b6040516102089190610d53565b60405180910390f35b34801561021d57600080fd5b50610226610739565b6040516102339190610d1f565b60405180910390f35b34801561024857600080fd5b5061025161075d565b005b34801561025f57600080fd5b506102686107cc565b005b34801561027657600080fd5b50610291600480360381019061028c9190610e31565b6109a1565b60405161029e9190610ef7565b60405180910390f35b3480156102b357600080fd5b506102bc610a4d565b6040516102c99190610de5565b60405180910390f35b6102da610a60565b005b3480156102e857600080fd5b506102f1610c18565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600047905090565b6000600560009054906101000a900460ff16905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461039257600080fd5b60028060058111156103a7576103a6610d6e565b5b600560009054906101000a900460ff1660058111156103c9576103c8610d6e565b5b146103d357600080fd5b60058060006101000a81548160ff021916908360058111156103f8576103f7610d6e565b5b021790555060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff164760405161044490610f4a565b60006040518083038185875af1925050503d8060008114610481576040519150601f19603f3d011682016040523d82523d6000602084013e610486565b606091505b50509050806104ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104c190610fab565b60405180910390fd5b5050565b60025481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461052e57600080fd5b600080600581111561054357610542610d6e565b5b600560009054906101000a900460ff16600581111561056557610564610d6e565b5b1461056f57600080fd5b6001600560006101000a81548160ff0219169083600581111561059557610594610d6e565b5b021790555050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146105f557600080fd5b600280600581111561060a57610609610d6e565b5b600560009054906101000a900460ff16600581111561062c5761062b610d6e565b5b1461063657600080fd5b6003600560006101000a81548160ff0219169083600581111561065c5761065b610d6e565b5b02179055506000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16476040516106a990610f4a565b60006040518083038185875af1925050503d80600081146106e6576040519150601f19603f3d011682016040523d82523d6000602084013e6106eb565b606091505b505090508061072f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161072690611017565b60405180910390fd5b5050565b60045481565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600280600581111561077257610771610d6e565b5b600560009054906101000a900460ff16600581111561079457610793610d6e565b5b1461079e57600080fd5b6004600560006101000a81548160ff021916908360058111156107c4576107c3610d6e565b5b021790555050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461082657600080fd5b600280600581111561083b5761083a610d6e565b5b600560009054906101000a900460ff16600581111561085d5761085c610d6e565b5b1461086757600080fd5b60016018603c806004544261087c9190611066565b61088691906110c9565b61089091906110c9565b61089a91906110c9565b116108a457600080fd5b6003600560006101000a81548160ff021916908360058111156108ca576108c9610d6e565b5b02179055506000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff164760405161091790610f4a565b60006040518083038185875af1925050503d8060008114610954576040519150601f19603f3d011682016040523d82523d6000602084013e610959565b606091505b505090508061099d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161099490611017565b60405180910390fd5b5050565b600381815481106109b157600080fd5b9060005260206000200160009150905080546109cc90611129565b80601f01602080910402602001604051908101604052809291908181526020018280546109f890611129565b8015610a455780601f10610a1a57610100808354040283529160200191610a45565b820191906000526020600020905b815481529060010190602001808311610a2857829003601f168201915b505050505081565b600560009054906101000a900460ff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610ab857600080fd5b6001806005811115610acd57610acc610d6e565b5b600560009054906101000a900460ff166005811115610aef57610aee610d6e565b5b14610af957600080fd5b6002543414610b3d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b34906111cc565b60405180910390fd5b6002600560006101000a81548160ff02191690836005811115610b6357610b62610d6e565b5b021790555060003073ffffffffffffffffffffffffffffffffffffffff1634604051610b8e90610f4a565b60006040518083038185875af1925050503d8060008114610bcb576040519150601f19603f3d011682016040523d82523d6000602084013e610bd0565b606091505b5050905080610c14576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c0b9061125e565b60405180910390fd5b5050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610c7057600080fd5b6001806005811115610c8557610c84610d6e565b5b600560009054906101000a900460ff166005811115610ca757610ca6610d6e565b5b14610cb157600080fd5b60058060006101000a81548160ff02191690836005811115610cd657610cd5610d6e565b5b021790555050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610d0982610cde565b9050919050565b610d1981610cfe565b82525050565b6000602082019050610d346000830184610d10565b92915050565b6000819050919050565b610d4d81610d3a565b82525050565b6000602082019050610d686000830184610d44565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60068110610dae57610dad610d6e565b5b50565b6000819050610dbf82610d9d565b919050565b6000610dcf82610db1565b9050919050565b610ddf81610dc4565b82525050565b6000602082019050610dfa6000830184610dd6565b92915050565b600080fd5b610e0e81610d3a565b8114610e1957600080fd5b50565b600081359050610e2b81610e05565b92915050565b600060208284031215610e4757610e46610e00565b5b6000610e5584828501610e1c565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610e98578082015181840152602081019050610e7d565b83811115610ea7576000848401525b50505050565b6000601f19601f8301169050919050565b6000610ec982610e5e565b610ed38185610e69565b9350610ee3818560208601610e7a565b610eec81610ead565b840191505092915050565b60006020820190508181036000830152610f118184610ebe565b905092915050565b600081905092915050565b50565b6000610f34600083610f19565b9150610f3f82610f24565b600082019050919050565b6000610f5582610f27565b9150819050919050565b7f4661696c656420746f2072657475726e2066756e647320746f20627579657200600082015250565b6000610f95601f83610e69565b9150610fa082610f5f565b602082019050919050565b60006020820190508181036000830152610fc481610f88565b9050919050565b7f4661696c656420746f2073656e642066756e647320746f2073656c6c65720000600082015250565b6000611001601e83610e69565b915061100c82610fcb565b602082019050919050565b6000602082019050818103600083015261103081610ff4565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061107182610d3a565b915061107c83610d3a565b92508282101561108f5761108e611037565b5b828203905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006110d482610d3a565b91506110df83610d3a565b9250826110ef576110ee61109a565b5b828204905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061114157607f821691505b602082108103611154576111536110fa565b5b50919050565b7f416d6f756e742073656e74206d7573742062652073616d65206173207370656360008201527f696669656420696e2074686520457363726f7720436f6e747261637421000000602082015250565b60006111b6603d83610e69565b91506111c18261115a565b604082019050919050565b600060208201905081810360008301526111e5816111a9565b9050919050565b7f4661696c656420746f2073656e642066756e647320746f20657363726f77636f60008201527f6e74726163740000000000000000000000000000000000000000000000000000602082015250565b6000611248602683610e69565b9150611253826111ec565b604082019050919050565b600060208201905081810360008301526112778161123b565b905091905056fea2646970667358221220781d4ba6293ccc477a990660a4a8220170bfb32be139444a1b26f0b0439a486664736f6c634300080d0033",
        arguments: [buyerAddr,sellerAddr,EthAmt,contractTerms]
    }).send({
        from: from,
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

  
  save() {
    var contractList = [...this.state.contractList];
    contractList.push(this.newText.value);
    this.setState({contractList});
  }

  pop() {
    var contractList = [...this.state.contractList];
    contractList.pop(this.newText.value);
    this.setState({contractList});  
  }

  render() {
  var dealID="ABCDEFGDHIJKLMNK";
  var contractTerms = this.state.contractList;
  var contractList = contractTerms.map((contractTerm,index) =>
    <li>{contractTerm} </li>
  );

  function submit() {
    var EthAmt = document.getElementById("EthAmt").value;
    if (isNaN(parseFloat(EthAmt))) {
      alert("Ethereum Amount is not a number!")
    } else if (parseFloat(EthAmt)<=0) {
      alert("Ethereum Amount cannot be less than 0!")
    }
    else {
      localStorage.setItem("terms",JSON.stringify(contractTerms));
      localStorage.setItem("EthAmt",EthAmt);
      console.log("Eth Amount set")
    }

    this.deployContract();

  }

  return (
    <>
    <img src={logo} className="App-logo Home-Button" alt="logo" />
    <Link to="/"><div style={{position:"absolute",top:"2%",left:"2%",width:"12%",height:"20%"}} /></Link>
    <h1 style={{position:"absolute",top:"5%"}}>Terms Proposal</h1>
    <div className="TopRightDiv">Buyer</div>
    <div className="GreyRoundDiv" style={{paddingTop:"0px",maxHeight:"45vh",overflowY:"scroll"}}>
      <h3>Contract Terms</h3>
      <ol style={{textAlign:"left"}}>{contractList}</ol>
    </div>
    <h3>Press the add clause button after writing the clause to be added.</h3>
    <textarea className="GreyInput" type="text" ref={(ip) => {this.newText = ip}}/>
    <div style={{display:"flex",marginTop:"15px"}}>
    Value of Contract:
    <input className="GreyInput" id="EthAmt" type="numbers" step="0.01" style={{marginLeft:"150px",height:"30px",width:"100px"}} /> Eth
    <button className="BlueButton" style={{position:"absolute",bottom:"5vh",left:"8vw",width:"27vw",height:"8vh"}} onClick={this.save.bind(this)}>Add Clause</button>
    </div>
    <button className="BlueButton" style={{position:"absolute",bottom:"5vh",width:"27vw",height:"8vh"}}onClick={this.pop.bind(this)}>Delete Last</button>
    <Link to="/TermsConfirm"><button className="BlueButton" style={{position:"absolute",bottom:"5vh",right:"8vw",width:"27vw",height:"8vh"}} onClick={submit}>Confirm Contract</button></Link>
    </>
  )
  }
}

export default Terms