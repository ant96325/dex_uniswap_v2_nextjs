"use client";
import CustomInputNumber from '../../component/CustomInputNumber'
import { AddOutlined, KeyboardArrowDownOutlined } from '@mui/icons-material'

const AddLiquidity = ({handleChangeTokenA, handleChangeTokenB}) => {
    return (
        <>
            <div className="bg-neutral-950 flex flex-col p-[6px] rounded-[20px] gap-y-2 group relative m-auto">
                <div className="bg-neutral-900 bg-opacity-55 px-3 py-6 rounded-[15px] flex flex-col">
                    <div className="flex flex-col gap-y-1 text-neutral-400 font-bold">
                        <span className="">TokenA</span>
                        <div className="flex justify-between">
                            <CustomInputNumber handleChange={handleChangeTokenA} /> 
                            <div 
                                className="rounded-full bg-neutral-950 flex px-2 items-center gap-x-1 cursor-pointer hover:bg-neutral-800"
                            >
                                <span className="pl-2.5">Select Token</span>
                                <KeyboardArrowDownOutlined />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-400">
                    <div className="rounded-xl bg-neutral-900 border-[2px] border-neutral-950 w-[30px] h-[30px] items-center flex justify-center">
                        <AddOutlined />
                    </div>
                </div>
                <div className="bg-neutral-900 bg-opacity-55 px-3 py-6 rounded-[15px] flex flex-col">
                    <div className="flex flex-col gap-y-1 text-neutral-400 font-bold">
                        <span className="">TokenB</span>
                        <div className="flex">
                            <CustomInputNumber handleChange={handleChangeTokenB} />
                            <div className="rounded-full bg-neutral-950 flex px-2 items-center gap-x-1 cursor-pointer hover:bg-neutral-800">
                                <img src="./img/ethereum-logo.png" className="h-[24px] bg-amber-600 bg-opacity-70 rounded-full"/>
                                <span>Token</span>
                                <KeyboardArrowDownOutlined />                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default AddLiquidity;