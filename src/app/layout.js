require("dotenv").config();

import { Providers } from "@/redux/provider";
import { ThemeProvider } from "next-themes";
import './globals.css'

export const metadata = {
  title: "Shoes Store || فروشگاه کفش جلوه",
  description: "shop store generated with next v13",
  icons: "/img/1.jpg"
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang='fa' dir='rtl' suppressHydrationWarning={true}>
        <body>
          <ThemeProvider attribute='class'>

            {children}

          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
