import React from 'react'
import Image from 'next/image'
import { useTranslations } from "next-intl";
import Register from '../../public/assets/home/Register.png';
import Shop from '../../public/assets/home/Shop.png';
import Pickup from '../../public/assets/home/Pickup.png';


export const CardCrossBorder = () => {
    
    return (
        <div className="flex flex-col gap-10 justify-center items-center w-[100%] ">
            <div className="flex flex-col justify-center gap-5 p-5 w-[80%] rounded-md shadow-lg bg-white ">
                <div className="flex flex-row gap-5 items-center ">
                    <Image
                        src={Register}
                        width={100}
                        height={100}
                        alt='Cross Border Image'
                        style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }}
                    />
                    <h4 className='font-bold text-xl text-black'>Register</h4>
                </div>
                <div className="text-[#5A5A5A]">
                    <p>Register for free and get your new shipping address to receive your purchases online.</p>
                </div>
            </div>
            <div className="flex flex-col gap-5 p-5 w-[80%] rounded-md shadow-lg bg-white ">
                <div className="flex flex-row gap-5 items-center">
                    <Image
                        src={Shop}
                        width={100}
                        height={100}
                        alt='Cross Border Image'
                        style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }}
                    />
                    <h4 className='font-bold text-xl text-black'>Shop</h4>
                </div>
                <div className="text-[#5A5A5A]">
                    <p>Shop at your favorite online store and use your new local shipping address</p>
                </div>
            </div>
            <div className="flex flex-col gap-5 p-5 w-[80%] rounded-md shadow-lg bg-white ">
                <div className="flex flex-row gap-5 items-center">
                    <Image
                        src={Pickup}
                        width={100}
                        height={100}
                        alt='Cross Border Image'
                        style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }}
                    />
                    <h4 className='font-bold text-xl text-black'> Pick up or Receive</h4>
                </div>
                <div className="text-[#5A5A5A]">
                    <p>Pick up your purchases at your ShipLink Mailbox branch or Receive them at your door via our cross-border transfer service</p>
                </div>
            </div>
        </div>
    )
}
