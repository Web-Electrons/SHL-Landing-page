import React from 'react'
import styles from '../styles.module.scss'
import { ShippingLabels } from '@/components/home/ShippingLabels'
import { useTranslations } from "next-intl";
export default function Home() {
    const t = useTranslations("default");
    return (
        <>
            <div className={styles.container}>
                <div className="flex flex-col text-center justify-start gap-[32px] pt-[90px] w-full bg-[#FFFFF] py-10">
                    <div className="flex flex-col gap-5 justify-start text-left w-[90%] mx-auto pt-10">
                        <h1 className=" text-myBlue text-3xl font-bold">
                            {t('ship.Shipping')}
                            {/* Shipping Labels */}
                        </h1>
                        <h1 className=" text-black text-lg font-bold">
                            {t('ship.Shipping_Sub')}
                            {/* How it Works */}
                        </h1>
                    </div>
                </div>
                {/* seection */}
                <div className={`py-10 gap-10 bg-white`} >
                    <ShippingLabels
                        params={t}
                    />
                </div>
            </div>
        </>
    )
}
