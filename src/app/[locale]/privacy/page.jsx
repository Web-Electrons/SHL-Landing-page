import React from 'react'
import styles from '../styles.module.scss'
import { useTranslations } from 'next-intl'
export default function Privacy() {
    const t = useTranslations('default.privacy');
    const listText3 = t('list3_list').split('\n').map((item, index) => <li key={index}>{item}</li>);
    const listText4 = t('list4_list').split('\n').map((item, index) => <li key={index}>{item}</li>);
    const listText5 = t('list5_list').split('\n').map((item, index) => <li key={index}>{item}</li>);
    return (
        <>
            <div className={styles.container}>
                <div className="flex flex-col text-center justify-start gap-[32px] pt-[90px] w-full h-max pb-10 bg-[#FFFFF]">
                    <div className="flex flex-col gap-4 justify-start text-left w-[70%] mx-auto pt-10">
                        <h1 className=" text-myBlue text-3xl font-bold">{t("Privacy_title")}</h1>
                        <p className="w-[90%] leading-loose">
                            {t('Sub_title')}
                        </p>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>1. {t("list1")}</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    {t('list1_text')}
                                    {/* At SHIPLINK, we respect your privacy and are committed to protecting your personal data. This policy outlines how we handle your personal data when you visit our website, your privacy rights, and how the law protects you. */}
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>2. {t('list2')}</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <h3 className='text-black font-bold text-xl'>{t('list2_item1')}</h3>
                                <p className="w-[90%] leading-loose">
                                    {t('list2_item1_text')}
                                    {/* This Privacy Policy provides information on how SHIPLINK collects and processes your personal data through your use of our website, including any data you may provide when you contact us or purchase our services.
                                    Our website is not intended for children, and we do not knowingly collect data related to children.
                                    It is important to read this Privacy Policy together with any other privacy notices we may provide on specific occasions to understand how and why we are using your data. This policy supplements other notices and is not intended to override them.
                                     */}
                                </p>
                            </div>
                            <div className="text-[#5A5A5A] text-base">
                                <h3 className='text-black font-bold text-xl'>{t('list2_item2')}</h3>
                                <p className="w-[90%] leading-loose">
                                    {t('list2_item2_text')}
                                    {/* SHIPLINK is the controller responsible for your personal data. When we refer to “SHIPLINK,” “we,” “us,” or “our” in this policy, we are referring to SHIPLINK.
                                    We have appointed a data privacy manager to oversee questions regarding this Privacy Policy. If you have any questions or wish to exercise your legal rights, please contact the data privacy manager using the details below.
                                     */}
                                </p>
                            </div>
                            <div className="text-[#5A5A5A] text-base">
                                <h3 className='text-black font-bold text-xl'>{t('list2_item3')}</h3>
                                <div className="w-[90%] leading-loose flex flex-col">
                                    <p>ShipLink Services Inc.</p>
                                    <p>{t('list2_item3_text')}</p>
                                    <p>Email: contact@shiplink.ca</p>
                                    <p>Address: Quebec, Canada.</p>
                                    <p>Phone: +1-781-491-0874</p>
                                </div>
                            </div>
                            <div className="text-[#5A5A5A] text-base">
                                <h3 className='text-black font-bold text-xl'>{t('list2_item4')}</h3>
                                <div className="w-[90%] leading-loose flex flex-col">
                                    {t('list2_item4_text')}
                                    {/* This Privacy Policy was last updated on [insert date]. We reserve the right to update it as necessary. Any significant changes will be communicated via a pop-up notice on our website.
                                    It is crucial that the personal data we hold about you is accurate and current. Please inform us of any changes to your personal data during your relationship with us.
                                     */}
                                </div>
                            </div>
                            <div className="text-[#5A5A5A] text-base">
                                <h3 className='text-black font-bold text-xl'>{t('list2_item5')}</h3>
                                <div className="w-[90%] leading-loose flex flex-col">
                                    {t('list2_item5_text')}
                                    {/* Our website may contain links to third-party websites, plug-ins, and applications. Clicking on those links may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. We encourage you to read the privacy policies of every website you visit.
                                     */}
                                </div>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>3. {t('list3')}</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <div className="w-[90%] leading-loose">
                                    {t('list3_text')}
                                </div>
                            </div>
                            <div className="text-[#5A5A5A] text-base">
                                <div className="w-[90%] leading-loose">
                                    <ul className='list-disc list-inside px-4'>
                                        {listText3}
                                    </ul>
                                    {/* <ul className='list-disc list-inside px-4'>
                                        <li className=''>Identity Data: first name, last name, username, or similar identifier and gender.</li>
                                        <li>Contact Data: delivery address, email address, and telephone numbers.</li>
                                        <li>Financial Data: bank account and payment card details. </li>
                                        <li>Transaction Data: details about payments to and from you and other details of services you have purchased from us. </li>
                                        <li>Technical Data: IP address, login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                                        <li>Profile Data: username and password, purchases or orders made by you, your interests, preferences, feedback, and survey responses.</li>
                                        <li>Usage Data: information about how you use our website, products, and services.</li>
                                        <li>Marketing and Communications Data: your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
                                    </ul> */}
                                </div>
                            </div>
                            <div className="text-[#5A5A5A] text-base">
                                <div className="w-[90%] leading-loose">
                                    {t('list3_text_bottom')}
                                    {/* We also collect, use, and share Aggregated Data such as statistical or demographic data for any purpose. Aggregated Data may be derived from your personal data but is not considered personal data in law as this data does not directly or indirectly reveal your identity. For example, we may aggregate your Usage Data to calculate the percentage of users accessing a specific website feature. However, if we combine or connect Aggregated Data with your personal data so that it can directly or indirectly identify you, we treat the combined data as personal data in accordance with this privacy notice.
                                    <br />
                                    We do not collect any Special Categories of Personal Data about you (this includes details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, health, and genetic and biometric data). Nor do we collect any information about criminal convictions and offenses
                                     */}
                                </div>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>4. {t('list4')}</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    {t('list4_text')}
                                    {/* We use various methods to collect data from and about you, including: */}
                                </p>
                            </div>
                            <div className="text-[#5A5A5A] text-base">
                                <div className="w-[90%] leading-loose">
                                    <ul className='list-disc list-inside px-4'>
                                        {listText4}
                                        {/* <li className=''>
                                            Direct Interactions: You may provide Identity, Contact, and Financial Data by filling in forms or corresponding with us by post, phone, email, or otherwise. This includes personal data you provide when you apply for our services, create an account on our website, subscribe to our services, provide shipping information, request marketing, enter a competition, promotion or survey, or give us feedback.
                                        </li>
                                        <li className=''>
                                            Direct Interactions: You may provide Identity, Contact, and Financial Data by filling in forms or corresponding with us by post, phone, email, or otherwise. This includes personal data you provide when you apply for our services, create an account on our website, subscribe to our services, provide shipping information, request marketing, enter a competition, promotion or survey, or give us feedback.
                                        </li>
                                        <li className=''>
                                            Third Parties or Publicly Available Sources: We may receive personal data about you from various third parties and public sources, such as analytics providers (e.g., Google), advertising networks (e.g., Facebook), search information providers (e.g., Google), and providers of technical, payment, and delivery services (e.g., PayPal).
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>5. {t('list5')}</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    {t('list5_text')}
                                </p>
                            </div>
                            <div className="text-[#5A5A5A] text-base">
                                <div className="w-[90%] leading-loose">
                                    <ul className='list-disc list-inside px-4'>
                                        {listText5}
                                    </ul>
                                </div>
                            </div>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    {t('list5_text_bottom')}
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>6. {t('list6')}</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    {t('list6_text')}
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>7. {t('list7')}</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    {t('list7_text')}
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>8. {t('list8')}</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    {t('list8_text')}
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>9. {t('list9')}</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    {t('list9_text')}
                                </p>
                            </div>
                        </div>
                        {/* <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>10. Amendments</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    Shiplink reserves the right to amend these terms and conditions at any time. Users will be notified of any changes, and continued use of Shiplink services constitutes acceptance of the revised terms.
                                </p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
