import React from "react";

function NewsTeller() {
  return (
    <section
      id="newsletter"
      className="relative w-[100vw] h-[260px] max-sm:h-[180px] max-sm:mt-[125px] flex-wrap overflow-hidden bg-[#041D44] flex justify-between items-center px-[10vw]"
    >
      <img
        src="/Assets/banner/b14.png"
        className="absolute w-[50%] object-cover"
      ></img>
      <div>
        <h4 className="text-4xl text-white font-semibold max-lg:text-2xl">
          Sign up for Newsletters
        </h4>
        <p className=" text-[1.25vw] text-[#818181] font-medium mt-3 ml-1 max-lg:text-[13px] max-sm:text-xs">
          Get E-mail updates about our latest shop and{" "}
          <span className="text-yellow-500">Special Offers.</span>
        </p>
      </div>
      <div className=" w-[31vw] max-sm:w-[90vw] rounded-md flex justify-center items-center overflow-hidden h-[63px] max-lg:h-[35px] max-xl:h-[45px] ">
        <input
          type="email"
          placeholder="Your email address"
          className="rounded-l-md border-2 border-transparent w-[75%] text-lg font-medium pl-4 h-[100%] outline-none max-lg:text-sm"
        />
        <button className="active:scale-95 w-[25%] rounded-r-md h-[100%] text-[22px] max-lg:text-[13px] max-xl:text-[16px] max-xl:h-[48px] text-white font-medium bg-[#076B63] hover:bg-[#1a534ff3]">
          Sign Up
        </button>
      </div>
    </section>
  );
}

export default NewsTeller;
