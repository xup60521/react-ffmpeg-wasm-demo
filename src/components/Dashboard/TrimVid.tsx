import { useEffect, useRef } from "react";
import { Settings } from "../Dashboard";

export default function TrimVid({
  duration,
  setSettings,
}: {
  duration: number;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}) {
  const start_hourRef = useRef<HTMLInputElement>(null);
  const start_minRef = useRef<HTMLInputElement>(null);
  const start_secRef = useRef<HTMLInputElement>(null);

  const end_hourRef = useRef<HTMLInputElement>(null);
  const end_minRef = useRef<HTMLInputElement>(null);
  const end_secRef = useRef<HTMLInputElement>(null);

  const vid_hour = `${Math.floor(duration / 3600)}`;
  const vid_min = `${Math.floor(duration / 60) - Number(vid_hour) * 60}`;
  const vid_sec = `${Math.floor(duration % 60)}`;

  function updateTime() {
    setSettings((prev) => {
      if (
        !start_hourRef.current ||
        !start_minRef.current ||
        !start_secRef.current ||
        !end_hourRef.current ||
        !end_minRef.current ||
        !end_secRef.current
      ) {
        return { ...prev };
      }
      const from = `${start_hourRef.current.value}:${start_minRef.current.value}:${start_secRef.current.value}`;
      const to = `${end_hourRef.current.value}:${end_minRef.current.value}:${end_secRef.current.value}`;
      prev.trim = { from, to };
      return { ...prev };
    });
  }

  useEffect(() => {
    if (end_hourRef.current && end_minRef.current && end_secRef.current) {
      end_hourRef.current.value = vid_hour.padStart(2, "0");
      end_minRef.current.value = vid_min.padStart(2, "0");
      end_secRef.current.value = vid_sec.padStart(2, "0");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center gap-2">
        <div className="flex items-center">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateTime();
                start_minRef.current?.focus();
              }
            }}
            onFocus={() => {
              start_hourRef.current?.select();
            }}
            onBlur={(e) => {
              if (
                !start_hourRef.current ||
                !start_minRef.current ||
                !start_secRef.current ||
                !end_hourRef.current ||
                !end_minRef.current ||
                !end_secRef.current
              ) {
                return;
              }
              if (
                Number.isNaN(Number(e.target.value)) ||
                e.target.value === ""
              ) {
                start_hourRef.current.value = "00";
                updateTime();
                return;
              }
              if (start_hourRef.current.value.length > 2) {
                start_hourRef.current.value = start_hourRef.current.value.slice(
                  0,
                  2
                );
                updateTime();
                return;
              }
              if (start_hourRef.current.value.length < 2) {
                start_hourRef.current.value =
                  start_hourRef.current.value.padStart(2, "0");
                updateTime();
                return;
              }
            }}
            className="w-8 min-w-0 rounded p-1 text-center bg-transparent border-[1px] text-sm border-white text-white"
            defaultValue={"00"}
            ref={start_hourRef}
          />
          <span className="font-bold text-lg w-2 text-white h-full flex items-center justify-center">
            :
          </span>
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateTime();
                start_secRef.current?.focus();
              }
            }}
            onFocus={() => {
              start_minRef.current?.select();
            }}
            onBlur={(e) => {
              if (
                !start_hourRef.current ||
                !start_minRef.current ||
                !start_secRef.current ||
                !end_hourRef.current ||
                !end_minRef.current ||
                !end_secRef.current
              ) {
                return;
              }
              if (
                Number.isNaN(Number(e.target.value)) ||
                e.target.value === ""
              ) {
                start_minRef.current.value = "00";
                updateTime();
                return;
              }
              if (start_minRef.current.value.length > 2) {
                start_minRef.current.value = start_minRef.current.value.slice(
                  0,
                  2
                );
                updateTime();
                return;
              }
              if (start_minRef.current.value.length < 2) {
                start_minRef.current.value =
                  start_minRef.current.value.padStart(2, "0");
                updateTime();
                return;
              }
            }}
            className="w-8 min-w-0 rounded p-1 text-center bg-transparent border-[1px] text-sm border-white text-white"
            defaultValue={"00"}
            ref={start_minRef}
          />
          <span className="font-bold text-lg w-2 text-white h-full flex items-center justify-center">
            :
          </span>
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateTime();
                end_hourRef.current?.focus();
              }
            }}
            onFocus={() => {
              start_secRef.current?.select();
            }}
            onBlur={(e) => {
              if (
                !start_hourRef.current ||
                !start_minRef.current ||
                !start_secRef.current ||
                !end_hourRef.current ||
                !end_minRef.current ||
                !end_secRef.current
              ) {
                return;
              }
              if (
                Number.isNaN(Number(e.target.value)) ||
                e.target.value === ""
              ) {
                start_secRef.current.value = "00";
                updateTime();
                return;
              }
              if (start_secRef.current.value.length > 2) {
                start_secRef.current.value = start_secRef.current.value.slice(
                  0,
                  2
                );
                updateTime();
                return;
              }
              if (start_secRef.current.value.length < 2) {
                start_secRef.current.value =
                  start_secRef.current.value.padStart(2, "0");
                updateTime();
                return;
              }
            }}
            className="w-8 min-w-0 rounded p-1 text-center bg-transparent border-[1px] text-sm border-white text-white"
            defaultValue={"00"}
            ref={start_secRef}
          />
        </div>
        <div className="flex-grow border-2 rounded-full border-white " />
        <div className="flex items-center">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateTime();
                end_minRef.current?.focus();
              }
            }}
            onFocus={() => {
              end_hourRef.current?.select();
            }}
            onBlur={(e) => {
              if (
                !start_hourRef.current ||
                !start_minRef.current ||
                !start_secRef.current ||
                !end_hourRef.current ||
                !end_minRef.current ||
                !end_secRef.current
              ) {
                return;
              }
              if (
                Number.isNaN(Number(e.target.value)) ||
                e.target.value === ""
              ) {
                end_hourRef.current.value = "00";
                updateTime();
                return;
              }
              if (end_hourRef.current.value.length > 2) {
                end_hourRef.current.value = end_hourRef.current.value.slice(
                  0,
                  2
                );
                updateTime();
                return;
              }
              if (end_hourRef.current.value.length < 2) {
                end_hourRef.current.value = end_hourRef.current.value.padStart(
                  2,
                  "0"
                );
                updateTime();
                return;
              }
            }}
            className="w-8 min-w-0 rounded p-1 text-center bg-transparent border-[1px] text-sm border-white text-white"
            defaultValue={"00"}
            ref={end_hourRef}
          />
          <span className="font-bold text-lg w-2 text-white h-full flex items-center justify-center">
            :
          </span>
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateTime();
                end_secRef.current?.focus();
              }
            }}
            onFocus={() => {
              end_minRef.current?.select();
            }}
            onBlur={(e) => {
              if (
                !start_hourRef.current ||
                !start_minRef.current ||
                !start_secRef.current ||
                !end_hourRef.current ||
                !end_minRef.current ||
                !end_secRef.current
              ) {
                return;
              }
              if (
                Number.isNaN(Number(e.target.value)) ||
                e.target.value === ""
              ) {
                end_minRef.current.value = "00";
                updateTime();
                return;
              }
              if (end_minRef.current.value.length > 2) {
                end_minRef.current.value = end_minRef.current.value.slice(0, 2);
                updateTime();
                return;
              }
              if (end_minRef.current.value.length < 2) {
                end_minRef.current.value = end_minRef.current.value.padStart(
                  2,
                  "0"
                );
                updateTime();
                return;
              }
            }}
            className="w-8 min-w-0 rounded p-1 text-center bg-transparent border-[1px] text-sm border-white text-white"
            defaultValue={"00"}
            ref={end_minRef}
          />
          <span className="font-bold text-lg w-2 text-white h-full flex items-center justify-center">
            :
          </span>
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateTime();
                end_secRef.current?.blur();
              }
            }}
            onFocus={() => {
              end_secRef.current?.select();
            }}
            onBlur={(e) => {
              if (
                !start_hourRef.current ||
                !start_minRef.current ||
                !start_secRef.current ||
                !end_hourRef.current ||
                !end_minRef.current ||
                !end_secRef.current
              ) {
                return;
              }
              if (
                Number.isNaN(Number(e.target.value)) ||
                e.target.value === ""
              ) {
                end_secRef.current.value = "00";
                updateTime();
                return;
              }
              if (end_secRef.current.value.length > 2) {
                end_secRef.current.value = end_secRef.current.value.slice(0, 2);
                updateTime();
                return;
              }
              if (end_secRef.current.value.length < 2) {
                end_secRef.current.value = end_secRef.current.value.padStart(
                  2,
                  "0"
                );
                updateTime();
                return;
              }
            }}
            className="w-8 min-w-0 rounded p-1 text-center bg-transparent border-[1px] text-sm border-white text-white"
            defaultValue={"00"}
            ref={end_secRef}
          />
        </div>
      </div>
    </div>
  );
}
