import React, { useState } from "react";

const PasswordInput = ({error}: {error: string}) => {

  return (
    <div className={`rounded-md relative py-[12px] px-4 border-[2px] mt-8 ${error && "border-red-500"}`}>
      <label
        htmlFor="password"
        className="text-fontGray absolute bottom-10 left-2 bg-secondary px-1"
      >
        Password
      </label>
      <input
        type="password"
        className={`mt-1 w-full outline-none text-fontGray ${error && "text-red-500"}`}
      />
      <label className="z-10 absolute text-red-500 text-[11px] h-[12px] left-0 bottom-[-20px]">
        {error}
      </label>
    </div>
  );
};

export default PasswordInput;
