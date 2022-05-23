import { useState } from 'react';
import { ethers } from 'ethers';
  // import WalletBalance from '../components/WalletBalance'
import { FaEthereum } from "react-icons/fa";


function WalletBalance() {

    const [balance, setBalance] = useState();
    
    const getBalance = async () => {
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        try {
          // Request account access
          await window.ethereum.enable();
          const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const balance = await provider.getBalance(account);
          setBalance(parseFloat(ethers.utils.formatEther(balance)));
        } catch(e) {
          // User denied access
          console.log(e)
        }
        
      }
      else{
        console.log("MetaMask not installed!")
        //return <Install />;
      }

        
    };
  
    return (
      <div>
         
          <h5 className="font-semibold">Your Balance: {balance} {balance ? "ETH" : ''} </h5>
          
          <button onClick={() => getBalance(  )} className="cawin-fab">Show My Balance</button>
          
      </div>
    );
  };
  
  export default WalletBalance;