/* eslint-disable @next/next/no-img-element */
//@ts-nocheck
"use client";

import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";

import DeclareTable from "./components/forms/DeclareTable";
import { Dimension } from "./components/forms/Dimension";
import { ShippedTo } from "./components/forms/ShippedTo";
import { MailboxSelect } from "./components/MailboxSelect";
import { RatesOption } from "./components/panel/RatesOption";
import { ServiceOptions } from "./components/panel/ServiceOptions";
import { SummaryPanel } from "./components/panel/SummaryPanel";
import { ServiceTable } from "./components/ServiceTable";
import { ShiptoForm } from "./components/shiptoForm";
import { WarehouseDestinationSelect } from "./components/WarehouseDestinationSelect";

import { SHIPPING_SERVICE_KEYS, TAB_NAMES } from "@/features/shipping_calculator/constants/services";
import { useServiceList } from "@/features/shipping_calculator/hooks/useServiceList.store";
import { useShippingRates } from "@/features/shipping_calculator/hooks/useShippingRates.store";

import { useShippingStore } from "@/features/shipping_calculator/hooks/useshipping.store";
import { useWarehouse } from "@/features/shipping_calculator/hooks/useWarehouse.store";
import { SHIPPING_FORM_DEFAULTS, shippingFormSchema } from "@/features/shipping_calculator/schema/shipping.schema";
import type { ShippingFormValues } from "@/features/shipping_calculator/types/shipping.types";

import styles from "./styles.module.scss";

