import NavBar from "@/components/modules/NavBar";
import Swiper from "@/components/templates/Swiper/Swiper";
import Title from "@/components/modules/Title";
import LatestProducts from "@/components/modules/LatestProducts";
import ShopPromote from "@/components/templates/ShopPromote";


export default function Home() {
  return (
    <div className="font-BYekan ">
      <NavBar />
      <Swiper />
      <Title title={'جدیدترین محصولات'} action={ 'نمایش بیشتر' }/>
      <LatestProducts />
      <Title title={'چرا کفش جلوه ...'} action={ 'نمایش بیشتر' }/>
      <ShopPromote/>
    </div>
  );
}
