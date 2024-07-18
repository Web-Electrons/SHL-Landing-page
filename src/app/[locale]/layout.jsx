import React from "react"
import styles from './styles.module.scss'
import { HomeNavbar } from "@/src/components/home/navigation/HomeNavbar"
import { HomeFooter } from "@/src/components/home/navigation/HomeFooter"
import { Roboto, Poppins } from 'next/font/google'
// import localFont from 'next/font/local'
import './globals.scss'
import { cn } from '@/lib/utils'
// import { Toaster } from '@/components/ui/toaster'
import { Toaster } from "@/src/components/ui/toaster"
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';


export const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '600', '700', '900'],
    variable: '--font-poppins',
    display: 'swap',
    tabluar: true,

})
export const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    variable: '--font-roboto',
    display: 'swap',
})

export const metadata = {
    title: 'ShipLink',
    description: 'Canada\'s best package forwarding service',
}

export default function RootLayout({ children, params: { locale } }) {

    const messages = getMessages({ locale });

    return (
        <main>
            <div className={styles.mains}>
                <HomeNavbar />
                {children}
                <HomeFooter />
            </div>
        </main>
    )
}
