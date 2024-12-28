import React from "react";
interface AddLinkInputProps {
  inputLink: string;
  setInputLink: React.Dispatch<React.SetStateAction<string>>;
  handleAddLink: () => void;
}

const AddLinkInput: React.FC<AddLinkInputProps> = ({
  inputLink,
  setInputLink,
  handleAddLink,
}) => {
  return (
    <div className="w-[800px] h-[69px] relative">
      <input
        type="text"
        value={inputLink}
        onChange={(e) => setInputLink(e.target.value)}
        placeholder="링크를 추가해 보세요"
        className="h-full w-full rounded-[15px] py-[16px] px-[40px] border border-primary"
      ></input>
      <img src="/icon/clipIcon.svg" className="absolute top-6 left-3"></img>
      <button
        onClick={handleAddLink}
        className="w-[80px] h-[37px] rounded-[8px] py-[10px] px-[16px] bg-linearGradient absolute top-[16px] right-3 text-[10px] text-white"
      >
        추가하기
      </button>
    </div>
  );
};

export default AddLinkInput;
