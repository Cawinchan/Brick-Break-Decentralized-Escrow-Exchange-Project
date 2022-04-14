import { useState } from 'react';
import { ethers } from 'ethers';

function WalletBalance() {

    const [balance, setBalance] = useState();
    
    const getBalance = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);
        setBalance(parsefloat(ethers.utils.formatEther(balance)).tofixed(2));
    };
  
    return (
      <div>
         
          <h5>Your Balance: {balance} {balance ? 'ETH' : ''} </h5>
          <button onClick={() => getBalance(  )}>Show My Balance</button>
      </div>
    );
  };
  
  export default WalletBalance;