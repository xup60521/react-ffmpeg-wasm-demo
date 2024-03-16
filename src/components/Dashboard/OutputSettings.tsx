import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Settings } from "../Dashboard";

export default function OutputSettings({
  setSettings,
}: {
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}) {
  return (
    <div className="w-full h-full flex flex-col min-h-0">
      <div className="flex flex-col gap-2 text-lg">
        <h3 className="font-mono p-1">Audio Settings：</h3>
        <div className="flex flex-wrap">
          <div className="flex items-center p-1 border-b-[1px] border-white w-fit gap-2">
            <h3 className="text-sm">Codec</h3>
            <SelectAudioCodec setSettings={setSettings} />
          </div>
        </div>
      </div>
    </div>
  );
}

const SelectAudioCodec = ({
  setSettings,
}: {
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}) => {
  return (
    <Select
      onValueChange={(e) => {
        setSettings((prev) => {
          prev.audio_codec = e;
          return { ...prev };
        });
      }}
    >
      <SelectTrigger className="w-32 text-white border-none bg-transparent">
        <SelectValue placeholder="選擇解碼器" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="copy">Copy</SelectItem>
        <SelectItem value="aac">AAC</SelectItem>
      </SelectContent>
    </Select>
  );
};
