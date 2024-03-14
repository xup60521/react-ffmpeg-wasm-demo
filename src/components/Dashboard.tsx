import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
type Settings = {
  video_codec: string;
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
  const [settings, setSettings] = useState<Settings>({
    video_codec: "copy",
  });
  const [isConverting, setIsConverting] = useState(false);
  const [outputVid, setOutputVid] = useState<string | null>(null);
  const outputDivRef = useRef<HTMLDivElement>(null);

  const handleConvert = async () => {
    if (!inputFile) {
      return;
    }
    setIsConverting(true);
    const ffmpeg = ffmpegRef.current;
    const filename = inputFile.name;
    await ffmpeg.writeFile(filename, await fetchFile(inputFile));
    await ffmpeg.exec([
      "-i",
      filename,
      "-c:v",
      settings.video_codec,
      "output.mp4",
    ]);
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
  }, [isConverting]);

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center">
        <div className="flex flex-col gap-4 md:w-5/6 text-white p-4 h-screen  justify-center items-center">
          <p className="w-full text-center font-mono text-xl">
            {inputFile.name}
          </p>
          <div className="w-full border-t-2 border-orange-400" />
          <div className="md:grid md:grid-cols-2 gap-4">
            <video controls>
              <source src={URL.createObjectURL(inputFile)} />
            </video>
            <section className="text-white flex flex-col">
              <VideoCodec setSettings={setSettings} />
            </section>
          </div>
          <button
            onClick={handleConvert}
            className="w-full text-white border-2 border-white p-2 rounded-lg transition-all hover:bg-white hover:text-black"
          >
            Convert
          </button>
          <div className="h-16 w-full">
            {isConverting && <p ref={messageRef}></p>}
          </div>
        </div>
      </div>
      {outputVid && (
        <div
          className="w-full h-screen flex flex-col items-center justify-center gap-4"
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

const VideoCodec = ({
  setSettings,
}: {
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}) => {
  return (
    <Select
      onValueChange={(e) => {
        setSettings((prev) => {
          prev.video_codec = e;
          return { ...prev };
        });
      }}
    >
      <SelectTrigger className="w-[180px] text-black" defaultValue={"copy"}>
        <SelectValue placeholder="選擇影像編碼" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="copy">copy</SelectItem>
        <SelectItem value="libx264">x264</SelectItem>
        <SelectItem value="libx265">x265 / HEVC</SelectItem>
        <SelectItem value="libvpx-vp9">Webm / vp9</SelectItem>
      </SelectContent>
    </Select>
  );
};
