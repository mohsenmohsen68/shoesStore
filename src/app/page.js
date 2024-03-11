import NavBar from "@/components/modules/NavBar";
import Swiper from "@/components/templates/Swiper/Swiper";
import Title from "@/components/modules/Title";
import LatestProducts from "@/components/modules/LatestProducts";


export default function Home() {
  return (
    <div className="font-BYekan">
      <NavBar />
      <Swiper />
      <Title title={'جدیدترین محصولات'} action={ 'نمایش بیشتر' }/>
      <LatestProducts/>
    </div>
  );
}
