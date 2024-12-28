interface Folder {
  id: number;
  name: string;
}

interface FolderListProps {
  folders: Folder[];
  activeFolderId: number | null;
  handleFolderClick: (id: number | null) => void;
}

const FolderList: React.FC<FolderListProps> = ({
  folders,
  activeFolderId,
  handleFolderClick,
}) => {
  return (
    <div className="flex gap-2">
      {/* 전체 버튼 */}
      <button
        onClick={() => handleFolderClick(null)}
        className={`border border-primary rounded-md px-[12px] py-[8px] shadow ${
          activeFolderId === null
            ? "bg-primary text-white"
            : "hover:bg-gray-300"
        }`}
      >
        전체
      </button>

      {/* 폴더 버튼 */}
      {folders.map((folder) => (
        <button
          key={folder.id}
          onClick={() => handleFolderClick(folder.id)}
          className={`border border-primary rounded-md px-[12px] py-[8px] shadow ${
            activeFolderId === folder.id
              ? "bg-primary text-white"
              : "hover:bg-gray-300"
          }`}
        >
          {folder.name}
        </button>
      ))}
    </div>
  );
};
export default FolderList;
