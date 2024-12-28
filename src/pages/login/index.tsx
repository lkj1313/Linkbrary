import React, { useState } from "react";
import { useRouter } from "next/router";
import CommonInput from "@/components/input/CommonInput";
import CommonButton from "@/components/button/CommonButton";

const Login = () => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

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

  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "email") {
      validateEmail(value);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    if (
      emailError ||
      formValues.email.trim() === "" ||
      formValues.password.trim() === ""
    ) {
      setError("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formValues.email,
          password: formValues.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken); // 토큰 저장
        alert("로그인 성공!");

        router.push("/links");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "로그인에 실패했습니다.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("서버와 통신할 수 없습니다.");
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
      <form onSubmit={handleLogin} className="flex flex-col gap-[24px]">
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

        {error && <div className="text-red text-sm mt-2">{error}</div>}

        <CommonButton
          type="submit"
          className={`bg-linearGradient w-[400px] h-[60px] rounded-md text-white`}
        >
          로그인
        </CommonButton>
      </form>
      <div className="w-[400px] flex justify-between items-center bg-gray-200 py-[12px] px-[24px]">
        <span>소셜 로그인</span>
        <div className="flex gap-3">
          <button className="w-[42px] h-[42px]">
            <img src="/icon/googleIcon.svg" className="w-full h-full"></img>
          </button>
          <button className="w-[42px] h-[42px]">
            <img src="/icon/kakaoIcon.svg" className="w-full h-full"></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
