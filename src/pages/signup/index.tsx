import React, { useState } from "react";
import { useRouter } from "next/router";
import CommonInput from "@/components/input/CommonInput";
import CommonButton from "@/components/button/CommonButton";

const Signup = () => {
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const router = useRouter();
  const handleNavigateLoginPage = () => {
    router.push("/login");
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
      validateEmail(value);
    }

    // 비밀번호 확인 검증 (값이 있을 때만)
    if (field === "confirmPassword" && value.trim() !== "") {
      if (value !== formValues.password) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setPasswordError(null);
      }
    }
  };

  const handleSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isFormValid) {
      const { email, name, password } = formValues;

      // 기존 사용자 데이터 가져오기
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      // 새로운 사용자 추가
      const updatedUsers = [...existingUsers, { email, name, password }];

      // localStorage에 저장
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // 로그인 페이지로 이동
      router.push("/login");
      alert("회원가입을 환영합니다.");
    } else {
      console.log("폼이 유효하지 않습니다.");
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
          <img src="/logo.svg" alt="로고" className="w-[210px] h-[38px]" />
          <div>
            이미 회원이신가요?{" "}
            <button onClick={handleNavigateLoginPage} className="text-blue-500">
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
        <CommonButton
          onClick={handleSignup}
          type="submit"
          className="bg-linearGradient w-[400px] h-[60px] rounded-md text-white"
          disabled={!isFormValid} // 버튼 활성화/비활성화
        >
          회원가입
        </CommonButton>
      </form>
    </div>
  );
};

export default Signup;
