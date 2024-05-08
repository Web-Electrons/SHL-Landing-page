import React from 'react'
import Image from 'next/image'
import { useTranslations } from "next-intl";
import Register from '../../public/assets/home/Register.png';
import Shop from '../../public/assets/home/Shop.png';
import Pickup from '../../public/assets/home/Pickup.png';

export const CardsComponents = () => {

    const t = useTranslations("default");
    return (
        <div className="wrap flex flex-col gap-[30px] justify-between w-[100%] h-max md:flex-row">
            <div className="p-6 bg-white rounded-md shadow-md  w-[90%] ">
                <div className="flex flex-col gap-[20px]">
                    <div className="imgageContent">
                        <Image
                            width={56}
                            height={56}
                            alt='Icons'
                            src={Register}
                            style={{ width: "56px", height: "56px" }}
                        />
                    </div>

                    <div className="gap-[16px] flex flex-col ">
                        <h3 className='font-bold text-xl'>1. {t('ls1Head')}</h3>
                        <p className='text-base text-[#5A5A5A]'>{t('ls1')}</p>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-white rounded-md shadow-md   w-[90%] ">
                <div className="flex flex-col gap-[20px]">
                    <div className="imgageContent">
                        <Image
                            width={56}
                            height={56}
                            alt='Icons'
                            src={Shop}
                            style={{ width: "56px", height: "56px" }}
                        />
                    </div>

                    <div className="gap-[16px] flex flex-col ">
                        <h3 className='font-bold text-xl'>2. {t('ls2Head')}</h3>
                        <p className='text-base text-[#5A5A5A]'>{t('ls2')}</p>
                    </div>
                </div>
            </div>
            <div className="p-6 bg-white rounded-md shadow-md w-[90%]  ">
                <div className="flex flex-col gap-[20px]">
                    <div className="imgageContent">
                        <Image
                            width={56}
                            height={56}
                            alt='Icons'
                            src={Pickup}
                            style={{ width: "56px", height: "56px" }}
                        />
                    </div>

                    <div className="gap-[16px] flex flex-col ">
                        <h3 className='font-bold text-xl'>3. {t('ls3Head')}e</h3>
                        <p className='text-base text-[#5A5A5A]'>{t('ls3')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
