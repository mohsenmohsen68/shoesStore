import "./globals.css";
import AosInit from "../../../util/AosInit";
import ScrollToTop from "@/components/modules/ScrollToTop";
import Footer from "@/components/modules/Footer";
import { cookies } from "next/headers";
import userModel from "@/root/models/User";
import { verifyAccessToken } from "@/root/util/auth/auth";
import connectToDB from "@/root/configs/db";
import Header from "@/components/modules/dashboard/Header";
import AdminSideBar from "@/components/modules/dashboard/AdminSideBar";
import { redirect } from "next/navigation";

// export const metadata = {
//   title: "Shoes Store || فروشگاه کفش جلوه",
//   description: "shop store generated with next v13",
//   icons: {
//     icon: "/img/1.jpg"
//   }
// };

export default async function RootLayout({ children }) {
  let user = null;
  connectToDB();
  const token = cookies().get("token");
  if (token) {
    const tokenPayLoad = verifyAccessToken(token.value);
    if (tokenPayLoad) {
      user = await userModel.findOne({ phoneNumber: tokenPayLoad.phoneNumber });
      // console.log("ussser : ", user)
    } else {
      redirect('/login')
    }
  } else {
    redirect('/login')
  }
  if (user.role !== "ADMIN") {
    redirect('/p-user')
  }

  return (
    <>
      {/* <html lang='fa' dir='rtl'>
      <body> */}

      <div className='w-full flex h-dvh'>
        <div className='w-1/5'>
          <AdminSideBar />
        </div>
        <div className='w-4/5'>
          <Header username={user.userName} role={user.role} />
          {children}
        </div>
      </div>
      <ScrollToTop />
      <AosInit />
      {/* </body>
      </html> */}
    </>
  );
}
