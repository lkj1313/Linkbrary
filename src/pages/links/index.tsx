import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

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
import { deleteFolder, fetchFolders, updateFolderName } from "@/api/folderApi";
import { fetchAllLinks, fetchLinksByFolder } from "@/api/linkApi";
import { Folder } from "@/utilitys/types";
import useAuthStore from "@/stores/authStore";

const LinksPage = () => {
  const [activeFolderId, setActiveFolderId] = useState<number | null>(null); // 활성화된 폴더 ID
  const [inputLink, setInputLink] = useState<string>(""); // 입력받은 링크 관리

  const queryClient = useQueryClient(); // React Query 클라이언트 사용
  const router = useRouter();
  const { user } = useAuthStore();

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
  });

  // ------------------함수 ----------------- //

  // 링크추가 함수
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
      queryClient.invalidateQueries({ queryKey: ["links"] });
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
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    } catch (error) {
      console.error(error);
      alert("폴더 추가 중 문제가 발생했습니다.");
    }
  };
  const handleFolderClick = (id: number | null) => {
    setActiveFolderId(id); // 활성화된 폴더 ID 업데이트
  };
  const handleDeleteFolder = async (folderId: number, folderName: string) => {
    const confirmDelete = window.confirm("정말로 이 폴더를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await deleteFolder(folderId, folderName);
      alert("폴더가 성공적으로 삭제되었습니다!");

      // "folders" 쿼리 무효화하여 폴더 목록 새로 가져오기
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    } catch (error) {
      console.error("폴더 삭제 중 오류 발생:", error);
      alert("폴더 삭제에 실패했습니다.");
    }
  };
  const handleUpdateFolderName = async (
    folderId: number,
    currentName: string
  ) => {
    const newFolderName = prompt("새로운 폴더 이름을 입력하세요:", currentName); // 현재 이름을 기본값으로 표시
    if (!newFolderName || newFolderName.trim() === "") {
      alert("폴더 이름을 입력해주세요.");
      return;
    }

    try {
      await updateFolderName(folderId, newFolderName);
      alert("폴더 이름이 성공적으로 변경되었습니다!");

      // "folders" 쿼리 무효화하여 목록 갱신
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    } catch (error) {
      console.error("폴더 이름 변경 중 오류 발생:", error);
      alert("폴더 이름 변경에 실패했습니다.");
    }
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken && user == null) {
      alert("로그인이 필요합니다.");
      router.push("/login"); // 로그인 페이지로 리디렉션
    }
  }, [router, user]);
  // 버튼 컴포넌트 isloading?
  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex  flex-col gap-[40px] justify-center items-center">
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
          <div className="w-[1060px] mt-6 flex justify-between">
            <FolderTitle activeFolderId={activeFolderId} folders={folders} />
            {activeFolderId !== null && ( // 전체 버튼이 아닌 경우에만 렌더링
              <div className="flex gap-5 text-slate-500">
                <button
                  onClick={() => {
                    const folder = folders.find(
                      (folder) => folder.id === activeFolderId
                    );
                    if (folder) handleUpdateFolderName(folder.id, folder.name); // 이름 변경 함수 호출
                  }}
                >
                  ✏️ 이름변경
                </button>
                <button
                  onClick={() => {
                    const folder = folders.find(
                      (folder) => folder.id === activeFolderId
                    );
                    if (folder) handleDeleteFolder(folder.id, folder.name);
                  }}
                >
                  🗑️ 삭제
                </button>
              </div>
            )}
          </div>
        </section>{" "}
        {/* 링크리스트 섹션 */}
        <section className="w-[1060px] flex flex-wrap gap-[30px]">
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
