interface FolderAddButtonProps {
  handleAddFolder: () => void;
}

const FolderAddButton: React.FC<FolderAddButtonProps> = ({
  handleAddFolder,
}) => {
  return (
    <div
      onClick={handleAddFolder}
      className="text-primary flex gap-2 cursor-pointer items-center"
    >
      폴더 추가 <img src="/icon/plusIcon.svg" alt="폴더 추가" />
    </div>
  );
};

export default FolderAddButton;
