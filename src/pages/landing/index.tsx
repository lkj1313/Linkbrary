import Image from "next/image";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import CommonButton from "@/components/button/CommonButton";
import { useRouter } from "next/router";

const LandingPage = () => {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/links");
  };
  return (
    <div>
      <Header />
      <main className="bg-gray-100 ">
        <section className="flex justify-center items-center flex-col px-[100px] py-[70px]">
          <h1 className="w-[708px] h-[160px] text-[40px] leading-[60px] flex flex-col justify-center items-center gap-5">
            <div className="flex justify-center items-center flex-col">
              <div>세상의 모든 정보를</div>{" "}
              <div> 쉽게 저장하고 관리해 보세요</div>
            </div>
          </h1>
          <CommonButton
            onClick={handleNavigate}
            className="w-[350px] h-[53px] flex  justify-center items-center   bg-linearGradient text-white text-[16px] px-[20px] py-[16px] rounded"
          >
            링크 추가하기{" "}
          </CommonButton>

          <img
            src="/landingImg/landingImg1.svg"
            alt="이미지1"
            className="w-[1000px] h-[590px] object-contain"
          />
        </section>
        <section className="w-full bg-white flex justify-center items-center flex-col px-[100px] py-[70px]">
          <img
            src="/landingImg/landingImg2.svg"
            alt="이미지2"
            className="w-[1000px] h-[590px] object-contain"
          />
        </section>
        <section className="w-full bg-white flex justify-center items-center flex-col px-[100px] py-[70px]">
          <img
            src="/landingImg/landingImg3.svg"
            alt="이미지3"
            className="w-[1000px] h-[590px] object-contain"
          />
        </section>
        <section className="w-full bg-white flex justify-center items-center flex-col px-[100px] py-[70px]">
          <img
            src="/landingImg/landingImg4.svg"
            alt="이미지4"
            className="w-[1000px] h-[590px] object-contain"
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
