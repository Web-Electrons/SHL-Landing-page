"use client";
import { useEffect } from "react";

export default function InvitePage({ params }) {
    // useEffect(() => {
    //     const fullUrl = window.location.href;  // Ambil seluruh URL, termasuk query string
    //     const targetUrl = `https://client.shiplink.ca/en/auth/signup${fullUrl.substring(fullUrl.indexOf('/invite'))}`;

    //     console.log("Redirecting to:", targetUrl); // Log URL
    //     window.location.href = targetUrl; // Redirect ke URL yang sudah dibangun
    // }, []);
    useEffect(() => {
        const { pathname, search } = window.location;

        // Ambil slug dari pathname
        const slug = pathname.split('/').pop(); // Ambil bagian terakhir dari path (misal 'N7M3F')

        // Gabungkan slug dan query string untuk membangun URL target
        const targetUrl = `https://client.shiplink.ca/en/auth/signup/${slug}${search}`;

        console.log("Redirecting to:", targetUrl); // Log URL
        window.location.href = targetUrl; // Redirect ke URL yang sudah dibangun
    }, []);

    return (
        <div>
        </div>
    );
}