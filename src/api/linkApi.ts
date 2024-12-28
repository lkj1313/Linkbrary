import { Folder, Link } from "@/utilitys/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

//링크 추가 함수
export const addLink = async (
  folderId: number | null,
  url: string,
  accessToken: string
): Promise<void> => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  if (!folderId) {
    throw new Error("폴더를 선택해주세요.");
  }

  const response = await fetch(`${BASE_URL}/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      folderId,
      url,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "링크 추가 실패");
  }
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

/// 링크 삭제 함수
export const deleteLink = async (linkId: number, accessToken: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const response = await fetch(`${BASE_URL}/links/${linkId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // 인증 토큰
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "링크 삭제 실패");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting link:", error.message);
    throw new Error(error.message || "서버와 통신 중 문제가 발생했습니다.");
  }
};
// 링크수정함수수
export const updateLink = async (
  linkId: number,
  newUrl: string,
  accessToken: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/links/${linkId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // 인증 토큰
      },
      body: JSON.stringify({
        url: newUrl,
      }), // 수정할 url 데이터
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "링크 수정 실패");
    }

    return await response.json(); // 서버의 응답 데이터 반환
  } catch (error: any) {
    console.error("링크 수정 중 오류 발생:", error.message);
    throw new Error(error.message || "서버와 통신 중 문제가 발생했습니다.");
  }
};
