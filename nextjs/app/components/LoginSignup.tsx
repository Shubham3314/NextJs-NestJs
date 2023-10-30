
import React from "react";
import FormComponent from "./FormComponent";

const LoginSignup = () => {
  
  return (
    <div className="flex flex-row justify-center items-center h-3/4 w-2/3  rounded-3xl z-10">
      <div className="h-full space-y-6 w-full flex flex-col justify-center items-center bg-[url('/space-animation.gif')] bg-cover bg-center rounded-l-3xl">
        <h1 className="h-auto  text-5xl text-white font-serif bg-black p-3 rounded-3xl ">
          Welcome To Space
        </h1>
        <p className="justify-center text-lg items-center text-white font-serif">
          Sign Up or Login To Join the space Adventure
        </p>
      </div>

      <div className="h-full w-4/5 space-y-5 flex flex-col justify-center items-center bg-slate-600 rounded-r-3xl">
        <FormComponent/>
      </div>
    </div>
  );
};

export default LoginSignup;
