const { Pathnames } = require('next-intl/navigation');

const port = process.env.PORT || 3000;
const host = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${port}`;

const defaultLocale = 'en';
const locales = ['en', 'es', 'fr'];

const pathnames = {
    '/': '/',
    '/pathnames': {
        en: '/pathnames',
        es: '/pfadnamen',
        fr: '/pathnames'
    }
};

// Untuk menggunakan default: `always`
const localePrefix = undefined;

const AppPathnames = Object.keys(pathnames);

module.exports = {
    port,
    host,
    defaultLocale,
    locales,
    pathnames,
    localePrefix,
    AppPathnames
};