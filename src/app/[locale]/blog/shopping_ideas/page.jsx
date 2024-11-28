'use client';
import React from "react";
import styles from '../../styles.module.scss';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import cartImages from '../../../../public/images/cartImages.jpg';
import Link from "next/link";
import { ItemList } from "./components/ItemList";
import AmazonImage from '../../../../public/images/store/amazon.png';
import { WhyCardsComponents } from "@/components/home/WhyCardsComponents";
import { useTranslations } from "next-intl";

export default function Home() {
    const t = useTranslations("default");
    const signup = `${process.env.NEXT_PUBLIC_SIGNUP_URL}`;

    return (
        <>
            <div className={styles.container} >
                <div className=" text-center justify-start gap-[32px] pt-[90px] w-full h-full bg-[#FFFFF]">
                    <div className="flex flex-col gap-4 justify-start text-left w-[90%] mx-auto pt-10 mb-5">
                        <div className="">
                            <Image
                                priority
                                className="rounded-lg w-full h-[400px] object-cover"
                                src={cartImages}
                                height={500}
                                alt="About Us Heading Image"
                            />
                        </div>
                        {/* <h1 className=" text-myBlue text-lg font-bold">
                            {t("about.Header")}
                        </h1> */}
                        <h1 className=" text-black text-3xl font-bold">
                            Shopping Ideas
                        </h1>
                        <div className="text-[#5A5A5A] text-base">
                            <p>
                                Shopping internationally has never been easier, thanks to ShipLink! Whether you&apos;re exploring online stores in the USA or Canada, our services enable seamless shipping, ensuring you save time and money. To get started, here are some exciting shopping ideas and tips to maximize your experience with ShipLink.
                            </p>
                        </div>
                    </div>
                </div>

                {/* seection */}
                <div
                    className={`${styles.works} py-20 gap-10 bg-gradient-to-br from-blue-50 to-white`}
                >
                    <div className="w-[90%] flex flex-col gap-5">
                        <div className="">
                            <div className="left  flex flex-col justify-start gap-5 w-full">
                                <h2 className="text-2xl text-myBlue font-bold">
                                    Popular Online Shops to Explore
                                </h2>
                                <div className="text-[#5A5A5A] text-base">
                                    <p className="w-[90%] leading-loose">
                                        Here’s a list of popular online shops you can explore today for everything from electronics and fashion to home essentials and unique finds.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3 flex flex-col gap-10">
                            <ItemList
                                number={1}
                                title="Amazon"
                                bestFor={'An all-in-one shopping destination for almost anything you can imagine.'}
                                description={'Amazon is the go-to online marketplace for millions of shoppers worldwide. Whether you’re looking for books, electronics, clothing, or even groceries, Amazon has it all. Their competitive prices, customer reviews, and fast delivery options (especially with Amazon Prime) make it a favorite for convenience and reliability.'}
                                link={'https://www.amazon.com/'}
                                whyShopHere={'Amazon often features exclusive deals, seasonal discounts, and access to rare or niche items.'}
                                image={AmazonImage}
                                alt={'Amazon Image'}
                            />

                            <ItemList
                                number={2}
                                title="eBay"
                                bestFor={'Auctions, collectibles, rare finds, and pre-owned items.'}
                                description={'eBay offers a unique shopping experience where you can bid on items to get great deals or buy directly from sellers. From vintage collectibles to second-hand electronics, it’s a treasure trove for unique products. You can even sell your items on eBay, making it a versatile platform.'}
                                link={'https://www.ebay.com/'}
                                whyShopHere={'Perfect for bargain hunters, collectors, and those seeking refurbished goods.'}
                                src={'https://1000logos.net/wp-content/uploads/2018/10/Ebay-logo.jpg'}
                                alt={'Ebay Images'}
                            />
                            <ItemList
                                number={3}
                                title="Walmart"
                                bestFor={'Affordable everyday essentials, groceries, and electronics.'}
                                description={'Walmart is known for its unbeatable prices on a wide range of products, including groceries, clothing, and home appliances. Their online store provides the convenience of ordering from home with options for delivery or in-store pickup.'}
                                link={'https://www.walmart.com/'}
                                whyShopHere={'Great for budget-friendly shopping and bulk purchases'}
                                src={'https://1000logos.net/wp-content/uploads/2017/05/Walmart-Logo.png'}
                                alt={'Walmart logo'}
                            />
                            <ItemList
                                number={4}
                                title="Etsy"
                                bestFor={'Handmade goods, unique gifts, and vintage treasures.'}
                                description={'Etsy is the ultimate destination for those who love unique, artisan-crafted items. You’ll find personalized jewelry, handmade furniture, custom clothing, and more. It’s a great place to support small businesses and find meaningful, one-of-a-kind gifts.'}
                                link={'https://www.etsy.com/'}
                                whyShopHere={'Ideal for thoughtful gifts and sustainable, small-batch products.'}
                                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcBkplnEehFuQQtwSFK-OvQjJ3SLpouz_tZQ&s'}
                                alt={'Walmart logo'}
                            />
                            <ItemList
                                number={5}
                                title="Target"
                                bestFor={'Trendy and affordable clothing, beauty products, and home goods.'}
                                description={'Target is a shopper’s paradise, offering stylish yet budget-friendly products for the entire family. They’re known for their seasonal collections and exclusive collaborations with designers, making it a fantastic choice for both essentials and splurges.'}
                                link={'https://www.target.com/'}
                                whyShopHere={'Frequent discounts and wide-ranging product categories make Target a household favorite.'}
                                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb47ANGbjmEWeR_sT6-ufDyjlXvIsrDHvxQA&s'}
                                alt={'Target Logo'}
                            />
                            <ItemList
                                number={6}
                                title="Zara"
                                bestFor={'Trendy and fast fashion at an affordable price.'}
                                description={'Zara is a leading name in the world of fashion, known for its runway-inspired clothing that’s accessible to all. Whether you need office attire, casual wear, or a stylish outfit for an event, Zara delivers high-quality designs for men, women, and children.'}
                                link={'https://www.zara.com'}
                                whyShopHere={'Fresh styles updated regularly with global trends in mind.'}
                                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFlD39-dfHGsS4N9SV0sj6J52NyWeSURtww&s'}
                                alt={'Target Logo'}
                            />
                            <ItemList
                                number={7}
                                title="Wayfair"
                                bestFor={'Affordable and luxurious furniture, home décor, and renovation essentials.'}
                                description={'Wayfair is perfect for homeowners or renters looking to furnish or revamp their spaces. Their massive selection of furniture and home accessories caters to a variety of tastes and budgets. They often have seasonal sales, making luxury items more affordable.'}
                                link={'https://www.wayfair.com/'}
                                whyShopHere={'A fantastic variety of home items at competitive prices.'}
                                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5zbpMvldx2NUnf_eDYQc6cYwAXB89IQ_PYg&s'}
                                alt={'Wayfair Logo'}
                            />
                            <ItemList
                                number={8}
                                title="Nordstrom"
                                bestFor={'High-end fashion, luxury beauty products, and accessories.'}
                                description={'Nordstrom is a favorite among fashion lovers, offering top designer brands alongside affordable yet stylish options. Their beauty section includes premium skincare and makeup lines, and their legendary Anniversary Sale is a must for savvy shoppers.'}
                                link={'https://www.nordstrom.com/'}
                                whyShopHere={'Exclusive access to luxury brands and impeccable customer service.'}
                                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4H6T0Mc930jki8PJ13zPaYl03YPRtRvrWfA&s'}
                                alt={'Nordstrom Logo'}
                            />
                            <ItemList
                                number={9}
                                title="Newegg"
                                bestFor={'Computer components, gaming accessories, and tech gadgets.'}
                                description={'Tech enthusiasts and gamers flock to Newegg for its wide array of computer hardware, gaming setups, and accessories. Their customer reviews, competitive pricing, and frequent sales make it a trusted choice for building your dream PC or upgrading your tech.'}
                                link={'https://www.newegg.com/'}
                                whyShopHere={'Best-in-class options for specialized tech needs.'}
                                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BnZ2R5iunwpjSOsXnbFdCrgefXrVY2zBhw&s'}
                                alt={'Nordstrom Logo'}
                            />
                            <ItemList
                                number={10}
                                title="Sephora"
                                bestFor={'High-quality beauty products and skincare solutions.'}
                                description={'Sephora’s extensive collection of beauty and skincare brands caters to all your pampering needs. Whether you’re a makeup novice or a pro, their curated collections and in-store experts can help you find the perfect products.'}
                                link={'https://www.sephora.com'}
                                whyShopHere={'Exclusive brand partnerships and rewards programs for loyal shoppers.'}
                                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ77FzthPUXEdGbCxWMGGRIIwVhZJEnDR9-w&s'}
                                alt={'Nordstrom Logo'}
                            />
                        </div>
                    </div>
                </div>

                {/* section */}
                {/* <div className="vision w-full border-t py-20  ">
                    <div className="flex flex-col gap-5 bg-[#FAFAFA] p-10 w-[90%] mx-auto flex-wrap">
                        <div className="flex flex-col gap-1 text-center">
                            <h2 className="text-2xl text-myBlue font-bold text-center">
                                How ShipLink Enhances Your Shopping
                            </h2>
                            <p>ShipLink enables you to shop at these popular stores effortlessly</p>
                        </div>
                        <div className="w-full md:w-[40%] p-5 gap-4 flex flex-col">
                            <h2 className="text-black font-bold text-2xl">{t('about.Vision')}</h2>
                            <p>
                                {t('about.Vision_param')}
                            </p>
                        </div>
                        <div className="w-full md:w-[10%] flex items-center md:block">
                            <div className="border border-solid w-full md:w-[1px] md:h-full h-[1px] mx-auto" />
                        </div>
                        <div className="w-full md:w-[40%] p-5 gap-4 flex flex-col">
                            <h2 className="text-black font-bold text-2xl">{t('about.Mission')}</h2>
                            <p>
                                {t('about.Mission_param')}
                            </p>
                        </div>
                    </div>
                </div> */}

                <div className={`${styles.sectionFree} h-max my-3`}>
                    <div className={`${styles.contentFrame} mx-auto mb-5`}>
                        <div className="flex flex-col gap-5 justify-center items-center text-center  px-10 py-10 h-[100%]">
                            {/* <h3 className="text-3xl  font-bold text-white">{t("Account")}</h3> */}
                            <h3 className="text-3xl  font-bold text-white">Start Your Shopping Journey Today!</h3>
                            {/* <p className="text-base px-4 text-white">{t("Account-param")}</p> */}
                            <p className="text-base px-4 text-white">Join us for great benefits by getting your Free Account right now! Enjoy exclusive access to our specialized services, unique features and unmatched prices</p>
                            <Link passHref href={`${signup}`}>
                                <Button
                                    variant="destructive"
                                    size="lg"
                                    className="rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                                >
                                    <p className="text-base ">Start Shipping</p>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* <div className="w-full py-10">
                    <div className={`${styles.aboutContentFrame} mx-auto my-[20px]`}>
                        <div className="flex flex-col gap-5 justify-center items-center text-center px-10 py-16 h-[100%]">
                            <div className="py-5 gap-4 flex flex-col">
                                <h3 className="text-3xl text-center font-bold text-white">
                                    {t('about.MoreQuestion')}
                                </h3>
                            </div>
                            <Link
                                href={'mailto:contact@shiplink.com'}
                                passHref
                            >
                                <Button
                                    variant="destructive"
                                    size="lg"
                                    className="rounded px-20 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                                >
                                    <p className="text-base"> {t('about.CTA')}</p>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    );
}
