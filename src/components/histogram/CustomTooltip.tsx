import { DataArray } from "@/app/page";

type CustomTooltipProps = {
  active?: boolean,
  payload?: DataArray
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-[#65FF8E] h-[24px] w-[51px] rounded-[6px] flex justify-center items-center pointer-events-none'>
        <p className='text-black font-normal text-[16px] leading-[24px]'>{payload[0].value}</p>
      </div>
    );
  }
  return null;
}

export default CustomTooltip;