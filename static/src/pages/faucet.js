import React from 'react'
import "bulma/css/bulma.css"
import './faucet.css'
import Footer from '../components/Footer/footer'
import Navbar from '../components/Navbar/navbar'
import BuySection from '../components/BuySection/BuySection'
import faucet from '../assets/faucet.png'
import FaucetInfo from "../FaucetInfo/FaucetInfo";
import FaucetQueue from "../FaucetInfo/FaucetQueue";
import FaucetRequest from "../FaucetRequest/FaucetRequest";
import config from "react-global-configuration";
import configuration from "./config";
 
config.set(configuration);
const Faucet = () => {

  const [lastDonation, setLastDonation] = React.useState();

  const onQueued = () => {
    setLastDonation(Date.now())
  }
  return (
    <div className='faucet'>
        <Navbar />
        <p className='heading'>
            <img src={faucet} />
            Cicca Testnet Faucet
        </p>
        <p className='sub-heading'>
            Fast and reliable . 1 Cicca/Day
        </p>
        <BuySection onQueued={onQueued} />
        <Footer />
    </div>
  )
}

export default Faucet