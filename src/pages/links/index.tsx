import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import AddLinkInput from "@/components/linksPage/AddLinkInput";
import FolderList from "@/components/linksPage/FolderList";
import FolderTitle from "@/components/linksPage/FolderTitle";
import FolderAddButton from "@/components/linksPage/FolderAddButton";
import LinkList from "@/components/linksPage/LinkList";
import { fetchAllLinks, fetchFolders } from "../api/folderApi";

function timeAgo(createdAt: string): string {
  return formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: ko,
  });
}
import { Folder, Link } from "@/utilitys/types";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
function formatDate(createdAt: string): string {
  return format(new Date(createdAt), "yyyy.MM.dd"); // "2024.12.26" 형식
}
const LinksPage = () => {
  const [activeFolderId, setActiveFolderId] = useState<number | null>(null); // 활성화된 폴더 ID
  const [links, setLinks] = useState<Link[]>([]); // 폴더의 링크 데이터 관리

  const [inputLink, setInputLink] = useState<string>(""); // 입력받은 링크 관리
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  // React Query 훅을 사용하여 데이터 가져오기
  const {
    data: folders = [],
    isLoading,
    isError,
    error,
  } = useQuery<Folder[], Error>({
    queryKey: ["folders"], // Query Key
    queryFn: fetchFolders, // Fetcher 함수
  });
  const { data: allLinks = [], isLoading: isLinksLoading } = useQuery({
    queryKey: ["links"],
    queryFn: fetchAllLinks,
  });

  // 링크 추가 함수
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
    setActiveFolderId(id); // 클릭된 폴더 ID 저장
    if (id === null) {
      // 전체 버튼 클릭 시 모든 링크 데이터를 표시
      setLinks(allLinks);
    } else {
      // 폴더 ID가 null이 아닐 경우 해당 폴더의 링크 데이터 가져오기
      fetchLinks(id);
    }
  };
  const fetchLinks = async (folderId: number) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await fetch(`${BASE_URL}/folders/${folderId}/links`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "링크 데이터를 가져오는 데 실패했습니다."
        );
      }

      const data = await response.json();
      setLinks(data.list || []); // Objectlist 배열을 상태에 저장
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };
  // 전체 링크가 로드되었을 때 초기 설정
  useEffect(() => {
    if (!isLinksLoading && activeFolderId === null) {
      setLinks(allLinks); // 전체 링크를 기본 값으로 설정
    }
  }, [allLinks, isLinksLoading, activeFolderId]);
  if (isLoading) return <LoadingSpinner />;

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
        <section className="w-[1060px] flex flex-wrap gap-[20px] ">
          <LinkList links={links} timeAgo={timeAgo} formatDate={formatDate} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LinksPage;