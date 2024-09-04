const circleBtnStyle = (size=46) => {
    return `flex cursor-pointer select-none items-center justify-center rounded-full border relative w-[${size}px] h-[${size}px] \
                text-[#999a9c] border-gray-400 \
                hover:border-[#343434] hover:text-[#343434] \
                dark:text-gray-400 dark:hover:text-white dark:hover:border-white`
}
const siderBtnStyle = "flex w-10 h-10 cursor-pointer select-none items-center justify-center rounded-full border border-gray-400 hover:border-[#343434] dark:hover:text-white dark:hover:border-white";
const primaryBtnStyle = () => {
    return `flex cursor-pointer select-none items-center justify-center rounded-full border relative w-auto p-2.5 \
                text-[#999a9c] border-gray-400 \
                hover:border-[#343434] hover:text-[#343434] \
                dark:text-gray-400 dark:hover:text-white dark:hover:border-white`
}
module.exports = {
    circleBtnStyle,
    primaryBtnStyle,
    siderBtnStyle,
}