import NavBar from "@/components/modules/NavBar";
import Swiper from "@/components/templates/Swiper/Swiper";
import Title from "@/components/modules/Title";
import LatestProducts from "@/components/modules/LatestProducts";
import ShopPromote from "@/components/templates/ShopPromote";
import ArticlesSwiper from "@/components/modules/ArticlesSwiper";
import Footer from "@/components/modules/Footer";
import { connectToDB } from "../../configs/db";


export default function Home() {
  connectToDB()
  return (
    <div className="font-BYekan ">
      <NavBar />
      <Swiper />
      <Title title={'جدیدترین محصولات'} action={ 'نمایش بیشتر' }/>
      <LatestProducts />
      <Title title={'چرا کفش جلوه ...'} action={ 'نمایش بیشتر' }/>
      <ShopPromote/>
      <Title title={'آخرین مقالات'} action={ 'نمایش بیشتر' }/>
      <ArticlesSwiper/>
      <Footer/>
    </div>
  );
}
