import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CommonInput from "@/components/input/CommonInput";
import CommonButton from "@/components/button/CommonButton";

const Signup = () => {
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null); // 서버 에러 처리

  const router = useRouter();

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

    // 이메일 검증
    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(
        emailRegex.test(value) ? null : "유효한 이메일 주소를 입력해주세요."
      );
    }

    // 비밀번호 확인 검증
    if (field === "confirmPassword" && value.trim() !== "") {
      setPasswordError(
        value !== formValues.password ? "비밀번호가 일치하지 않습니다." : null
      );
    }
  };

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isFormValid) {
      try {
        const response = await fetch(`${BASE_URL}/auth/sign-up`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formValues.email,
            name: formValues.name,
            password: formValues.password,
          }),
        });

        if (response.ok) {
          alert("회원가입을 환영합니다!");
          router.push("/login");
        } else {
          const errorData = await response.json();
          setServerError(errorData.message || "회원가입에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error:", error);
        setServerError("서버와 통신할 수 없습니다.");
      }
    }
  };

  const isFormValid =
    formValues.email.trim() !== "" &&
    formValues.name.trim() !== "" &&
    formValues.password.trim() !== "" &&
    formValues.confirmPassword.trim() !== "" &&
    emailError === null &&
    passwordError === null;

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col items-center justify-center gap-[30px]">
      <div>
        <div className="flex flex-col gap-[16px] items-center">
          <a href="/">
            <img src="/logo.svg" alt="로고" className="w-[210px] h-[38px]" />
          </a>
          <div>
            이미 회원이신가요?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-blue-500"
            >
              로그인하기
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
        <div>
          <CommonInput
            type="password"
            value={formValues.confirmPassword}
            onChange={(value) => handleChange("confirmPassword", value)}
          >
            비밀번호 확인
          </CommonInput>
          {formValues.confirmPassword.trim() !== "" && passwordError && (
            <div className="text-red text-sm mt-1">{passwordError}</div>
          )}
        </div>
        {serverError && (
          <div className="text-red text-sm mt-2">{serverError}</div>
        )}
        <CommonButton
          onClick={handleSignup}
          type="submit"
          className="bg-linearGradient w-[400px] h-[60px] rounded-md text-white"
          disabled={!isFormValid}
        >
          회원가입
        </CommonButton>
      </form>
    </div>
  );
};

export default Signup;
