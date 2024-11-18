// import createMiddleware from 'next-intl/middleware';

// export default createMiddleware({
//     // A list of all locales that are supported
//     locales: ['en', 'fr', 'es'],

//     // Used when no locale matches
//     defaultLocale: 'en'
// });

// export const config = {
//     // Match only internationalized pathnames
//     matcher: ['/', '/(fr|es|en)/:path*']
// };

import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

// Middleware bawaan next-intl
const intlMiddleware = createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'fr', 'es'],

    // Used when no locale matches
    defaultLocale: 'en',
});

export default function middleware(request) {
    const { pathname } = request.nextUrl;

    // Logika tambahan untuk halaman invite/[slug]
    if (pathname.startsWith('/invite/')) {
        const slug = pathname.split('/').pop(); // Ambil slug dari path
        const redirectUrl = `https://client.shiplink.ca/en/auth/signup/${slug}`;
        return NextResponse.redirect(redirectUrl);
    }

    // Jalankan middleware next-intl untuk semua rute lainnya
    return intlMiddleware(request);
}

export const config = {
    // Gabungkan matcher dari next-intl dan tambahan rute untuk invite/[slug]
    matcher: ['/', '/(fr|es|en)/:path*', '/invite/:slug*'], // Pastikan rute invite ada di sini
};
