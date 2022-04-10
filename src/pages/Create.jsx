import { useState } from 'react'
import logo from '../escrow.png'
import '../App.css'
import WalletBalance from '../components/WalletBalance'
import Install from '../components/Install';
import { Routes, Route, Link } from 'react-router-dom';


function Create() {
  var dealID="ABCDEFGDHIJKLMNK";

  return (
    <>
    <div className="GreyRoundDiv">
      <p>
        Start an Escrow Request
        <br /> <br />
        You can define your contract here and rely on independent arbitrators should a dispute occur.
      </p>
      <button className="BlueButton">{dealID.substring(0,4)}-{dealID.substring(4,8)}-{dealID.substring(8,12)}-{dealID.substring(12)}</button>
    </div>
    </>
  )
}

export default Create