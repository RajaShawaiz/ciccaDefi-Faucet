import React from "react";
import "./faucet.css";

import Navbar from "../components/Navbar/navbar";
import BuySection from "../components/BuySection/BuySection";
import faucet from "../assets/faucet.png";
const Faucet = () => {
  return (
    <div className="faucet">
      <Navbar />
      <p className="heading">
        {/* <img src={faucet} /> */}
        Cicca Testnet Faucet
      </p>
      <p className="sub-heading">Fast and reliable . 1 Cicca/Day</p>
      <BuySection />
      <h4>© 2023 CiccaDefi. All rights reserved.</h4>
      {/* <Footer /> */}
    </div>
  );
};

export default Faucet;
