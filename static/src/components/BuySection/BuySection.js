import React, { useState , useRef } from 'react'
import './Buysection.css'
import ReCAPTCHA from "react-google-recaptcha";
import Insta from '../../assets/instagram.png'
import Telegram from '../../assets/telegram.png'
import Twitter from '../../assets/twitter.png'
import Eth from "ethjs";
import config from "react-global-configuration";
import axios from "axios";
import FaucetRequest from '../FaucetRequest/FaucetRequest.js';


const BuySection = ({ onQueued }) => {
    const [buttonDisabled,setButtonDisabled]=useState(true)
    const [address,setAddress]=useState('')
    const icons=[
        {
            img:Twitter,
            alt:'twitter',
            link:'https://twitter.com/CiccaDefi'
        },
        {
            img:Insta,
            alt:'insta',
            link:'https://www.instagram.com/ciccadefi'
        },
        {
            img:Telegram,
            alt:'telegram',
            link:'https://t.me/CiccaOfficial'
        },
    ]
    const handleChange=(value)=>{
        console.log({value});
        setButtonDisabled(false)
    }

  const [cansubmit, setCansubmit] = React.useState(false);
  const [message, setMessage] = React.useState();

  React.useEffect(() => {
    setCansubmit(Eth.isAddress(address));
  }, [address]);

  let timeout;
  React.useEffect(() => {
    if (message) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }, [message]);

  const submit = () => {
    setCansubmit(false);

    let apiUrl = `${config.get("apiurl")}/donate/${config.get("accesskey")}/${address}`;
    axios
      .get(apiUrl)
      .then(response => {
        if (response.status === 200) {
          setAddress("");
          onQueued && onQueued();
          setMessage(response.data.message);
        }
      })
      // Catch any error here
      .catch(error => {
        if (!error || !error.response) {
          setMessage(`API error`);
          return;
        }
        if (error.response.status === 403) {
          setMessage(error.response.data.message);
          return;
        }
      });
  }

    return (
        <div className='section'>
            <div className='icons'>
                {Array.isArray(icons) &&
                    icons.map((item) => (
                        <a href={item?.link} target='_blank' rel="noopener noreferrer">
                            <img src={item?.img} alt={item?.alt} />
                        </a>
                    ))}
            </div>
            <div className='input-container'>
                <label>Enter your wallet address</label>
                <input
                    onChange={(e) => setAddress(e.target.value)}
                    className='input'
                    placeholder='Wallet address'
                />
            </div>
            <ReCAPTCHA sitekey="6LcvgBUoAAAAAOP7SlX82DQrXuYfNqNND6pD-Tyz" onChange={handleChange} />
            <button
            onClick={submit}
            disabled={!cansubmit }
            className='submit'
          >
            Send me test CICCA
          </button>

          {message && (
        <article
          className="message"
          onClick={() => { setMessage(null) }}
        >
          <div className="message-body">
            <b>{message}</b><br />
          </div>
        </article>
      )}
        </div>
    );
};

export default BuySection;

// const BuySection = () => {
//     const [buttonDisabled,setButtonDisabled]=useState(true)
//     const [address,setAddress]=useState('')
//     const icons=[
//         {
//             img:Twitter,
//             alt:'twitter',
//             link:'https://twitter.com/CiccaDefi'
//         },
//         {
//             img:Insta,
//             alt:'insta',
//             link:'https://www.instagram.com/ciccadefi'
//         },
//         {
//             img:Telegram,
//             alt:'telegram',
//             link:'https://t.me/CiccaOfficial'
//         },
//     ]
//     const handleChange=(value)=>{
//         console.log({value});
//         setButtonDisabled(false)
//     }
//     const mineFaucet=()=>{
//         console.log('ffffff');
//     }
//   return (
//     <div className='section'>
//         <div className='icons'>
//             {Array.isArray(icons) && icons.map((item)=>(<a href={item?.link} target='_blank'><img src={item?.img} alt={item?.alt} /></a>))}
//         </div>
//         <div className='input-container'>
//             <label>
//                 Enter your wallet address
//             </label>
//         <input onChange={(e)=>setAddress(e.target.value)} className='input' placeholder='Wallet address' />
//         {/* <p>
//             You will receive Cicca in above mentioned wallet address
//         </p> */}
//         </div>
//         <ReCAPTCHA
//     sitekey="6Ld-uQcoAAAAAP_ahCGF3K0ZCcBCSZUGJM2Fc8bY"
//      onChange={handleChange}
//   />
//         <button onClick={mineFaucet} className='submit' disabled={address.length<=0 || buttonDisabled}>Send me Cicca</button>
//     </div>
//   )
// }

// export default BuySection
