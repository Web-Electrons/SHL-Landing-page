import React from 'react'
import styles from '../styles.module.scss'
import { useTranslations } from "next-intl";
export default function Terms() {
    const t = useTranslations("default.terms");
    return (
        <>
            <div className={styles.container}>
                <div className="flex flex-col text-center justify-start gap-[32px] pt-[90px] w-full h-max pb-10 bg-[#FFFFF]">
                    <div className="flex flex-col gap-4 justify-start text-left w-[70%] mx-auto pt-10">
                        <h1 className=" text-myBlue text-3xl font-bold">
                            {t('title')}
                            {/* Terms and Conditions */}
                        </h1>
                        <div className="text-[#5A5A5A] text-base">
                            <p>
                                {t('title_text')}
                            </p>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>1. {t('item1')}</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    {t('item1_text')}
                                    {/* By signing up for Shiplink logistics services, you agree to abide by the terms and conditions outlined herein. These terms govern your use of Shiplink platform and services. If you do not agree with any of these terms, you may not use our services. */}
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>2. {t('item2')}</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    {t('item2_text')}
                                    {/* Shiplink provides logistics services including but not limited to freight transportation, warehousing, and inventory management. The specifics of the services provided will be detailed in the service agreement between Shiplink and the customer. */}
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>3. {t('item3')}</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    {t('item3_text')}
                                    {/* To access Shiplink services, users must create an account and provide accurate and complete information. Users are responsible for maintaining the confidentiality of their account credentials and are liable for any activity that occurs under their account. */}
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>4. {t('item4')}</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    {t('item4_text')}
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>5. {t('item5')}</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    {t('item5_text')}
                                    {/* Shiplink will transport goods in accordance with the agreed-upon terms outlined in the service agreement. Users are responsible for ensuring that shipments comply with all relevant laws and regulations, including customs requirements for international shipments. */}
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>6. {t('item6')}</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    {t('item6_text')}
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>7. {t('item7')}</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    {t('item7_text')}
                                    {/* Users may opt to purchase insurance coverage for their shipments at an additional cost. Shiplink is not liable for any loss or damage to shipments that are not covered by insurance. */}
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>8. {t('item8')}</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    {t('item8_text')}
                                    {/* Either party may terminate the service agreement upon written notice if the other party breaches any material provision of the agreement. Upon termination, any outstanding fees or obligations will become due and payable. */}
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>9. {t('item9')}</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    {t('item9_text')}
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>10. {t('item10')}</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    {t('item10_text')}
                                    {/* Shiplink reserves the right to amend these terms and conditions at any time. Users will be notified of any changes, and continued use of Shiplink services constitutes acceptance of the revised terms. */}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 w-[90%] mx-auto">
                        {t('free_text')}
                    </div>
                    {/* By signing up for Shiplink logistics services, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. */}
                </div>
            </div>
        </>
    )
}
