import "./globals.css";
import AosInit from "../../../util/AosInit";
import ScrollToTop from "@/components/modules/ScrollToTop";
import Footer from "@/components/modules/Footer";
import NavBar from "@/components/modules/NavBar";
import { cookies } from "next/headers";
import userModel from "@/root/models/User";
import { verifyAccessToken } from "@/root/util/auth/auth";
import connectToDB from "@/root/configs/db";


export default async function RootLayout({ children }) {
  let user = null;
  connectToDB()
  const token = cookies().get("token")
  if (token) {
    const tokenPayLoad = verifyAccessToken(token.value)
    if (tokenPayLoad) {
      user = await userModel.findOne({ phoneNumber: tokenPayLoad.phoneNumber });
    }
  }

  return (
    <div>
      {/* <html lang="fa" dir="rtl"> */}

      {/* <body > */}
      <NavBar isLogedIn={user ? true : false} user={user ? JSON.parse(JSON.stringify(user)) : ""} />
      <ScrollToTop />
      <AosInit />
      {children}
      <Footer />
      {/* </body> */}
      {/* </html> */}
    </div >
  );
}
