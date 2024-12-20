import React, { useState } from "react";
import { useRouter } from "next/router";
import CommonInput from "@/components/input/CommonInput";
import CommonButton from "@/components/button/CommonButton";
const Login = () => {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/signup");
  };
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col items-center justify-center gap-[30px]">
      <div>
        <div className="flex flex-col gap-[16px] items-center">
          <img src="/logo.svg" alt="로고" className="w-[210px] h-[38px]"></img>
          <div>
            회원이 아니신가요? <a href="/">회원 가입하기</a>
          </div>
        </div>
      </div>
      <form className="flex flex-col gap-[24px]">
        <CommonInput
          type="email"
          value={formValues.email}
          onChange={(value) => handleChange("email", value)}
        >
          이메일
        </CommonInput>
        <CommonInput
          type="text"
          value={formValues.name}
          onChange={(value) => handleChange("name", value)}
        >
          이름
        </CommonInput>
        <CommonInput
          type="password"
          value={formValues.password}
          onChange={(value) => handleChange("password", value)}
        >
          비밀번호
        </CommonInput>
        <CommonInput
          type="password"
          value={formValues.confirmPassword}
          onChange={(value) => handleChange("confirmPassword", value)}
        >
          비밀번호 확인
        </CommonInput>
        <CommonButton
          onClick={() => {
            console.log("hi");
          }}
          type="submit"
          className="bg-linearGradient w-[400px] h-[60px] rounded-md text-white"
        >
          로그인
        </CommonButton>
      </form>
    </div>
  );
};

export default Login;
