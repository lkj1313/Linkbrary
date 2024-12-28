import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// 컴포넌트 import
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import AddLinkInput from "@/components/linksPage/AddLinkInput";
import FolderList from "@/components/linksPage/FolderList";
import FolderTitle from "@/components/linksPage/FolderTitle";
import FolderAddButton from "@/components/linksPage/FolderAddButton";
import LinkList from "@/components/linksPage/LinkList";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";

// 유틸리티 및 API import
import { timeAgo, formatDate } from "@/utilitys/dataUtils";
import {
  fetchAllLinks,
  fetchFolders,
  fetchLinksByFolder,
} from "../api/folderApi";
import { Folder } from "@/utilitys/types";

const LinksPage = () => {
  const [activeFolderId, setActiveFolderId] = useState<number | null>(null); // 활성화된 폴더 ID
  const [inputLink, setInputLink] = useState<string>(""); // 입력받은 링크 관리

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // baseUrl

  //---------------리액트 라우터 ------------//
  // React Query 훅을 사용하여 모든 폴더 가져오기
  const { data: folders = [], isLoading } = useQuery<Folder[], Error>({
    queryKey: ["folders"], // Query Key
    queryFn: fetchFolders, // Fetcher 함수
  });

  //폴더에 따라 링크 가져오기
  const { data: links = [], isLoading: isLinksLoading } = useQuery({
    queryKey: ["links", activeFolderId], // Query Key
    queryFn: () =>
      activeFolderId !== null
        ? fetchLinksByFolder(activeFolderId)
        : fetchAllLinks(), // Fetcher 함수
    enabled: true, // 폴더 ID가 있을 때만 쿼리 실행
  });

  // ------------------함수 ----------------- //
  const handleAddLink = async () => {
    if (activeFolderId === null) {
      alert("폴더를 선택해주세요.");
      return;
    }

    if (!inputLink.trim()) {
      alert("링크를 입력해주세요.");
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await fetch(`${BASE_URL}/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          folderId: activeFolderId,
          url: inputLink, // 입력된 링크 데이터 전송
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "링크 추가 실패");
      }

      alert("링크가 성공적으로 추가되었습니다!");
      setInputLink(""); // 입력 필드 초기화
    } catch (error) {
      console.error(error);
      alert("링크 추가 중 문제가 발생했습니다.");
    }
  };

  const handleAddFolder = async () => {
    const folderName = prompt("추가할 폴더 이름을 입력하세요:");

    if (!folderName) {
      alert("폴더 이름이 입력되지 않았습니다.");
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await fetch(`${BASE_URL}/folders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name: folderName }),
      });

      if (!response.ok) {
        throw new Error("폴더 추가 실패");
      }

      alert("폴더가 성공적으로 추가되었습니다!");
      fetchFolders();
    } catch (error) {
      console.error(error);
      alert("폴더 추가 중 문제가 발생했습니다.");
    }
  };
  const handleFolderClick = (id: number | null) => {
    setActiveFolderId(id); // 활성화된 폴더 ID 업데이트
  };

  // 버튼 컴포넌트 isloading?
  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
        <LoadingSpinner />
      </div>
    );

  return (
    <div>
      <Header />
      <main className="flex flex-col gap-[40px] justify-center items-center">
        {/* 폴더 목록 섹션 */}
        <section className="h-[219px] pt-[60px] pb-[90px] px-[320px] bg-gray-100 flex items-center justify-center ">
          <AddLinkInput
            inputLink={inputLink}
            setInputLink={setInputLink}
            handleAddLink={handleAddLink}
          />
        </section>
        {/* 폴더 관리 섹션 */}
        <section className="w-[1060px]">
          <div className="w-full flex justify-between">
            {/* FolderList 컴포넌트 */}
            <FolderList
              folders={folders}
              activeFolderId={activeFolderId}
              handleFolderClick={handleFolderClick}
            />

            {/* FolderAddButton 컴포넌트 */}
            <FolderAddButton handleAddFolder={handleAddFolder} />
          </div>
          {/* FolderTitle 컴포넌트 */}
          <div className="w-[1060px] mt-6">
            <FolderTitle activeFolderId={activeFolderId} folders={folders} />
          </div>
        </section>{" "}
        {/* 링크리스트 섹션 */}
        <section className="w-[1060px] flex flex-wrap gap-[20px]">
          {isLinksLoading ? (
            <div className="w-full flex justify-center items-center">
              <LoadingSpinner />
            </div>
          ) : (
            <LinkList links={links} timeAgo={timeAgo} formatDate={formatDate} />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LinksPage;
