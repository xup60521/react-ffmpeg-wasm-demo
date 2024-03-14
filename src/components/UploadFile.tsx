import { useRef } from "react";

export default function UploadFile({
  setInputFile,
}: {
  setInputFile: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFile(e.target.files ? e.target.files[0] : null);
  };
  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleInput}
      />
      <button
        onClick={() => {
          inputRef.current?.click();
        }}
        className="px-4 py-3 border-2 border-white rounded-lg transition-all text-white hover:bg-white hover:text-black font-mono text-2xl"
      >
        Upload Video
      </button>
    </div>
  );
}
