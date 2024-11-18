// app/[slug]/page.js
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }) {
    const baseRedirect = process.env.NEXT_PUBLIC_SIGNUP_URL;
    const { slug } = params;

    // Redirect server-side
    redirect(`${baseRedirect}/${slug}`);
}

export default function InvitePage() {
    return null; // Halaman tidak akan terlihat karena redirect
}