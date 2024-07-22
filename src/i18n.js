import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import '../locales/en/default.json';

// Can be imported from a shared config
const locales = ['en', 'fr', 'es'];

export default getRequestConfig(async ({ locale }) => {
    // Validate that the incoming `locale` parameter is valid

    try{
        const messages = (await import(`../locales/${locale}/default.json`)).default;
        const landingPage = (await import(`../locales/${locale}/landingPage.json`)).default;
        return{
            messages,
            landingPage
        }
    }catch(e){
        notFound();
    }
    // if (!locales.includes(locale)) notFound();
    // return {
    //     messages: (await import(`../locales/${locale}/default.json`)).default,
    //     landingPage: (await import(`../locales/${locale}/landingPage.json`)).default
    // };
});