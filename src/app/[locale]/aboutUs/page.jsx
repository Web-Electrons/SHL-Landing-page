import React from "react";
import styles from "../styles.module.scss";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CardData } from "@/components/home/CardData";
import header from "../../../public/assets/home/AboutUsHeading.png";
import { useTranslations } from "next-intl";
import { Link } from "@/src/navigation";

export default function Home() {
  const t = useTranslations("default");
  return (
    <>
      <div className={styles.container}>
        <div className="h-full w-full justify-start gap-[32px] bg-[#FFFFF] pt-[90px] text-center">
          <div className="mx-auto flex w-[90%] flex-col justify-start gap-4 pt-10 text-left">
            <h1 className="text-lg font-bold text-myBlue">{t("about.Header")}</h1>
            <h1 className="text-3xl font-bold text-black">
              {/* Closer to ShipLink */}
              {t("about.SubHeader")}
            </h1>

            <div className="text-base text-[#5A5A5A]">
              <p>
                {t("about.Header_Title")}
                {/* We are the best-in-className platform for national and international
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
        <div className={`${styles.works} gap-10 bg-gradient-to-br from-blue-50 to-white py-20`}>
          <div className="mx-auto flex w-[90%] flex-row flex-wrap items-center justify-between gap-5">
            <div className="left flex flex-col justify-start gap-5 sm:w-full md:w-[50%]">
              <h2 className="text-4xl font-bold text-myBlue">{t("about.Service_Title")}</h2>
              <div className="text-base text-[#5A5A5A]">
                <p className="w-[90%] leading-loose">
                  {t("about.Service_Param")}
                  {/* We are a comprehensive personal and business solutions service
                  provider, helping you optimize and save on your shipping needs
                  through the following services: */}
                </p>
              </div>
            </div>

            <div className="right flex w-max flex-col items-start gap-5">
              <div className="flex flex-row items-center gap-3">
                <p className="h-[30px] w-[30px] rounded bg-slate-600 bg-opacity-10 px-1 py-1 text-center">1</p>
                <p>{t("about.Service_list1")}</p>
              </div>
              <div className="flex flex-row gap-3">
                <p className="h-[30px] w-[30px] rounded bg-slate-600 bg-opacity-10 px-1 py-1 text-center">2</p>
                <p>{t("about.Service_list2")}</p>
              </div>
              <div className="flex flex-row gap-3">
                <p className="h-[30px] w-[30px] rounded bg-slate-600 bg-opacity-10 px-1 py-1 text-center">3</p>
                <p>
                  {t("about.Service_list3")}
                  {/* Cross-Border Mailboxes (Import, Export, Internet Purchases,
                  Courier) */}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* section */}
        <div className="w-[100%] bg-white py-14">
          <div className={`mx-auto my-10 flex w-[90%] flex-col gap-10`}>
            <h2 className="text-center text-4xl font-bold text-black">
              {/* Other Important Data */}
              {t("about.Other")}
            </h2>
            <div className="w-full rounded-sm p-[32px]">
              <CardData param={t} />
            </div>
          </div>
        </div>

        {/* section */}
        <div className="vision w-full border-t py-20">
          <div className="mx-auto flex w-[90%] flex-col flex-wrap gap-5 bg-[#FAFAFA] p-10 md:flex-row">
            <div className="flex w-full flex-col gap-4 p-5 md:w-[40%]">
              <h2 className="text-2xl font-bold text-black">{t("about.Vision")}</h2>
              <p>{t("about.Vision_param")}</p>
            </div>
            <div className="flex w-full items-center md:block md:w-[10%]">
              <div className="mx-auto h-[1px] w-full border border-solid md:h-full md:w-[1px]" />
            </div>
            <div className="flex w-full flex-col gap-4 p-5 md:w-[40%]">
              <h2 className="text-2xl font-bold text-black">{t("about.Mission")}</h2>
              <p>{t("about.Mission_param")}</p>
            </div>
          </div>
        </div>

        <div className="w-full py-10">
          <div className={`${styles.aboutContentFrame} mx-auto my-[20px]`}>
            <div className="flex h-[100%] flex-col items-center justify-center gap-5 px-10 py-16 text-center">
              <div className="flex flex-col gap-4 py-5">
                <h3 className="text-center text-3xl font-bold text-white">{t("about.MoreQuestion")}</h3>
              </div>

              <Button
                variant="destructive"
                size="lg"
                asChild
                className="rounded px-20 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
              >
                <Link href="/contact_us">
                  <p className="text-base"> {t("about.CTA")}</p>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
