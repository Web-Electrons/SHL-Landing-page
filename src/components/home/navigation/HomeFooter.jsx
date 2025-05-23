import React from 'react'
import Image from 'next/image'
import { ChevronRight, Mail } from 'lucide-react'
import { useTranslations } from "next-intl";
import Fb from '../../../public/assets/home/Socials/fb.png'
import Ig from '../../../public/assets/home/Socials/ig.png'
import Xicon from '../../../public/assets/home/Socials/x.png'
import NextLink from 'next/link'
import { Link } from '@/navigation'
import logo from '../../../public/logo.png'

export const HomeFooter = () => {

    const t = useTranslations("default");

    return (
        <div className="conten w-[100%]">
            <div className="wrap py-10 w-[90%]  mx-auto flex flex-row justify-between items-center  gap-10 flex-wrap">
                <div className="left ml-[2px]">
                    <div className="flex-col flex">
                        <Image
                            src={logo}
                            width={120}
                            height={120}
                            alt="shiplink Logo"
                            className=""
                            style={{ width: "120px", height: "30px" }}
                        />
                        <div className="flex mt-2 flex-row gap-[30px] flex-wrap items-end sm:justify-center md:justify-center">
                            <div className="address flex flex-col gap-2 text-sm">
                                <strong>ShipLink Services Inc.</strong>
                                <div className="text-sm">
                                    <p className='text-sm font-regular text-[#5A5A5A]'>{t("emsup")}</p>
                                    <div className=" flex flex-col ">
                                        <div className="flex flex-row gap-3 items-center">
                                            <Mail width={15} height={15} />
                                            <Link
                                                passHref
                                                href={"mailto:contact@shiplink.com"}
                                                className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                                                <div className="text-sm">contact@shiplink.com</div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right flex flex-col gap-5 justify-end w-[40%] md:flex-row">
                    <div className="flex flex-col gap-5 text-sm">
                        <div className="item flex flex-row gap-2 items-center w-[100px]">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <Link
                                id='footer_aboutUs'
                                passHref href={"/aboutUs"} className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                                <p>{t("abo")}</p>
                            </Link>
                        </div>

                        <div className="item flex flex-row gap-2 items-center w-[200px]">

                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <Link
                                passHref
                                id='footer_membership'
                                href={"/#membership"}
                                className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                                <p>{t("memb")}</p>
                            </Link>
                        </div>
                        <div className="item flex flex-row gap-2 items-center w-[200px]">

                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <Link
                                id='footer_shopping'
                                passHref
                                href={"/blog/shopping_ideas"}
                                className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                                <p>{t("footer.Shoping_ideas")}</p>
                            </Link>
                            {/* <Link
                                passHref
                                href={"/shippingLabels"}
                                className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                                <p>{t("hiw")}</p>
                            </Link> */}
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 text-sm">
                        {/* <div className="item flex flex-row gap-2 items-center w-[200px]">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <p>{t("Sc")}</p>
                        </div> */}
                        <div className="item flex flex-row gap-2 items-center w-[200px]">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <Link
                                id='footer_prohibited'
                                passHref
                                href={"/prohibited-items"}
                                className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                                <p>{t("proit")}</p>
                            </Link>
                        </div>

                        <div className="item flex flex-row gap-2 items-center w-[200px] text-sm">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <Link
                                id='footer_mailbox'
                                passHref
                                href={"/#cross-border"}
                                className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                                <p>{t("footer.Virtual_mailbox")}</p>
                            </Link>

                        </div>
                        <div className="item flex flex-row gap-2 items-center w-[200px] text-sm">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <Link
                                id='footer_shipment'
                                passHref
                                href={"/shippingLabels"}
                                className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                                <p>{t("footer.shipment_label")}</p>
                            </Link>

                        </div>
                        <div className="item flex flex-row gap-2 items-center w-[200px] text-sm">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <Link
                                id='footer_shipping_calculator'
                                passHref
                                href={"/shipping_calculator"}
                                className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                                <p>{t("footer.shipping_calculator")}</p>
                            </Link>
                        </div>
                        {/* <div className="item flex flex-row gap-2 items-center w-[200px]">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <p>{t("info")}</p>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="w-full bg-[#2E2E2E] text-white py-[24px] font-regular">
                <div className="flex flex-row gap-5 justify-evenly w-[90%] mx-auto text-sm flex-wrap">
                    <p>
                        © 2024  ShipLink.com
                    </p>
                    <div className=" flex flex-row gap-4 font-regular flex-wrap">
                        <Link
                            id='footer_terms'
                            passHref href={"/terms"} >
                            <p className='hover:opacity-70'>{t("Terms")}</p>
                        </Link>
                        <p> | </p>
                        <Link
                        id='footer_privacy'
                        passHref href={"/privacy"} >
                            <p className='hover:opacity-70'>{t("priv")}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
