'use client'
import { Button } from '../../ui/button'
import React, { useEffect, useState } from 'react'
import { Link } from '@/navigation'
import NextLink from 'next/link'
import styles from './styles.module.scss'
import { Menu } from 'lucide-react'
import {
    Sheet,
    SheetContent,
} from "../../ui/sheet"
import { LangSwitcher } from './LangSwitcher'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import logo from '../../../public/whiteLogo.png'

export const HomeNavbar = () => {
    const pathname = usePathname();
    const [isSolidBackground, setIsSolidBackground] = useState(false);
    const [open, setOpen] = useState(false)
    const login = process.env.NEXT_PUBLIC_LOGIN_URL;
    const signup = process.env.NEXT_PUBLIC_SIGNUP_URL;
    const isHomeOnly = pathname === '/' || pathname === '/en' || pathname === '/fr' || pathname === '/es'

    useEffect(() => {
        if (!isHomeOnly) return;

        const handleScroll = () => {
            setIsSolidBackground(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomeOnly]);

    return (
        <div className={`w-full flex flex-row px-10 h-[70px] justify-between items-center transition-colors delay-300 duration-300 ease-in-out z-50
            ${isSolidBackground && isHomeOnly ? 'bg-gradient-to-r from-red-700 to-red-800' : isHomeOnly ? 'bg-gradient-to-r from-red-700 to-transparent' : 'bg-gradient-to-r from-red-700 to-red-800'} 
            fixed
        `}>
            <NextLink passHref href={'/#content'} className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                <Image
                    src={logo}
                    width={120}
                    height={120}
                    alt="shiplink Logo"
                    className="mx-auto"
                    style={{ width: "120px", height: "30px" }}
                />
            </NextLink>
            {/* Desktop Navbar */}
            <div className={`${styles.list} hidden lg:flex text-white flex-row gap-[30px]  justify-between items-center`}>

                <Link id='navbar_shippingAddress' href="/#cross-border" className='cursor-pointer text-base font-extralight leading-3 hover:opacity-70 transition ease-in-out duration-300'>
                    Shipping Addresses
                </Link>
                <Link id='navbar_shippingLabels' href="/shippingLabels" className='cursor-pointer text-base font-extralight leading-3 hover:opacity-70 transition ease-in-out duration-300'>
                    Shipping Labels
                </Link>
                <Link id='navbar_aboutUs' href="/aboutUs" className='cursor-pointer text-base font-extralight leading-3 hover:opacity-70 transition ease-in-out duration-300'>
                    About Us
                </Link>
                <LangSwitcher />
                <div className="flex flex-row gap-[24px]">
                        <Button
                        asChild
                            variant='outline'
                            className="w-[126px] text-white bg-transparent border border-white"
                        >
                             <Link 
                             className='text-base'
                             id='navbar_signup' 
                             passHref 
                             href={`${signup}`} 
                             >Sign Up</Link>
                        </Button>

                        <Button
                        asChild
                            variant='destructive'
                            className="w-[126px]"
                        >
                                <Link id='navbar_login' 
                                className='text-base'
                                passHref 
                                href={`${login}`} >Login</Link>
                        </Button>
                </div>
            </div >

            {/* Mobile Navbar */}
            < div className={`${styles.menu} flex lg:hidden`}>
                <Button
                    variant="outline"
                    className="bg-none"
                    id='mobile_navbar_button'
                    size="sm"
                    onClick={() => { setOpen(true) }}
                >
                    <Menu width={15} height={15} />
                </Button>
            </div >

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent>
                    <div className={`flex text-black flex-col gap-[10px] justify-start items-start w-full`}>
                            <Button
                            asChild
                                variant="ghost"
                                onClick={() => setOpen(false)}
                                id='mobile_navbar_button_shippingAddress'
                                className="text-left justify-start cursor-pointer hover:opacity-70 w-full"
                            >
                                <Link 
                                id='mobile_navbar_shippingAddress'
                                href={'/#cross-border'} className='cursor-pointer hover:opacity-70 w-full' passHref>
                                Shipping Addresses
                                </Link>
                            </Button>
                            
                            <Button
                            asChild
                                variant="ghost"
                                onClick={() => setOpen(false)}
                                id='mobile_navbar_button_shippingLabels'
                                className="text-left justify-start cursor-pointer hover:opacity-70 w-full"
                            >
                                <Link 
                                id='mobile_navbar_shippingLabels'
                                href={'/shippingLabels'} className='cursor-pointer hover:opacity-70 w-full' passHref>
                                Shipping Labels
                                </Link>
                            </Button>
                            <Button
                            asChild
                                variant="ghost"
                                onClick={() => setOpen(false)}
                                id='mobile_navbar_button_aboutUs'
                                className="text-left justify-start cursor-pointer hover:opacity-70 w-full"
                            >
                                <Link 
                                id='mobile_navbar_aboutUs'
                                href={'/aboutUs'} className='cursor-pointer hover:opacity-70 w-full' passHref>
                                About Us 
                                </Link>
                            </Button>
                        <LangSwitcher version='mobile' />

                        <div className="flex flex-col gap-[10px] py-5 justify-center items-center w-full">
                            {
                                <div className="flex flex-col gap-[10px] py-5 justify-center items-center w-full">
                                        <Button
                                            asChild
                                            variant='redOutline'
                                            className="w-[100%]"
                                        >
                                            <Link 
                                            className='text-sm'
                                            href={`${signup}`} 
                                            >
                                            Sign Up
                                            </Link>
                                        </Button>
                                        
                                        <Button
                                            asChild
                                            variant='destructive'
                                            className="w-[100%]"
                                        >
                                            <Link 
                                            className='text-sm'
                                            href={`${login}`} 
                                            >
                                            Login
                                            </Link>
                                        </Button>
                                </div>
                            }

                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}



    // return (
    //     <div className={`w-full flex flex-row px-10 h-[70px] justify-between items-center transition-colors delay-300 duration-300 ease-in-out z-50
    //         ${isSolidBackground && isHomeOnly ? 'bg-gradient-to-r from-red-700 to-red-800' : isHomeOnly ? 'bg-gradient-to-r from-red-700 to-transparent' : 'bg-gradient-to-r from-red-700 to-red-800'} 
    //         fixed
    //     `}>
    //         {/* <NextLink passHref href={'/#content'} className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
    //                 <Image
    //                     src={logo}
    //                     width={120}
    //                     height={120}
    //                     alt="shiplink Logo"
    //                     className="mx-auto"
    //                     style={{ width: "120px", height: "30px" }}
    //                 />
    //             </NextLink> */}
    //         {
    //             isTable ? (
    //                 <div className={`${styles.list} flex text-white flex-row gap-[30px] justify-end items-center`}>

    //                     <Link href="/#cross-border" className='cursor-pointer text-base font-extralight leading-3 hover:opacity-70 transition ease-in-out duration-300'>
    //                         Shipping Addresses
    //                     </Link>
    //                     <Link href="/shippingLabels" className='cursor-pointer text-base font-extralight leading-3 hover:opacity-70 transition ease-in-out duration-300'>
    //                         Shipping Labels
    //                     </Link>
    //                     <Link href="/aboutUs" className='cursor-pointer text-base font-extralight leading-3 hover:opacity-70 transition ease-in-out duration-300'>
    //                         About Us
    //                     </Link>
    //                     <LangSwitcher />
    //                     {/* <div className="flex flex-row gap-[24px]">
    //                         <NextLink passHref href={`${signup}`} >
    //                             <Button

    //                                 variant='outline'
    //                                 className="w-[126px] text-white bg-transparent border border-white"
    //                             >
    //                                 <p className='text-base'>Sign Up</p>
    //                             </Button>
    //                         </NextLink>

    //                         <NextLink passHref href={`${login}`} >
    //                             <Button
    //                                 variant='destructive'
    //                                 className="w-[126px]"
    //                             >
    //                                 <p className='text-base'>Login</p>
    //                             </Button>
    //                         </NextLink>
    //                     </div> */}
    //                 </div>
    //             ) : (
    //                 <div className={`${styles.menu}`}>
    //                     <Button
    //                         variant="outline"
    //                         className="bg-none"
    //                         size="sm"
    //                         onClick={() => { setOpen(true) }}
    //                     >
    //                         <Menu width={15} height={15} />
    //                     </Button>
    //                 </div>
    //             )
    //         }
    //         {/* <Sheet open={open} onOpenChange={setOpen}>
    //             <SheetContent>
    //                 <div className={`flex text-black flex-col gap-[10px] justify-start items-start w-full`}>
    //                     <Link href={'/#cross-border'} className='cursor-pointer hover:opacity-70 w-full' passHref>
    //                         <Button
    //                             variant="ghost"
    //                             className="w-full text-left justify-start"
    //                         >
    //                             <p className={`text-sm text-left font-extralight leading-3 line-clamp-1`}>Shipping Addresses</p>
    //                         </Button>
    //                     </Link>
    //                     <Link href={'/shippingLabels'} className='cursor-pointer hover:opacity-70 w-full' passHref>
    //                         <Button
    //                             variant="ghost"
    //                             className="w-full text-left justify-start"
    //                         >
    //                             <p className={`text-sm text-left font-extralight`}>Shipping Labels</p>
    //                         </Button>
    //                     </Link>

    //                     <Link href={'/aboutUs'} className='cursor-pointer hover:opacity-70 w-full' passHref>
    //                         <Button
    //                             variant="ghost"
    //                             className="w-full text-left justify-start"
    //                         >
    //                             <p className={`text-sm text-left font-extralight`}>About Us</p>
    //                         </Button>
    //                     </Link>
    //                     <LangSwitcher version='mobile' />

    //                     <div className="flex flex-col gap-[10px] py-5 justify-center items-center w-full">
    //                         {
    //                             <div className="flex flex-col gap-[10px] py-5 justify-center items-center w-full">
    //                                 <NextLink href={`${signup}`} passHref className='w-full'>
    //                                     <Button
    //                                         variant='redOutline'
    //                                         className="w-[100%]"
    //                                     >
    //                                         <p className='text-sm'>Sign Up</p>
    //                                     </Button>
    //                                 </NextLink>

    //                                 <NextLink href={`${login}`} passHref className='w-full'>
    //                                     <Button
    //                                         variant='destructive'
    //                                         className="w-[100%]"
    //                                     >
    //                                         <p className='text-sm'>Login</p>
    //                                     </Button>
    //                                 </NextLink>
    //                             </div>
    //                         }

    //                     </div>
    //                 </div>
    //             </SheetContent>
    //         </Sheet> */}



    //     </div>
    // )