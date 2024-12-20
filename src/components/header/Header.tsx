import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
const Header = () => {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/login");
  };
  return (
    <div className="w-screen py-[20px] px-[200px] flex justify-between bg-gray-100">
      {/* 로고 */}

      <Image
        src="/logo.svg"
        alt="로고"
        width={133}
        height={24}
        className="cursor-pointer"
      />
      <Image
        src="/loginButton.svg"
        alt="로그인버튼"
        width={128}
        height={53}
        className="cursor-pointer"
        onClick={handleLoginClick}
      />
    </div>
  );
};

export default Header;
