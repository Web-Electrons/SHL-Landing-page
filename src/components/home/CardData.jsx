import React from 'react'
import Image from 'next/image'
import { useTranslations } from "next-intl";
import Img1 from '../../public/assets/home/about/img1.png';
import Img2 from '../../public/assets/home/about/img2.png';
import Img3 from '../../public/assets/home/about/img3.png';
import Img4 from '../../public/assets/home/about/img4.png';


export const CardData = ({
    param
}) => {



    return (
        <>
            <div className=" flex flex-row gap-10 w-full h-full flex-wrap  justify-evenly">

                <div className="flex flex-col gap-5 w-[305px] h-[100%] border-[#E7E8EC] shadow-md border rounded-md p-5">
                    <Image
                        src={Img1}
                        width={50}
                        height={50}
                        alt='icon'
                        style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }}
                    />
                    <p className='font-bold '>
                        {param('about.Other1')}
                        {/* World class business model using industry best practices */}
                    </p>
                </div>

                <div className="">
                    <div className="flex flex-col gap-5 w-[305px] h-[100%] border-[#E7E8EC] shadow-md border rounded-md p-5">
                        <Image
                            src={Img2}
                            width={50}
                            height={50}
                            alt='icon'
                            style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }}
                        />
                        <p className='font-bold '>
                            {param('about.Other2')}
                            {/* Top Rated by customer reviews */}
                        </p>
                    </div>
                </div>
                <div className="">
                    <div className="flex flex-col gap-5 w-[305px] h-[100%] border-[#E7E8EC] shadow-md border rounded-md p-5">
                        <Image
                            src={Img3}
                            width={50}
                            height={50}
                            alt='icon'
                            style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }}
                        />
                        <p className='font-bold '>
                            {param('about.Other3')}
                            {/* Established business with over 10 years of experience */}
                        </p>
                    </div>
                </div>
                <div className="">
                    <div className="flex flex-col gap-5 w-[305px] h-[100%] border-[#E7E8EC] shadow-md border rounded-md p-5">
                        <Image
                            src={Img4}
                            width={50}
                            height={50}
                            alt='icon'
                            style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }}
                        />
                        <p className='font-bold '>
                            {param('about.Other4')}
                            {/* Terminals and Service across all North America */}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
