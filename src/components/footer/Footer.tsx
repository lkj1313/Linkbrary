import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  return (
    <div className="py-[32px] px-[104px]  bg-black mt-auto">
      {" "}
      <div className="text-white flex justify-between">
        <div>@codeit - 2024</div>
        <div className="w-[181px] flex gap-[30px]">
          <div
            onClick={() => {
              router.push("/privacy");
            }}
            className="cursor-pointer"
          >
            Privacy Policy
          </div>

          <div
            onClick={() => {
              router.push("/faq");
            }}
            className="cursor-pointer"
          >
            FAQ
          </div>
        </div>
        <div className="flex gap-3">
          <Image
            src="/icon/facebookIcon.svg"
            alt="facebook"
            width={20}
            height={20}
          ></Image>
          <Image
            src="/icon/twitterIcon.svg"
            alt="facebook"
            width={20}
            height={20}
          ></Image>
          <Image
            src="/icon/youtubeIcon.svg"
            alt="facebook"
            width={20}
            height={20}
          ></Image>
          <Image
            src="/icon/instaIcon.svg"
            alt="facebook"
            width={20}
            height={20}
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default Footer;
