import React from 'react'
import Image from 'next/image'
import { useTranslations } from "next-intl";
import List1 from '../../public/assets/home/list1.png';
import List2 from '../../public/assets/home/list2.png';
import List3 from '../../public/assets/home/list3.png';
import List4 from '../../public/assets/home/list4.png';

export const ListCardComponents = () => {
    const t = useTranslations("default");

    return (
        <div className="flex flex-col gap-4 justify-between">
            <div className="shadow flex flex-row items-center gap-[20px] px-[20px] py-[20px] bg-white rounded">
                <Image
                    src={List1}
                    width={50}
                    height={50}
                    alt='icon'
                    style={{ width: "56px", height: "56px" }}
                />

                <div className="flex flex-col gap-2">
                    <h3 className='text-xl font-bold text-black'>1. {t('works1')}</h3>
                    <p className='font-extralight text-base text-[#5A5A5A]'>Lorem ipsum dolor sit amet consectetur. Ultrices pulvinar sed purus sit. </p>
                </div>
            </div>
            <div className="shadow flex flex-row items-center gap-[20px] px-[20px] py-[20px] bg-white rounded">
                <Image
                    src={List2}
                    width={50}
                    height={50}
                    alt='icon'
                    style={{ width: "56px", height: "56px" }}
                />

                <div className="flex flex-col gap-2">
                    <h3 className='text-xl font-bold text-black'>2. {t('works2')}</h3>
                    <p className='font-extralight text-base text-[#5A5A5A]'>Lorem ipsum dolor sit amet consectetur. Ultrices pulvinar sed purus sit. </p>
                </div>
            </div>
            <div className="shadow flex flex-row items-center gap-[20px] px-[20px] py-[20px] bg-white rounded">
                <Image
                    src={List3}
                    width={50}
                    height={50}
                    alt='icon'
                    style={{ width: "56px", height: "56px" }}
                />

                <div className="flex flex-col gap-2">
                    <h3 className='text-xl font-bold text-black'>3. {t('works3')}</h3>
                    <p className='font-extralight text-base text-[#5A5A5A]'>Lorem ipsum dolor sit amet consectetur. Ultrices pulvinar sed purus sit. </p>
                </div>
            </div>
            <div className="shadow flex flex-row items-center gap-[20px] px-[20px] py-[20px] bg-white rounded">
                <Image
                    src={List4}
                    width={50}
                    height={50}
                    alt='icon'
                    style={{ width: "56px", height: "56px" }}
                />

                <div className="flex flex-col gap-2">
                    <h3 className='text-xl font-bold text-black'>4. {t('works4')}</h3>
                    <p className='font-extralight text-base text-[#5A5A5A]'>Lorem ipsum dolor sit amet consectetur. Ultrices pulvinar sed purus sit. </p>
                </div>
            </div>

        </div>

    )
}
