import React from "react";
import Image from "next/image";
import BreadCrumb from "@/components/modules/BreadCrumb";

export default function AboutUs() {
  return (
    <div className="mt-28">
      <BreadCrumb titles={"درباره ما"} />
      <div className="flex justify-evenly mt-4">
        <div data-aos="flip-right" className="hover:shadow-inner shadow-lg p-1 text-justify w-1/4 flex flex-col justify-center items-center">
          <div className="font-BYekan text-sm">درباره ما</div>
          <div className="font-BYekan text-2xl">
            مجموعه فروشگاه های کفش <span className="text-red-600">جلوه</span>
          </div>
        </div>
        <div data-aos="flip-up" className="hover:shadow-inner shadow-lg p-4 text-justify w-1/4">
          <p className="font-BYekan">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و
          </p>
        </div>
        <div data-aos="flip-left" className="hover:shadow-inner shadow-lg p-4 text-justify w-1/4">
          <p className="font-BYekan">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و
          </p>
        </div>
      </div>
      <div className="mt-9 mx-20 flex flex-col">
        <div data-aos="fade-up" className=" my-4 flex justify-evenly gap-9 items-center w-full text-justify p-9">
          <div data-aos="fade-left" className="flex flex-col w-2/3 hover:shadow-inner shadow-lg ">
            <div className="text-2xl font-BYekan ">داستان ما در کفش جلوه</div>
            <div className="p-4 shadow-xl justify-center font-BYekan">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، ولورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
              و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
              مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
              مورد نیاز، ولورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
              چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه
              روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
              تکنولوژی مورد نیاز، و
            </div>
          </div>
          <div data-aos="fade-right" className="w-1/3">
            <Image src="/img/banner2.jpg" width={400} height={400} />
          </div>
        </div>
        <div  className="flex gap-9 p-9 my-9 mt-9 justify-center w-full font-BYekan text-justify">
          <div data-aos="fade-left" className="w-1/3">
            <Image src="/img/banner2.jpg" width={400} height={400} />
          </div>
          <div data-aos="fade-right" className="flex flex-col w-2/3 hover:shadow-inner shadow-lg">
            <div className="text-2xl font-BYekan "> و ادامه راه ...</div>
            <div className="p-4 shadow-xl justify-center font-BYekan">
              ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، ولورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
              و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
              مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
              مورد نیاز، ولورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
              چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه
              روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
              تکنولوژی مورد نیاز، و
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
