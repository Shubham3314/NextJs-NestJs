"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import animationData from "@/public/animation_lobqvsfa.json";
import Lottie from "lottie-react";
import Swal from "sweetalert2";

const HomePage = () => {
  const { push } = useRouter();
  const Logout = async () => {
    const logout = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
    }).then((Response) => {
      console.log(Response);
      Swal.fire({
        title: "Are you sure you want to Logout?",
        showDenyButton: true,
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Logged Out!", "", "success");
          push("/");
        }
      });
    });
  };
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      {/* <App /> */}
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex justify-start w-full h-full">
          {/* Page content here */}

          <label
            htmlFor="my-drawer"
            className="btn m-4 btn-primary drawer-button "
          >
            Menu
          </label>
          <div className="flex flex-col h-1full w-full items-center">
            <Lottie
              animationData={animationData}
              className="flex  justify-center items-center w-3/5 h-3/5"
              loop={true}
            />

            <h1 className="font-extrabold mt-10 text-transparent text-5xl absolute bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Welcome to Space Adventure
            </h1>
          </div>

          {/* <FontAwesomeIcon icon="fa-bars" beat /> */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content text-xl ">
            {/* Sidebar content here */}
            <li className="">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content flex  justify-start">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer"
                  className="btn btn-error drawer-button "
                >
                  Close
                </label>
                {/* <FontAwesomeIcon icon="fa-bars" beat /> */}
              </div>
            </li>
            <li className="">
              <Link href="profile">Profile</Link>
            </li>
            <li>
              <a onClick={Logout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
