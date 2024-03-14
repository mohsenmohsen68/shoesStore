import { Inter } from "next/font/google";
import "./globals.css";
import AosInit from "../../public/util/AosInit";
import ScrollToTop from "@/components/modules/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shoes Store || فروشگاه کفش جلوه",
  description: "shop store generated with next v13",
  icons: {
    icon: "/img/1.jpg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        <ScrollToTop/>
        <AosInit />
        {children}
      </body>
    </html>
  );
}
