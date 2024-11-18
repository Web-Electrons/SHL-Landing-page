// app/[slug]/page.js
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }) {
    // const baseRedirect = process.env.NEXT_PUBLIC_SIGNUP_URL;
    const baseRedirect = 'https://client.shiplink.ca/es/auth/signup';

    const { slug } = params;

    // Redirect server-side
    redirect(`https://client.shiplink.ca/en/auth/signup/${slug}`);
}

export default function InvitePage() {
    return null; // Halaman tidak akan terlihat karena redirect
}