export default function ShippingCalculator() {
  const isTableMode = useMediaQuery({ query: "(max-width: 950px)" });
  console.log("isTableMode", isTableMode);
  const { toast } = useToast();

  const [tabName, setTabName] = useState<string>(TAB_NAMES.MAILBOX);
  // const [countryList, setCountryList] = useState([])
  const [openMobileSheet, setOpenMobileSheet] = useState(false);

  const store = useShippingStore();

  const form = useForm<ShippingFormValues>({
    resolver: yupResolver(shippingFormSchema) as any,
    defaultValues: SHIPPING_FORM_DEFAULTS,
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const {
    formState: { errors },
    watch,
  } = form;

  watch(); // 👈 force re-render tiap perubahan

  console.log("errors", errors);
  const { handleWarehouseChange, handleWarehouseDestinationChange, assignWarehouseToForm } = useWarehouse({ form });
  const { packageServices, otherServices, warehouseServices } = useServiceList();
  const {
    calculateRates,
    calculateHoldForPickup,
    calculateCrossBorderPickup,
    calculateCrossBorderForward,
    calculateDirectForward,
  } = useShippingRates();

  // ─── Load Country List ───────────────────────────────────────────────────

  // ─── Form Actions ─────────────────────────────────────────────────────────

  const triggerRates = () => {
    calculateRates(form.getValues());
  };

  const triggerContinue = async () => {
    const isValid = await form.trigger();
    if (isValid) setOpenMobileSheet(true);
  };

  const validateAndProceed = async (): Promise<boolean> => {
    const isValid = await form.trigger();
    if (!isValid) {
      isTableMode && setOpenMobileSheet(true);
      toast({ title: "Oops! Please check the form", description: "Some required fields are missing." });
      return false;
    }
    return true;
  };

  // ─── Continue / Calculate Dispatcher ─────────────────────────────────────

  const handleContinue = async () => {
    const { selectedService } = store;
    const formData = form.getValues();

    if (selectedService === SHIPPING_SERVICE_KEYS.HFP) {
      await calculateHoldForPickup(formData);
    } else if (selectedService === SHIPPING_SERVICE_KEYS.CBP) {
      await calculateCrossBorderPickup(formData);
    } else {
      if (formData.total_package_value <= 0) {
        toast({
          title: "Oops! Please check the form",
          description: "Please input total declare value.",
          variant: "destructive",
        });
        return;
      }

      const isValid = await validateAndProceed();
      if (isValid) {
        store.setOpenServicesOption(true);
        store.setIsFormDisabled(true);
        store.setShowRates(false);
        triggerRates();
      }
    }
  };

  const handleRatesOptionCalculate = async () => {
    const { selectedService } = store;
    const formData = form.getValues();

    if (selectedService === SHIPPING_SERVICE_KEYS.CBF) {
      await calculateCrossBorderForward(formData, store.selectedRate);
    } else if (selectedService === SHIPPING_SERVICE_KEYS.FORWARD) {
      await calculateDirectForward(formData, store.selectedRate);
    }
  };

  // ─── Derived Display Values ───────────────────────────────────────────────

  const getSelectedMailboxLabel = (): string => {
    const from = form.watch("shipped_from");
    if (!from?.city) return "Select Mailbox";
    return `${from.city}, ${from.state}, ${from.zip}, ${from.country}`;
  };

  const getSelectedDestinationLabel = (): string => {
    const destId = form.watch("warehouse_destination");
    if (!destId) return "Select Warehouse Destination";
    const data = store.warehouse.find((item) => item.warehouse_id === destId);
    if (!data?.city) return "Select Warehouse Destination";
    return `${data.city}, ${data.province_code}, ${data.postal_code}, ${data.country_code}`;
  };

  // ─── Conditional Form Sections ────────────────────────────────────────────

  const renderServiceFormSection = () => {
    const { selectedService } = store;

    if (selectedService === SHIPPING_SERVICE_KEYS.HFP) {
      return null;
    }

    if (selectedService === SHIPPING_SERVICE_KEYS.CBP) {
      return (
        <div>
          <div className="my-4 grid w-full grid-cols-3">
            <DeclareTable form={form} />
          </div>
          <WarehouseDestinationSelect
            form={form}
            warehouse={store.warehouse}
            isLoading={store.isLoadingWarehouse}
            getLabel={getSelectedDestinationLabel}
            onChange={handleWarehouseDestinationChange}
          />
        </div>
      );
    }

    if (selectedService === SHIPPING_SERVICE_KEYS.CBF) {
      return (
        <>
          <div className="my-4 grid w-full grid-cols-3">
            <DeclareTable form={form} />
          </div>
          <ShippedTo form={form} />
        </>
      );
    }

    // forward & others
    return (
      <>
        <div className="my-4 grid w-full grid-cols-3">
          <DeclareTable form={form} />
        </div>
        <ShippedTo form={form} />
      </>
    );
  };

  // ─── Panel: Summary or RatesOption ───────────────────────────────────────

  const renderServicePanel = (isMobile = false) => {
    const { selectedService, openServicesOption, openSummary } = store;

    if (!openServicesOption) return null;

    const isPickupService =
      selectedService === SHIPPING_SERVICE_KEYS.HFP || selectedService === SHIPPING_SERVICE_KEYS.CBP;

    const showSummary = isPickupService || (openSummary && !isPickupService);

    const panelProps = {
      loading_rates: store.isLoadingRates,
      rates: store.courierRates,
      getRates: triggerRates,
      setSummaryData: store.setSummaryData,
      setShowRates: store.setShowRates,
      summaryData: store.summaryData,
      setSelectedData: store.setSelectedRate,
      selecetedData: store.selectedRate,
      showRates: store.showRates,
      setOpenServicesOption: store.setOpenServicesOption,
      selectedService,
    };

    const content = showSummary ? (
      <SummaryPanel {...panelProps} />
    ) : (
      <RatesOption
        {...panelProps}
        openSummary={openSummary}
        setOpenSummary={store.setOpenSummary}
        set_loading_rates={store.setIsLoadingRates}
        warehouse_id={store.warehouseId}
        warehouseCountry={store.warehouseCountry}
        formWatch={form.watch()}
        handleCalculate={handleRatesOptionCalculate}
      />
    );

    if (isMobile) return content;
    return <div className={styles.service}>{content}</div>;
  };

  return (
    <>
      {store.isLoadingRates && <Loading />}

      <div className={styles.container}>
        <div
          className={`flex h-screen min-h-max w-full flex-col justify-start gap-[32px] bg-[#FFFFF] py-10 pt-[90px] text-center ${styles.wrapper}`}
        >
          <div className="mx-auto flex w-[90%] flex-col justify-start gap-5 pt-3 text-left">
            <h1 className="text-3xl font-bold text-myBlue">Shipping Calculator</h1>
            <h1 className="text-lg font-bold text-black">Estimate Your Shipping Cost</h1>

            <Form {...form}>
              <form className="flex flex-col" disabled={store.isFormDisabled}>
                {/* ── Tab Navigation ── */}
                {/* <div className="py-3">
                                    hello
                                </div> */}
                <div className="pb-[30px]">
                  <div
                    className="flex w-full gap-5 py-4 pb-3"
                    // className={`w-full py-4 mb-3 flex ${isTableMode
                    //     ? 'flex-col gap-3 items-start'
                    //     : 'flex-row gap-[20px] h-full items-center'
                    //     }`}
                  >
                    <Tabs onValueChange={setTabName} defaultValue={TAB_NAMES.MAILBOX} value={tabName}>
                      <TabsList>
                        <TabsTrigger className="w-[150px]" value={TAB_NAMES.MAILBOX}>
                          Mailbox
                        </TabsTrigger>
                        <div
                          onClick={() =>
                            toast({ title: "Coming Soon", description: "Custom Address will coming soon." })
                          }
                        >
                          <TabsTrigger className="w-[150px]" value={TAB_NAMES.CUSTOM} disabled>
                            Custom Address
                          </TabsTrigger>
                        </div>
                      </TabsList>
                    </Tabs>

                    <div className={`h-[32px] ${isTableMode ? "hidden" : "flex"}`}>
                      <Separator orientation="vertical" />
                    </div>

                    <Tabs value={tabName} onValueChange={setTabName}>
                      <TabsList>
                        <TabsTrigger className="w-[150px]" value={TAB_NAMES.PRICE_LIST}>
                          Price List
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>

                {/* ── Main Content by Tab ── */}
                <div className="flex flex-col justify-evenly gap-3">
                  {tabName === TAB_NAMES.MAILBOX && (
                    <FormField
                      control={form.control}
                      name="mailboxSelected"
                      render={() => (
                        <>
                          <div>
                            <MailboxSelect
                              form={form}
                              warehouse={store.warehouse}
                              isLoading={store.isLoadingWarehouse}
                              getLabel={getSelectedMailboxLabel}
                              onChange={handleWarehouseChange}
                            />

                            <FormItem className="w-full">
                              <Dimension form={form} />
                              {renderServiceFormSection()}
                            </FormItem>

                            {isTableMode && (
                              <Button
                                className="mt-5 w-full"
                                variant="destructive"
                                type="button"
                                onClick={triggerContinue}
                              >
                                Continue
                              </Button>
                            )}
                          </div>
                        </>
                      )}
                    />
                  )}

                  {tabName === TAB_NAMES.CUSTOM && (
                    <>
                      <ShiptoForm form={form} country_list={countryList} />
                      <Dimension form={form} />
                      {renderServiceFormSection()}
                    </>
                  )}

                  {tabName === TAB_NAMES.PRICE_LIST && (
                    <ServiceTable
                      form={form}
                      warehouse={store.warehouse}
                      otherService={otherServices}
                      serviceList={warehouseServices}
                      selectedData={getSelectedMailboxLabel}
                      handleValueChange={handleWarehouseChange}
                      checkCoutryCode={(code: string) => code?.substring(0, 2).toLowerCase()}
                      loadingService={store.isLoadingService}
                    />
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>

        {/* ── Side / Bottom Panels ── */}
        {isTableMode ? (
          <>
            {openMobileSheet && (
              <Sheet open={openMobileSheet} onOpenChange={setOpenMobileSheet} modal>
                <SheetContent className="rounded-sm" side="bottom">
                  <SheetHeader className="hidden">
                    <SheetTitle>Service Options</SheetTitle>
                    <SheetDescription />
                  </SheetHeader>
                  <ServiceOptions
                    loading_rates={store.isLoadingRates}
                    rates={store.courierRates}
                    getRates={triggerRates}
                    setSummaryData={store.setSummaryData}
                    setShowRates={store.setShowRates}
                    summaryData={store.summaryData}
                    setSelectedData={store.setSelectedRate}
                    selecetedData={store.selectedRate}
                    showRates={store.showRates}
                    setOpenServicesOption={store.setOpenServicesOption}
                    openRatesOption={store.openRatesOption}
                    setOpenRatesOption={store.setOpenRatesOption}
                    selectedService={store.selectedService}
                    setSelectedService={store.setSelectedService}
                    handleContinue={handleContinue}
                    openServicesOption={store.openServicesOption}
                    priceList={packageServices}
                    otherService={otherServices}
                    warehouse_id={store.warehouseId}
                  />
                </SheetContent>
              </Sheet>
            )}

            {store.openServicesOption && (
              <Sheet open={store.openServicesOption} onOpenChange={store.setOpenServicesOption} modal>
                <SheetContent className="flex w-full flex-col rounded-sm" side="bottom">
                  {renderServicePanel(true)}
                </SheetContent>
              </Sheet>
            )}
          </>
        ) : (
          <>
            <div className={styles.service}>
              <ServiceOptions
                loading_rates={store.isLoadingRates}
                rates={store.courierRates}
                getRates={triggerRates}
                setSummaryData={store.setSummaryData}
                setShowRates={store.setShowRates}
                summaryData={store.summaryData}
                setSelectedData={store.setSelectedRate}
                selecetedData={store.selectedRate}
                showRates={store.showRates}
                setOpenServicesOption={store.setOpenServicesOption}
                openRatesOption={store.openRatesOption}
                setOpenRatesOption={store.setOpenRatesOption}
                selectedService={store.selectedService}
                setSelectedService={store.setSelectedService}
                handleContinue={handleContinue}
                openServicesOption={store.openServicesOption}
                priceList={packageServices}
                otherService={otherServices}
                warehouse_id={store.warehouseId}
              />
            </div>
            {renderServicePanel()}
          </>
        )}
      </div>
    </>
  );
}
