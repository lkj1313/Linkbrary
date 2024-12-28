export type Folder = {
  id: number; // id가 숫자
  createdAt: string; // ISO 날짜 문자열
  name: string; // 폴더 이름
  linkCount: number; // 링크 수
};
export type Link = {
  id: number;
  url: string;
  createdAt: string;
  imageSource: string;
  description: string;
};
