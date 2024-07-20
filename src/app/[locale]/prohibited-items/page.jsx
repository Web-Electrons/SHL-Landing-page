import React from 'react'
import styles from '../styles.module.scss'
import Link from 'next/link'
export default function page() {
    return (
        <>
            <div className={styles.container}>
                <div className="flex flex-col text-center justify-start gap-[32px] pt-[90px] w-full h-max pb-10 bg-[#FFFFF]">
                    <div className="flex flex-row gap-9 text-left w-[80%] mx-auto pt-10 justify-start items-start flex-wrap">
                        <h1 className=" text-myBlue text-3xl pt-10 text-left font-bold">Prohibited items</h1>
                    </div>
                    <div className="flex flex-row gap-9 text-left w-[80%] mx-auto pt-10 justify-center items-start flex-wrap">
                        <div className="left flex flex-col justify-start gap-2 w-[350px]">
                            <h2 className='text-black font-bold text-2xl'>ANIMALS / PLANTS / FOOD</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <div className="w-[90%] leading-loose">
                                    <ul className='list-disc list-inside px-4'>
                                        <li className=''>Live Animals or Insects.</li>
                                        <li>
                                            Animal Carcasses
                                        </li>
                                        <li>
                                            Furs
                                        </li>
                                        <li>
                                            Live plants and plant materials
                                        </li>
                                        <li>
                                            Fungi / Mushroom / Plant Spores
                                        </li>
                                        <li>
                                            Plant Seeds
                                        </li>
                                        <li>
                                            Perishable items
                                        </li>
                                        <li>
                                            Fresh food or items that require refrigeration
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2 w-[350px]">
                            <h2 className='text-black font-bold text-2xl'>HIGH VALUE ITEMS</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <div className="w-[90%] leading-loose">
                                    <ul className='list-disc list-inside px-4'>
                                        <li>
                                            Antiques (breakable and/or fragile)
                                        </li>
                                        <li>
                                            Precious metals and stones
                                        </li>
                                        <li>
                                            Jewelry
                                        </li>
                                        <li>
                                            Bullion
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2 w-[350px]">
                            <h2 className='text-black font-bold text-2xl'>UNIDENTIFIABLE ITEMS</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <div className="w-[90%] leading-loose">
                                    Including but not limited to items listed below without manufacturer label
                                </div>
                            </div>
                            <div className="w-[90%] leading-loose">
                                <ul className='list-disc list-inside px-4'>
                                    <li>
                                        Substances or chemicals
                                    </li>
                                    <li>
                                        Liquids
                                    </li>
                                    <li>
                                        Non-prescription medications

                                    </li>
                                    <li>
                                        Vitamins or supplements
                                    </li>
                                    <li>
                                        Food items
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2 w-[350px]">
                            <h2 className='text-black font-bold text-2xl'>HAZARDOUS MATERIALS
                            </h2>

                            <div className="w-[90%] leading-loose">
                                <ul className='list-disc list-inside px-4'>
                                    <li>
                                        Asbestos
                                    </li>
                                    <li>
                                        Wastes as defined in the IATA regulation
                                    </li>
                                    <li>
                                        Garbage
                                    </li>
                                    <li>
                                        Disinterred human remains
                                    </li>
                                    <li>
                                        Corrosives
                                    </li>
                                    <li>
                                        Combustible material
                                    </li>
                                    <li>
                                        Propane Tanks
                                    </li>
                                    <li>
                                        Lithium Batteries*
                                    </li>
                                    <li>
                                        Loose Lithium Metal Batteries
                                    </li>
                                    <li>
                                        Steel Products*
                                    </li>
                                    <li>
                                        High Powered Magnets
                                    </li>
                                    <li>
                                        High Powered Magnets
                                    </li>
                                    <li>
                                        Human remains, including ashes
                                    </li>
                                    <li>
                                        Embryos
                                    </li>
                                    <li>
                                        Airbags
                                    </li>
                                    <li className='text-myBlue underline'>
                                        <Link
                                            target='_blank'
                                            href='https://www.transportation.gov/check-the-box/check-box-it-hazmat'
                                        >
                                            Learn more about hazmat here!
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="left flex flex-col justify-start gap-2 w-[350px]">
                            <h2 className='text-black font-bold text-2xl'>MONETARY ITEMS</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <div className="w-[90%] leading-loose">
                                    <ul className='list-disc list-inside px-4'>
                                        <li className=''>
                                            Cash/Currency/Credit or Debit Cards
                                        </li>
                                        <li className=''>
                                            Checks/Money Orders/Gift Cards
                                        </li>
                                        <li className=''>
                                            Bank Issued Statements/Documents/Bank Notes
                                        </li>
                                        <li className=''>
                                            Blank Magnetic / Chip cards
                                        </li>
                                        <li className=''>
                                            Lottery Tickets or any gambling devices that are prohibited by law
                                        </li>
                                        <li className=''>
                                            Government Issued Personal Identification
                                        </li>
                                        <li className=''>
                                            Laminators / Holographic Card Tape
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2 w-[350px]">
                            <h2 className='text-black font-bold text-2xl'>MILITARY ITEMS</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <div className="w-[90%] leading-loose">
                                    <ul className='list-disc list-inside px-4'>
                                        <li className=''>
                                            Mounted or non-mounted optics (scopes)
                                        </li>
                                        <li className=''>
                                            Night vision and related items
                                        </li>
                                        <li className=''>
                                            Infrared/Thermal imagers/cameras
                                        </li>
                                        <li className=''>
                                            Range finders
                                        </li>
                                        <li className=''>
                                            Law enforcement tactical gear or training apparatus
                                        </li>
                                        <li className=''>
                                            Military tactical gear or training apparatus
                                        </li>
                                        <li className=''>
                                            Training equipment
                                        </li>
                                        <li className=''>
                                            Law enforcement uniforms, IDs and badges (genuine or imitations)
                                        </li>
                                        <li className=''>
                                            Military uniforms, IDs and badges (genuine or imitations)
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2 w-[350px]">
                            <h2 className='text-black font-bold text-2xl'>WEAPONS</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <div className="w-[90%] leading-loose">
                                    <ul className='list-disc list-inside px-4'>
                                        <li className=''>
                                            Firearms, firearm parts, accessories (real or replica)
                                        </li>
                                        <li className=''>
                                            Guns, gun parts, accessories (real or replica)
                                        </li>
                                        <li className=''>
                                            Airbows / Airguns
                                        </li>
                                        <li className=''>
                                            Ammunition
                                        </li>
                                        <li className=''>
                                            Ammunition accessories
                                        </li>
                                        <li className=''>
                                            Any / all Firearm parts and accessories
                                        </li>
                                        <li className=''>
                                            Harpoons
                                        </li>
                                        <li className=''>
                                            Reloading kits and accessories
                                        </li>
                                        <li className=''>
                                            Stun Guns
                                        </li>
                                        <li className=''>
                                            Tasers
                                        </li>
                                        <li className=''>
                                            Toy Guns
                                        </li>
                                        <li className=''>
                                            Paintball Guns
                                        </li>
                                        <li className=''>
                                            Pepper Spray
                                        </li>
                                        <li className=''>
                                            Pepper Spray Launchers
                                        </li>
                                        <li className=''>
                                            Hunting Knives over 5″ in Length
                                        </li>
                                        <li className=''>
                                            Swords & Bayonets
                                        </li>
                                        <li className=''>
                                            Flick Knives / Switch Blades
                                        </li>
                                        <li className=''>
                                            Fireworks
                                        </li>
                                        <li className=''>
                                            Air Soft Guns
                                        </li>
                                        <li className=''>
                                            BB Guns
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2 w-[350px]">
                            <h2 className='text-black font-bold text-2xl'>ALCOHOL, DRUGS, AND TOBACCO PRODUCTS</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <div className="w-[90%] leading-loose">
                                    <ul className='list-disc list-inside px-4'>
                                        <li className=''>
                                            Illegal Narcotics
                                        </li>
                                        <li className=''>
                                            Prescription Drugs / Devices
                                        </li>
                                        <li className=''>
                                            Any item with “RX only” listed on the packaging
                                        </li>
                                        <li className=''>
                                            Alcohol
                                        </li>
                                        <li className=''>
                                            Electronic cigarette cartridges
                                        </li>
                                        <li className=''>
                                            CBD Oil / Products
                                        </li>
                                        <li className=''>
                                            KAVA

                                        </li>
                                        <li className=''>
                                            Kratom

                                        </li>
                                        <li className=''>
                                            Cigarettes

                                        </li>
                                        <li className=''>
                                            Lighters

                                        </li>
                                        <li className=''>
                                            Vaping Products

                                        </li>
                                        <li className=''>
                                            E-Cigarettes

                                        </li>
                                        <li className=''>
                                            E-liquids

                                        </li>
                                        <li className=''>
                                            Cigars

                                        </li>
                                        <li className=''>
                                            Chewing Tobacco

                                        </li>
                                        <li className=''>
                                            Controlled Substances

                                        </li>
                                        <li className=''>
                                            Cannabis / Cannabis Seeds

                                        </li>
                                        <li className=''>
                                            Nitrates

                                        </li>
                                        <li className=''>
                                            Drug Paraphernalia

                                        </li>
                                        <li className=''>
                                            Double Scorpio
                                        </li>
                                        <li className=''>
                                            Harpoons
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2 w-[350px]">
                            <h2 className='text-black font-bold text-2xl'>PORNOGRAPHY & SEX RELATED ITEMS</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <div className="w-[90%] leading-loose">
                                    <ul className='list-disc list-inside px-4'>
                                        <li className=''>
                                            Prohibited to most countries in the Gulf / Middle East
                                        </li>
                                        <li className=''>
                                            Curious if your country can accept these items? Please contact us
                                            at <Link
                                                className='underline font-bold text-myBlue'
                                                href={"mailto:contact@shiplink.com"}
                                            >
                                                contact@shiplink.com
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="left flex flex-col justify-start gap-2">
                            <h2 className='text-black font-bold text-2xl'>Detail on Prohibited items</h2>
                            <div className="text-[#5A5A5A] text-base">
                                <p className="w-[90%] leading-loose">
                                    Shiplink prohibits the shipment of any items that are banned by the laws, regulations, or statutes of any federal, state, or local government of any country through which the shipment may pass. Items requiring a special license for transport are also prohibited. Additionally, Shiplink prohibits items that could damage equipment, personnel, or other packages.
                                </p>
                                <ul className='list-disc list-inside px-4 my-4'>
                                    <li>Country-specific restrictions apply.</li>
                                </ul>
                                <p>
                                    The above list is not exhaustive; please check country-specific restrictions here.
                                    <br />
                                    If you have further questions, please contact customer service at
                                </p>
                                <Link
                                    className='text-myBlue underline'
                                    href={"mailto:support@shiplink.com."}>
                                    support@shiplink.com.
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
