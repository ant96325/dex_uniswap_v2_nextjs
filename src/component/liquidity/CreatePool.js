"use client";
import CustomInputNumber from '../../component/CustomInputNumber'
import { AddOutlined, KeyboardArrowDownOutlined } from '@mui/icons-material'
import { listTokenA, listTokenB } from '../../utils/tokens'

const CreatePool = ({selectTokenA, selectTokenB}) => {
    return (
        <>
            <div className="bg-neutral-950 flex flex-col p-[6px] rounded-[20px] gap-y-2 group relative m-auto w-full">
                <div className="bg-neutral-900 bg-opacity-55 px-3 py-6 rounded-[15px] flex flex-col">
                    <div className="flex flex-col gap-y-1 text-neutral-400 font-bold">
                        <div className="flex justify-center gap-x-3 items-center">
                            <span className="">TokenB</span>
                            <div className="rounded-full bg-neutral-950 flex py-3 px-2 items-center gap-x-1 cursor-pointer hover:bg-neutral-800">
                                <select 
                                    className='bg-neutral-900 bg-opacity-0 w-full focus:outline-none text-neutral-300 border-neutral-800 cursor-pointer'
                                    onChange={selectTokenA}>
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
                    <div className="rounded-xl bg-neutral-900 border-[2px] border-neutral-950 w-[30px] h-[30px] items-center flex justify-center">
                        <AddOutlined />
                    </div>
                </div>
                <div className="bg-neutral-900 bg-opacity-55 px-3 py-6 rounded-[15px] flex flex-col ">
                    <div className="flex flex-col gap-y-1 text-neutral-400 font-bold w-full">
                        <div className="flex justify-center gap-x-3 items-center">
                            <span className="">TokenA</span>
                            <div 
                                className="rounded-full py-3 bg-neutral-950 flex justify-end px-2 items-center gap-x-1 cursor-pointer hover:bg-neutral-800"
                            >
                                <img src="./img/ethereum-logo.png" className="h-[24px] bg-amber-600 bg-opacity-70 rounded-full"/>
                                <span>WETH</span>
                                <KeyboardArrowDownOutlined />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreatePool;