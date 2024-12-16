
import { Inter } from "next/font/google";
import "./globals.css";
import AosInit from "../../../util/AosInit";
import ScrollToTop from "@/components/modules/ScrollToTop";
import Footer from "@/components/modules/Footer";
import NavBar from "@/components/modules/NavBar";
import { cookies } from "next/headers";
import userModel from "@/root/models/User";
import { verifyAccessToken } from "@/root/util/auth/auth";
import connectToDB from "@/root/configs/db";
const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Shoes Store || فروشگاه کفش جلوه",
//   description: "shop store generated with next v13",
//   icons: {
//     icon: "/img/1.jpg"
//   }
// };

export default async function RootLayout({ children }) {
  let user = null;
  connectToDB()
  const token = cookies().get("token")
  if (token) {
    const tokenPayLoad = verifyAccessToken(token.value)
    if (tokenPayLoad) {
      user = await userModel.findOne({ phoneNumber: tokenPayLoad.phoneNumber });
      console.log("ussser : ", user)
    }
  }

  return (
    <html lang="fa" dir="rtl">

      <body className={inter.className}>
        <NavBar isLogedIn={user ? true : false} />
        <ScrollToTop />
        <AosInit />
        {children}
        <Footer />
      </body>
    </html>
  );
}
