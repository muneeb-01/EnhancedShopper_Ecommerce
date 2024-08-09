import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

function Header() {
  const personalInfo = useSelector((store) => store.personalInfo);
  const userInfo = useSelector((store) => store.userInfo);
  const [open, setOpen] = useState(false);

  return (
    <div className=" relative flex z-[99] justify-around items-center py-[2.5rem] drop-shadow shadow max-lg:px-[6vw] max-lg:py-[4vh] max-[1225px]:py-[2vw] max-[1225px]:px-[6vw] max-sm:px-[2vw] ">
      <div>
        <Link
          to="/home"
          className="flex gap-4 max-sm:gap-2 justify-center items-center text-[2.4rem] font-semibold"
        >
          <img
            src="/Assets/logo.png"
            className="  max-lg:size-[5vw] max-[1225px]:size-[4vw] max-sm:size-[6vw]"
            alt=""
          />
          <h2 className=" max-lg:text-[2.8vw]  max-[1225px]:text-[2.3vw] max-sm:text-lg">
            SHOPPERS
          </h2>
        </Link>
      </div>
      <div>
        <ul
          className={`flex text-[1.17rem]  font-medium gap-6 max-sm:absolute max-sm:flex max-sm:flex-col max-sm:z-[999] max-sm:h-[100vh] max-sm:bg-white max-sm:top-[100%] max-sm:w-[45vw] max-sm:px-[6vw] max-sm:py-[4vh] transition-all duration-1000 ${
            open === true ? "max-sm:right-0 h-full" : "max-sm:right-[-50%] z-50"
          }`}
        >
          <li>
            <RxCross2
              onClick={() => setOpen(false)}
              className="hidden  max-sm:block mb-[3vh]"
            />
          </li>
          {["Shop", "Men", "Women", "Kids"].map((val, idx) => {
            return (
              <Link
                onClick={() => setOpen(false)}
                to={val == "Shop" ? "/shop" : `/shop/${val.toLowerCase()}`}
                className="cursor-pointer max-lg:text-[1.6vw] max-[1225px]:text-[1.3vw] max-sm:text-[3vw]"
                key={idx}
              >
                {val}
              </Link>
            );
          })}
        </ul>
      </div>
      <div>
        <div className="flex justify-center items-center gap-4 ">
          <Link to="/profile">
            <div className="size-[3.1em] border-gray-300 border-2 bg-slate-100 rounded-full overflow-hidden">
              {personalInfo?.profile ? (
                <img
                  className="w-full object-cover"
                  src={personalInfo.profile}
                  alt=""
                />
              ) : (
                <div
                  className={`h-full w-full text-2xl cursor-pointer text-gray-800  flex items-center justify-center bg-slate-200  rounded-full `}
                >
                  {personalInfo?.firstname
                    ? personalInfo?.firstname.split("").shift().toUpperCase()
                    : userInfo.email.split("").shift().toUpperCase()}
                </div>
              )}
            </div>
          </Link>

          <Link to="/cart" className="relative">
            {/* {bagItems.length > 0 && (
              <div className="absolute max-sm:hidden max-lg:text-[1.4vw] max-[1225px]:text-[1vw]  max-[1225px]:size-4 top-0 right-[-8px] rounded-full bg-red-500 text-white size-5 text-center text-[0.8rem] ">
                {bagItems.length}
              </div>
            )} */}
            <img
              src="/Assets/cart_icon.png"
              className="max-lg:size-[4vw] max-[1225px]:size-[3vw]"
              alt=""
            />
          </Link>
          <IoMenuSharp
            onClick={() => setOpen(!open)}
            className="size-[4vw] hidden max-sm:block"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
