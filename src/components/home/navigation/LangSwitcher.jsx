'use client'
import React, { useTransition, ChangeEvent, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem
} from "../../ui/dropdown-menu";
import { Button } from '../../ui/button'
import { ChevronDown } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import i18n from '@/i18n';
import { useTranslations, useLocale } from 'next-intl';
export const LangSwitcher = ({ version = "desktop" }) => {
    const t = useLocale()
    const [selectedLang, setSelectedLang] = useState(t.toUpperCase())
    const [showOther, setShowOther] = useState(false);
    const router = useRouter()
    const pathname = usePathname();

    // console.log("🚀 ~ LangSwitcher ~ locale:", t);
    const onSelectChange = (lang) => () => {
        const newSelectedLang = lang.toUpperCase();
        setSelectedLang(newSelectedLang);
        const newPath = `/${lang}/${pathname.split('/').slice(2).join('/')}`;
        router.replace(newPath)
    }

    return (
        <>

            {
                version === "desktop" ? (
                    <DropdownMenu modal={false} >
                        <DropdownMenuTrigger asChild >
                            <Button
                                variant="ghost"
                                className=" text-left flex flex-row justify-start h-[30px] gap-2"
                            >
                                <p className={`text-sm text-left font-extralight`}>{selectedLang}</p>
                                <ChevronDown
                                    width={15}
                                    height={15}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent >
                            <DropdownMenuCheckboxItem
                                checked={"EN"}
                                onCheckedChange={onSelectChange("en")}
                                className="text-center w-full "
                            >
                                English
                            </DropdownMenuCheckboxItem >
                            <DropdownMenuCheckboxItem
                                checked={"FR"}
                                onCheckedChange={onSelectChange("fr")}
                                className="text-center w-full "
                            >
                                Français
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={"ES"}
                                onCheckedChange={onSelectChange("es")}
                                className="text-center w-full "
                            >
                                Español
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : version === "mobile" ? (
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
                ) : null
            }

        </>
    )
}
