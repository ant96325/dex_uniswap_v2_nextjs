'use client'
import { ArrowDownwardOutlined, KeyboardArrowDownOutlined } from "@mui/icons-material";
import { use, useState } from "react";
import CustomButton from "../component/Custombutton";
import React from "react";
import { listTokenA, listTokenB } from '../utils/tokens'
import {ethers} from 'ethers';
import { useAccount, useWalletClient } from 'wagmi'
import {useEthersProvider, useEthersSigner} from '../utils/ethers'
import { factoryAddress, routerAddress, token1Address, token2Address, ownerAddress} from '../utils/contracts-config'
import IUniswapV2Factory from '@uniswap/v2-core/build/IUniswapV2Factory.json'
import IUniswapV2Router02 from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import liquidityABI from '../utils/abi/liquidity.json';
import tokenABI from '../utils/abi/AjToken.json';
const Home : React.FC = () => {

    const [tokenA, selectTokenA] = useState('')
    const [tokenB, selectTokenB] = useState(token2Address)
    const [amountA, setAmountA] = useState(0)
    const [amountB, setAmountB] = useState(0)
    const [loading, setLoading] = useState(false)
    const {address} = useAccount()
    const provider = useEthersProvider();
    const signer = useEthersSigner();
    const factoryContract = new ethers.Contract(factoryAddress, IUniswapV2Factory.abi, signer)
    const routerContract = new ethers.Contract(routerAddress, IUniswapV2Router02.abi, signer)
    const tokenContract = new ethers.Contract(token1Address, tokenABI.abi, signer)
    const swap = async() => {
        if(tokenA == '') { 
            alert("Select token!")
            return;
        }
        if(address && address != ''){
            try {
                setLoading(true)
                const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now
                const approve_tx = await tokenContract.approve(routerAddress, ethers.utils.parseEther(amountA, 'ether'));
                await approve_tx.wait()
                const swap = await routerContract.swapExactTokensForETH(ethers.utils.parseEther(amountA, 'ether'), 0, [tokenA, tokenB], address, deadline)
                await swap.wait()
                // handlePoolAmount()
                setLoading(false)
            } catch (error) {
                alert(error.message)
            }
            
        } else alert('Connect wallet.')
    }
    const handlePoolAmount = async () => {
        try{
          const factoryContract = new ethers.Contract(factoryAddress, IUniswapV2Factory.abi, signer)
          const pairAddress = await factoryContract.getPair(token1Address, token2Address)
          const tokenContract = new ethers.Contract(token1Address, IET1, provider)
          const WETHContract = new ethers.Contract(token2Address, IWETH, provider)
          const reserveIn = await tokenContract.balanceOf(pairAddress)
          const reserveOut = await WETHContract.balanceOf(pairAddress)
          setReserveIn(ethers.utils.formatUnits(reserveIn, 'ether'))
          console.log('reserveIn : ' + ethers.utils.formatUnits(reserveIn, 'ether'))
          setReserveOut(ethers.utils.formatUnits(reserveOut, 'ether'))
          console.log('reserveOut : ' + ethers.utils.formatUnits(reserveOut, 'ether'))
        }
        catch(e){
          console.log(e)
        }
      }

    return <div className="flex justify-center gap-x-10 px-40 placeholder-opacity-100 items-center pt-20 font-inter">
        <div className="min-w-80 mt-5"><img src="./img/coin.webp" className="h-80"/></div>
        <div className="flex flex-col gap-y-2 justify-center items-center">
            <div className="text-white text-[42px] max-w-[420px] font-bold text-center">
                Buy and Sell with minimal&nbsp;
                <span className="">fee.</span>
            </div>
            
            
                <div className="bg-neutral-950 flex flex-col p-[6px] rounded-[20px] gap-y-2 relative m-auto">
                    <div className="group flex flex-col gap-y-2 relative">
                        <div className="bg-neutral-900 bg-opacity-55 px-3 py-6 rounded-[15px] flex flex-col">
                            <div className="flex flex-col gap-y-1 text-neutral-400">
                                <span className="">Sell</span>
                                <div className="flex">
                                    <input className="h-10 bg-neutral-900 bg-opacity-0 px-2 text-[30px] focus:outline-none max-w-[250px]" placeholder="0.0" onChange={e=>setAmountA(e.target.value)} />
                                    
                                    <div className="rounded-full bg-neutral-950 flex px-2 items-center gap-x-1 cursor-pointer hover:bg-neutral-800">
                                        <select 
                                            className='bg-neutral-900 bg-opacity-0 w-full focus:outline-none text-neutral-300 border-neutral-800 cursor-pointer'
                                            onChange={(e) => selectTokenA(e.target.value)}>
                                            <option value="">Select tokens</option>
                                            {listTokenA.map(token => (
                                                <option value={token.address}>{token.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-400">
                            <div className="rounded-xl bg-neutral-900 border-[4px] border-neutral-950 w-[40px] h-[40px] items-center flex justify-center">
                                <ArrowDownwardOutlined />
                            </div>
                        </div>
                        <div className="bg-neutral-900 bg-opacity-55 px-3 py-6 rounded-[15px] flex flex-col">
                            <div className="flex flex-col gap-y-1 text-neutral-400 font-bold">
                                <span className="">Buy</span>
                                <div className="flex justify-between">
                                    <input className="h-10 bg-neutral-900 bg-opacity-0 px-2 text-[30px] focus:outline-none max-w-[250px]" placeholder="0.0" onChange={e=>setAmountB(e.target.value)}></input>
                                    <div 
                                        className="rounded-full bg-neutral-950 flex px-2 items-center gap-x-1 cursor-pointer hover:bg-neutral-800"
                                        onClick={()=>{console.log('sdfsd')}}
                                    >
                                        <img src="./img/ethereum-logo.png" className="h-[24px] bg-amber-600 bg-opacity-70 rounded-full"/>
                                        <span>ETH</span>
                                        <KeyboardArrowDownOutlined />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {tokenA != "" ? 
                        <div onClick={() => swap()}>
                            <CustomButton title='Swap' disabled={tokenA !="" ? false : true} style="rounded-xl"/>
                        </div> : 
                        <div className="py-4 px-4 w-full flex justify-center text-center bg-neutral-900 text-neutral-400 text-[18px] rounded-[15px]">
                            You must a Token.
                        </div>
                    }
                </div>
            
            
            <div className="text-[20px] flex flex-col text-neutral-500 justify-center items-center">
                <span>Trade your tokens with minimal fees</span> 
                <span>on Ethereum and 10 other chains.</span>
            </div>
        </div>
    </div>
}

export default Home;