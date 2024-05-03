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
    return (
        <html lang={locale}>
            {/* <meta httpEquiv="Content-Security-Policy" content="script-src 'self' 'unsafe-eval' 'unsafe-inline';" /> */}
            <body
                className={cn(
                    "min-h-screen font-sans antialiased",
                    roboto.variable
                )}
            >
                <main>
                    <div className={styles.mains}>
                        <HomeNavbar />
                        {children}
                        <HomeFooter />
                    </div>
                </main>
                <Toaster />
            </body>
        </html>
    )
}
