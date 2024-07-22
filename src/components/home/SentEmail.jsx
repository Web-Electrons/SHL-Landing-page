
'use client'
import React from 'react'
import { Button } from '../ui/button'
export const SentEmail = ({ teks }) => {
    const handleSentEmail = () => {
        window.location.href = 'mailto:contact@shiplink.ca';
    }
    return (
        <Button
            variant="secondary"
            size="lg"
            onClick={() => {
                handleSentEmail()
            }}
            className="rounded text-wrap h-max px-10 mt-10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        >
            <p className="text-base text-wrap ">{teks}</p>
        </Button>
    )
}
