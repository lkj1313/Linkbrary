import React from "react";

interface CommonButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string; // Tailwind CSS 클래스 추가
  type?: "button" | "submit" | "reset"; // type 속성 정의
}

const CommonButton = ({
  children,
  onClick,
  className = "",
  type = "button",
}: CommonButtonProps) => {
  return (
    <button onClick={onClick} type={type} className={`${className}`}>
      {children}
    </button>
  );
};

export default CommonButton;
