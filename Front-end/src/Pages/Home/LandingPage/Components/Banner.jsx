import React from "react";

const Banner = () => {
  return (
    <section
      id="small-banners"
      className="flex flex-col items-center justify-center my-[7vw] max-sm:mt-12 "
    >
      <div className="w-[90vw] h-[25vw] max-lg:h-[80vw] flex max-lg:flex-col items-center justify-between">
        <div className="w-[840px] max-lg:w-[90vw] h-[100%] max-xl:w-[43.5vw] max-lg:mb-4 relative hover:scale-[0.98] transition ease duration-150">
          <img
            src="/Assets/banner/b17.jpg"
            className="absolute object-cover w-[100%] h-[100%] -z-10"
          ></img>
          <div className="pl-[45px] mt-[150px] max-lg:mt-[80px] max-xl:mt-[14%] max-sm:mt-[12%] max-sm:pl-[24px]">
            <h4 className="text-4xl text-white font-light max-lg:text-3xl max-xl:text-xl max-sm:text-xl">
              crazy deals
            </h4>
            <h2 className="text-6xl text-white font-semibold max-lg:text-5xl max-xl:text-4xl max-sm:text-2xl">
              buy 1 get 1 free
            </h2>
            <p className="text-2xl font-medium text-[#fff] max-lg:font-normal max-xl:text-lg max-sm:text-sm">
              The best classic dress is on sale at cara
            </p>
            <button className="bg-[#088178] text-white text-2xl max-xl:text-xl max-sm:text-sm max-sm:mb-4 py-[12px] px-[28px] rounded-[3px]  font-medium hover:bg-[#fff] mt-3 hover:text-[#088178] transition ease duration-150">
              Learn More
            </button>
          </div>
        </div>
        <div className="w-[840px] h-[100%] max-lg:w-[90vw] max-xl:w-[43.5vw] relative hover:scale-[0.98] transition ease duration-150">
          <img
            src="/Assets/banner/b10.jpg"
            className="absolute object-cover w-[100%] h-[100%] -z-10"
          ></img>
          <div className="pl-[45px] mt-[150px] max-lg:mt-[80px] max-xl:mt-[14%] max-sm:mt-[12%] max-sm:pl-[24px]">
            <h4 className="text-4xl text-white font-light max-lg:text-3xl max-xl:text-xl max-sm:text-xl">
              spring / summer
            </h4>
            <h2 className="text-6xl text-white font-semibold max-lg:text-5xl max-xl:text-4xl max-sm:text-2xl">
              up comming season
            </h2>
            <p className="text-2xl font-medium text-[#fff] max-lg:font-normal max-xl:text-lg max-sm:text-sm">
              The best classic dress is on sale at cara
            </p>
            <button className="bg-[transparent] border-[3px] max-xl:text-xl max-sm:text-sm max-sm:mb-4 text-white text-2xl py-[12px] max-sm:py-2 px-[28px] rounded-[3px]  font-medium hover:bg-[#fff] mt-3 hover:text-[#088178] transition ease duration-150">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
