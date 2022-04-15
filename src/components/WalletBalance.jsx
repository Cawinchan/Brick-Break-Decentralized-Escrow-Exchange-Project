import { useState } from 'react';
import { ethers } from 'ethers';
  // import WalletBalance from '../components/WalletBalance'


function WalletBalance() {

    const [balance, setBalance] = useState();
    
    const getBalance = async () => {
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        try {
          // Request account access
          await window.ethereum.enable();
          // var accounts = await web3.eth.getAccounts();
          const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const balance = await provider.getBalance(account);
          setBalance(parsefloat(ethers.utils.formatEther(balance)).tofixed(2));
        } catch(e) {
          // User denied access
        }
        
      }
      else{
        return <Install />;
      }

        
    };
  
    return (
      <div>
         
          <h5>Your Balance: {balance} {balance ? 'ETH' : ''} </h5>
          <button onClick={() => getBalance(  )}>Show My Balance</button>
      </div>
    );
  };
  
  export default WalletBalance;