import {useThemeStore} from "@/stores/useThemeStore.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Smile} from "lucide-react";
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
interface EmojiPickerProps {
  onChange: (value: string) => void;
}
export const EmojiPicker = ({onChange}: EmojiPickerProps) => {
  const {isDark} = useThemeStore();
  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="size-4" />
      </PopoverTrigger>

      <PopoverContent side="right" sideOffset={40} className="bg-transparent border-none shadow-none drop-shadow-none mb-12">
          <Picker theme={isDark ? "dark" : "light"} data={data}
                  onEmojiSelect={(emoji: any) => onChange(emoji.native)}
                  emojiSize={24}
            />
      </PopoverContent>
    </Popover>
  );
};
