import React from 'react'
import Image from 'next/image'

// import Image1 from '../../public/assets/home/labels/img1.png';
// import Image2 from '../../public/assets/home/labels/img2.png';
// import Image3 from '../../public/assets/home/labels/img3.png';
// import Image4 from '../../public/assets/home/labels/img4.png';

import icon1 from '../../public/assets/home/labels/icon/1.png';
import icon2 from '../../public/assets/home/labels/icon/2.png';
import icon3 from '../../public/assets/home/labels/icon/3.png';
import icon4 from '../../public/assets/home/labels/icon/4.png';

import shippingLabel from '../../public/assets/newRates.jpg';
import label from '../../public/assets/Lebells.jpg';
import track from '../../public/assets/tracking.jpg';
import declare from '../../public/assets/shippingLabel.jpg';

import image1 from '../../public/assets/home/image1.png';
import image2 from '../../public/assets/home/image2.png';
import image3 from '../../public/assets/home/image3.png';

export const CrossBorderComponents = ({
    params
}) => {
    return (
        <>
            <div className="container flex flex-col gap-8">
                <div className="relative flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none grid gap-2 item sm:grid-cols-2 border-[#E7E8EC] shadow-md border">
                    <div className="relative bg-clip-border rounded-xl overflow-hidden bg-white text-gray-700 shadow-lg m-0">
                        <Image
                            src={image1}
                            alt='image 1'
                            width={1000}
                            height={1000}
                            className=' object-cover w-full h-full'

                        />
                    </div>
                    <div className="p-20 px-2 sm:pr-6 sm:pl-4">
                        <p className="block antialiased font-sans text-sm leading-normal text-inherit mb-4 !font-semibold">
                            <Image
                                src={icon1}
                                alt='icon 1'
                                width={40}
                                height={40}
                            />
                        </p>
                        <p className="block antialiased tracking-normal font-bold text-xl text-black leading-snug">
                            {/* {params('ship.Ship1')} */}
                            {/* Declare Content */}
                            {params('card1')}
                        </p>
                        <p className="block antialiased text-base leading-relaxed text-inherit mb-8 font-normal ">
                            {/* Get an accurate and instant shipping quote by simply entering your package details such as weight, dimensions, and destination. Our system will provide you with a range of shipping options tailored to your needs. */}
                            {/* {params('ship.Ship1_param')} */}
                            {params('card1_text')}
                            {/* Declare the content of your package to ensure it complies with international shipping regulations. Our platform will guide you through the process, ensuring your shipment is ready for dispatch. */}
                        </p>


                    </div>
                </div>
                <div className="relative flex-col bg-clip-border rounded-xl bg-transparent text-gray-700  grid gap-2 item sm:grid-cols-2 border-[#E7E8EC] shadow-md border">
                    <div className="relative bg-clip-border rounded-xl overflow-hidden bg-white text-gray-700 shadow-lg m-0">
                        <Image
                            src={image2}
                            alt='image 1'
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="p-20 px-2 sm:pr-6 sm:pl-4">
                        <p className="block antialiased font-sans text-sm leading-normal text-inherit mb-4 !font-semibold">
                            <Image
                                src={icon2}
                                alt='icon 1'
                                width={40}
                                height={40}
                            /></p>

                        <p className="block antialiased tracking-normal font-bold text-xl text-black leading-snug ">
                            {/* {params('ship.Ship2')} */}
                            {params('card2')}
                        </p>
                        <p className="block antialiased text-base leading-relaxed text-inherit mb-8 font-normal !text-gray-500">
                            {/* Choose the service and carrier that best fits your shipping requirements from our list of trusted partners. We offer a variety of services to ensure your package reaches its destination on time and in perfect condition. */}
                            {/* {params('ship.Ship2_param')} */}
                            {params('card2_text')}
                            {/* Select the cross-border service that best suits your shipping needs. Choose from a range of trusted carriers and services to ensure your package arrives at its destination safely and on time.
                            After selecting Cross Border Service, you will be able to see the shipping rates and transit times for each carrier. You can then select the service that best suits your needs. */}
                        </p>
                    </div>
                </div>
                <div className="relative flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 grid gap-2 item sm:grid-cols-2 border-[#E7E8EC] shadow-md border">
                    <div className="relative bg-clip-border rounded-xl overflow-hidden bg-white text-gray-700 shadow-lg m-0">
                        <Image
                            src={image3}
                            alt='image 1'
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="p-20 px-2 sm:pr-6 sm:pl-4">
                        <p className="block antialiased text-sm  leading-normal text-inherit mb-4 !font-semibold">
                            <Image
                                src={icon3}
                                alt='icon 1'
                                width={40}
                                height={40}
                            /></p>

                        <p className="block antialiased tracking-normal font-bold text-xl text-black leading-snug">
                            {/* {params("ship.Ship3")} */}
                          
                            {params('card3')}
                        </p>
                        <p className="block antialiased text-base leading-relaxed text-inherit mb-8 font-normal !text-gray-500">
                            {/* After selecting your service and carrier, print your shipping label directly from our platform. Securely attach the label to your package, ensuring all information is clearly visible */}
                            {/* {params("ship.Ship3_param")} */}
                            {params('card3_text')}
                        </p>

                    </div>
                </div>
            </div>

            {/* <section className="grid min-h-screen p-8 place-items-center">
            <div className="container grid grid-cols-1 gap-8 my-auto lg:grid-cols-2">
            <div className="relative flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none grid gap-2 item sm:grid-cols-2">
            <div className="relative bg-clip-border rounded-xl overflow-hidden bg-white text-gray-700 shadow-lg m-0">
                    <Image
                        src={Image1}
                        alt='image 1'
                        
                    
                    />

                    <div classNameName="flex flex-col gap-5">
                        <Image
                            src={icon1}
                            alt='icon 1'
                            width={40}
                            height={40}
                        />
                        <div className="p-6 px-2 sm:pr-6 sm:pl-4">
                        <div classNameName="flex flex-col gap-3">
                            <p classNameName='font-bold text-xl text-black'>Get an Instant Quote</p>
                            <p classNameName='block antialiased text-base leading-relaxed text-inherit mb-8 font-normal font-[#5A5A5A] '>Lorem ipsum dolor sit amet consectetur. Massa non lectus dictumst consequat massa molestie ipsum mauris. Id arcu dolor integer et ultrices. Enim ipsum ridiculus a a. Metus adipiscing purus scelerisque tortor tempor pretium turpis rhoncus.</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

                <div classNameName="flex flex-row gap-5 bg-white border border-zinc-300 w-[90%] p-10 rounded-md">
                    <div classNameName="flex flex-col gap-5">
                        <Image
                            src={icon2}
                            alt='icon 1'
                            width={40}
                            height={40}
                            style={{ width: '40px', height: '40px' }}
                        />

                        <div classNameName="flex flex-col gap-3">
                            <p classNameName='font-bold text-xl text-black'>Select Service and Carrier</p>
                            <p classNameName='text-base font-[#5A5A5A] '>Lorem ipsum dolor sit amet consectetur. Massa non lectus dictumst consequat massa molestie ipsum mauris. Id arcu dolor integer et ultrices. Enim ipsum ridiculus a a. Metus adipiscing purus scelerisque tortor tempor pretium turpis rhoncus.</p>
                        </div>
                    </div>
                    <Image
                        src={Image2}
                        alt='image 1'
                        width={300}
                        height={240}
                        style={{ width: '300px', height: '240px' }}
                    />
                </div>
                <div classNameName="flex flex-row gap-5 bg-white border border-zinc-300 w-[90%] p-10 rounded-md">
                    <Image
                        src={Image3}
                        alt='image 1'
                        width={300}
                        height={240}
                        style={{ width: '300px', height: '240px' }}
                    />
                    <div classNameName="flex flex-col gap-5">
                        <Image
                            src={icon3}
                            alt='icon 1'
                            width={40}
                            height={40}
                            style={{ width: '40px', height: '40px' }}
                        />

                        <div classNameName="flex flex-col gap-3">
                            <p classNameName='font-bold text-xl text-black'>Print Label, Stick it On, and Ship</p>
                            <p classNameName='text-base font-[#5A5A5A] '>Lorem ipsum dolor sit amet consectetur. Massa non lectus dictumst consequat massa molestie ipsum mauris. Id arcu dolor integer et ultrices. Enim ipsum ridiculus a a. Metus adipiscing purus scelerisque tortor tempor pretium turpis rhoncus.</p>
                        </div>
                    </div>
                </div>
                <div classNameName="flex flex-row gap-5 bg-white border border-zinc-300 w-[90%] p-10 rounded-md">
                    <div classNameName="flex flex-col gap-5">
                        <div classNameName="flex flex-col gap-3">
                            <Image
                                src={icon4}
                                alt='icon 1'
                                width={40}
                                height={40}
                                style={{ width: '40px', height: '40px' }}
                            />
                            <p classNameName='font-bold text-xl text-black'>Track it</p>
                            <p classNameName='text-base font-[#5A5A5A] '>Lorem ipsum dolor sit amet consectetur. Massa non lectus dictumst consequat massa molestie ipsum mauris. Id arcu dolor integer et ultrices. Enim ipsum ridiculus a a. Metus adipiscing purus scelerisque tortor tempor pretium turpis rhoncus.</p>
                        </div>

                    </div>
                    <Image
                        src={Image4}
                        alt='image 1'
                        width={300}
                        height={240}
                        style={{ width: '300px', height: '240px' }}
                    />
                </div>
            </div>
            </section> */}
        </>
    )
}
