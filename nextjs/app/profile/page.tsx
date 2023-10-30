import React from "react";
import ProfilePageForm from "../components/ProfilePageForm";

const ProfilePage = () => {
  
  return (
    <div className="p-4 overflow-hidden">
      <div className="flex flex-col h-screen w-screen justify-center items-center -mt-10">
        <div className="flex flex-col h-5/6 w-3/12 justify-center items-center z-10">
          <div className='flex h-3/4 w-full justify-center items-center text-3xl font-sans text-white bg-[url("/Shooting-Star.gif")] bg-cover bg-center rounded-t-3xl'>
            Profile
          </div>
          <ProfilePageForm />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
