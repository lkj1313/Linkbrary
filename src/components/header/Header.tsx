import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useAuthStore from "@/stores/authStore";

const Header = () => {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/login");
  };
  const { user } = useAuthStore();

  return (
    <div className="w-screen py-[20px] px-[200px] flex justify-between bg-gray-100">
      {/* 로고 */}
      <a href="/">
        <Image
          src="/logo.svg"
          alt="로고"
          width={133}
          height={24}
          className="cursor-pointer"
        />
      </a>
      {router.pathname !== "/links" ? (
        <Image
          src="/loginButton.svg"
          alt="로그인버튼"
          width={128}
          height={53}
          className="cursor-pointer"
          onClick={handleLoginClick}
        />
      ) : (
        <div className="flex justify-between">
          <button className="text-[14px] w-[100px] h-[37px] flex items-center justify-center gap-[6px] border-r-[1px] py-[10px] px-[12px]">
            ⭐ 즐겨찾기
          </button>
          <button className="text-[14px] w-[100px] h-[37px] flex items-center justify-center gap-[6px] border-r-[1px] py-[10px] px-[12px]">
            👤 {user?.name || "Guest"}님
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
