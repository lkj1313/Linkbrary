import { deleteLink, updateLink } from "@/api/linkApi";
import { Link } from "@/utilitys/types";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
interface LinkCardProps {
  link: Link;
  timeAgo: (createdAt: string) => string;
  formatDate: (createdAt: string) => string;
  activeFolderId: number | null;
}

const LinkCard: React.FC<LinkCardProps> = ({
  link,
  timeAgo,
  formatDate,
  activeFolderId,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태 관리
  const [isLoading, setIsLoading] = useState(false);

  //케밥버튼 드롭다운 함수
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // 상태 토글
  };
  const queryClient = useQueryClient(); // React Query 클라이언트 사용

  //링크 삭제 함수
  const handleDelete = async (linkId: number) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    const confirmDelete = window.confirm("정말로 이 링크를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      setIsLoading(true);
      await deleteLink(linkId, accessToken);
      alert("링크가 성공적으로 삭제되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["links"] });
    } catch (error) {
      console.error("링크 삭제 중 오류:", error);
      alert("링크 삭제에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  //링크 수정 함수
  const handleEditLink = async (linkId: number) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    const newUrl = prompt("새로운 링크 URL을 입력하세요:");

    if (!newUrl || newUrl.trim() === "") {
      alert("링크 URL을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      await updateLink(linkId, newUrl, accessToken);
      alert("링크가 성공적으로 수정되었습니다!");
      // React Query 캐시를 무효화하여 링크 목록을 갱신
      queryClient.invalidateQueries({ queryKey: ["links"] });
    } catch (error) {
      console.error("링크 수정 중 오류 발생:", error);
      alert("링크 수정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 유틸리티 함수: URL에 프로토콜 추가
  const addProtocol = (url: string) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`; // 프로토콜이 없는 경우 https:// 추가
    }
    return url; // 이미 프로토콜이 있다면 그대로 반환
  };

  return (
    <div className="flex flex-col items-center w-[calc(33.33%-20px)] bg-white">
      <a
        href={addProtocol(link.url)} // 프로토콜 추가 후 URL 전달
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-[200px]"
      >
        <img
          src={link.imageSource}
          className="w-full h-full object-cover rounded-tl-lg rounded-tr-lg"
          alt={link.description}
        />
      </a>
      <div className="w-full h-[135px] flex flex-col gap-[10px] rounded-bl-[15px] rounded-br-[15px] px-[0px] py-[10px] relative">
        <div className="font-[400] text-[13px] flex justify-between text-gray-600">
          <span>{timeAgo(link.createdAt)}</span>
          {activeFolderId !== null && (
            <button onClick={toggleDropdown}>⋯</button>
          )}
        </div>
        {/* 드롭다운 메뉴 */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-4 w-[120px] bg-white border border-gray-300 rounded shadow">
            <button
              onClick={() => handleEditLink(link.id)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(link.id)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Delete
            </button>
          </div>
        )}
        <div className="line-clamp-2">{link.description}</div>
        <div>{formatDate(link.createdAt)}</div>
      </div>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default LinkCard;
