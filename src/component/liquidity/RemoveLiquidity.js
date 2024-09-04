"use client";
import CustomInputNumber from '../../component/CustomInputNumber'
import { AddOutlined, KeyboardArrowDownOutlined } from '@mui/icons-material'

const RemoveLiquidity = ({handleChangeLiquidity, lpAmount}) => {
    return (
        <>
            <div className="bg-neutral-950 flex flex-col p-[6px] rounded-[20px] gap-y-2 group relative m-auto w-full">
                <div className="bg-neutral-900 bg-opacity-55 px-3 py-6 rounded-[15px] flex flex-col">
                    <div className="flex flex-col gap-y-1 text-neutral-400 font-bold">
                        <div> LP Amount : {lpAmount}</div>
                        <span className="">Liquidity</span>
                        <div className="flex">
                            <input 
                                type='text' className="h-10 font-bold font-quicksand bg-neutral-900 bg-opacity-0 px-2 text-[30px] focus:outline-none w-full" 
                                inputMode="decimal"
                                placeholder="0.0"
                                onChange={handleChangeLiquidity}
                            />
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default RemoveLiquidity;