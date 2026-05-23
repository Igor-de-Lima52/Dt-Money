import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import Image from "next/image";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dt-Money - Login",
  description: "Gerencie suas finanças de forma simples e eficiente com o Dt-Money, a aplicação de controle financeiro que te ajuda a organizar suas despesas e receitas em um só lugar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col items-center justify-center p-4 gap-10">
        <Image src="/logo.svg" alt="DT Money" width={200} height={50} className="-mt-16 -ml-5" />
        {children}
      </body>
    </html>
  );
}
