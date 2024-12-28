const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // 환경 변수에서 Base URL 가져오기

// 로그인 API 호출
export const fetchLogin = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "로그인에 실패했습니다.");
    }

    const data = await response.json();
    return data; // 로그인 성공 시 받은 데이터 반환 (토큰 포함)
  } catch (error) {
    console.error("로그인 요청 중 오류 발생:", error);
    throw error;
  }
};
// 사용자 데이터 가져오기
export const fetchUsers = async () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }

  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // 인증 토큰 추가
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "사용자 데이터를 가져오는 데 실패했습니다."
      );
    }

    const data = await response.json();
    return data; // 서버로부터 받은 사용자 데이터 반환
  } catch (error) {
    console.error("사용자 데이터를 가져오는 중 오류 발생:", error);
    throw error;
  }
};
