import React, { use } from 'react'
import { PriceChart } from '../../component/PriceChart/PriceChart'
import { useState } from 'react'
import CustomButton from '../../component/Custombutton'
import EditLiquidity from '../../component/liquidity/EditLiquidity'
import RemoveLiquidity from '../../component/liquidity/RemoveLiquidity'
import CreatePool from '../../component/liquidity/CreatePool'

import Layout from '../../component/Layout';
import { NextPageWithLayout } from '../../types/pages';

import {ethers} from 'ethers';
import { useAccount, useWalletClient } from 'wagmi'
import {useEthersProvider, useEthersSigner} from '../../utils/ethers'
import { factoryAddress, routerAddress, token1Address, token2Address, ownerAddress} from '../../utils/contracts-config'
import { Spin } from 'antd'
import IUniswapV2Factory from '@uniswap/v2-core/build/IUniswapV2Factory.json'
import IUniswapV2Router02 from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import liquidityABI from '../../utils/abi/liquidity.json';
import tokenABI from '../../utils/abi/AjToken.json';
// 0x5CE3B05B147e94d1B59f337B1e95fe0f97070883 LP Contract address
const LiquidityPage: NextPageWithLayout = () => {
  return <Liquidity />;
};

LiquidityPage.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

const Liquidity : React.FC = () => {
    // tokenA & tokenB's Amount
    const [tokenA, setTokenA] = useState(0);
    const [tokenB, setTokenB] = useState(0);

    const [poolOpt, setPoolOpt] = useState(0);
    const [liquidity, setLiquidity] = useState(0);
    const [lpAmount, setLpAmount] = useState(0)
    const [loading, setLoading] = useState(false);
    const provider = useEthersProvider();
    const signer = useEthersSigner();
    const { address } = useAccount();
    const {data: walletClient} = useWalletClient()
    // Contract define
    const tokenContract = new ethers.Contract(token1Address, tokenABI.abi, signer)
    const factoryContract = new ethers.Contract(factoryAddress, IUniswapV2Factory.abi, signer)
    const routerContract = new ethers.Contract(routerAddress, IUniswapV2Router02.abi, signer)
    
    const getInfo = async() => {
        if(address && address != ""){
            const lpAddress = await factoryContract.getPair(token1Address, token2Address);
            const lpContract = new ethers.Contract(lpAddress, liquidityABI, signer)
            const currentLPAmount = await lpContract.balanceOf(address);
            console.log('Current LP Amount ====',ethers.utils.formatUnits(currentLPAmount, "ether"))
            setLpAmount(ethers.utils.formatUnits(currentLPAmount, "ether"))
            setPoolOpt(2)
        }else alert('Connect wallet')
    }
    const createPair = async () => {
        try {
            const lpAddress = await factoryContract.createPair(tokenA, token2Address);
            alert('Pool is created.')
        } catch (error) {
            if(error.message.search('PAIR_EXISTS') > 0)
                alert('PAIR is already exist.')
            else alert('Contract caused some errors.')
        }
    }

    const addLiquidity = async () => {
        try {
            if(address && address != ""){
                const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now
                console.log('New liquidity adding....', tokenA, tokenB, address);
                
                const my_token_amount = await tokenContract.balanceOf(address);
                console.log('my token amount ===', ethers.utils.formatUnits(my_token_amount, 'ether'))

                const approve_tx = await tokenContract.approve(routerAddress, tokenA);
                if(approve_tx)
                    await approve_tx.wait()
                console.log('approve is successed!');

                const amountToken1 = ethers.utils.parseEther(tokenA, "ether")
                const value = ethers.utils.parseEther(tokenB, "ether")
                const tx_addLiquidity = await routerContract.addLiquidityETH(token1Address, amountToken1, 0 , 0 , address, deadline, {value: value})//when first addLiquidity add argument {, {value : "1"}}
                if (tx_addLiquidity)
                await tx_addLiquidity.wait()
                
                const pairAddress = await factoryContract.getPair(token1Address, token2Address)
                const contractLiquidity = new ethers.Contract(pairAddress, liquidityABI, provider)
                console.error('New liquidity :', provider);
                const totalLiq = await contractLiquidity.balanceOf(address)
                // setTotalLiquidity(ethers.utils.formatUnits(totalLiq, 'ether'))
                console.log('totalLiquidity is loaded : ' + ethers.utils.formatUnits(totalLiq, 'ether'))
            }else {
                alert("connet wallet!")
            }
        } catch (error) {
            // errorMsg('Error', 'Contract caused some errors.')
            alert('Contract caused some errors.')
        }
    }

    const removeLiquidity = async () => {
        if(address && address != ""){
            setLoading(true)
            const factoryCont = new ethers.Contract(factoryAddress, IUniswapV2Factory.abi, signer)
            console.log('factoryCont =============', factoryCont)
            const lpAddress = await factoryCont.getPair(token1Address, token2Address)
            console.log('lpAddress =============', lpAddress)
            const lpContract = new ethers.Contract(lpAddress, liquidityABI, signer)
            const amountLP = ethers.utils.parseEther(liquidity, 'ether')
            const approve_tx = await lpContract.approve(routerAddress, amountLP)
            if(approve_tx)
                await approve_tx.wait()
            const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now
            const remove_tx = await routerContract.removeLiquidityETH(token1Address, amountLP, 0, 0, address, deadline)
            await remove_tx.wait();
            setLoading(false)
        } else alert("Connect Wallet!")
    }
    
    return <div className='flex w-full shrink-0 items-center py-10 flex-col gap-y-5'>
        <div className='flex items-start'>
            <div className='text-white font-inter text-[32px] font-bold'>Liquidity</div>
        </div>
        <div className='flex gap-x-5 px-5 w-full'>
            <div id="graph" className='bg-neutral-800 w-full rounded-xl max-h-[500px]'>
                {/* <PriceChart /> */}
            </div>
            
                <div id="input_pad" className='group min-w-[470px] border-opacity-30 border border-neutral-400 p-3 rounded-[20px] justify-start items-start flex flex-col'>
                    <div className='flex pt-3 pb-6 gap-x-5 pl-5'>
                        <div className={`font-bold text-[18px] font-quicksand ${poolOpt == 0 ? 'text-neutral-300': 'text-neutral-500'} cursor-pointer`} onClick={() => setPoolOpt(0)}>
                            Create
                        </div>
                        <div className={`font-bold text-[18px] font-quicksand ${poolOpt == 1 ? 'text-neutral-300': 'text-neutral-500'} cursor-pointer`} onClick={() => setPoolOpt(1)}>
                            Add
                        </div>
                        <div className={`font-bold text-[18px] font-quicksand ${poolOpt == 2 ? 'text-neutral-300': 'text-neutral-500'} cursor-pointer`} onClick={() => getInfo()}>
                            Remove
                        </div>
                    </div>
                    { poolOpt == 0 ? <CreatePool selectTokenA={e => setTokenA(e.target.value)} selectTokenB={e => setTokenB(e.target.value)}/> 
                    : poolOpt == 1 ?
                    <EditLiquidity handleChangeTokenA={e => setTokenA(e.target.value)} handleChangeTokenB={e=> setTokenB(e.target.value)} /> :
                    <RemoveLiquidity handleChangeLiquidity={e => setLiquidity(e.target.value)} lpAmount={lpAmount}/>
                    }
                    { poolOpt == 0 ?
                        <div className='flex gap-x-5 py-5 w-full justify-center' onClick={() => createPair()}>
                            <CustomButton title='Create Pool' style='rounded-xl'/>
                        </div> : poolOpt == 1 ?
                        <div className='flex gap-x-5 py-5 w-full justify-center' onClick={() => addLiquidity()}>
                            <CustomButton title='Add Liquidity' style='rounded-xl'/>
                        </div>
                        :
                        <div className='flex gap-x-5 justify-center py-5 w-full' onClick={() => removeLiquidity()}>
                            <CustomButton title='Remove Liquidity' style='rounded-xl'/>
                        </div>
                    }
                </div>
            
        </div>
    </div>
}

export default LiquidityPage