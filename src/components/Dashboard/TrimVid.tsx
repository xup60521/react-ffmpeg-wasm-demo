import { useEffect, useRef, useState } from "react";
import { Settings } from "../Dashboard";

export default function TrimVid({
  duration,
  setSettings,
}: {
  duration: number;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}) {
  const vid_hour = `${Math.floor(duration / 3600)}`.padStart(2, "0");
  const vid_min = `${
    Math.floor(duration / 60) - Number(vid_hour) * 60
  }`.padStart(2, "0");
  const vid_sec = `${Math.floor(duration % 60)}`.padStart(2, "0");

  const [start_hour, set_start_hour] = useState<string>("00");
  const [start_min, set_start_min] = useState<string>("00");
  const [start_sec, set_start_sec] = useState<string>("00");
  const [end_hour, set_end_hour] = useState<string>(vid_hour);
  const [end_min, set_end_min] = useState<string>(vid_min);
  const [end_sec, set_end_sec] = useState<string>(vid_sec);

  const ref_start_hour = useRef<HTMLInputElement>(null);
  const ref_start_min = useRef<HTMLInputElement>(null);
  const ref_start_sec = useRef<HTMLInputElement>(null);
  const ref_end_hour = useRef<HTMLInputElement>(null);
  const ref_end_min = useRef<HTMLInputElement>(null);
  const ref_end_sec = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (
      start_hour &&
      start_min &&
      start_sec &&
      end_hour &&
      end_min &&
      end_sec
    ) {
      setSettings((prev) => {
        prev.trim = {
          from: `${start_hour}:${start_min}:${start_sec}`,
          to: `${end_hour}:${end_min}:${end_sec}`,
        };
        return {...prev};
      });
    }
  }, [
    start_hour,
    start_min,
    start_sec,
    end_hour,
    end_min,
    end_sec,
    setSettings,
  ]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center gap-2">
        <div className="flex items-center">
          <input
            className="w-8 min-w-0 rounded p-1 text-center bg-transparent border-[1px] text-sm border-white text-white"
            value={start_hour}
            onFocus={() => {
              ref_start_hour.current?.select();
            }}
            onChange={(e) => set_start_hour(e.target.value)}
            onBlur={(e) => {
              const text = e.target.value;
              if (Number.isNaN(Number(text)) || text === "") {
                set_start_hour("00");
                return;
              }
              if (text.length < 2) {
                set_start_hour(text.padStart(2, "0"));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                ref_start_min.current?.focus();
              }
            }}
            ref={ref_start_hour}
          />
          <span className="font-bold text-lg w-2 text-white h-full flex items-center justify-center">
            :
          </span>
          <input
            className="w-8 min-w-0 rounded p-1 text-center bg-transparent border-[1px] text-sm border-white text-white"
            value={start_min}
            onFocus={() => {
              ref_start_min.current?.select();
            }}
            onChange={(e) => set_start_min(e.target.value)}
            onBlur={(e) => {
              const text = e.target.value;
              if (Number.isNaN(Number(text)) || text === "") {
                set_start_min("00");
                return;
              }
              if (text.length < 2) {
                set_start_min(text.padStart(2, "0"));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                ref_start_sec.current?.focus();
              }
            }}
            ref={ref_start_min}
          />
          <span className="font-bold text-lg w-2 text-white h-full flex items-center justify-center">
            :
          </span>
          <input
            className="w-8 min-w-0 rounded p-1 text-center bg-transparent border-[1px] text-sm border-white text-white"
            value={start_sec}
            onFocus={() => {
              ref_start_sec.current?.select();
            }}
            onChange={(e) => set_start_sec(e.target.value)}
            onBlur={(e) => {
              const text = e.target.value;
              if (Number.isNaN(Number(text)) || text === "") {
                set_start_sec("00");
                return;
              }
              if (text.length < 2) {
                set_start_sec(text.padStart(2, "0"));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                ref_end_hour.current?.focus();
              }
            }}
            ref={ref_start_sec}
          />
        </div>
        <TrimVideoTimeline
          start_hour={start_hour}
          start_min={start_min}
          start_sec={start_sec}
          end_hour={end_hour}
          end_min={end_min}
          end_sec={end_sec}
          duration={duration}
        />
        <div className="flex items-center">
          <input
            className="w-8 min-w-0 rounded p-1 text-center bg-transparent border-[1px] text-sm border-white text-white"
            value={end_hour}
            onFocus={() => {
              ref_end_hour.current?.select();
            }}
            onChange={(e) => set_end_hour(e.target.value)}
            onBlur={(e) => {
              const text = e.target.value;
              if (Number.isNaN(Number(text)) || text === "") {
                set_end_hour("00");
                return;
              }
              if (text.length < 2) {
                set_end_hour(text.padStart(2, "0"));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                ref_end_min.current?.focus();
              }
            }}
            ref={ref_end_hour}
          />
          <span className="font-bold text-lg w-2 text-white h-full flex items-center justify-center">
            :
          </span>
          <input
            className="w-8 min-w-0 rounded p-1 text-center bg-transparent border-[1px] text-sm border-white text-white"
            value={end_min}
            onFocus={() => {
              ref_end_min.current?.select();
            }}
            onChange={(e) => set_end_min(e.target.value)}
            onBlur={(e) => {
              const text = e.target.value;
              if (Number.isNaN(Number(text)) || text === "") {
                set_end_min("00");
                return;
              }
              if (text.length < 2) {
                set_end_min(text.padStart(2, "0"));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                ref_end_sec.current?.focus();
              }
            }}
            ref={ref_end_min}
          />
          <span className="font-bold text-lg w-2 text-white h-full flex items-center justify-center">
            :
          </span>
          <input
            className="w-8 min-w-0 rounded p-1 text-center bg-transparent border-[1px] text-sm border-white text-white"
            value={end_sec}
            onFocus={() => {
              ref_end_sec.current?.select();
            }}
            onChange={(e) => set_end_sec(e.target.value)}
            onBlur={(e) => {
              const text = e.target.value;
              if (Number.isNaN(Number(text)) || text === "") {
                set_end_sec("00");
                return;
              }
              if (text.length < 2) {
                set_end_sec(text.padStart(2, "0"));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                ref_end_sec.current?.blur();
              }
            }}
            ref={ref_end_sec}
          />
        </div>
      </div>
    </div>
  );
}

