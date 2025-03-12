import Swiper from "@/components/templates/Swiper/Swiper";
import Title from "@/components/modules/Title"
import LatestProducts from "@/components/modules/LatestProducts";
import ShopPromote from "@/components/templates/ShopPromote";
import ArticlesSwiper from "@/components/modules/ArticlesSwiper";
import connectToDB from "@/root/configs/db";
import productModel from "@/root/models/Product";
import articlesModel from "@/root/models/article";
import Footer from "@/components/modules/Footer";
import dynamic from 'next/dynamic';
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/root/util/auth/auth";
import userModel from "@/root/models/User";

const NavBar = dynamic(() => import('@/components/modules/NavBar'), { ssr: false });

async function Home() {

  connectToDB()
  let user = null;
  const token = cookies().get("token")
  if (token) {
    const tokenPayLoad = verifyAccessToken(token.value)
    if (tokenPayLoad) {
      user = await userModel.findOne({ phoneNumber: tokenPayLoad.phoneNumber });
    }
  }
  const products = await productModel.find({}).sort({ _id: -1 }).limit(8);
  console.log("products : ", products)

  const articles = await articlesModel.find({}).sort({ _id: -1 }).limit(8);

  return (
    <div className="font-BYekan ">
       <NavBar isLogedIn={user ? true : false} user={user ? JSON.parse(JSON.stringify(user)) : ""} />
      <Swiper />
      <Title title={'جدیدترین محصولات'} action={'نمایش بیشتر'} link={"/products"} />
      <LatestProducts products={JSON.parse(JSON.stringify(products))} />

      <Title title={'چرا کفش جلوه ...'} action={'نمایش بیشتر'} link={"/aboutus"} />
      <ShopPromote img1={"/img/promote4.jpg"} img2={"/img/promote2.jpg"} />
      <br />
      <Title title={'آخرین مقالات'} action={'نمایش بیشتر'} link={"/articles"} />
      <ArticlesSwiper articles={JSON.parse(JSON.stringify(articles))} />
      <Footer />
    </div>
  );
}

export default Home;
