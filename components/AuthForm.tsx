"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        };
        const newUser = await signUp(userData);
        setUser(newUser);
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-6">
        <Link href="/" className="cursor-pointer flex items-center gap-1 ">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Safe Zone Logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Safe Zone
          </h1>
        </Link>
        <div className="flex col gap-1 md:gap-3">
          <h2 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user
              ? "Hesaba Yönlendiriliyor"
              : type == "sign-in"
              ? "Giriş Yap"
              : "Kayıt Ol"}
            <p className="text-16 font-normal text-gray-600">
              {user ? "Hesabınızı Giriniz" : "Lütfen Bilgilerinizi Giriniz"}
            </p>
          </h2>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="Adınız"
                      placeholder="Adınızı girin"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Soyadınız"
                      placeholder="Soyadınızı girin"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Adres"
                    placeholder="Adresinizi girin"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="Şehir"
                    placeholder="Yaşadığınız şehri girin"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State (Sadece ABD Eyaletleri)"
                      placeholder="Örn: NY, AK, IN vb."
                    />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Posta Kodu"
                      placeholder="Örn: 11101"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Doğum Tarihi"
                      placeholder="Örn: 1997"
                    />

                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="Sosyal Güvenlik Numarası"
                      placeholder="Örn: 1234"
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Emailinizi girin"
              />

              <CustomInput
                control={form.control}
                name="password"
                label="Şifre"
                placeholder="Şifrenizi girin"
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Yükleniyor...
                    </>
                  ) : type === "sign-in" ? (
                    "Giriş Yap"
                  ) : (
                    "Kayıt Ol"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-400">
              {type === "sign-in"
                ? "Henüz hesabınız yok mu?"
                : "Zaten bir hesabınız var mı?"}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Kaydol" : "Giriş Yap"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
