import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Product from "../../Components/Product";

function Shop({ items, category }) {
  return (
    <section
      id="product-1"
      className="px-[80px] mt-[4vh] max-sm:mt-[2vh] max-md:px-[6vw]"
    >
      <div className="w-full h-[20vh] bg-gradient-to-r from-[#FBE2E2] to-[#fff] flex justify-center opacity-90 rounded-md shadow-inner mb-2 z-20 items-center ">
        <h2 className="text-[6rem] font-medium tracking-tight leading-[1vw] max-xl:text-[11vw] opacity-90 -z-10 max-xl:leading-[10vw] ">
          {category}
        </h2>
      </div>
      <div className=" text-center flex justify-between items-center">
        <p className="inline max-lg:font-normal max-md:text-[2vw] max-xl:text-lg max-sm:text-[2vw] text-nowrap">
          Showing 1-16 out of <span>{5}</span> Products
        </p>
        <button className="px-8 py-3 max-sm:py-[0.5vh] max-sm:text-[2vw] max-lg:px-[2.2vw] max-lg:py-[0.6vh] max-lg:text-[1.6vw] max-[1225px]:py-[1vh] max-[1225px]:text-[1.3vw] text-nowrap max-[1225px]:px-[2vw] flex items-center justify-center gap-2 rounded-full text-[1.17rem] font-medium  border border-gray-400 text-gray-700 hover:bg-gray-100 focus:outline-none">
          sort by <MdKeyboardArrowDown className="size-[1.3vw]" />
        </button>
      </div>
      <div className="grid grid-cols-1 min-[700px]:grid-cols-2 lg:grid-cols-3   xl:grid-cols-4 gap-8 p-24">
        {items?.map((item) => {
          return <Product key={item?._id} item={item} />;
        })}
      </div>
    </section>
  );
}

export default Shop;
