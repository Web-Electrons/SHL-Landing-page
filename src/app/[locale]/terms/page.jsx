import React from 'react'
import styles from '../styles.module.scss'
export default function page() {
    return (
        <>
            <div className={styles.container}>
                <div className="flex flex-col text-center justify-start gap-[32px] pt-[90px] w-full h-max pb-10 bg-[#FFFFF]">
                    <div className="flex flex-col gap-4 justify-start text-left w-[70%] mx-auto pt-10">
                        <h1 className=" text-black text-3xl font-bold">Terms and Conditions</h1>
                        <div className="text-[#5A5A5A] text-base">
                            <p>Please read and review carefully our terms and conditions before signing up to our services</p>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>1. Acceptance of Terms</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    By signing up for Shiplink logistics services, you agree to abide by the terms and conditions outlined herein. These terms govern your use of Shiplink platform and services. If you do not agree with any of these terms, you may not use our services.
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>2. Service Description</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    Shiplink provides logistics services including but not limited to freight transportation, warehousing, and inventory management. The specifics of the services provided will be detailed in the service agreement between Shiplink and the customer.
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>3. User Account</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    To access Shiplink services, users must create an account and provide accurate and complete information. Users are responsible for maintaining the confidentiality of their account credentials and are liable for any activity that occurs under their account.
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>4. Service Fees and Payments</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    Users agree to pay all fees associated with the services provided by Shiplink as outlined in the service agreement. Payment terms will be specified in the service agreement and may include upfront fees, recurring charges, and additional fees for specific services.
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>5. Shipment Terms</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    Shiplink will transport goods in accordance with the agreed-upon terms outlined in the service agreement. Users are responsible for ensuring that shipments comply with all relevant laws and regulations, including customs requirements for international shipments.
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>6. Liability</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    Shiplink will exercise reasonable care in handling and transporting shipments but is not liable for any loss, damage, or delay caused by factors beyond its control, including but not limited to acts of nature, strikes, or governmental actions.
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>7. Insurance</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    Users may opt to purchase insurance coverage for their shipments at an additional cost. Shiplink is not liable for any loss or damage to shipments that are not covered by insurance.
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>8. Termination</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    Either party may terminate the service agreement upon written notice if the other party breaches any material provision of the agreement. Upon termination, any outstanding fees or obligations will become due and payable.
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>9. Governing Law</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    These terms and conditions shall be governed by and construed in accordance with the laws of Quebec, Canada. without regard to its conflict of law provisions.
                                </p>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>10. Amendments</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    Shiplink reserves the right to amend these terms and conditions at any time. Users will be notified of any changes, and continued use of Shiplink services constitutes acceptance of the revised terms.
                                </p>
                            </div>
                        </div>
                    </div>
                    By signing up for Shiplink logistics services, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.
                </div>
            </div>
        </>
    )
}
