import React from "react";

const Hero = () => {
  return (
    <div className="w-full h-[88vh] mb-[4.5vw] bg-gradient-to-b from-[#FAE1FD] to-[#fff] flex justify-center items-center relative -z-20">
      <div className="w-1/2 h-full flex justify-center items-center max-lg:w-[100vw] max-lg:pr-[15vw]">
        <div>
          <h4 className="text-[1.8rem] font-normal tracking-tight leading-[6.2vw]  max-xl:leading-[2vw] max-xl:text-[2.5vw] max-lg:text-[3.5vw] max-lg:leading-[2vw]">
            NEW ARRIVALS ONLY
          </h4>
          <div>
            <div className="flex justify-start items-center gap-5">
              <h2 className="text-[6rem] font-medium tracking-tight leading-[1vw] max-xl:text-[11vw] max-xl:leading-[10vw] ">
                new
              </h2>
              <img
                className=" size-[7rem] max-xl:size-[5vw]"
                src="./Assets/hand_icon.png"
                alt=""
              />
            </div>
            <h2 className="text-[6rem] font-medium tracking-tight leading-[6.2vw] max-xl:text-[11vw] max-xl:leading-[10vw]">
              collections
            </h2>
            <h2 className="text-[6rem] font-medium tracking-tight leading-[6.2vw] max-xl:text-[11vw] max-xl:leading-[10vw]">
              for everyone
            </h2>
            <button className="flex max-lg:text-[2vw] max-lg:px-[4vw]  max-xl:px-[1.8vw] max-xl:py-[1.3vh] max-xl:text-[1vw] justify-center items-center gap-4 px-8 py-3 border-2 hover:border-black transition-all active:scale-95 rounded-full text-[1.17rem] font-medium mt-5 hover:bg-transparent hover:text-black text-white focus:outline-none bg-[#ff4f4f] ">
              Latest Collection
              <img
                className="max-xl:text-[1vw]"
                src="./Assets/arrow.png"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full flex justify-center items-center  max-xl:absolute">
        <img
          className="h-[35vw] opacity-80 max-lg:size-[60vh]"
          src="./Assets/hero_image.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Hero;
