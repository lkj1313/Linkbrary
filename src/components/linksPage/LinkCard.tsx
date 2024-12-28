import React from "react";

interface Link {
  id: number;
  imageSource: string;
  createdAt: string;
  description: string;
}

interface LinkCardProps {
  link: Link;
  timeAgo: (createdAt: string) => string;
  formatDate: (createdAt: string) => string;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, timeAgo, formatDate }) => {
  return (
    <div className="flex flex-col items-center w-[calc(33.33%-20px)] bg-white">
      <div className="w-full h-[200px]">
        <img
          src={link.imageSource}
          className="w-full h-full object-cover rounded-tl-lg rounded-tr-lg"
          alt={link.description}
        />
      </div>
      <div className="w-full h-[135px] flex flex-col gap-[10px] rounded-bl-[15px] rounded-br-[15px] px-[20px] py-[15px]">
        <div className="font-[400] text-[13px] flex justify-between text-gray-600">
          <span>{timeAgo(link.createdAt)}</span>
          <button>⋯</button>
        </div>
        <div className="line-clamp-2">{link.description}</div>
        <div>{formatDate(link.createdAt)}</div>
      </div>
    </div>
  );
};

export default LinkCard;
