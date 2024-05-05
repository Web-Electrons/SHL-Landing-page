import React from 'react'
import Image from 'next/image'
import { useTranslations } from "next-intl";
export const WhyCardsComponents = () => {
    const t = useTranslations("default");
    return (
        <div className="flex flex-row justify-center gap-10 flex-wrap">
            <div className="flex flex-row justify-center items-center gap-[16px] p-[20px] w-[450px] rounded bg-white/5 ">
                <div className="left w-[100px]">
                    <Image
                        src={'/assets/home/web.png'}
                        height={70}
                        width={70}
                        alt='web'
                        style={{ width: "60px", height: "60px" }}
                    />
                </div>
                <div className="right text-white w-full flex flex-col gap-4">
                    <p className='text-lg font-bold'>
                        {t('why1')}
                    </p>

                    <p className='font-extralight text-base'>
                        {t('why1-params')}
                    </p>
                </div>
            </div>

            <div className="flex flex-row justify-center items-center gap-[16px] p-[20px] w-[450px] rounded bg-white/5 ">
                <div className="left w-[100px]">
                    <Image
                        src={'/assets/home/icon1.png'}
                        height={70}
                        width={70}
                        alt='web'
                        style={{ width: "60px", height: "60px" }}
                    />
                </div>
                <div className="right text-white w-full flex flex-col gap-4">
                    <p className='text-lg font-bold'>
                        {t('why2')}
                    </p>

                    <p className='font-extralight text-base'>
                        {t('why2-params')}

                    </p>
                </div>
            </div>

            <div className="flex flex-row justify-center items-center gap-[16px] p-[20px] w-[450px] rounded bg-white/5 ">
                <div className="left w-[100px]">
                    <Image
                        src={'/assets/home/icon2.png'}
                        height={70}
                        width={70}
                        alt='web'
                        style={{ width: "60px", height: "60px" }}
                    />
                </div>
                <div className="right text-white w-full flex flex-col gap-4">
                    <p className='text-lg font-bold'>
                        {t('why3')}
                    </p>

                    <p className='font-extralight text-base'>
                        {t('why3-params')}
                    </p>
                </div>
            </div>

            <div className="flex flex-row justify-center items-center gap-[16px] p-[20px] w-[450px] rounded bg-white/5 ">
                <div className="left w-[100px]">
                    <Image
                        src={'/assets/home/icon3.png'}
                        height={70}
                        width={70}
                        alt='web'
                        style={{ width: "60px", height: "60px" }}
                    />
                </div>
                <div className="right text-white w-full flex flex-col gap-4">
                    <p className='text-lg font-bold'>
                        {t('why4')}
                    </p>

                    <p className='font-extralight text-base'>
                        {t('why4-params')}
                    </p>
                </div>
            </div>

            <div className="flex flex-row justify-center items-center gap-[16px] p-[20px] w-[450px] rounded bg-white/5 ">
                <div className="left w-[100px]">
                    <Image
                        src={'/assets/home/icon4.png'}
                        height={70}
                        width={70}
                        alt='web'
                        style={{ width: "60px", height: "60px" }}
                    />
                </div>
                <div className="right text-white w-full flex flex-col gap-4">
                    <p className='text-lg font-bold'>
                        {t('why5')}
                    </p>

                    <p className='font-extralight text-base'>
                        {t('why5-params')}
                    </p>
                </div>
            </div>

            <div className="flex flex-row justify-center items-center gap-[16px] p-[20px] w-[450px] rounded bg-white/5 ">
                <div className="left w-[100px]">
                    <Image
                        src={'/assets/home/icon5.png'}
                        height={70}
                        width={70}
                        alt='web'
                        style={{ width: "60px", height: "60px" }}
                    />
                </div>
                <div className="right text-white w-full flex flex-col gap-4">
                    <p className='text-lg font-bold'>
                        {t('why6')}
                    </p>

                    <p className='font-extralight text-base'>
                        {t('why6-params')}
                    </p>
                </div>
            </div>

        </div>
    )
}
