import { PropagateLoader } from "react-spinners";

export default function FFmpegLoading() {
  return (
    <div className="w-screen h-screen bg-slate-900 flex flex-col items-center justify-center gap-4">
      <p className="font-mono text-2xl w-full text-center text-white">
        FFmpeg is loading
      </p>
      <PropagateLoader color="#36d7b7" />
    </div>
  );
}
