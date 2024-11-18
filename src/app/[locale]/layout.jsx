import React from "react"
import styles from './styles.module.scss'
import { HomeNavbar } from "@/src/components/home/navigation/HomeNavbar"
import { HomeFooter } from "@/src/components/home/navigation/HomeFooter"
import { Roboto, Poppins } from 'next/font/google'
import './globals.scss'
import { cn } from '@/lib/utils'
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

// export const metadata = {
//     title: 'ShipLink',
//     description: "Worldwide best package forwarding service",
// }
// Metadata SEO
export const metadata = {
    title: 'ShipLink - Best Package Forwarding Service',
    description: "Worldwide best package forwarding service.",
    openGraph: {
        title: 'ShipLink - Best Package Forwarding Service',
        description: "ShipLink is the world's best package forwarding service, offering worldwide coverage and secure shipping.",
        url: 'https://w3.shiplink.ca/en',
        type: 'website',
        images: [
            {
                url: 'https://w3.shiplink.ca/images/shipLink_preview.png',
                width: 1200,
                height: 630,
                alt: 'ShipLink package forwarding preview',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ShipLink - Best Package Forwarding Service',
        description: "ShipLink is the world's best package forwarding service, offering worldwide coverage and secure shipping.",
        images: ['https://w3.shiplink.ca/images/shipLink_preview.png'], // Path absolut ke gambar di folder public
    },
};

export default function RootLayout({ children, params: { locale } }) {

    const messages = getMessages({ locale });

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <main
                className={cn(
                    "min-h-screen font-sans antialiased",
                    roboto.variable
                )}
            >
                <div className={styles.mains}>
                    <HomeNavbar />
                    {children}
                    <HomeFooter />
                </div>
            </main>
            <Toaster />
        </NextIntlClientProvider>
    )
}
