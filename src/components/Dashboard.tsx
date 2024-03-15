import { useEffect, useRef, useState } from "react";
import { type FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import TrimVid from "./Dashboard/TrimVid";
export type Settings = {
  trim?: {
    from: string;
    to: string;
  };
  filenameExt?: string;
};

export default function DashBoard({
  inputFile,
  ffmpegRef,
  messageRef,
}: {
  inputFile: File;
  ffmpegRef: React.MutableRefObject<FFmpeg>;
  messageRef: React.MutableRefObject<HTMLParagraphElement | null>;
}) {
  const [settings, setSettings] = useState<Settings>({});
  const [isConverting, setIsConverting] = useState(false);
  const [outputVid, setOutputVid] = useState<string | null>(null);
  const outputDivRef = useRef<HTMLDivElement>(null);
  const inputVidRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState<number | null>(null);
  // const duration = inputVidRef.current?.duration

  const handleConvert = async () => {
    if (!inputFile) {
      return;
    }
    setIsConverting(true);
    const ffmpeg = ffmpegRef.current;
    const filename = inputFile.name;
    await ffmpeg.writeFile(filename, await fetchFile(inputFile));
    let arr = ["-i", filename]
    if (settings.trim) {
      arr = [...arr,"-ss", settings.trim.from, "-to", settings.trim.to]
    }
    arr = [...arr, "-c", "copy"]
    arr = [...arr, "output.mp4"]
    await ffmpeg.exec([...arr]);
    const fileData = await ffmpeg.readFile("output.mp4");
    const data = new Uint8Array(fileData as ArrayBuffer);
    setOutputVid(
      URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
    );
    setIsConverting(false);
  };

  useEffect(() => {
    if (!isConverting && outputVid) {
      outputDivRef.current?.scrollIntoView();
    }
  }, [isConverting, outputVid]);

  return (
    <>
      <div className="h-screen w-full flex items-center flex-col justify-center">
        <div className="md:grid md:grid-cols-2 h-full w-full">
          <section className="flex flex-col gap-2 p-4 border-r-2 border-orange-400 text-white">
            <p className="w-full text-left font-mono text-xl ">
              {inputFile.name}
            </p>
            <video controls ref={inputVidRef} onLoadedMetadata={(e) => {
              const v = e.currentTarget.duration
              if (v) {
                setDuration(v)
              }
            }} >
              <source src={URL.createObjectURL(inputFile)} />
            </video>
            {duration ? <TrimVid duration={duration} setSettings={setSettings} /> : null}
            <div className="h-16 w-full">
              {isConverting && <p ref={messageRef} className="text-white"></p>}
            </div>
            {/* <p>
              {JSON.stringify(settings)}
            </p> */}
          </section>
          <section className="text-white flex flex-col p-4 justify-end gap-2">
            {/* <p>{inputVidRef.current?.duration}</p> */}
            <button
              onClick={handleConvert}
              className="w-full text-white border-2 border-white p-2 rounded-lg transition-all hover:bg-white hover:text-black"
            >
              Convert
            </button>
          </section>
        </div>
      </div>
      {outputVid && (
        <div
          className="w-full h-screen flex flex-col items-center justify-center gap-4 box-border border-orange-400 border-4"
          ref={outputDivRef}
        >
          <video className="h-1/2" controls>
            <source src={outputVid} />
          </video>
          <a
            className="text-white cursor-pointer border-2 border-white rounded-md transition-all px-3 py-2 hover:bg-white hover:text-black"
            href={outputVid}
            target="_blank"
          >
            Download
          </a>
        </div>
      )}
    </>
  );
}
