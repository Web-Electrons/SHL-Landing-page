'use client'
import React, { useTransition, ChangeEvent, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu'
import { Button } from '../../ui/button'
import { ChevronDown } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

export const LangSwitcher = () => {
    // const { i18n } = useTranslations()
    // const [selectedLang, setSelectedLang] = useState("")
    // console.log("🚀 ~ LangSwitcher ~ selectedLang:", selectedLang)


    // const currentLocale = i18n.language;
    const router = useRouter();
    const currentPathName = usePathname;

    const onSelectChange = (e) => {
        console.log("🚀 ~ onSelectChange ~ e:", e)
        // const newLocale = e.target.value;
        // const days = 30;
        // const date = new Date();
        // date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        // const expires = `expires=${date.toUTCString()}`;
        // document.cookie = `NEXT_LOCALE=${newLocale};${expires};path=/`;

        // if (
        //     currentLocale === i18nConfig.defaultLocale &&
        //     !i18nConfig.prefixDefault
        // ) {
        //     router.push('/' + newLocale + currentPathName);
        // } else {
        //     router.push(
        //         currentPathName.replace(`/${currentLocale}`, `/${newLocale}`)
        //     );
        // }
        // router.refresh();
    }
    return (
        <DropdownMenu modal={true}>
            <DropdownMenuTrigger asChild >
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
            </DropdownMenuTrigger>
            <DropdownMenuContent >
                <DropdownMenuItem
                    onClick={onSelectChange("EN")}
                    className="text-center w-full justify-center"
                >
                    English
                </DropdownMenuItem >
                <DropdownMenuItem
                    onClick={onSelectChange("FR")}
                    className="text-center w-full justify-center"
                >
                    Francis
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={onSelectChange("ES")}
                    className="text-center w-full justify-center"
                >
                    Espanol
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
