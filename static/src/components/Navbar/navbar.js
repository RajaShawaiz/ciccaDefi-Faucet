import React from 'react'
import './navbar.css'
import Logo from '../../assets/logo.png'
import Metamask from '../../assets/metamask.png'
const Navbar = () => {
    const addChain=()=>{
        console.log( `0x${Number(21014).toString(16)}`);
        window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
            chainId: '21014',
            chainName: 'Cicca Testnet',
            nativeCurrency: {
                name: 'Cicca Defi',
                symbol: 'CICCA',
                decimals: 18
            },
            rpcUrls: ['http://51.20.5.97:8545'],
            blockExplorerUrls: ['https://bscscan.com']
            }]
            })
            .catch((error) => {
            console.log(error)
            }) 
        // window.ethereum.request({
        //     method: 'wallet_addEthereumChain',
        //     params: [{
        //     chainId: '8998',
        //     chainName: 'Cicca Testnet',
        //     nativeCurrency: {
        //         name: 'Cicca Coin',
        //         symbol: 'CICCA',
        //         decimals: `0x${Number(8998).toString(16)}`
        //     },
        //     rpcUrls: ['https://13.48.147.139:8545'],
        //     // blockExplorerUrls: ['https://bscscan.com']
        //     }]
        //     })
        //     .catch((error) => {
        //     console.log(error)
        //     }) 
    }
  return (
    <div className='navbar'>
        <div className='logo'>
            <img src={Logo} />
            <p>
            CiccaDefi
            </p>
        </div>
        <button className='metamask' onClick={addChain}>
            <img src={Metamask} />
            Add Cicca Testnet
        </button>
    </div>
  )
}

export default Navbar
