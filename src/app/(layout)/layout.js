import { Inter } from "next/font/google";
import "./globals.css";
import AosInit from "../../../public/util/AosInit";
import ScrollToTop from "@/components/modules/ScrollToTop";
import NavBar from "@/components/modules/NavBar";
import Footer from "@/components/modules/Footer";
import connectToDB from "@/root/configs/db";
import { cookies } from "next/headers";
import userModel from "@/root/models/users";
import { verifyAccessToken } from "@/root/public/util/auth/auth";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shoes Store || فروشگاه کفش جلوه",
  description: "shop store generated with next v13",
  icons: {
    icon: "/img/1.jpg"
  }
};

export default async function RootLayout({ children }) {
  connectToDB()
  let user = null;
  const token = cookies().get("token")
  console.log("mmmmmmmmmm ------> ",token)
  if(token){
    const tokenPayLoad = verifyAccessToken(token.value)
    console.log("payload -------> ",tokenPayLoad)
    user = await userModel.findOne({email:tokenPayLoad.email});
    console.log('user ----->',user)
  }

 
  return (
    <html lang="fa" dir="rtl">

      <body className={inter.className}>
      <NavBar isLogedIn={user?true:false} />
        <ScrollToTop/>
        <AosInit />
        {children}
      <Footer/>
      </body>
    </html>
  );
}
