import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import WalletBalance from './components/WalletBalance'
import Install from './components/Install';


function App() {
  if (!window.ethereum) {
    return <Install />;
    }
  else{
    const [count, setCount] = useState(0)

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p> Welcome to the Decentralised Escrow Exchange Project (DEEP)!</p>
          <p>
            <WalletBalance />
          </p>
        
        </header>
      </div>
    )
  }
}

export default App
