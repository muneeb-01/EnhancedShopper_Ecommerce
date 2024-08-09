import React from "react";
import Product from "./Product";
import { useSelector } from "react-redux";

function FeaturedProducts({ Heading }) {
  const newCollection = useSelector((store) => store.newCollection);
  return (
    <section id="product-1" className="max-sm:mt-[25vh]">
      <div className=" text-center">
        <h1 className="text-[83px] text-[#000] font-semibold max-lg:text-6xl max-xl:text-7xl max-sm:text-2xl">
          {Heading}
        </h1>
        <p className="text-2xl pb-1 font-light text-[#555] max-sm:text-base">
          Summer Collection New Modern Design's
        </p>
      </div>

      <div className="grid grid-cols-1 min-[700px]:grid-cols-2 lg:grid-cols-3   xl:grid-cols-4 gap-8 p-24">
        {newCollection.map((item) => {
          return <Product key={item._id} item={item} />;
        })}
      </div>
    </section>
  );
}

export default FeaturedProducts;
