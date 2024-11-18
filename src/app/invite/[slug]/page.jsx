import { redirect } from 'next/navigation';

export default function InvitePage({ params }) {
    const { slug } = params;

    // Hardcode URL tujuan
    const baseRedirect = 'https://client.shiplink.ca/en/auth/signup';

    // Lakukan redirect
    redirect(`${baseRedirect}/${slug}`);

    // Komponen ini tidak akan dirender karena redirect
    return null;
}