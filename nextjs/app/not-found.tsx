'use client'
import Lottie from "lottie-react";
import animationData from "@/public/animation_lobpun3p.json";
import App from "./components/Particles";
export default function Custom404() {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <App/>
      <Lottie
        animationData={animationData}
        className="flex justify-center items-center w-full h-full"
        loop={true}
      />
    </div>
  );
}