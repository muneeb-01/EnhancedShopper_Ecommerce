import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex w-full z-[999] bg-[#FFFFFF] fixed justify-between px-[8vw] items-center py-[2.5rem] drop-shadow shadow">
      <div>
        <Link
          to="/"
          className="flex gap-4 justify-center items-center text-[2.4rem] font-semibold"
        >
          <img src="/Assets/logo.png" alt="" />
          <h2 className="flex leading-7 flex-col mt-5  justify-start items-start">
            SHOPPERS
            <span className="text-[0.8rem] text-[#EB423F] ">Admin Panel</span>
          </h2>
        </Link>
      </div>
      <div>
        <div className="size-[3vw] rounded-full bg-slate-300"></div>
      </div>
    </div>
  );
}

export default Navbar;
