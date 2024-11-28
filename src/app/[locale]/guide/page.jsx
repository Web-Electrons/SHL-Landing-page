import React from 'react'
import styles from '../styles.module.scss'
import { GuideListTemplate } from './components/GuideListTemplate'
import { DescTemplate } from './components/DescTemplate'
import gettingStarted from '@/public/images/guide/gettingSStarted.png'
import singupPage from '@/public/images/guide/signup_page.png'
import mailboxImage from '@/public/images/guide/MailboxAddress.png'
import Image from 'next/image'
import { StarIcon } from 'lucide-react'
export default function Home() {
    return (
        <>
            <div className={styles.container}>
                <div className="flex flex-col text-center justify-start gap-[32px] pt-[90px] w-full bg-[#FFFFF] py-10 h-screen min-h-max">
                    <div className="flex gap-5 justify-start text-left w-[90%] mx-auto pt-10  flex-row h-screen min-h-max relative">
                        <div className=" flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 min-h-max">
                            <div className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r border-border/40 dark:border-border md:sticky md:block bg-green-50">
                                <p>List</p>
                            </div>
                            <main className='h-max lg:gap-10 lg:py-8 xl:grid '>
                                <div className="">
                                    <div className="Banner">
                                        <h1 className=" text-red-700 text-3xl font-bold">
                                            ShipLink - User Guide
                                        </h1>
                                        <p className="  text-sm text-slate-500 leading-snug py-2">
                                            Welcome to ShipLink! This guide will help you navigate and utilize the features of your ShipLink Dashboard effectively to maximize your savings and streamline your shipping experience
                                        </p>
                                    </div>


                                    <GuideListTemplate
                                        title={'Getting Started'}
                                        id={'getting-started'}
                                    >
                                        <div className="mt-3">
                                            <DescTemplate>
                                                <h1 className='text-xl font-bold text-black py-2 capitalize'>
                                                    Setting up your account
                                                </h1>

                                                Now that you’ve decided <strong className='font-bold'>ShipLink</strong> is the platform for you, it’s time
                                                to set up your account! In this section, we’ll cover the basics of
                                                setting up your account.
                                                <br />
                                                You’ll find the initial sign up option at the top right corner of the
                                                page of any <strong className='font-bold'>ShipLink</strong> web page.

                                                <Image
                                                    className='mt-3 w-[500px] h-[300px] object-contain'
                                                    src={gettingStarted}
                                                    alt="Getting Started"
                                                    width={1200}
                                                    height={1200}
                                                />

                                                <p className='py-2'>From here, you’ll enter your information and get started! </p>

                                                <Image
                                                    className='mt-3 w-[500px] object-contain '
                                                    src={singupPage}
                                                    alt="Getting Started"
                                                    width={2500}
                                                    height={2500}
                                                />

                                                <p className='py-2'>
                                                    Once you’ve signed up, you’ll be taken to your dashboard where you can get your shipping mailbox address in the Canada, and USA in the left bottom corner of the page.
                                                </p>

                                                <Image
                                                    className='mt-3 w-[500px] object-contain '
                                                    src={mailboxImage}
                                                    alt="Getting Started"
                                                    width={2500}
                                                    height={2500}
                                                />

                                                <div className="flex gap-2 items-center py-2">
                                                    <StarIcon className='w-5 h-5 text-myBlue ' />
                                                    <p className=''>
                                                        That’s it! You’re all set up and ready to start shipping with ShipLink!
                                                    </p>
                                                </div>
                                            </DescTemplate>



                                        </div>
                                    </GuideListTemplate>
                                </div>
                            </main>
                        </div>
                    </div>

                </div>
                {/* seection */}
            </div>
        </>
    )
}

