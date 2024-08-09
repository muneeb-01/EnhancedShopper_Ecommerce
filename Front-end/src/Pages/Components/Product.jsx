import React from "react";
import { PiShoppingCartSimple } from "react-icons/pi";
import { Link } from "react-router-dom";
function Product({ item }) {
  return (
    <>
      <div className="products flex flex-col justify-center p-5 items-center max-[850px]:rounded-[14px] rounded-[24px] border-2 border-[#F0F0F0] shadow-md active:scale-[0.98] transition ease-in-out duration-200">
        <Link to={`/Shop/${item?.name}/${item?._id}`}>
          <img
            src={item?.images[0]}
            width={340}
            id="img"
            className="rounded-[24px] w-full max-[850px]:rounded-[14px]"
          />
        </Link>
        <div className="max-sm:-z-20 mt-5 relative w-[100%]">
          <span className="text-lg font-medium text-[#55555579]">
            {item?.brand}
          </span>
          <h5 className="font-semibold my-1 text-lg text-[#1a1a1a]">
            {item?.name}
          </h5>
          <h4 className="font-semibold text-2xl text-[#088178]">
            ${item?.price}
          </h4>
          <button
            onClick={() => {
              handleAddToBag(item);
            }}
            className="absolute right-4 hover:bg-[#088178] p-2 rounded-[50%] top-1/3 transition ease duration-150 hover:text-white"
          >
            <PiShoppingCartSimple className="text-3xl" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Product;
