import { redirect } from 'next/navigation';

export default function InvitePage({ params }) {
    const { slug } = params;
    // Redirect ke halaman signup
    redirect(`https://client.shiplink.ca/auth/signup/${slug}`);
}