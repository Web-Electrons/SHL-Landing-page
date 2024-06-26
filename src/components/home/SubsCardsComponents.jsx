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

export const SubsCardsComponents = () => {
    
    const t = useTranslations("default");

    return (
        <>

            <div className="flex flex-row gap-10 w-full h-full flex-wrap  justify-center">
                <div className="p-4 bg-white rounded-md shadow-2xl border flex-col justify-between items-center inline-flex">
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
                    <Button variant="destructive" className='w-[100%] mt-6 py-[10px] px-5'>
                    {t("Subscribe")}
                    </Button>
                </div>
                <div className="p-4 bg-white rounded-md shadow-2xl border flex-col justify-between items-center inline-flex">
                    <SubsMenu
                        month={"/month"}
                        title={t("Premium")}
                        price={"$9.99"}
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
                    </SubsMenu>
                    <Button variant="destructive" className='w-[100%] mt-6 py-[10px] px-5'>
                    {t("Subscribe")}
                    </Button>
                </div>
                <div className="p-4 bg-white rounded-md shadow-2xl border flex-col justify-between items-center inline-flex">
                    <SubsMenu
                        month={"/month"}
                        title={t("business")}
                        price={"$99.99"}
                        icon={<Image
                            src={business}
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
                            title={t("PR")}
                        />
                        <CardItems
                            type={'landing'}
                            title={t("AM")}
                        />
                    </SubsMenu>
                    <Button variant="destructive" className='w-[100%] mt-6 py-[10px] px-5'>
                    {t("Subscribe")}
                    </Button>
                </div>
            </div>
        </>
    )
}
