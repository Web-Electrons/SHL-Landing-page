
import React from 'react'
import styles from '../../styles.module.scss'
import { useTranslations } from "next-intl";
export default function Home() {
    const t = useTranslations("default.Shoping");
    return (
        <>
            <div className={styles.container}>
                <div className="flex flex-col text-center justify-start gap-[32px] pt-[90px] w-full bg-[#FFFFF] py-10">
                    <div className="flex flex-col gap-5 justify-center text-center  w-[90%] mx-auto pt-10 h-[60vh]">
                        <h1 className=" text-myBlue text-3xl font-bold">
                            {t('header')}
                            {/* Coming Soon */}
                            {/* Shipping Labels */}
                        </h1>
                        <h1 className=" text-black text-lg font-bold">
                            {t('sub_header')}
                            {/* This page will be available soon */}
                        </h1>
                    </div>
                </div>
            </div>
        </>
    )
}
