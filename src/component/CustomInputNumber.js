"use client";

const CustomInputNumber = ({type='number', handleChange}) => {
    return (
        <input 
            type={type} className="h-10 font-bold font-quicksand bg-neutral-900 bg-opacity-0 px-2 text-[30px] focus:outline-none max-w-[250px]" 
            inputMode="decimal"
            placeholder="0.0"
            onChange={handleChange}
            
        />
    )
}

export default CustomInputNumber