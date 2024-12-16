"use client"
import { Inter } from "next/font/google";
import "./(layout)/globals.css";
import { Providers } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Shoes Store || فروشگاه کفش جلوه",
//   description: "shop store generated with next v13",
//   icons: {
//     icon: "/img/1.jpg"
//   }
// };

export default function RootLayout({ children }) {
  return (
    <html lang='fa' dir='rtl'>
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}
