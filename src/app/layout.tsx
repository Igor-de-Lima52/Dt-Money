import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./contexts/auth-context";
import { AccountProvider } from "./contexts/account-context";
import { FinanceProvider } from "./contexts/finance-context";
import { Providers } from "./providers";

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
      lang="en"
      className={`${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col items-center justify-center bg-[#121214] text-[#e1e1e6] antialiased">
        <Providers>
          <AuthProvider>
            <AccountProvider>
              <FinanceProvider>
                {children}
              </FinanceProvider>
            </AccountProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
