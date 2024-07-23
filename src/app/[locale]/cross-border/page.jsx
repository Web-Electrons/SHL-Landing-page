import React from 'react'
import styles from '../styles.module.scss'
// import { CardData } from '@/components/home/CardData'
import { CardData } from '@/src/components/home/CardData'
import { Separator } from '@/src/components/ui/separator'
import Image from 'next/image'
import { CardCrossBorder } from '@/src/components/home/CardCrossBorder'
import { Button } from '@/src/components/ui/button'
import NextLink from 'next/link'
// import { useTranslation } from 'next-i18next'
import { useTranslations } from 'next-intl'
import { CrossBorderComponents } from '@/src/components/home/CrossBorder'

export default function Home() {
    const t = useTranslations('default.mailbox')
    const signup = 'https://client.shiplink.ca/auth/signup'

    return (
        <>
            <div className={styles.container}>
                <div className="flex flex-col text-center justify-start gap-[32px] pt-[90px] w-full bg-[#FFFFF] py-20">
                    <div className="flex flex-col gap-5 justify-start text-left w-[90%] mx-auto pt-10">
                        <h1 className=" text-myBlue text-3xl font-bold">
                            {t("Title")}
                        </h1>
                        <div className="text-[#5A5A5A] text-base">
                            <p>
                                {t("tilte_string")}
                                {/* Discover the ultimate convenience with our Cross-Border Mailbox service. Receive packages and documents directly within their country of origin, saving you time and money. Your ShipLink address opens up a world of possibilities: shop online at your favorite stores, subscribe to magazines, receive important mail, and more. Enjoy all these benefits without worrying about hefty international shipping fees or brokerage surcharges on items under $800. */}
                            </p>
                        </div>

                        <div className="flex flex-col gap-5">
                            <h1 className=" text-black text-lg font-bold">
                                {t('sub_title')}
                            </h1>
                        </div>
                        <CrossBorderComponents params={t} />
                    </div>
                </div>
                {/* seection */}
                <div className={`${styles.works} py-20 gap-10 bg-gradient-to-br from-blue-50 to-white`} >
                    <div className="">
                        <h2 className="text-2xl text-black font-bold text-center">
                            {/* Start Buy and Receive with us ! */}
                            {t('Start_buy')}
                        </h2>
                        <div className="mt-10">
                            <CardCrossBorder
                                string={t}
                            />
                        </div>
                        <div className="mt-20 mx-auto text-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                            <NextLink passHref href={`${signup}`} >
                                <Button
                                    variant="destructive"
                                    size="lg"
                                    className="rounded px-20"
                                >
                                    <p className="text-base">{t("CTA")}</p>
                                </Button>
                            </NextLink>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
