import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shoes Store || فروشگاه کفش جلوه",
  description: "shop store generated with next v13",
  icons: {
    icon: "/img/1.jpg"
  }
};

export default async function RootLayout({ children }) {
 

 
  return (
    <html lang="fa" dir="rtl">

      <body className={inter.className}>
     
        {children}
      
      </body>
    </html>
  );
}
