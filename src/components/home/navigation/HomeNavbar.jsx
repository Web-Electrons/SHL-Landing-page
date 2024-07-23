'use client'
import { Button } from '../../ui/button'
import React, { useEffect, useState } from 'react'
import { Link } from '@/src/navigation'
import NextLink from 'next/link'
import styles from './styles.module.scss'
import { Menu } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../ui/sheet"
import { useMediaQuery } from 'react-responsive'
import { ChevronDown } from 'lucide-react'
// import { useSession, signOut } from 'next-auth/react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { LangSwitcher } from './LangSwitcher'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import logo from '../../../public/whiteLogo.png'

export const HomeNavbar = () => {
    const [isSolidBackground, setIsSolidBackground] = useState(false);
    const [open, setOpen] = useState(false)
    // const { data: session } = useSession()
    const login = process.env.NEXT_PUBLIC_LOGIN_URL;
    console.log("🚀 ~ HomeNavbar ~ login:", login)
    const signup = process.env.NEXT_PUBLIC_SIGNUP_URL;

    const pathname = usePathname()
    console.log("🚀 ~ HomeNavbar ~ pathname:", pathname)
    const isHomeOnly = pathname === '/' || pathname === '/en' || pathname === '/fr' || pathname === '/es'
    console.log("🚀 ~ HomeNavbar ~ isHomeOnly:", isHomeOnly)
    const isTable = useMediaQuery({ query: "(min-width: 1091px)" });
    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollPosition = window.scrollY;
    //         setIsSolidBackground(scrollPosition > 0);
    //     };
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsSolidBackground(scrollPosition > 0);
        };
        if (isHomeOnly) {
            window.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (isHomeOnly) {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, [isHomeOnly]);

    return (
        <div className={`w-full flex flex-row px-10 h-[70px] justify-between items-center transition-colors delay-300 duration-300 ease-in-out z-50
            ${isSolidBackground && isHomeOnly ? 'bg-gradient-to-r from-red-700 to-red-800' : isHomeOnly ? 'bg-gradient-to-r from-red-700 to-transparent' : 'bg-gradient-to-r from-red-700 to-red-800'} 
            fixed
        `}>
            <div className="">
                <NextLink passHref href={'/'} className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                    <div className=" w-max h-max mx-auto ">
                        <Image
                            src={logo}
                            width={120}
                            height={120}
                            alt="shiplink Logo"
                            className="mx-auto"
                            style={{ width: "120px", height: "30px" }}
                        />
                    </div>
                    {/* <div className="">
                        <p className='text-2xl font-bold text-white'>ShipLink</p>
                    </div> */}
                </NextLink>
            </div>
            {
                isTable ? (
                    <div className={`${styles.list} flex text-white flex-row gap-[30px] justify-end items-center`}>
                        <Link passHref href={'/#cross-border'} className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                            <p className={`text-base font-extralight leading-3 ${styles.listItem}`}>Free Mailboxes</p>
                        </Link>
                        <Link passHref href={"/shippingLabels"} className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                            <p className={`text-base font-extralight  leading-3 ${styles.listItem}`}>Shipping Labels</p>
                        </Link>
                        {/* <p className={`text-base font-extralight  leading-3 ${styles.listItem}`}>Shipping Supplies</p> */}
                        <Link passHref href={"/aboutUs"} className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                            <p className={`text-base font-extralight  leading-3 ${styles.listItem}`}>About Us</p>
                        </Link>

                        <LangSwitcher />
                        <div className="flex flex-row gap-[24px]">
                            <NextLink passHref href={`${signup}`} >
                                <Button
                                    variant='outline'
                                    className="w-[126px] text-white bg-transparent border border-white"
                                >
                                    <p className='text-base'>Sign Up</p>
                                </Button>
                            </NextLink>

                            <NextLink passHref href={`${login}`} >
                                <Button
                                    variant='destructive'
                                    className="w-[126px]"
                                >
                                    <p className='text-base'>Login</p>
                                </Button>
                            </NextLink>
                        </div>
                    </div>
                ) : (
                    <div className={`${styles.menu}`}>
                        <Button
                            variant="outline"
                            className="bg-none"
                            size="sm"
                            onClick={() => { setOpen(true) }}
                        >
                            <Menu width={15} height={15} />
                        </Button>
                    </div>
                )
            }
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent>
                    <div className={`flex text-black flex-col gap-[10px] justify-start items-start w-full`}>
                        <Link href={'/#cross-border'} className='cursor-pointer hover:opacity-70 w-full' passHref>
                            <Button
                                variant="ghost"
                                className="w-full text-left justify-start"
                            >
                                <p className={`text-sm text-left font-extralight leading-3 line-clamp-1`}>Free Mailboxes</p>
                            </Button>
                        </Link>
                        <Link href={'/shippingLabels'} className='cursor-pointer hover:opacity-70 w-full' passHref>
                            <Button
                                variant="ghost"
                                className="w-full text-left justify-start"
                            >
                                <p className={`text-sm text-left font-extralight`}>Shipping Labels</p>
                            </Button>
                        </Link>

                        {/* <Link href={'#'} className='cursor-pointer hover:opacity-70 w-full' passHref>
                            <Button
                                variant="ghost"
                                className="w-full text-left justify-start"
                            >
                                <p className={`text-sm text-left font-extralight`}>Shipping Supplies</p>
                            </Button>
                        </Link> */}
                        <Link href={'/aboutUs'} className='cursor-pointer hover:opacity-70 w-full' passHref>
                            <Button
                                variant="ghost"
                                className="w-full text-left justify-start"
                            >
                                <p className={`text-sm text-left font-extralight`}>About Us</p>
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            className=" text-left flex flex-row justify-start"
                        >
                            <p className={`text-sm text-left font-extralight`}>EN</p>
                            <ChevronDown
                                width={15}
                                height={15}
                            />
                        </Button>
                        <div className="flex flex-col gap-[10px] py-5 justify-center items-center w-full">
                            {
                                <div className="flex flex-col gap-[10px] py-5 justify-center items-center w-full">
                                    <NextLink href={`${signup}`} passHref className='w-full'>
                                        <Button
                                            variant='redOutline'
                                            className="w-[100%]"
                                        >
                                            <p className='text-sm'>Sign Up</p>
                                        </Button>
                                    </NextLink>

                                    <NextLink href={`${login}`} passHref className='w-full'>
                                        <Button
                                            variant='destructive'
                                            className="w-[100%]"
                                        >
                                            <p className='text-sm'>Login</p>
                                        </Button>
                                    </NextLink>
                                </div>
                            }

                        </div>
                    </div>
                </SheetContent>
            </Sheet>

        </div>
    )
}
