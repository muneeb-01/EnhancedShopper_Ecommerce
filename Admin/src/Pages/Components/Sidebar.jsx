import React, { useState } from "react";
import { FaList } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import { apiClient } from "../../lib/apiClient";
import { LOGOUT_ROUTE } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userInfoActions } from "../../ReduxStore/Slices/userInfoSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const responce = await apiClient.get(LOGOUT_ROUTE, {
        withCredentials: true,
      });
      if (responce.status === 200) {
        dispatch(userInfoActions.setUserInfo(null));
        navigate("/auth");
      }
    } catch (error) {
      toast.error("Somthing went wrong...");
    }
  };

  return (
    <section className="w-full bg-gray-50 min-h-[100vh] flex">
      <div className="sticky w-[19%] top-[16%] h-[84vh] p-6 flex flex-col gap-4  bg-white">
        <Link
          to="/"
          className="w-full flex justify-center items-center gap-5 flex-nowrap cursor-pointer bg-gray-100 py-5 rounded-md"
        >
          <img className="size-[1.5rem]" src="/Assets/cart_icon.png" alt="" />
          <h4 className="text-[1.2rem]">Add Product</h4>
        </Link>
        <Link
          to="/ProductsList"
          className="w-full flex justify-center items-center gap-5 flex-nowrap cursor-pointer bg-gray-100 py-5 rounded-md"
        >
          <FaList className="size-[1.3rem]" />
          <h4 className="text-[1.2rem]">Products List</h4>
        </Link>
        <Link
          to="/OrderList"
          className="w-full flex justify-center items-center gap-5 flex-nowrap cursor-pointer bg-gray-100 py-5 rounded-md"
        >
          <FaList className="size-[1.3rem]" />
          <h4 className="text-[1.2rem]">Orders List</h4>
        </Link>

        <button
          onClick={handleLogout}
          className="text-red-500 text-xl absolute bottom-[5%] left-[50%] -translate-x-[50%] cursor-pointer"
        >
          Logout
        </button>
      </div>
      <div className="w-full min-h-screen">
        <Outlet />
      </div>
    </section>
  );
}

export default Home;
