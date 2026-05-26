import type { Metadata } from "next";
import { Roboto } from "next/font/google";
// import "../globals.css";
import Image from "next/image";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dt-Money - Sign Up",
  description: "Gerencie suas finanças de forma simples e eficiente com o Dt-Money, a aplicação de controle financeiro que te ajuda a organizar suas despesas e receitas em um só lugar.",
};

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Image src="/logo.svg" alt="DT Money" width={200} height={50} className="mb-6 -ml-8 w-auto h-8 md:h-auto mt-6 md:mt-0" loading={"lazy"} />
      {children}
    </>
  );
}
