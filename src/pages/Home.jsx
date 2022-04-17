import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function Home() {
  return (
    <>
    <img src={logo} className="App-logo" alt="logo" />
    <p> Welcome to the Decentralised Escrow Exchange Project (DEEP)!</p>
    <p>
      <WalletBalance />
    </p>
    <nav>

        <Link to="/Start" className="cyan-fab">Start</Link>
        <Link to="/Create" className="cyan-fab">Create</Link>
        <Link to="/Join" className="cyan-fab">Join</Link>
        <Link to="/RoleSel" className="cyan-fab">Role Selection</Link>
        <Link to="/Terms" className="cyan-fab">Terms</Link>
        <Link to="/TermsConfirm" className="cyan-fab">Terms Confirm</Link>
        <Link to="/Request" className="cyan-fab">Request Withdrawal</Link>
        <Link to="/Check" className="cyan-fab">Withdrawal Check</Link>
        <Link to="/Undisputed" className="cyan-fab">Undisputed Transaction</Link>
        <Link to="/Notice" className="cyan-fab">Dispute Notice</Link>
        <Link to="/Staking" className="cyan-fab">Staking</Link>
        <Link to="/Arbitration" className="cyan-fab">Dispute Arbitration</Link>
        <Link to="/Judging" className="cyan-fab">Dispute Judging</Link>
        <Link to="/Result" className="cyan-fab">Dispute Result</Link>

    </nav>
    </>
  )
}

export default Home