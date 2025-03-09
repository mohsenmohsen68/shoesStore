import Swiper from "@/components/templates/Swiper/Swiper";
import Title from "@/components/modules/Title"
import LatestProducts from "@/components/modules/LatestProducts";
import ShopPromote from "@/components/templates/ShopPromote";
import ArticlesSwiper from "@/components/modules/ArticlesSwiper";
import connectToDB from "@/root/configs/db";
import productModel from "@/root/models/Product";
import articlesModel from "@/root/models/article";

 async function Home() {
    
    connectToDB()
    const products = await productModel.find({}).sort({_id:-1}).limit(8);
    console.log("products : ", products)

    const articles = await articlesModel.find({}).sort({_id:-1}).limit(8);
  
  return (
    <div className="font-BYekan ">
      <Swiper />
      <Title title={'جدیدترین محصولات'} action={'نمایش بیشتر'} link={"/products"} />
      <LatestProducts products = {JSON.parse(JSON.stringify(products))} />

      <Title title={'چرا کفش جلوه ...'} action={'نمایش بیشتر'} link={"/aboutus"} />
      <ShopPromote img1={"/img/promote4.jpg"} img2={"/img/promote2.jpg"}/>
      <br/>
      <Title title={'آخرین مقالات'} action={'نمایش بیشتر'} link={"/articles"} />
      <ArticlesSwiper articles = {JSON.parse(JSON.stringify(articles))}/>
    </div>
  );
}

export default Home;
