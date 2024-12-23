import React, { useState } from "react";
import { useRouter } from "next/router";
import CommonInput from "@/components/input/CommonInput";
import CommonButton from "@/components/button/CommonButton";

const Login = () => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const router = useRouter();
  const handleNavigateSignupPage = () => {
    router.push("/signup");
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식 정규식
    if (!emailRegex.test(email)) {
      setEmailError("유효한 이메일 주소를 입력해주세요.");
    } else {
      setEmailError(null);
    }
  };

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    // 이메일 검증
    if (field === "email") {
      validateEmail(value);
    }
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (user: any) =>
        user.email === formValues.email && user.password === formValues.password
    );

    if (user) {
      alert(`${user.name}님 환영합니다.`);
      router.push("/"); // 로그인 성공 시 메인 페이지로 이동
    } else {
      alert("비밀번호나 아이디가 맞지 않습니다.");
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col items-center justify-center gap-[30px]">
      <div>
        <div className="flex flex-col gap-[16px] items-center">
          <img src="/logo.svg" alt="로고" className="w-[210px] h-[38px]" />
          <div>
            회원이 아니신가요?{" "}
            <button
              onClick={handleNavigateSignupPage}
              className="text-blue-500"
            >
              회원 가입하기
            </button>
          </div>
        </div>
      </div>
      <form className="flex flex-col gap-[24px]">
        <div>
          <CommonInput
            type="email"
            value={formValues.email}
            onChange={(value) => handleChange("email", value)}
          >
            이메일
          </CommonInput>
          {formValues.email.trim() !== "" && emailError && (
            <div className="text-red text-sm mt-1">{emailError}</div>
          )}
        </div>

        <CommonInput
          type="password"
          value={formValues.password}
          onChange={(value) => handleChange("password", value)}
        >
          비밀번호
        </CommonInput>

        <CommonButton
          onClick={handleLogin}
          type="submit"
          className={`bg-linearGradient w-[400px] h-[60px] rounded-md text-white`}
        >
          로그인
        </CommonButton>
      </form>
    </div>
  );
};

export default Login;
