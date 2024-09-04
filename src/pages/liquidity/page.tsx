import React from 'react'
import { PriceChart } from '../../component/PriceChart/PriceChart'
import { useState } from 'react'
import CustomButton from '../../component/Custombutton'
import EditLiquidity from '../../component/liquidity/EditLiquidity'

const Liquidity : React.FC = () => {
    const [tokenA, setTokenA] = useState(0);
    const [tokenB, setTokenB] = useState(0);
    const [createPool, setCreatePool] = useState(true);
    return <div className='flex m-auto w-full shrink-0 items-center py-10 flex-col gap-y-5'>
        <div className='flex items-start'>
            <div className='text-white font-inter text-[32px] font-bold'>Liquidity</div>
        </div>
        <div className='flex gap-x-5 px-5 w-full'>
            <div id="graph" className='bg-neutral-800 w-full rounded-xl max-h-[500px]'>
                <PriceChart />
            </div>
            <div id="input_pad" className='group min-w-[470px] border-opacity-30 border border-neutral-400 p-3 rounded-[20px] justify-start items-start flex flex-col'>
                <div className='flex pt-3 pb-6 gap-x-5 pl-5'>
                    <div className={`font-bold text-[18px] font-quicksand text-neutral-${createPool ? '300': '500'} cursor-pointer`} onClick={() => setCreatePool(true)}>
                        Add
                    </div>
                    <div className={`font-bold text-[18px] font-quicksand text-neutral-${createPool ? '500': '300'} cursor-pointer`} onClick={() => setCreatePool(false)}>Remove</div>
                </div>
                <EditLiquidity handleChangeTokenA={e=> setTokenA(e.target.value)} handleChangeTokenB={e=> setTokenB(e.target.value)} />
                { createPool ?
                    <div className='flex gap-x-5 py-5 w-full justify-center'>
                        <CustomButton title='Add Liquidity' style='rounded-xl'/>
                    </div> 
                    :
                    <div className='flex gap-x-5 justify-center py-5 w-full'>
                        <CustomButton title='Remove Liquidity' style='rounded-xl'/>
                    </div> 
                }
            </div>
        </div>
    </div>
}

export default Liquidity