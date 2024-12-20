import React, { useState } from "react";

interface CommonInputProps {
  type: string; // input 타입 (예: text, password)
  value: string; // input 값
  onChange: (value: string) => void; // 값 변경 핸들러
  children: any;
}

const CommonInput = ({ type, value, onChange, children }: CommonInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="w-[400px] flex flex-col gap-[12px] relative">
      <div className="text-[12px]">{children}</div>
      <input
        type={type === "password" && isPasswordVisible ? "text" : type}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        className="w-[400px] h-[60px] rounded-md py-[18px] px-[20px] pr-[40px] border border-gray-300 "
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute top-[66%] right-[15px] transform -translate-y-[50%] text-gray-500"
        >
          {isPasswordVisible ? (
            <img src="/icon/slashEyeIcon.svg"></img>
          ) : (
            <img src="/icon/eyeIcon.svg"></img>
          )}
        </button>
      )}
    </div>
  );
};

export default CommonInput;
