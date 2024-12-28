import { Folder } from "@/pages/links";

interface FolderTitleProps {
  activeFolderId: number | null;
  folders: Folder[];
}

const FolderTitle: React.FC<FolderTitleProps> = ({
  activeFolderId,
  folders,
}) => {
  const folderName =
    activeFolderId === null
      ? "전체"
      : folders.find((folder) => folder.id === activeFolderId)?.name || "폴더";

  return <div className="text-2xl font-bold">{folderName}</div>;
};

export default FolderTitle;
