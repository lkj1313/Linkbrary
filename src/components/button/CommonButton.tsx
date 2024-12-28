import React from "react";

interface CommonButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // 이벤트 핸들러 타입 수정
  className?: string; // Tailwind CSS 클래스 추가
  type?: "button" | "submit" | "reset"; // type 속성 정의
  disabled?: boolean; // 버튼 비활성화 여부
}

const CommonButton = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: CommonButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default CommonButton;
