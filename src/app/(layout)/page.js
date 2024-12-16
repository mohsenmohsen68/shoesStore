import Swiper from "@/components/templates/Swiper/Swiper";
import Title from "@/components/modules/Title";
import LatestProducts from "@/components/modules/LatestProducts";
import ShopPromote from "@/components/templates/ShopPromote";
import ArticlesSwiper from "@/components/modules/ArticlesSwiper";

 function Home() {
    
    
  
  return (
    <div className="font-BYekan ">
      <Swiper />
      <Title title={'جدیدترین محصولات'} action={'نمایش بیشتر'} />
      <LatestProducts />
      <Title title={'چرا کفش جلوه ...'} action={'نمایش بیشتر'} />
      <ShopPromote />
      <Title title={'آخرین مقالات'} action={'نمایش بیشتر'} />
      <ArticlesSwiper />
    </div>
  );
}

export default Home;
