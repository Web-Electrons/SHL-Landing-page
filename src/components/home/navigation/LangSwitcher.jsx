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
import i18n from '@/src/i18n';
import { useTranslations, useLocale } from 'next-intl';
export const LangSwitcher = () => {
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

    return (
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


    )
}
