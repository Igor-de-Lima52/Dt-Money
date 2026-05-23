import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dt-Money - Home",
  description: "Gerencie suas finanças de forma simples e eficiente com o Dt-Money, a aplicação de controle financeiro que te ajuda a organizar suas despesas e receitas em um só lugar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col md:overflow-hidden">{children}</body>
    </html>
  );
}
