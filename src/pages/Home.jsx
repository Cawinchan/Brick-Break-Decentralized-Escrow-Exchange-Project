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
        <Link to="/Start">Start</Link><br />
        <Link to="/Create">Create</Link><br />
        <Link to="/Join">Join</Link><br />
        <Link to="/RoleSel">Role Selection</Link><br />
        <Link to="/Terms">Terms</Link><br />
        <Link to="/TermsConfirm">Terms Confirm</Link><br />
        <Link to="/Request">Request Withdrawal</Link><br />
        <Link to="/Check">Withdrawal Check</Link><br />
        <Link to="/Notice">Dispute Notice</Link><br />
        <Link to="/Arbitration">Dispute Arbitration</Link><br />
        <Link to="/Judging">Dispute Judging</Link><br />
        <Link to="/Result">Dispute Result</Link><br />
    </nav>
    </>
  )
}

export default Home