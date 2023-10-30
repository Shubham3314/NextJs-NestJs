"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef, SyntheticEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { SyntheticModule } from "vm";
import { FormEvent } from "react";
import { json } from "stream/consumers";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const ProfilePageForm = () => {
  const [isEdit, setisEdit] = useState<Boolean>(false);
  const [ProfilePic, setProfilePic] = useState("/test.png");
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [id, setid] = useState("");
  useEffect(() => {
    GetUserData();
  }, []);
  const { push } = useRouter();
  const BackToHome = () => {
    // console.log("hdi");

    if(isEdit)
    {
      setisEdit(false)
    }
    else{
      push("home");

    }
  };

  const GetUserData = async () => {
    // let userid = localStorage.getItem("userId")
    
    const UserData = await fetch("http://localhost:3000/api/user", {
      credentials: "include",
    })
      .then(async (response) => {
        const res = await response.json()
        
        setEmail(res.email)
        setUsername(res.username)
        setid(res.id)
      }).catch((error) => {
        console.error(error);
      });

    const UserImage = await fetch("http://localhost:3000/api/user/image", {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error("Failed to fetch user image");
      })
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        // const userImageElement = document.getElementById('user-image');
        // console.log(imageUrl);
        setProfilePic(imageUrl);
        // userImageElement.src = imageUrl;
      })
      .catch((error) => {
        console.error(error);
        // setProfilePic("")
      });
  };

  const inputRef = useRef<any>(null);
  const [image, setImage] = useState("");
  const [createObjectURL, setCreateObjectURL] = useState("");

  const uploadToClient = (event:any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      console.log(i);

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
      setProfilePic(URL.createObjectURL(i));
      console.log(URL.createObjectURL(i));
    }
  };
  const handelImageClick = () => {
    inputRef.current.click();
  };

  const uploadToServer = async () => {
    if (!Email) {
      return alert("Email Cannot be empty.");
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      return alert("Email is Invalid.");
    }

    if (!Username) {
      return alert("Username Cannot be empty");
    }
    const body = new FormData();

    console.log(id, image, Username, Email);
    let data = new FormData();
    data.append("image", image);
    data.append("id", id);
    data.append("Username", Username);
    data.append("Email", Email);

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/update",

      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        
        Swal.fire({
          icon: 'success',
          title: 'User Updated Successfully',
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          setisEdit(false)
          GetUserData()
        })
        
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col h-full w-full items-center bg-slate-500 rounded-b-3xl space-y-4">
      <div className="flex h-48 w-auto flex-col -mt-24  border-4 rounded-3xl border-slate-400">
        <Image
          className="rounded-3xl p-2 mt-1 bg-contain h-full w-full"
          width={100}
          height={300}
          src={ProfilePic}
          alt="Profile Picture"
        ></Image>
        {isEdit && (
          <button
            className="w-12 h-12 text-white -mt-6 ml-64"
            onClick={handelImageClick}
          >
            <FontAwesomeIcon
              icon={faPlus}
              className="w-12 h-12 text-white opacity-100"
            />
            <input
              type="file"
              ref={inputRef}
              onChange={uploadToClient}
              className=" hidden"
              accept="image/*"
            />
          </button>
        )}
      </div>
      <div className="flex flex-col space-y-6 justify-center items-center">
        <div className="flex items-center space-x-4 justify-start">
          <label htmlFor="Username" className="text-white font-bold font-sans">
            Username :
          </label>
          {isEdit ? (
            <input
              type="text"
              placeholder="Enter Username"
              className="input input-bordered w-2/3 max-w-xs"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={Username}
            />
          ) : (
            <h2 className="text-2xl text-black">{Username}</h2>
          )}
        </div>
        <div className="flex items-center space-x-4 justify-end">
          <label htmlFor="Username" className="text-white font-bold font-sans">
            Email :
          </label>
          {isEdit ? (
            <input
              type="text"
              placeholder="Enter Email"
              className="input input-bordered w-3/4 max-w-xs items-end"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={Email}
            />
          ) : (
            <h2 className="text-xl text-black">{Email}</h2>
          )}
        </div>
        {isEdit ? (
          <button
            className="btn btn-outline btn-info w-2/3"
            onClick={uploadToServer}
          >
            Save
          </button>
        ) : (
          <button
            className="btn btn-outline btn-success w-2/3"
            onClick={() => {
              setisEdit(true);
            }}
          >
            Edit
          </button>
        )}
      </div>
      <button className="btn btn-error drawer-button " onClick={BackToHome}>
        Back
      </button>

    </div>
  );
};

export default ProfilePageForm;
