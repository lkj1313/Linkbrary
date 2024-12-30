import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useAuthStore from "@/stores/authStore";

const Header = () => {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/login");
  };
  // 로그인 유저 정보 가져오기
  const { user, logout } = useAuthStore();

  // 로그아웃 함수
  const handleLogoutClick = () => {
    const isConfirmed = confirm("로그아웃 하시겠습니까?");
    if (isConfirmed) {
      logout();
      router.push("/"); // 로그아웃 후 홈으로 이동
    }
  };
  return (
    <div className="w-full py-[20px] px-[200px] flex justify-between bg-gray-100">
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
          <button
            onClick={handleLogoutClick}
            className="text-[14px] w-[100px] h-[37px] flex items-center justify-center gap-[6px] border-r-[1px] py-[10px] px-[12px]"
          >
            👤 {user?.name || "Guest"}님
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
