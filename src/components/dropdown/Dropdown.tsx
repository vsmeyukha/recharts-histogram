import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";

import Arrow from '../../../public/arrow.svg';

const periodLabels = {
  'year': 'За последний год',
  'half_year': 'За последние 6 месяцев',
  'month': 'За последний месяц'
};

const Dropdown = ({ period, setPeriod }) => {

  return (
    <Menu>
      {({ open }) => (
        <>
                <Menu.Button
        className='
        h-[48px] 
        w-[380px] 
        border-solid 
        border-2 
        border-[#000AFF]
        rounded-[28px] 
        text-[24px] 
        leading-[30px]
        font-normal
        flex 
        justify-between
        items-center
        pl-[20px]
        pr-[16px]
        mb-[28px]
        self-end'

        onClick={() => !open}
      >
        <p>{periodLabels[period]}</p>
        <Image alt='' src={Arrow} className={`transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </Menu.Button>
      <Transition
        className='relative flex justify-end w-full'
        show={open}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="relative flex justify-end w-full">
          <Menu.Items
            className='
            flex
            flex-col
            absolute
            top-[-30px]
            w-[380px]
            text-[24px] 
            leading-[30px]
            font-normal
            border-solid
            border-2
            border-[#000AFF]
            rounded-[28px]
            bg-white
            z-10'
          >
            {period !== 'year'
              &&
              (<Menu.Item>
                <button
                  onClick={() => setPeriod('year')}
                >
                  За последний год
                </button>
              </Menu.Item>)
            }
            {period !== 'half_year'
              &&
              (<Menu.Item>
                <button
                  onClick={() => setPeriod('half_year')}
                >
                  За последние 6 месяцев
                </button>
              </Menu.Item>)
            }
            {period !== 'month'
              &&
              (<Menu.Item>
                <button
                  className={period === 'month' ? 'hidden' : ''}
                  onClick={() => setPeriod('month')}
                >
                  За последний месяц
                </button>
              </Menu.Item>)
            }
          </Menu.Items>
        </div>
      </Transition>
        </>
      )}
    </Menu>
  )
}

export default Dropdown;