"use client"
const CustomButton = ({title, style='rounded-full', disabled=false}) => {
    return <div className={`${style} py-4 px-4 bg-amber-600 bg-opacity-10 text-gray-100 cursor-pointer hover:bg-opacity-70 w-full text-center `}>
        <div className="text-amber-600 text-[18px] font-bold font-inter hover:text-gray-100">{title}</div>
    </div>
}

export default CustomButton