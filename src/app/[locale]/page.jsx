
import Image from "next/image";
import styles from "./styles.module.scss";
import { Button } from "@/src/components/ui/button";
import { CardMembership } from "./components/CardMembership";
import { CardsComponents } from "@/src/components/home/CardsComponents";
import { ListCardComponents } from "@/src/components/home/ListCardComponents";
import { WhyCardsComponents } from "@/src/components/home/WhyCardsComponents";
import { CarrierList } from "@/src/components/home/CarrierList";
import { SubsCardsComponents } from "@/src/components/home/SubsCardsComponents";
import { HomeNavbar } from "@/src/components/home/navigation/HomeNavbar";
import { HomeFooter } from "@/src/components/home/navigation/HomeFooter";
import { useTranslations } from "next-intl";
import CrossImg from "../../public/assets/home/Section2.png";
import Frame3 from "../../public/assets/home/Frame3.png";
import hero from "../../public/assets/home/Banner.png";
import NextLink from "next/link";
import { Link } from "@/src/navigation";
// import { CardsComponents } from "@/components/home/CardsComponents";
// import { ListCardComponents } from "@/components/home/ListCardComponents";
// import { WhyCardsComponents } from "@/components/home/WhyCardsComponents";
// import { CarrierList } from "@/components/home/CarrierList";
// import { SubsCardsComponents } from "@/components/home/SubsCardsComponents";
// import { HomeNavbar } from "@/components/home/navigation/HomeNavbar";
// import { HomeFooter } from "@/components/home/navigation/HomeFooter";
export default function Home() {
  const t = useTranslations("default");
  const signup = "https://client.shiplink.ca/auth/signup";

  const handleClick = () => {
    window.location.href = 'mailto:contact@shiplink.ca';
  }
  const OptimizedImage = () => (
    <div style={{ width: "100%", height: "auto", position: "relative", overflow: "hidden" }}>
      <Image
        width={1600}
        height={500}
        alt="mailbox"
        src={hero}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          objectPosition: "center",
        }}
        placeholder="blur" // Menampilkan placeholder sebelum gambar selesai dimuat
        loading="lazy" // Menggunakan lazy loading
      />
    </div>
  );

  return (
    <>
      <div className={styles.container}>
        <div class=" relative h-screen flex flex-col items-center justify-center text-center text-white ">
          <div class="flex absolute inset-0">
            <Image
              width={1600}
              height={500}
              alt="mailbox"
              src={hero}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <div class="absolute inset-0 bg-black opacity-30"></div>
          </div>
          <div class="relative z-10 flex flex-col justify-center items-center h-full text-center">
            <h1 class="text-5xl font-bold leading-tight mb-4">{t("Header")}</h1>
            <p class="text-3xl font-bold leading-tight mb-4">
              {t("SubHeader")}
            </p>
            <NextLink passHref href={"#hiw"}>
              <Button
                variant="destructive"
                className="rounded w-[182px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              >
                <p className="text-lg">{t("Learn")}</p>
              </Button>
            </NextLink>
          </div>
        </div>

        {/* section */}
        <div id="membership" className="w-[100%] bg-white">
          <div className={`flex flex-col gap-10 w-[90%] mx-auto my-10 `}>
            <div className="flex flex-col justify-center gap-5">
              <h1 className=" text-myBlue text-lg font-bold">
                {t("MembershipHeader")}
              </h1>
              <h1 className=" text-black text-3xl font-bold">{t("2ways")}</h1>
              <div className="text-[#5A5A5A] text-base">
                <ul>
                  <li>- {t("2WaysLS")}</li>
                  <li>- {t("2WaysLSTwo")}</li>
                </ul>
              </div>
              <div className="py-5 mt-3 flex flex-col gap-5 justify-center items-center">
                <SubsCardsComponents
                  buttonP={t("PaP")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* section */}
        <div
          id="hiw"
          className={`${styles.works} py-20 gap-10 bg-gradient-to-br from-blue-50 to-white`}
        >
          <div className="flex flex-row gap-5 justify-between items-center mx-auto w-[90%] flex-wrap">
            <div className="left flex flex-col justify-start gap-5 lg:w-[50%]">
              <h2 className="text-4xl text-myBlue font-bold">
                {t("CrossBorder")}
              </h2>
              <h1 className=" text-black text-lg font-bold">
                {t("CrossBorder-works")}
              </h1>
              <div className="text-[#5A5A5A] text-base">
                <p className="w-[90%] leading-loose">
                  {t("CrossBorder-params")}
                </p>
              </div>
            </div>

            <div className="right w-max">
              <Image
                width={500}
                height={500}
                alt="mailbox"
                src={CrossImg}
                style={{ width: "720px", height: "444px" }}
              />
            </div>
          </div>
          <div className="flex flex-col mt-10 gap-5 mx-auto w-[90%]">
            <p className="text-xl font-bold">{t("Buy")}</p>
            <div className="cardContent">
              <CardsComponents />
            </div>
          </div>
        </div>

        {/* section */}
        <div className={`${styles.sectionFree}`}>
          <div className={`${styles.contentFrame} mx-auto`}>
            <div className="flex flex-col gap-5 justify-center items-center text-center  px-10 py-10 h-[100%]">
              <h3 className="text-3xl  font-bold text-white">{t("Account")}</h3>
              <p className="text-base px-4 text-white">{t("Account-param")}</p>
              <NextLink passHref href={`${signup}`}>
                <Button
                  variant="destructive"
                  size="lg"
                  className="rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                >
                  <p className="text-base ">{t("Account-get")}</p>
                </Button>
              </NextLink>
            </div>
          </div>
        </div>

        {/* section */}
        <div
          className={`${styles.works} py-20 gap-10 bg-gradient-to-br from-blue-50 to-white`}
        >
          <div className="w-[90%] ">
            <h2 className="text-4xl text-myBlue font-bold">{t("Shipping")}</h2>
          </div>
          <div className="flex flex-col gap-8 mx-auto w-[90%] lg:flex-row">
            <div className="left w-[300px] h-max flex flex-col justify-start gap-5 lg:w-[600px]">
              <div className="h-[598px] relative">
                <Image
                  width={388}
                  height={598}
                  alt="mailbox"
                  src={Frame3}
                  style={{ width: "388px", height: "598px" }}
                />

                <div className="p-5 w-[280px] absolute bottom-10 left-10 rounded shadow flex flex-col gap-[20px] bg-white md:w-[390px]">
                  <h3 className="text-xl  font-bold text-black">{t("HIW_Tittle")}</h3>
                  <p className="text-base text-[#5A5A5A]">
                    {t("HIW_SubTittle")}
                  </p>
                </div>
              </div>
            </div>

            <div className="right w-full flex flex-col justify-between h-[100%] gap-6">
              <h3 className="text-xl font-bold text-black">{t("worksHead")}</h3>
              <div className="h-full">
                <ListCardComponents />
              </div>
            </div>
          </div>
          <Link passHref href={"/shippingLabels"}>
            <Button
              variant="destructive"
              size="lg"
              className="rounded px-10 w-[182px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            >
              <p className="text-base">{t("MD")}</p>
            </Button>
          </Link>

          <div className={`${styles.contentFrame2} mx-auto my-[20px]`}>
            <div className="flex flex-col gap-5 justify-center items-center text-center px-10 py-16 h-[100%]">
              <div className="py-5 gap-4 flex flex-col">
                <h3 className="text-3xl text-center font-bold text-white">
                  {t("Signup")}
                </h3>
                <p className="text-base px-4 text-white">{t("SignupP")}</p>
              </div>
              <NextLink passHref href={`${signup}`}>
                <Button
                  variant="destructive"
                  size="lg"
                  className="rounded px-20 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                >
                  <p className="text-base">{t("GMA")}</p>
                </Button>
              </NextLink>
            </div>
          </div>
        </div>

        {/* Section Why */}
        <div className="w-[100%] bg-white">
          <div className={`flex flex-col gap-10 w-[90%] mx-auto my-10 `}>
            <h2 className="text-4xl text-myBlue font-bold">{t("whyHead")}</h2>
            <div className="bg-gradient-to-r from-blue-900 to-blue-900/90 w-full rounded-sm p-[32px]">
              <WhyCardsComponents />
            </div>
          </div>
        </div>

        {/* Patner Section */}
        <div className="w[100%] bg-[#F7F7F7] border border-[#E7E8EC] py-10">
          <div
            className={`flex flex-col gap-10 w-[90%] mx-auto justify-center items-center my-10 `}
          >
            <div className="flex flex-col justify-center w-full gap-5 text-center">
              <h2 className="text-4xl text-black font-bold">{t("OWC")}</h2>
              <p>{t("WoW")}</p>
              <div className="py-10 mt-10 w-full">
                <CarrierList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
