import { useEffect, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import "./App.css";
import UploadFile from "./components/UploadFile";
import DashBoard from "./components/Dashboard";
import FFmpegLoading from "./components/FFmpegLoading";

function App() {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const ffmpegRef = useRef(new FFmpeg());
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  const [isFFmpegLoading, setIsFFmpegLoading] = useState(true);

  useEffect(() => {
    const loader = async () => {
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
      const ffmpeg = ffmpegRef.current;
      ffmpeg.on("log", ({ message }) => {
        if (messageRef.current) messageRef.current.innerHTML = message;
      });
      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm"
        ),
      });
      setIsFFmpegLoading(false);
    };
    loader();
  }, []);

  return (
    <>
      {isFFmpegLoading ? (
        <FFmpegLoading />
      ) : (
        <>
          <main className="w-screen h-screen bg-slate-900 overflow-x-hidden scroll-smooth">
            {!inputFile && <UploadFile setInputFile={setInputFile} />}
            {inputFile && (
              <DashBoard inputFile={inputFile} ffmpegRef={ffmpegRef} messageRef={messageRef} />
            )}
          </main>
        </>
      )}
    </>
  );
}

export default App;
