import { Folder, Link } from "@/utilitys/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// 폴더 데이터를 가져오는 함수
export const fetchFolders = async (): Promise<Folder[]> => {
  const accessToken = localStorage.getItem("accessToken");

  // 액세스 토큰이 없으면 에러 발생
  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }

  // 폴더 데이터를 가져오기 위한 GET 요청
  const response = await fetch(`${BASE_URL}/folders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`, // 인증 헤더 추가
    },
  });

  // 요청이 실패했을 경우 에러 처리
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "데이터를 가져오는 데 실패했습니다.");
  }

  // 응답 데이터를 JSON 형식으로 변환
  const data = response.json(); // JSON 데이터를 비동기적으로 반환
  return data; // 폴더 데이터를 반환
};

// 모든 링크 데이터를 가져오는 함수
export const fetchAllLinks = async (): Promise<Link[]> => {
  const accessToken = localStorage.getItem("accessToken");

  // 액세스 토큰이 없으면 알림
  if (!accessToken) {
    alert("로그인이 필요합니다.");
    throw new Error("로그인이 필요합니다.");
  }

  // 모든 링크 데이터를 가져오기 위한 GET 요청
  const response = await fetch(`${BASE_URL}/links`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`, // 인증 헤더 추가
    },
  });

  // 요청이 실패했을 경우 에러 처리
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "링크 데이터를 가져오는 데 실패했습니다."
    );
  }

  // 응답 데이터를 JSON 형식으로 변환
  const data = await response.json();

  // 중복 링크를 제거 (title 속성을 기준으로 중복 제거)
  const uniqueLinks = Array.from(
    new Map(
      data.list.map((link: { title: string }) => [link.title, link]) // title을 키로 사용하여 중복 제거
    ).values()
  );

  return uniqueLinks as Link[]; // 중복 제거된 링크 데이터를 반환
};

// 특정 폴더에 속한 링크 데이터를 가져오는 함수
export const fetchLinksByFolder = async (folderId: number): Promise<Link[]> => {
  const accessToken = localStorage.getItem("accessToken");

  // 액세스 토큰이 없으면 에러 발생
  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }

  // 특정 폴더의 링크 데이터를 가져오기 위한 GET 요청
  const response = await fetch(`${BASE_URL}/folders/${folderId}/links`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`, // 인증 헤더 추가
    },
  });

  // 요청이 실패했을 경우 에러 처리
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "링크 데이터를 가져오는 데 실패했습니다."
    );
  }

  // 응답 데이터를 JSON 형식으로 변환
  const data = await response.json();
  return data.list; // 폴더에 속한 링크 데이터를 반환
};

// 폴더 삭제 함수
export const deleteFolder = async (folderId: number, name: string) => {
  const accessToken = localStorage.getItem("accessToken"); // 인증 토큰 가져오기
  if (!accessToken) {
    alert("로그인이 필요합니다.");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/folders/${folderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // 인증 토큰 포함
      },
      body: JSON.stringify({ name }), // 요청 본문에 이름 포함
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "폴더 삭제에 실패했습니다.");
    }

    alert("폴더가 성공적으로 삭제되었습니다!");
  } catch (error) {
    console.error("폴더 삭제 중 오류 발생:", error);
    alert("폴더 삭제 중 문제가 발생했습니다.");
  }
};
export const updateFolderName = async (
  folderId: number,
  folderName: string
): Promise<void> => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }

  const response = await fetch(`${BASE_URL}/folders/${folderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ name: folderName }), // 새로운 이름을 요청 본문에 포함
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "폴더 이름 수정에 실패했습니다.");
  }
};