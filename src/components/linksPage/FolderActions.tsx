import React from "react";
import { Folder } from "@/utilitys/types";

interface FolderActionsProps {
  activeFolderId: number | null;
  folders: Folder[];
  handleUpdateFolderName: (folderId: number, currentName: string) => void;
  handleDeleteFolder: (folderId: number, folderName: string) => void;
}

const FolderActions: React.FC<FolderActionsProps> = ({
  activeFolderId,
  folders,
  handleUpdateFolderName,
  handleDeleteFolder,
}) => {
  if (activeFolderId === null) return null; // activeFolderId가 없으면 아무것도 렌더링하지 않음

  const folder = folders.find((folder) => folder.id === activeFolderId);

  if (!folder) return null; // 해당 폴더를 찾을 수 없으면 렌더링하지 않음

  return (
    <div className="flex gap-5 text-slate-500">
      <button onClick={() => handleUpdateFolderName(folder.id, folder.name)}>
        ✏️ 이름변경
      </button>
      <button onClick={() => handleDeleteFolder(folder.id, folder.name)}>
        🗑️ 삭제
      </button>
    </div>
  );
};

export default FolderActions;
