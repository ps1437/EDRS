import React from "react";
import Loader from "./Loader";

export default function Model() {
  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      id="modal-id"
    >
      <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div className="p-3  mt-2 text-center space-x-4 md:block">
            <Loader/>
      </div>
    </div>
  );
}
