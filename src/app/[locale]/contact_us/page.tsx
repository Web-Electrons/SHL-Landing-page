"use client";

import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styles from "../styles.module.scss";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { PhoneInput } from "react-international-phone";

import { Loader2, Send } from "lucide-react";
import { ContactFormValues, contactSchema } from "@/schemas/contact.schema";
import { useTranslations } from "next-intl";
import axios from "axios";
import { toast } from "@/src/components/ui/use-toast";
import "react-international-phone/style.css";
import "./style.css";
import { Loaders } from "@/src/components/ui/loaders";

export default function ContactPage() {
  const t = useTranslations("default");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(true);

  const form = useForm<ContactFormValues>({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/ContactUs_set", values);

      if (response.data.status) {
        toast({ title: "Success", description: "Your message has been sent successfully" });
        setSubmitted(true);
      } else {
        toast({ title: "Error", description: response.data.message, variant: "destructive" });
      }

      form.reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loaders />}
      <div className={styles.container}>
        <div className="relative h-full w-full justify-start gap-[32px] bg-[#FFFFF] pt-[90px] text-center">
          <div className="mx-auto flex w-[70%] flex-col gap-5 py-10 pb-14 text-left">
            {submitted && (
              <div className="absolute left-1/2 top-1/2 z-50 flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-4 bg-white py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold">Message Sent Successfully!</h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Thank you for contacting us. Our support team will review your message and get back to you shortly.
                  </p>
                </div>

                <Button className="mt-4" onClick={() => setSubmitted(false)} variant="destructive">
                  Send Another Message
                </Button>
              </div>
            )}
            <div>
              <div className="text-3xl">{t("contact.title")}</div>

              <div>
                <p>{t("contact.title_text")}</p>
              </div>
            </div>

            <div>
              <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-4">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>{t("contact.name")} *</FormLabel>

                          <FormControl>
                            <Input placeholder="John Doe" className="px-2 text-xs" {...field} />
                          </FormControl>

                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>{t("contact.email")} *</FormLabel>

                          <FormControl>
                            <Input type="email" placeholder="john@email.com" className="px-2 text-xs" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone_number"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>{t("contact.phone")}</FormLabel>

                          <FormControl>
                            <div className="flex h-[30px] w-full items-center rounded border border-zinc-300">
                              <PhoneInput
                                country="us" // default country
                                value={field.value}
                                onChange={(phone) => field.onChange(phone)} // biarkan library handle '+'
                                enableSearch
                                disableDropdown={false}
                                inputProps={{
                                  name: "phone",

                                  autoFocus: false,
                                  className:
                                    " flex-1 h-9 px-2 text-xs bg-transparent placeholder:text-zinc-400 focus:outline-none focus:bg-transparent w-full",
                                  placeholder: "+1 123 456 7890",
                                }}
                                countrySelectorStyleProps={{
                                  style: {
                                    background: "transparent",
                                    border: "none",
                                    boxShadow: "none",
                                    outline: "none",
                                    padding: 0,
                                    margin: 0,
                                  },
                                  buttonStyle: {
                                    background: "transparent",
                                    border: "none",
                                    boxShadow: "none",
                                    outline: "none",
                                    padding: 0,
                                    margin: 0,
                                  },
                                  dropdownStyleProps: {
                                    className: "phone-dropdown",
                                  },
                                }}
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>{t("contact.subject")} *</FormLabel>

                          <FormControl>
                            <Input placeholder={t("contact.subject")} className="px-2 text-xs" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>{t("contact.message")} *</FormLabel>

                          <FormControl>
                            <Textarea
                              rows={7}
                              placeholder={t("contact.msgPlaceholder")}
                              className="px-2 text-xs"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" disabled={loading} variant="destructive" className="mt-4 w-full md:w-auto">
                    <Send className="mr-2 h-4 w-4" />
                    {t("contact.send")}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
