"use client";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation';
interface user {
  Username: string;
  Email: string;
  Password: string;
}
const FormComponent = () => {
  const { push } = useRouter();

  const [isLogin, setisLogin] = useState<boolean>(false);
  const [Username, setUsername] = useState<string>("");
  const [Email, setEmail] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [ConfPass, setConfPassword] = useState<string>("");
  const [errors, setErrors] = useState<any>({});
  const [isFormValid, setisFormValid] = useState<boolean>(false);

  useEffect(() => {
    ValidateForm();
  }, [Username, Email, Password, ConfPass]);

  const ValidateForm = () => {
    let errors: user = {
      Username: "",
      Email: "",
      Password: ""
    };
    if (isLogin) {

      if (!Email) {
        errors.Email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(Email)) {
        errors.Email = "Email is invalid.";
      }

      if (!Password) {
        errors.Password = "Password is required.";
      }

      setErrors(errors);

      setisFormValid(errors.Email == ""  && errors.Password == ""); 

    } else {
      if (!Username) {
        console.log("Please Enter username");
        errors.Username = "Username is Required";
      }
      if (!Email) {
        errors.Email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(Email)) {
        errors.Email = "Email is invalid.";
      }

      if (!Password) {
        errors.Password = "Password is required.";
      } else if (Password.length < 6) {
        errors.Password = "Password must be at least 6 characters.";
      } else if (Password != ConfPass) {
        errors.Password = "Password not Matching.";
      }

      setErrors(errors);
      console.log(Object.keys(errors).length === 0);     
      setisFormValid(errors.Email == "" && errors.Username == "" && errors.Password == "");
      
    }
  };

  const HandleSubmit = async () => {
    if (isFormValid) {
      console.log("form is valid");
      if (!isLogin) {
        
        const res = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Username, Email, Password }),
        }).then(async (response) => {
          console.log(await response.json());

          if (response.status == 201)
          {
            Swal.fire({
              icon: 'success',
              title: 'User Registered Succesfully',
              showConfirmButton: false,
              timer: 1500
            }).then(()=>{
              setisLogin(true)
            })
          }
          else if(response.status == 401)
          {
            Swal.fire({
              title: 'User Already Exist',
              text:'Try Loggin In',
              showDenyButton: true,
              confirmButtonText: 'Login',
            }).then((result) => {
              if (result.isConfirmed) {
                setisLogin(true)
              }
            })
          }
          else{
            Swal.fire({
              title: 'Internal Server Error',
              text: 'Please Try Again Later',
              icon: 'error',
              confirmButtonText: 'Close'
            })
          }
          
        });
      }
      else{
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials:'include',
          body: JSON.stringify({ Email, Password }),
        }).then(async (response) => {
          const res = await response.json()
          if(response.status == 201)
          {

            Swal.fire({
              icon: 'success',
              title: 'User Login Success',
              showConfirmButton: false,
              timer: 1500
            }).then(()=>{
              localStorage.setItem("userId",res.id)
              push("/home")
            })

           
          }
          else if(response.status == 400)
          {
            Swal.fire({
              title: 'Invalid Credentials',
              text: 'Please Check your information and retry',
              icon: 'error',
              confirmButtonText: 'Close'
            })
          }
        })
      }
    } else {
      Swal.fire({
        title: 'Fill in the details!',
        text: '',
        icon: 'error',
        confirmButtonText: 'Close'
      })
      console.log("form is not valid");
    }
  };

  return (
    <>
      <h1 className="text-4xl font-serif mb-10 text-black">
        {isLogin ? <>Login Form</> : <>Sign Up Form</>}
      </h1>
      {isLogin ? (
        <>
          <form action="#" className="flex flex-col space-y-3 ">
            <input
              type="email"
              placeholder="Enter Email"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {errors.Email && (
              <p className="text-red-400 text-sm mb-4">{errors.Email}</p>
            )}
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {errors.Password && (
              <p className="text-red-400 text-sm mb-4">{errors.Password}</p>
            )}
          </form>
          <button className="btn btn-outline btn-info" onClick={HandleSubmit}>
            Login
          </button>
          <p>
            Don't Have an Account{" "}
            <a
              className="bg-white p-2 rounded-3xl text-black"
              href="#"
              onClick={() => {
                setisLogin(false);
              }}
            >
              SIGN UP
            </a>
          </p>
        </>
      ) : (
        <>
          <form action="#" className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Enter Username"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            {errors.Username && (
              <p className="text-red-400 text-sm mb-4">{errors.Username}</p>
            )}
            <input
              type="email"
              placeholder="Enter Email"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {errors.Email && (
              <p className="text-red-400 text-sm mb-4">{errors.Email}</p>
            )}
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {errors.Password && (
              <p className="text-red-400 text-sm mb-4">{errors.Password}</p>
            )}
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                setConfPassword(e.target.value);
              }}
            />
          </form>
          <button className="btn btn-outline btn-info" onClick={HandleSubmit}>
            Sign Up
          </button>
          <p>
            Already Have an Account{" "}
            <a
              className="bg-white p-2 rounded-3xl text-black hover:text-white hover:bg-slate-400" 
              href="#"
              onClick={() => {
                setisLogin(true);
              }}
            >
              LOGIN
            </a>
          </p>
        </>
      )}
    </>
  );
};

export default FormComponent;
