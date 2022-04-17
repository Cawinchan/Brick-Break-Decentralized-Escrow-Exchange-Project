import { useState } from 'react'
import logo from './escrow.png'
import './App.css'
import WalletBalance from './components/WalletBalance'
import Install from './components/Install';
import { Routes, Route, Link } from 'react-router-dom';

// Pages
import Home from "./pages/Home";
import Start from "./pages/Start";
import Create from "./pages/Create";
import Join from "./pages/Join";
import RoleSel from "./pages/RoleSel";
import Terms from "./pages/Terms";
import TermsConfirm from "./pages/TermsConfirm";
import Deposit from "./pages/Deposit";
import Request from "./pages/Request";
import Check from "./pages/Check";
import Notice from "./pages/Notice";
import Staking from "./pages/Staking";
import Arbitration from "./pages/Arbitration";
import Judging from "./pages/Judging";
import Result from "./pages/Result";
import Undisputed from "./pages/Undisputed";

function App() {
  if (!window.ethereum) {
    return <Install />;
    }
  else{
    const [count, setCount] = useState(0)

    return (
      <div className="App">
        <header className="App-header">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Start" element={<Start />} />
            <Route path="/Create" element={<Create />} />
            <Route path="/Join" element={<Join />} />
            <Route path="/RoleSel" element={<RoleSel />} />
            <Route path="/Terms" element={<Terms />} />
            <Route path="/TermsConfirm" element={<TermsConfirm />} />
            <Route path="/Deposit" element={<Deposit />} />
            <Route path="/Request" element={<Request />} />
            <Route path="/Check" element={<Check />} />
            <Route path="/Undisputed" element={<Undisputed />} />
            <Route path="/Notice" element={<Notice />} />
            <Route path="/Staking" element={<Staking />} />
            <Route path="/Arbitration" element={<Arbitration />} />
            <Route path="/Judging" element={<Judging />} />
            <Route path="/Result" element={<Result />} />
          </Routes>
        
        </header>
      </div>
    )
  }
}


export default App
