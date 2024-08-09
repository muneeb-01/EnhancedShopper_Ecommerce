import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { personalInformationAction } from "../../../ReduxStore/Slices/personal-information-slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DELETE_PROFILE_PICTURE_ROUTE,
  HOST,
  UPDATE_PROFILE_PICTURE_ROUTE,
} from "../../../utils/constant";
import { UPDATE_PROFILE_INFORMATION_ROUTE } from "../../../utils/constant";
import { apiClient } from "../../../lib/apiClient";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

function UserSetting() {
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const personalInfo = useSelector((store) => store.personalInfo);
  const userInfo = useSelector((store) => store.userInfo);
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [city, setcity] = useState("");
  const [province, setprovince] = useState("");
  const [fullAddress, setfulladdress] = useState("");
  const [phone, setphone] = useState("");
  const [area, setarea] = useState("");
  const [email, setemail] = useState("");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setemail(userInfo.email);
    }
    if (personalInfo) {
      setarea(personalInfo.area);
      setcity(personalInfo.city);
      setfirstname(personalInfo.firstname);
      setlastname(personalInfo.lastname);
      setphone(personalInfo.phone);
      setprovince(personalInfo.province);
      setfulladdress(personalInfo.fullAddress);
    }
    if (personalInfo?.profile) {
      setImage(personalInfo?.profile);
    } else {
      setImage(null);
    }
  }, [userInfo, personalInfo]);

  const handleFileInputClick = () => {
    imageRef.current.click();
  };

  const handleImageChange = async () => {
    const profile = imageRef.current.files[0];
    if (profile) {
      const formdata = new FormData();
      formdata.append("profile", profile);
      formdata.append("HOST", HOST);
      const responce = await apiClient.post(
        UPDATE_PROFILE_PICTURE_ROUTE,
        formdata,
        { withCredentials: true }
      );

      if (responce.status === 200) {
        dispatch(
          personalInformationAction.setPersonalInformation(
            responce.data.profile
          )
        );
        toast.success("Profile picture updated successfully.");
      }
    }
  };

  const handleDeleteProfilePicture = async () => {
    try {
      const responce = await apiClient.post(
        DELETE_PROFILE_PICTURE_ROUTE,
        {
          profile: personalInfo.profile,
        },
        { withCredentials: true }
      );
      if (responce.status === 200) {
        dispatch(
          personalInformationAction.setPersonalInformation(
            responce.data.personalInformation
          )
        );
        toast.success("Profile picture deleted successfully");
      }
    } catch (error) {}
  };

  const validatedata = () => {
    if (!firstname.length) {
      toast.error("Firstname is required");
      return false;
    }
    if (!lastname.length) {
      toast.error("lastname is required");
      return false;
    }
    if (!phone.length) {
      toast.error("phone is required");
      return false;
    }
    if (!area.length) {
      toast.error("area is required");
      return false;
    }
    if (!province.length) {
      toast.error("province is required");
      return false;
    }
    if (!city.length) {
      toast.error("city is required");
      return false;
    }
    if (!fullAddress.length) {
      toast.error("fullAddress is required");
      return false;
    }
    return true;
  };

  const submitHandler = async () => {
    if (validatedata()) {
      const responce = await apiClient.post(
        UPDATE_PROFILE_INFORMATION_ROUTE,
        {
          firstname,
          lastname,
          city,
          province,
          fullAddress,
          phone,
          area,
        },
        { withCredentials: true }
      );
      if (responce.status === 200) {
        dispatch(
          personalInformationAction.setPersonalInformation(
            responce.data.personalInformation
          )
        );
        navigate("/profile");
        toast.success("Profile information updated successfully.");
      } else {
        toast.error(responce.data);
      }
    }
  };

  return (
    <div className="w-full  h-full flex flex-col gap-[2vh] justify-start items-start px-[8vw] py-[3vh]">
      <h3 className="text-center  text-[1.5rem]">Edit info</h3>

      <div className="flex gap-[1.52vw] items-center justify-start">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative w-[11vh] h-[11vh]  border-4 border-[#dadada] bg-gray-200 rounded-full overflow-hidden"
        >
          {image ? (
            <img
              src={image || ""}
              className="w-full h-full object-cover"
              alt=""
            />
          ) : (
            <div
              className={`h-full w-full text-4xl cursor-pointer text-gray-800  flex items-center justify-center bg-slate-200  rounded-full `}
            >
              {personalInfo?.firstname
                ? personalInfo?.firstname.split("").shift().toUpperCase()
                : userInfo.email.split("").shift().toUpperCase()}
            </div>
          )}
          {hovered && (
            <div
              onClick={
                !image ? handleFileInputClick : handleDeleteProfilePicture
              }
              className="absolute w-full h-full bg-slate-800/35 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] rounded-full flex justify-center items-center"
            >
              {image ? (
                <FaTrash className=" text-white text-4xl cursor-pointer " />
              ) : (
                <FaPlus className=" text-white text-4xl cursor-pointer " />
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <h2 className="text-[1.25rem]">{userInfo.username}</h2>
          <h2 className="text-[0.9rem] text-gray-500">
            <span>Karachi</span>,<span>Sindh</span>
          </h2>
        </div>
      </div>

      <div className="w-full flex flex-wrap gap-[3vh]">
        <input
          ref={imageRef}
          onChange={handleImageChange}
          id="profile"
          name="profile"
          type="file"
          className="hidden"
          accept=".png, .jpg, .jpeg, .svg, .webp"
        />
        <div className="flex flex-col w-[20vw]">
          <label htmlFor="firstname" className="text-[0.9rem] text-gray-600">
            Firstname
          </label>
          <input
            id="firstname"
            name="firstname"
            placeholder="John"
            value={firstname || ""}
            onChange={(e) => setfirstname(e.target.value)}
            type="text"
            className="text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg w-full px-[1vw] py-[0.6vh] shadow-inner"
            required
          />
        </div>
        <div className="flex flex-col w-[20vw]">
          <label htmlFor="lastname" className="text-[0.9rem] text-gray-600">
            Lastname
          </label>
          <input
            value={lastname || ""}
            onChange={(e) => setlastname(e.target.value)}
            id="lastname"
            name="lastname"
            placeholder="Doe"
            type="text"
            className="text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg w-full px-[1vw] py-[0.6vh] shadow-inner"
            required
          />
        </div>
        <div className="flex flex-col w-[30vw]">
          <label htmlFor="email" className="text-[0.9rem] text-gray-600">
            Email
          </label>
          <input
            value={email || ""}
            disabled
            id="email"
            name="email"
            placeholder="example@example.com"
            type="email"
            className="text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg w-full px-[1vw] py-[0.6vh] shadow-inner"
          />
        </div>
        <div className="flex flex-col w-[20vw]">
          <label htmlFor="phone" className="text-[0.9rem] text-gray-600">
            Phone
          </label>
          <input
            value={phone || ""}
            onChange={(e) => setphone(e.target.value)}
            id="phone"
            name="phone"
            placeholder="03121234567"
            className="text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg w-full px-[1vw] py-[0.6vh] shadow-inner"
            required
          />
        </div>
        <div className="flex flex-col w-[20vw]">
          <label htmlFor="province" className="text-[0.9rem] text-gray-600">
            Province
          </label>
          <input
            value={province || ""}
            onChange={(e) => setprovince(e.target.value)}
            id="province"
            name="province"
            placeholder="Province"
            type="text"
            className="text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg w-full px-[1vw] py-[0.6vh] shadow-inner"
            required
          />
        </div>
        <div className="flex flex-col w-[20vw]">
          <label htmlFor="city" className="text-[0.9rem] text-gray-600">
            City
          </label>
          <input
            value={city || ""}
            onChange={(e) => setcity(e.target.value)}
            id="city"
            name="city"
            placeholder="City"
            type="text"
            className="text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg w-full px-[1vw] py-[0.6vh] shadow-inner"
            required
          />
        </div>
        <div className="flex flex-col w-[20vw]">
          <label htmlFor="area" className="text-[0.9rem] text-gray-600">
            Area/Block/Sector
          </label>
          <input
            value={area || ""}
            onChange={(e) => setarea(e.target.value)}
            id="area"
            name="area"
            placeholder="Area/Block/Sector"
            type="text"
            className="text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg w-full px-[1vw] py-[0.6vh] shadow-inner"
            required
          />
        </div>
        <div className="flex flex-col w-[40vw]">
          <label htmlFor="fullAddress" className="text-[0.9rem] text-gray-600">
            Full Address
          </label>
          <input
            value={fullAddress || ""}
            onChange={(e) => setfulladdress(e.target.value)}
            id="fullAddress"
            name="fullAddress"
            placeholder="Full Address"
            type="text"
            className="text-nowrap text-[1.15rem] text-gray-700 bg-gray-200 rounded-lg w-full px-[1vw] py-[0.6vh] shadow-inner"
            required
          />
        </div>
        <button
          onClick={submitHandler}
          className="text-nowrap text-[1.15rem] text-white font-medium bg-green-400 rounded-lg w-full px-[5vw] py-[0.6vh] shadow-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default UserSetting;
