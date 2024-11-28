import React from "react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Head from 'next/head';
export const metadata = {
    title: "Shiplink - Guide",
    description: "Learn how to use Shiplink",
}
export default function RootLayout({ children, params: { locale } }) {
    return (
        <>
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </head>
            {children}
        </>
    );
}
