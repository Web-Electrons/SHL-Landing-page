import { redirect } from 'next/navigation';

export default function InvitePage({ params }) {
    const { slug } = params;
    // Redirect pada sisi server
    redirect(`https://client.shiplink.ca/en/auth/signup/${slug}`);
}