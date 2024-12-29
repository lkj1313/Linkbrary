import React from "react";
import LinkCard from "./LinkCard";

import { Link } from "@/utilitys/types";

interface LinkListProps {
  links: Link[];
  timeAgo: (createdAt: string) => string;
  formatDate: (createdAt: string) => string;
  activeFolderId: number | null;
}

const LinkList: React.FC<LinkListProps> = ({
  links,
  timeAgo,
  formatDate,
  activeFolderId,
}) => {
  return (
    <>
      {links.length > 0 ? (
        links.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            timeAgo={timeAgo}
            formatDate={formatDate}
            activeFolderId={activeFolderId}
          />
        ))
      ) : (
        <div className="text-gray-500">링크가 없습니다.</div>
      )}
    </>
  );
};

export default LinkList;
