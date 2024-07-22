import React from 'react'
import Image from 'next/image'

import Carrier1 from '../../public/assets/home/carrier/8.png';
import Carrier2 from '../../public/assets/home/carrier/2.png';
import Carrier3 from '../../public/assets/home/carrier/3.png';
import Carrier4 from '../../public/assets/home/carrier/4.png';
import Carrier5 from '../../public/assets/home/carrier/5.png';
import Carrier6 from '../../public/assets/home/carrier/6.png';


export const CarrierList = () => {
    return (
        <>
            <div className="flex flex-row gap-10 justify-center w-full flex-wrap">
                <div className="h-[60px] flex items-center">
                    <Image
                        src={Carrier1}
                        width={200}
                        height={200}
                        alt='carrier'
                        style={{ width: "250px", height: "34px", objectFit: 'contain' }}
                    />
                </div>
                <div className="h-[60px] flex items-center">
                    <Image
                        src={Carrier2}
                        width={200}
                        height={200}
                        alt='carrier'
                        style={{ width: "251px", height: "34px", objectFit: 'contain' }}
                    />
                </div>
                <div className="h-[60px] flex items-center">
                    <Image
                        src={Carrier3}
                        width={200}
                        height={200}
                        alt='carrier'
                        style={{ width: "203px", height: "32px", objectFit: 'contain' }}
                    />
                </div>
                <div className="h-[60px] flex items-center">
                    <Image
                        src={Carrier4}
                        width={200}
                        height={200}
                        alt='carrier'
                        style={{ width: "169px", height: "56px", objectFit: 'contain' }}

                    />
                </div>
                <div className="h-[60px] flex items-center">
                    <Image
                        src={Carrier5}
                        width={200}
                        height={200}
                        alt='carrier'
                        style={{ width: "231px", height: "38px", objectFit: 'contain' }}
                    />
                </div>
                <div className="h-[60px] flex items-center">
                    <Image
                        src={Carrier6}
                        width={200}
                        height={200}
                        alt='carrier'
                        style={{ width: "55px", height: "56px", objectFit: 'contain' }}
                    />
                </div>
            </div>

        </>
    )
}
