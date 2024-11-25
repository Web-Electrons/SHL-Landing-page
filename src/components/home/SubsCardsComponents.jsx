import { CardItems } from '@/src/app/[locale]/components/CardItems'
import { SubsMenu } from '@/src/app/[locale]/components/SubsMenu'
// import { SubsMenu } from '@/app/[locale]/components/SubsMenu'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import free from '../../public/assets/subscription/free.svg'
import premium from '../../public/assets/subscription/premium.svg'
import business from '../../public/assets/subscription/business.svg'
import { useTranslations } from "next-intl";
import NextLink from 'next/link'
import { SentEmail } from './SentEmail'

export const SubsCardsComponents = ({
    buttonP
}) => {

    const t = useTranslations("default");
    const signup = `${process.env.NEXT_PUBLIC_SIGNUP_URL}`;
    const handleSentEmail = () => {
        window.location.href = 'mailto:contact@shiplink.ca';
    }
    return (
        <>

            <div className="flex flex-row gap-10 w-full h-full flex-wrap  justify-center">
                <div className="p-4 bg-white rounded-md shadow-2xl border flex-col justify-between items-center inline-flex transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300">
                    <SubsMenu
                        title={t("free")}
                        price={"$0"}
                        icon={
                            <Image
                                src={free}
                                width={25}
                                height={25}
                                alt='free'
                            />}
                    >
                        <CardItems
                            type={'landing'}
                            title={t("perso")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("US")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("CA")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("SLAtSLA")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("PFS")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("Selfpick")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("cs")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("DSL")}
                        />
                    </SubsMenu>
                    <div className='w-full'>
                        <NextLink passHref href={`${process.env.NEXT_PUBLIC_SIGNUP_URL}`} >
                            <Button variant="destructive" className='w-[100%] mt-6 py-[10px] px-5'>
                                {t("Subscribe")}
                            </Button>
                        </NextLink>
                    </div>
                </div>
                <div className="p-4 bg-white rounded-md shadow-2xl border flex-col justify-between items-center inline-flex transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300">
                    <SubsMenu
                        month={"/month"}
                        title={t("business")}
                        price={"$0.00"}
                        icon={<Image
                            src={premium}
                            width={25}
                            height={25}
                            alt='free'
                        />}
                    >
                        <CardItems
                            type={'landing'}
                            title={t("perso")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("US")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("CA")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("SLAtSLA")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("PFS")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("Selfpick")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("cs")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("Lv2")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("PR")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("AM")}
                        />
                    </SubsMenu>
                    <div className='w-full'>
                        <NextLink passHref href={`${process.env.NEXT_PUBLIC_SIGNUP_URL}`} >
                            <Button variant="destructive" className='w-[100%] mt-6 py-[10px] px-5'>
                                {t("Subscribe")}
                            </Button>
                        </NextLink>
                    </div>
                </div>
                <div className="p-4 bg-white rounded-md shadow-2xl border flex-col justify-between items-center inline-flex transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300">
                    <SubsMenu
                        month={"/month"}
                        title={t("customs")}
                        price={"$-.—"}
                        icon={<Image
                            src={premium}
                            width={25}
                            height={25}
                            alt='free'
                        />}
                    >
                        <CardItems
                            type={'landing'}
                            title={t("perso")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("US")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("CA")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("SLAtSLA")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("PFS")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("Selfpick")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("cs")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("Lv3")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("custom")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("PR")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("AM")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("Special_volume")}
                        />
                    </SubsMenu>

                    <div className='w-full'>
                        <NextLink passHref href={`mailto:contact@shiplink.com`} >
                            <Button variant="destructive" className='w-[100%] mt-6 py-[10px] px-5'>
                                {t("emsup")}
                            </Button>
                        </NextLink>
                    </div>
                </div>

            </div>
            <SentEmail teks={buttonP} />

        </>
    )
}
