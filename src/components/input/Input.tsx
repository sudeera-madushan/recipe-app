import React from "react";

const Input = ({error, label, name, value, onChange}: {error: string, label: string, name: string, value: string, onChange: any}) => {
  return (
    <div className={`my-5 rounded-md relative py-[13px] px-4 border-[2px] ${error && "border-red-500"}`}> 
      <label
        htmlFor={name}
        className="text-fontGray absolute bottom-10 left-2 bg-secondary px-1"
      >
        {label}
      </label>
      <input
        name={name}
        type={name}
        value={value}
        placeholder=""
        onChange={onChange}
        className={`w-full outline-none text-fontGray ${error && "text-red-500"}`}
      />
      <label className="z-10 absolute text-red-500 text-[11px] left-0 bottom-[-20px]">
        {error}
      </label>
    </div>
  );
};

export default Input;
