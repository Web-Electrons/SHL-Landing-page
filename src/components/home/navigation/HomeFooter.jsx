import React from "react";
import Image from "next/image";
import { ChevronRight, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Fb from "../../../public/assets/home/Socials/fb.png";
import Ig from "../../../public/assets/home/Socials/ig.png";
import Xicon from "../../../public/assets/home/Socials/x.png";
import NextLink from "next/link";
import { Link } from "@/navigation";
import logo from "../../../public/logo.png";

export const HomeFooter = () => {
  const t = useTranslations("default");

  return (
    <div className="w-[100%]">
      <div className="wrap mx-auto flex w-[90%] flex-row flex-wrap items-center justify-between gap-10 py-10">
        <div className="left ml-[2px]">
          <div className="flex flex-col">
            <Image
              src={logo}
              width={120}
              height={120}
              alt="shiplink Logo"
              className=""
              style={{ width: "120px", height: "30px" }}
            />
            <div className="mt-2 flex flex-row flex-wrap items-end gap-[30px] sm:justify-center md:justify-center">
              <div className="address flex flex-col gap-2 text-sm">
                <strong>ShipLink Services Inc.</strong>
                <div className="text-sm">
                  <Link
                    href="/contact_us"
                    className="group inline-flex items-center gap-1 text-[#5A5A5A] transition-colors hover:text-primary"
                  >
                    {t("emsup")}
                    <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right flex w-[40%] flex-col justify-end gap-5 md:flex-row">
          <div className="flex flex-col gap-5 text-sm">
            <div className="item flex w-[100px] flex-row items-center gap-2">
              <ChevronRight className="h-[15px] w-[15px] text-red-700" />
              <Link
                id="footer_aboutUs"
                passHref
                href={"/aboutUs"}
                className="cursor-pointer transition duration-300 ease-in-out hover:opacity-70"
              >
                <p>{t("abo")}</p>
              </Link>
            </div>

            <div className="item flex w-[200px] flex-row items-center gap-2">
              <ChevronRight className="h-[15px] w-[15px] text-red-700" />
              <Link
                passHref
                id="footer_membership"
                href={"/#membership"}
                className="cursor-pointer transition duration-300 ease-in-out hover:opacity-70"
              >
                <p>{t("memb")}</p>
              </Link>
            </div>
            <div className="item flex w-[200px] flex-row items-center gap-2">
              <ChevronRight className="h-[15px] w-[15px] text-red-700" />
              <Link
                id="footer_shopping"
                passHref
                href={"/blog/shopping_ideas"}
                className="cursor-pointer transition duration-300 ease-in-out hover:opacity-70"
              >
                <p>{t("footer.Shoping_ideas")}</p>
              </Link>
              {/* <Link
                                passHref
                                href={"/shippingLabels"}
                                className='cursor-pointer transition ease-in-out duration-300 hover:opacity-70'>
                                <p>{t("hiw")}</p>
                            </Link> */}
            </div>
          </div>
          <div className="flex flex-col gap-5 text-sm">
            {/* <div className="item flex flex-row gap-2 items-center w-[200px]">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <p>{t("Sc")}</p>
                        </div> */}
            <div className="item flex w-[200px] flex-row items-center gap-2">
              <ChevronRight className="h-[15px] w-[15px] text-red-700" />
              <Link
                id="footer_prohibited"
                passHref
                href={"/prohibited-items"}
                className="cursor-pointer transition duration-300 ease-in-out hover:opacity-70"
              >
                <p>{t("proit")}</p>
              </Link>
            </div>

            <div className="item flex w-[200px] flex-row items-center gap-2 text-sm">
              <ChevronRight className="h-[15px] w-[15px] text-red-700" />
              <Link
                id="footer_mailbox"
                passHref
                href={"/#cross-border"}
                className="cursor-pointer transition duration-300 ease-in-out hover:opacity-70"
              >
                <p>{t("footer.Virtual_mailbox")}</p>
              </Link>
            </div>
            <div className="item flex w-[200px] flex-row items-center gap-2 text-sm">
              <ChevronRight className="h-[15px] w-[15px] text-red-700" />
              <Link
                id="footer_shipment"
                passHref
                href={"/shippingLabels"}
                className="cursor-pointer transition duration-300 ease-in-out hover:opacity-70"
              >
                <p>{t("footer.shipment_label")}</p>
              </Link>
            </div>
            <div className="item flex w-[200px] flex-row items-center gap-2 text-sm">
              <ChevronRight className="h-[15px] w-[15px] text-red-700" />
              <Link
                id="footer_shipping_calculator"
                passHref
                href={"/shipping_calculator"}
                className="cursor-pointer transition duration-300 ease-in-out hover:opacity-70"
              >
                <p>{t("footer.shipping_calculator")}</p>
              </Link>
            </div>
            {/* <div className="item flex flex-row gap-2 items-center w-[200px]">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <p>{t("info")}</p>
                        </div> */}
          </div>
        </div>
      </div>

      <div className="w-full bg-[#2E2E2E] py-[24px] font-regular text-white">
        <div className="mx-auto flex w-[90%] flex-row flex-wrap justify-evenly gap-5 text-sm">
          <p>© 2024 ShipLink.com</p>
          <div className="flex flex-row flex-wrap gap-4 font-regular">
            <Link id="footer_terms" passHref href={"/terms"}>
              <p className="hover:opacity-70">{t("Terms")}</p>
            </Link>
            <p> | </p>
            <Link id="footer_privacy" passHref href={"/privacy"}>
              <p className="hover:opacity-70">{t("priv")}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
