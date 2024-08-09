import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

function FormDisplay() {
  const [current, setCurrent] = useState(true);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#FAE3FC]">
      {current == false ? (
        <Login setCurrent={setCurrent} />
      ) : (
        <SignUp setCurrent={setCurrent} />
      )}
    </div>
  );
}

export default FormDisplay;
