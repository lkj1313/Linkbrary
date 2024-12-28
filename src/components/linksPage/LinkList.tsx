import React from "react";
import LinkCard from "./LinkCard";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

interface Link {
  id: number;
  imageSource: string;
  createdAt: string;
  description: string;
}

interface LinkListProps {
  links: Link[];
  timeAgo: (createdAt: string) => string;
  formatDate: (createdAt: string) => string;
}

const LinkList: React.FC<LinkListProps> = ({ links, timeAgo, formatDate }) => {
  return (
    <>
      {links.length > 0 ? (
        links.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            timeAgo={timeAgo}
            formatDate={formatDate}
          />
        ))
      ) : (
        <div className="text-gray-500">링크가 없습니다.</div>
      )}
    </>
  );
};

export default LinkList;
