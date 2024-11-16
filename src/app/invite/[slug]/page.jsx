import { redirect } from 'next/navigation';

export default function InvitePage({ params }) {
    const { slug } = params;
    const baseRedirect = process.env.NEXT_PUBLIC_SIGNUP_URL;
    // Redirect ke halaman signup
    redirect(`${baseRedirect}/${slug}`);
}