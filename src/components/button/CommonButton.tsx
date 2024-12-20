import React from "react";

interface CommonButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string; // Tailwind CSS 클래스 추가
}

const CommonButton = ({
  children,
  onClick,
  className = "",
}: CommonButtonProps) => {
  return (
    <button onClick={onClick} className={`${className}`}>
      {children}
    </button>
  );
};

export default CommonButton;
