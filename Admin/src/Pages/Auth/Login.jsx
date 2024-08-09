import React, { useState } from "react";
import { apiClient } from "../../lib/apiClient";
import { useDispatch } from "react-redux";
import { userInfoActions } from "../../ReduxStore/Slices/userInfoSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LOGIN_ROUTE } from "../../utils/constant";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateLogin = () => {
    if (!email.length) {
      toast.error("email is required");
      return false;
    }
    if (!password.length) {
      toast.error("password is required");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (validateLogin()) {
        const responce = await apiClient.post(
          LOGIN_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        if (responce.status === 200 && responce.data.user.isAdmin) {
          dispatch(userInfoActions.setUserInfo(responce.data.user));
        } else {
          toast.error("unauthorized user detected");
        }
      }
    } catch (error) {}
  };

  return (
    <div className="w-[38rem]  bg-white rounded-lg shadow-md flex flex-col gap-4 max-sm:w-[90vw] max-sm:gap-3 max-sm:py-[5vh] max-sm:px-[10vw] px-[3.5rem] py-[3.5rem] ">
      <h2 className="text-[1.9rem] font-medium max-sm:text-[4vw]">Login</h2>
      <form onSubmit={(e) => handleLogin(e)} action="">
        <div className="flex flex-col items-center justify-center gap-6 max-sm:gap-[2.6vh]">
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            name="email"
            placeholder="Email"
            className="px-[1.4rem] border-2 w-full py-[1.1rem] text-[1.1rem] rounded-md max-sm:rounded-sm max-sm:py-[1.2vh] max-sm:text-[3vw] max-sm:px-[2vw]"
          />
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Password"
            className="px-[1.4rem] border-2 w-full py-[1.1rem] text-[1.1rem] rounded-md max-sm:rounded-sm max-sm:py-[1.2vh] max-sm:text-[3vw] max-sm:px-[2vw]"
          />
          <button
            className="px-[1.4rem] bg-[#E73A38] text-white w-full py-[0.9rem]
            text-[1.1rem] rounded-md max-sm:rounded-sm max-sm:py-[1.2vh] max-sm:text-[3vw] max-sm:px-[2vw]"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