const TrimVideoTimeline = ({
  start_hour,
  start_min,
  start_sec,
  end_hour,
  end_min,
  end_sec,
  duration,
}: {
  start_hour: string;
  start_min: string;
  start_sec: string;
  end_hour: string;
  end_min: string;
  end_sec: string;
  duration: number;
}) => {
  const start_time =
    3600 * Number(start_hour) + 60 * Number(start_min) + Number(start_sec);
  const end_time =
    3600 * Number(end_hour) + 60 * Number(end_min) + Number(end_sec);
  const trim_duration = end_time - start_time;
  const percent = `${(trim_duration / duration) * 100}%`;
  const x_offset = (duration / trim_duration) * 100 * (start_time / duration);

  return (
    <div className="flex-grow relative h-1">
      <div className="flex-grow relative w-full h-1 bg-gray-400 overflow-x-hidden">
        <div
          className="absolute h-1 rounded-full bg-white transition-all w-full"
          style={{
            transform: `scaleX(${percent}) translateX(${x_offset}%)`,
            transformOrigin: "left",
          }}
        ></div>
      </div>
      <div className="absolute w-full -top-1 flex">
        <div
          className="h-1 min-w-0 transition-all max-w-full"
          style={{ width: `${(start_time / duration) * 100}%` }}
        ></div>
        <div className="w-3 h-3 bg-white rounded-full transition-all"></div>
      </div>
      <div className="absolute w-full -top-1 flex">
        <div
          className="h-1 min-w-0 transition-all max-w-full"
          style={{ width: `${(end_time / duration) * 100}%` }}
        ></div>
        <div className="w-3 h-3 bg-white rounded-full transition-all"></div>
      </div>
    </div>
  );
};
