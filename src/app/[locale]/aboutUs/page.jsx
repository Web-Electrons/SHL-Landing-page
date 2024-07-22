import React from "react";
import styles from "../styles.module.scss";
import { Separator } from "@/src/components/ui/separator";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { CardData } from "@/src/components/home/CardData";
import header from "../../../public/assets/home/AboutUsHeading.png";
import { useTranslations } from "next-intl";
export default function Home() {
  const t = useTranslations("default");
  console.log("🚀 ~ Home ~ t:", t)
  console.log(t("Header")); // Check console to verify the output
  return (
    <>
      <div className={styles.container}>
        <div className=" text-center justify-start gap-[32px] pt-[90px] w-full h-full bg-[#FFFFF]">
          <div className="flex flex-col gap-4 justify-start text-left w-[90%] mx-auto pt-10">
            <h1 className=" text-myBlue text-lg font-bold">{t("about.Header")}</h1>
            <h1 className=" text-black text-3xl font-bold">
              {/* Closer to ShipLink */}
              {t('about.SubHeader')}
            </h1>

            <div className="text-[#5A5A5A] text-base">
              <p>
                {t('about.Header_Title')}
                {/* We are the best-in-class platform for national and international
                shipping services. Our many years of experience, customer
                satisfaction. */}
              </p>
            </div>
            <Image
              priority
              className="rounded-lg"
              src={header}
              width={1600}
              height={500}
              alt="About Us Heading Image"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        </div>
        {/* seection */}
        <div
          className={`${styles.works} py-20 gap-10 bg-gradient-to-br from-blue-50 to-white`}
        >
          <div className="flex flex-row gap-5 justify-between items-center mx-auto w-[90%]">
            <div className="left w-[50%] flex flex-col justify-start gap-5">
              <h2 className="text-4xl text-myBlue font-bold">
                {t("about.Service_Title")}
              </h2>
              <div className="text-[#5A5A5A] text-base">
                <p className="w-[90%] leading-loose">
                  {t("about.Service_Param")}
                  {/* We are a comprehensive personal and business solutions service
                  provider, helping you optimize and save on your shipping needs
                  through the following services: */}
                </p>
              </div>
            </div>

            <div className="right w-max flex flex-col gap-5 items-start">
              <div className="flex flex-row gap-3 items-center">
                <p className="bg-opacity-10 w-[30px] text-center bg-slate-600 rounded px-1 py-1">
                  1
                </p>
                <p>
                  {t('about.Service_list1')}
                </p>
              </div>
              <div className="flex flex-row gap-3">
                <p className="bg-opacity-10  w-[30px] text-center bg-slate-600 rounded px-1 py-1">
                  2
                </p>
                <p>
                  {t('about.Service_list2')}
                </p>
              </div>
              <div className="flex flex-row gap-3">
                <p className="bg-opacity-10  w-[30px] text-center bg-slate-600 rounded px-1 py-1">
                  3
                </p>
                <p>
                  {t('about.Service_list3')}
                  {/* Cross-Border Mailboxes (Import, Export, Internet Purchases,
                  Courier) */}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* section */}
        <div className="w-[100%] bg-white py-14">
          <div className={`flex flex-col gap-10 w-[90%] mx-auto my-10 `}>
            <h2 className="text-4xl text-black font-bold text-center">
              {/* Other Important Data */}
              {t('about.Other')}
            </h2>
            <div className=" w-full rounded-sm p-[32px]">
              <CardData
                param={t}
              />
            </div>
          </div>
        </div>

        {/* section */}
        <div className="vision w-full border-t py-20  ">
          <div className="flex flex-row gap-5 bg-[#FAFAFA] p-10 w-[90%] mx-auto">
            <div className="w-[50%] p-5 gap-4 flex flex-col">
              <h2 className="text-black font-bold text-2xl">{t('about.Vision')}</h2>
              <p>
                {t('about.Vision_param')}
                {/* Our team offers customers consistent first-class service, an
                organization that is close to its customers and builds long term
                relationships. */}
              </p>
            </div>
            <div className="w-[5%] flex ">
              <div className="border border-solid w-[1px] h-full mx-auto" />
              {/* <Separator orientation="vertical" className="w-[2px]" /> */}
            </div>
            <div className="w-[50%] p-5 gap-4 flex flex-col">
              <h2 className="text-black font-bold text-2xl">{t('about.Mission')}</h2>
              <p>
                {t('about.Mission_param')}
                {/* We make your shipping experience easier for both personal and
                business through our services and distribution network, offering
                convenient and economical solutions through our best-in-class
                service. */}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full py-10">
          <div className={`${styles.aboutContentFrame} mx-auto my-[20px]`}>
            <div className="flex flex-col gap-5 justify-center items-center text-center px-10 py-16 h-[100%]">
              <div className="py-5 gap-4 flex flex-col">
                <h3 className="text-3xl text-center font-bold text-white">
                  You have more questions?
                </h3>
              </div>
              <Button
                variant="destructive"
                size="lg"
                className="rounded px-20 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <p className="text-base">Contact Us</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
