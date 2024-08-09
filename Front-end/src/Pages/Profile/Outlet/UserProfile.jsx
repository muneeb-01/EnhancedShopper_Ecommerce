import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function UserProfile() {
  const personalInfo = useSelector((store) => store.personalInfo);
  const userInfo = useSelector((store) => store.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!personalInfo) {
      navigate("/profile/setting");
      toast.info("Setup profile to proceed further");
    }
  }, []);

  return (
    <div className="w-full  h-full flex flex-col gap-[6vh] justify-start items-start px-[8vw] py-[8vh]">
      <div className="flex items-center gap-[1.6vw]">
        <div className="size-[8em] overflow-hidden rounded-full">
          {personalInfo?.profile ? (
            <img
              className="w-full object-cover"
              src={personalInfo?.profile}
              alt=""
            />
          ) : (
            <div
              className={`h-full w-full text-4xl cursor-pointer text-gray-800  flex items-center justify-center bg-slate-200  rounded-full `}
            >
              {personalInfo?.firstname
                ? personalInfo?.firstname.split("").shift().toUpperCase()
                : userInfo?.email.split("").shift().toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <h2 className="text-[1.25rem]">{userInfo?.username}</h2>
          <h2 className="text-[0.9rem] opacity-50 text-gray-500">
            <span>{personalInfo?.city}</span>,{" "}
            <span>{personalInfo?.province}</span>
          </h2>
        </div>
      </div>
      <div className="w-full  flex flex-wrap gap-[3.5vh]">
        <div>
          <h5 className="text-[0.9rem] text-gray-600">Firstname</h5>
          <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
            {personalInfo?.firstname}
          </h5>
        </div>
        <div>
          <h5 className="text-[0.9rem] text-gray-600">Lastname</h5>
          <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
            {personalInfo?.lastname}
          </h5>
        </div>
        <div>
          <h5 className="text-[0.9rem] text-gray-600">Email</h5>
          <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
            {personalInfo?.email}
          </h5>
        </div>
        <div>
          <h5 className="text-[0.9rem] text-gray-600">Phone</h5>
          <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
            {personalInfo?.phone}
          </h5>
        </div>
        <div>
          <h5 className="text-[0.9rem] text-gray-600">Province</h5>
          <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
            {personalInfo?.province}
          </h5>
        </div>
        <div>
          <h5 className="text-[0.9rem] text-gray-600">City</h5>
          <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
            {personalInfo?.city}
          </h5>
        </div>
        <div>
          <h5 className="text-[0.9rem] text-gray-600">Area/Sector/Block</h5>
          <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
            {personalInfo?.area}
          </h5>
        </div>
        <div>
          <h5 className="text-[0.9rem] text-gray-600">Full Address</h5>
          <h5 className=" text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg max-w-max px-[5vw] py-[0.6vh] shadow-inner">
            {personalInfo?.fullAddress}
          </h5>
        </div>

        <Link
          to="/profile/setting"
          className="text-nowrap text-center text-[1.15rem] text-white font-medium  bg-red-500 rounded-lg w-full px-[5vw] py-[0.6vh] shadow-md"
        >
          Edit info
        </Link>
      </div>
    </div>
  );
}

export default UserProfile;
