import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
function Footer() {
  return (
    <section className="w-full mt-[2vw] px-[6vw] ">
      <div className="border-b-4 border-[#dad4d4] pt-[2vw] h-[30vh] flex flex-col justify-around items-center">
        <div className="">
          <Link
            to="/home"
            className="flex gap-4 justify-center items-center text-[2.4rem] font-semibold"
          >
            <img src="./Assets/logo.png" alt="" />
            <h2>SHOPPERS</h2>
          </Link>
        </div>
        <div className="w-full flex justify-center items-center ">
          <ul className="flex text-[1.17rem] font-medium gap-6">
            {["kids", "men", "women", "shop", "profile"].map((val, idx) => {
              return (
                <Link
                  to={
                    val == "shop"
                      ? "/shop"
                      : val == "profile"
                      ? "/profile"
                      : `/shop/${val.toLowerCase()}`
                  }
                  className="cursor-pointer"
                  key={idx}
                >
                  {val}
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="w-full flex justify-center items-center ">
          <ul className="flex text-[1.17rem] font-medium gap-6">
            {[1, 2].map((val, idx) => {
              return (
                <Link
                  to={val}
                  className="cursor-pointer bg-gray-50 rounded-3xl"
                  key={idx}
                >
                  {val === 1 ? (
                    <FaInstagram className="size-[1.8vw]" />
                  ) : (
                    <FaWhatsapp className="size-[1.8vw]" />
                  )}
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      <p className="p-[2vw] text-center">
        Copyright @ 2023 - All Right Reserved
      </p>
    </section>
  );
}

export default Footer;
