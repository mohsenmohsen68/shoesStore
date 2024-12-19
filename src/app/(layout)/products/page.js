import BreadCrumb from "@/components/modules/BreadCrumb";
import ProductBox from "@/components/modules/ProductBox";
import connectToDB from "@/root/configs/db";
import productModel from "@/root/models/Product";
export default async function page() {
  connectToDB();
  const myProducts = await productModel.find({})
  console.log("my products : ", myProducts);
 
  return (
    <div className='mt-28'>
      <BreadCrumb titles={"محصولات"} />
      <div className="my-4 p-4 place-items-center grid gap-x-4 gap-y-8 grid-cols-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {console.log("bbb : ", myProducts)}
        {myProducts.map((item) => <ProductBox key={item._id} product={JSON.parse(JSON.stringify(item))} />)}

      </div>
    </div>
  );
}

