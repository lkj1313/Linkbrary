import { Folder, Link } from "@/utilitys/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchFolders = async (): Promise<Folder[]> => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }

  const response = await fetch(`${BASE_URL}/folders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "데이터를 가져오는 데 실패했습니다.");
  }
  const data = response.json();
  return data; // 데이터를 반환
};

export const fetchAllLinks = async () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    alert("로그인이 필요합니다.");
    return;
  }

  const response = await fetch(`${BASE_URL}/links`, {
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
  const uniqueLinks = Array.from(
    new Map(
      data.list.map((link: { title: string }) => [link.title, link]) // url을 키로 사용
    ).values()
  );
  return uniqueLinks as Link[];
};

export const fetchLinksByFolder = async (folderId: number): Promise<Link[]> => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
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

  return data.list;
};
