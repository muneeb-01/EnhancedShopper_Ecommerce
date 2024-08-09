import React, { useState } from "react";
import { SIGN_UP_ROUTE } from "../../utils/constant";
import { apiClient } from "../../lib/apiClient";
import { useDispatch } from "react-redux";
import { userInfoActions } from "../../ReduxStore/Slices/userInfoSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp({ setCurrent }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateSignup = () => {
    if (!username.length) {
      toast.error("Username is required");
      return false;
    }
    if (!email.length) {
      toast.error("email is required");
      return false;
    }
    if (!password.length) {
      toast.error("password is required");
      return false;
    }
    if (!confirmPassword.length) {
      toast.error("Confirm Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and confirm password must be same");
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      if (validateSignup()) {
        const responce = await apiClient.post(
          SIGN_UP_ROUTE,
          { email, username, password },
          { withCredentials: true }
        );

        if (responce.status === 200 && responce.data.user) {
          dispatch(userInfoActions.setUserInfo(responce.data.user));
          if (responce.data.user.profileSetup) {
            navigate("/home");
          } else {
            navigate("/profile");
          }
        } else toast.error(responce.data);
      }
    } catch (error) {}
  };

  return (
    <div className="w-[38rem] bg-white rounded-lg shadow-md flex flex-col gap-4 px-[3.5rem] py-[3.5rem] max-sm:w-[90vw] max-sm:gap-3 max-sm:py-[5vh] max-sm:px-[10vw]">
      <h2 className="text-[1.9rem] font-medium max-sm:text-[4vw]"> Sign Up</h2>
      <form onSubmit={(e) => handleSignup(e)} action="">
        <div className="flex flex-col items-center justify-center gap-6 max-sm:gap-[2.6vh]">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            placeholder="Username"
            className="px-[1.4rem] border-2 w-full py-[1.1rem] text-[1.1rem] rounded-md max-sm:rounded-sm max-sm:py-[1.2vh] max-sm:text-[3vw] max-sm:px-[2vw]"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Email"
            className="px-[1.4rem] border-2 w-full py-[1.1rem] text-[1.1rem] rounded-md max-sm:rounded-sm max-sm:py-[1.2vh] max-sm:text-[3vw] max-sm:px-[2vw]"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Password"
            className="px-[1.4rem] border-2 w-full py-[1.1rem] text-[1.1rem] rounded-md max-sm:rounded-sm max-sm:py-[1.2vh] max-sm:text-[3vw] max-sm:px-[2vw]"
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            name="confirm-password"
            placeholder="Confirm Password"
            className="px-[1.4rem] border-2 w-full py-[1.1rem] text-[1.1rem] rounded-md max-sm:rounded-sm max-sm:py-[1.2vh] max-sm:text-[3vw] max-sm:px-[2vw]"
          />
          <button className="px-[1.4rem] bg-[#E73A38]  text-white  w-full py-[0.9rem] text-[1.1rem] rounded-md max-sm:rounded-sm max-sm:py-[1.2vh] max-sm:text-[3vw] max-sm:px-[2vw]">
            Sign Up
          </button>
        </div>
      </form>
      <p className="text-1.1rem font-medium max-sm:text-[2.8vw]">
        Already have an account?{" "}
        <a
          onClick={() => setCurrent(false)}
          className="text-[#E73A38] cursor-pointer hover:underline "
        >
          Login here
        </a>
      </p>
    </div>
  );
}

export default SignUp;
