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
import { usePathname, useRouter } from 'next/navigation'
import logo from '../../../public/whiteLogo.png'
import { useTranslations, useLocale } from 'next-intl';

export const HomeNavbar = () => {
    const t = useLocale()
    const [selectedLang, setSelectedLang] = useState(t.toUpperCase())
    const router = useRouter()
    const pathname = usePathname();

    console.log("🚀 ~ LangSwitcher ~ locale:", t);
    const onSelectChange = (lang) => () => {
        const newSelectedLang = lang.toUpperCase();
        setSelectedLang(newSelectedLang);
        const newPath = `/${lang}/${pathname.split('/').slice(2).join('/')}`;
        router.replace(newPath)
    }


    const [showOther, setShowOther] = useState(false);
    const [isSolidBackground, setIsSolidBackground] = useState(false);
    const [open, setOpen] = useState(false)
    const login = process.env.NEXT_PUBLIC_LOGIN_URL;
    const signup = process.env.NEXT_PUBLIC_SIGNUP_URL;
    const isHomeOnly = pathname === '/' || pathname === '/en' || pathname === '/fr' || pathname === '/es'

    const isTable = useMediaQuery({ query: "(min-width: 1091px)" });

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
            {
                isTable ? (
                    <div className={`${styles.list} flex text-white flex-row gap-[30px] justify-end items-center`}>
                        <Link passHref href={'/#cross-border'} className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                            <p className={`text-base font-extralight leading-3 ${styles.listItem}`}>Shipping Addresses</p>
                        </Link>
                        <Link passHref href={"/shippingLabels"} className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                            <p className={`text-base font-extralight  leading-3 ${styles.listItem}`}>Shipping Labels</p>
                        </Link>

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
                                <p className={`text-sm text-left font-extralight leading-3 line-clamp-1`}>Shipping Addresses</p>
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

                        <div className=" w-full">
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setShowOther(!showOther)
                                }}
                                className=" text-left flex flex-row justify-between w-full"
                            >
                                <p className={`text-sm text-left font-extralight`}>{selectedLang}</p>
                                <ChevronDown
                                    width={15}
                                    height={15}
                                    className={`${showOther ? 'transform rotate-180' : ''}`}
                                />
                            </Button>
                            {
                                showOther && (

                                    <div className="bg-slate-100">

                                        <ul>
                                            <li className="px-2">
                                                <Button
                                                    variant="ghost"
                                                    onClick={onSelectChange("en")}
                                                    className=" text-left flex flex-row justify-start"
                                                >
                                                    <p className={`text-sm text-left font-extralight`}>EN</p>
                                                </Button>
                                            </li>
                                            <li className="px-2">
                                                <Button
                                                    variant="ghost"
                                                    onClick={onSelectChange("fr")}
                                                    className=" text-left flex flex-row justify-start"
                                                >
                                                    <p className={`text-sm text-left font-extralight`}>FR</p>
                                                </Button>
                                            </li>
                                            <li className="px-2">
                                                <Button
                                                    variant="ghost"
                                                    onClick={onSelectChange("es")}
                                                    className=" text-left flex flex-row justify-start"
                                                >
                                                    <p className={`text-sm text-left font-extralight`}>ES</p>
                                                </Button>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                        </div>
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
