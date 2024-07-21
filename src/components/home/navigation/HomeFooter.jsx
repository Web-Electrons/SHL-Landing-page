import React from 'react'
import Image from 'next/image'
import { ChevronRight, Mail } from 'lucide-react'
import { useTranslations } from "next-intl";
import Fb from '../../../public/assets/home/Socials/fb.png'
import Ig from '../../../public/assets/home/Socials/ig.png'
import Xicon from '../../../public/assets/home/Socials/x.png'
import NextLink from 'next/link'
import { Link } from '@/src/navigation'
import logo from '../../../public/logo.png'

export const HomeFooter = () => {

    const t = useTranslations("default");

    return (
        <div className="conten w-[100%]">
            <div className="wrap py-11 w-[90%] mx-auto flex flex-row justify-between gap-10">
                <div className="left">
                    <div className="flex-col flex">
                        <Image
                            src={logo}
                            width={120}
                            height={120}
                            alt="shiplink Logo"
                            className=""
                            style={{ width: "120px", height: "30px" }}
                        />
                        <div className="flex mt-2  flex-row gap-[20px] justify-start">
                            <div className="address  flex flex-col gap-2">
                                <strong>ShipLink Services Inc.</strong>
                                <div className="text-base">
                                    <p>3020A route Marie-Victorin</p>
                                    <p>Unit 100</p>
                                    <p>Varrenes, QC</p>
                                    <p>J3X OJ5 Canada</p>
                                </div>
                            </div>
                            <div className=" px-3 flex flex-col gap-2">
                                <p className='text-base font-regular text-[#5A5A5A]'>{t("emsup")}</p>
                                <div className="flex flex-row gap-3 items-center">
                                    <Mail width={20} height={20} />
                                    <Link
                                        passHref
                                        href={"mailto:contact@shiplink.com"}
                                        className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                                        <div className="text-base">contact@shiplink.com</div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col py-4 gap-[16px]">
                            {/* <p className='text-base font-regular text-[#5A5A5A]'>{t("Foll")}</p>
                            <div className="flex flex-row gap-5">
                                <Image
                                    src={Fb}
                                    width={40}
                                    height={40}
                                    alt='facebook'
                                    style={{ width: '25px', height: '25px' }}
                                />
                                <Image
                                    src={Xicon}
                                    width={40}
                                    height={40}
                                    alt='facebook'
                                    style={{ width: '25px', height: '25px' }}
                                />
                                <Image
                                    src={Ig}
                                    width={40}
                                    height={40}
                                    alt='facebook'
                                    style={{ width: '25px', height: '25px' }}
                                />
                            </div> */}
                        </div>


                    </div>
                </div>

                <div className="right flex flex-col gap-3 justify-between w-[30%] md:flex-row">
                    <div className="flex flex-col gap-5">
                        <div className="item flex flex-row gap-2 items-center">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <Link passHref href={"/aboutUs"} className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                                <p>{t("abo")}</p>
                            </Link>
                        </div>
                        <div className="item flex flex-row gap-2 items-center">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <Link
                                passHref
                                href={"mailto:support@shiplink.com"}
                                className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                                <p>{t("sup")}</p>
                            </Link>
                        </div>
                        <div className="item flex flex-row gap-2 items-center">

                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <Link
                                passHref
                                href={"/#membership"}
                                className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                                <p>{t("memb")}</p>
                            </Link>
                        </div>
                        <div className="item flex flex-row gap-2 items-center">

                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <Link
                                passHref
                                href={"/shippingLabels"}
                                className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                                <p>{t("hiw")}</p>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        {/* <div className="item flex flex-row gap-2 items-center">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <p>{t("Sc")}</p>
                        </div> */}
                        <div className="item flex flex-row gap-2 items-center">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <Link
                                passHref
                                href={"/prohibited-items"}
                                className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                                <p>{t("proit")}</p>
                            </Link>
                        </div>
                        <div className="item flex flex-row gap-2 items-center">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <Link
                                passHref
                                href={"mailto:contact@shiplink.com"}
                                className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                                <p>{t("cont")}</p>
                            </Link>
                        </div>
                        {/* <div className="item flex flex-row gap-2 items-center">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <p>{t("info")}</p>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="w-full bg-[#2E2E2E] text-white py-[24px] font-regular">
                <div className="flex flex-row gap-5 justify-evenly w-[90%] mx-auto">
                    <p>
                        © 2024  ShipLink.com
                    </p>
                    <div className=" flex flex-row gap-4 font-regular ">
                        <Link passHref href={"/terms"} >
                            <p className='hover:opacity-70'>{t("Terms")}</p>
                        </Link>
                        <p> | </p>
                        <Link passHref href={"/privacy"} >
                            <p className='hover:opacity-70'>{t("priv")}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
