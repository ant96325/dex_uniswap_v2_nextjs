import React, { useState, useEffect } from 'react'
import CustomButton from '../../component/Custombutton'
import { AddOutlined, KeyboardArrowDownOutlined } from '@mui/icons-material';

import Layout from '../../component/Layout';
import { NextPageWithLayout } from '../../types/pages';

import {ethers} from 'ethers';
import { useAccount, useWalletClient } from 'wagmi'
import {useEthersProvider, useEthersSigner} from '../../utils/ethers'
import { factoryAddress, routerAddress, token1Address, token2Address, ownerAddress} from '../../utils/contracts-config'
import IUniswapV2Factory from '@uniswap/v2-core/build/IUniswapV2Factory.json'
import IUniswapV2Router02 from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import liquidityABI from '../../utils/abi/liquidity.json';
import tokenABI from '../../utils/abi/AjToken.json';
import { useSelector } from 'react-redux';
// 0x5CE3B05B147e94d1B59f337B1e95fe0f97070883 LP Contract address
const WalletInfoPage: NextPageWithLayout = () => {
  return <WalletInfo />;
};

WalletInfoPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

const WalletInfo : React.FC = () => {
    const data1 = useSelector((state) => state.blockchain.value)

    // tokenA & tokenB's Amount
    const [info, setInfo] = useState({
        token_balance: 0,
        balance: 0
    })

    const clearInfo = () => {
        setInfo({
            token_balance: 0,
            balance: 0
        })
    }   
    
    // const factoryContract = new ethers.Contract(factoryAddress, IUniswapV2Factory.abi, signer)
    // const routerContract = new ethers.Contract(routerAddress, IUniswapV2Router02.abi, signer)
    const signer = useEthersSigner();
    // const { address } = useAccount();
    const getInfo = async() => {
        if(data1.account && data1.account != ""){
            try{
                // Contract define
                const tokenContract = new ethers.Contract(token1Address, tokenABI.abi, signer)
                const token_balance = await tokenContract.balanceOf(data1.account);
                const balance = data1.balance;
                setInfo({
                    token_balance: ethers.utils.formatEther(token_balance, 'ether'),
                    balance: balance
                })
                // const lpAddress = await factoryContract.getPair(token1Address, token2Address);
                // const lpContract = new ethers.Contract(lpAddress, liquidityABI, signer)
                // const currentLPAmount = await lpContract.balanceOf(data1.account);
                // console.log('Current LP Amount ====',ethers.utils.formatUnits(currentLPAmount, "ether"))
            }catch (error) {
                console.log(error)
            }
        }else alert('Connect wallet')
    }

    useEffect(() => {
        getInfo()
    }, [data1])
   
    const refresh = () => {

    }

    return <div className='flex w-full shrink-0 items-center py-10 flex-col gap-y-5'>
        <div className='flex gap-x-5 px-5 w-full justify-center'>
            <div id="input_pad" className='group min-w-[470px] border-opacity-30 border border-neutral-400 p-3 rounded-[20px] justify-start items-center flex flex-col'>
                <div className='flex pt-3 pb-6 gap-x-5 pl-5'>
                    <div className={`font-bold text-[32px] font-quicksand text-neutral-300 cursor-pointer`} >
                        WalletInfo
                    </div>
                </div>
                <div className="bg-neutral-950 flex flex-col p-[6px] rounded-[20px] gap-y-2 group relative m-auto w-full">
                    <div className="bg-neutral-900 bg-opacity-55 px-3 py-6 rounded-[15px] flex flex-col">
                        <div className="flex flex-col gap-y-1 text-neutral-400 font-bold">
                            <div className="flex justify-center gap-x-3 items-center">
                                <span className="">ETH Amount:</span>
                                <div className="rounded-full bg-neutral-950 flex py-3 px-2 items-center gap-x-1 cursor-pointer hover:bg-neutral-800">
                                    {info.balance}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-400">
                        <div className="rounded-xl bg-neutral-900 border-[2px] border-neutral-950 w-[30px] h-[30px] items-center flex justify-center">
                            <AddOutlined />
                        </div>
                    </div>
                    <div className="bg-neutral-900 bg-opacity-55 px-3 py-6 rounded-[15px] flex flex-col ">
                        <div className="flex flex-col gap-y-1 text-neutral-400 font-bold w-full">
                            <div className="flex justify-center gap-x-3 items-center">
                                <span className="">AJ Token Amount:</span>
                                <div 
                                    className="rounded-full p-3 bg-neutral-950 flex justify-end items-center gap-x-1 cursor-pointer hover:bg-neutral-800"
                                >
                                    {info.token_balance}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex gap-x-5 py-5 w-full justify-center' onClick={() => refresh()}>
                    <CustomButton title='Refresh' style='rounded-xl'/>
                </div>
            </div>
        </div>
    </div>
}

export default WalletInfoPage