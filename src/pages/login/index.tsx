import React, { useState } from "react";
import { useRouter } from "next/router";
import CommonInput from "@/components/input/CommonInput";
import CommonButton from "@/components/button/CommonButton";
import { fetchLogin, fetchUsers } from "@/api/userApi"; // API 호출
import useAuthStore from "@/stores/authStore";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";

const Login = () => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser); // Zustand setUser 함수

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

  // 로그인함수
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      emailError ||
      formValues.email.trim() === "" ||
      formValues.password.trim() === ""
    ) {
      setError("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true); // 로딩 시작

      // 로그인 요청
      const loginData = await fetchLogin(formValues.email, formValues.password);

      // 토큰 저장
      localStorage.setItem("accessToken", loginData.accessToken);

      // 로그인 후 사용자 정보 가져오기
      const userData = await fetchUsers(); // fetchUsers로 유저 정보 가져옴

      // Zustand에 사용자 정보 저장
      setUser(
        {
          email: userData.email,
          name: userData.name,
        },
        loginData.accessToken
      );

      alert(`${userData.name}님 환영합니다!`);
      router.push("/links"); // 링크 페이지로 이동
    } catch (err: any) {
      setError(err.message || "로그인에 실패했습니다.");
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="h-screen relative w-screen bg-gray-100 flex flex-col items-center justify-center gap-[30px]">
      <div>
        <div className="flex flex-col gap-[16px] items-center">
          <a href="/">
            <img src="/logo.svg" alt="로고" className="w-[210px] h-[38px]" />
          </a>
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
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default Login;
