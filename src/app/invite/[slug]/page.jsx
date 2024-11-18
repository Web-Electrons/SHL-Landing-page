"use client";
import { useEffect } from "react";
export default function InvitePage({ params }) {
    const { slug } = params;

    useEffect(() => {
        const targetUrl = `https://client.shiplink.ca/en/auth/signup/${slug}`;
        console.log("Redirecting to:", targetUrl); // Log URL
        window.location.href = targetUrl; // Gunakan window.location
    }, [slug]);

    return (
        <div>
            <p>Redirecting...</p>
        </div>
    );
}