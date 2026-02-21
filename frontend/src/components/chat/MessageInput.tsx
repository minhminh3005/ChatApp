import {useAuthStore} from "@/stores/useAuthStore.ts";
import {useState} from "react";
import type {Conversation} from "@/types/chat.ts";
import {Button} from "@/components/ui/button.tsx";
import {ImagePlus, Send} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {EmojiPicker} from "@/components/chat/EmojiPicker.tsx";
import {useChatStore} from "@/stores/useChatStore.ts";
import {toast} from "sonner";

const MessageInput = ({selectedConvo}: { selectedConvo: Conversation }) => {
  const {user} = useAuthStore();
  const  {sendDirectMessage, sendGroupMessage} = useChatStore();
  const [value, setValue] = useState("");

  if (!user) return null;

  const sendMessage = async () => {
    if(!value.trim()) return;
    setValue("");

    const currValue = value;
    try {
      if(selectedConvo.type === 'direct') {
        const participants = selectedConvo.participants;
        const otherUser = participants.filter(p => p._id !== user?._id)[0];
        await sendDirectMessage(otherUser._id, currValue);
      } else {
        await sendGroupMessage(selectedConvo._id, currValue);
      }
    }
    catch (error) {
      console.error(error);
      toast.error("Failed to send message");
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if(event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex items-center gap-2 p-3 min-h-[56px] bg-background">
          <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-smooth">
            <ImagePlus className="size-4"/>
          </Button>
          <div className="flex-1 relative">
            <Input
              onKeyDown={handleKeyPress}
              value={value} onChange={event => setValue(event.target.value)}
                   placeholder="Send a message..."
                   className="pr-20 h-9 bg-white border-border/50 focus:border-primary/50 transition-smooth resize-none"
            >

            </Input>
             <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button asChild
                        variant="ghost" size="icon" className="size-8 hover:bg-primary/10 transition-smooth"
                >
                <div><EmojiPicker onChange={(emoji: string) => setValue(`${value}${emoji}`)}/></div>
                </Button>
              </div>

          </div>
              <Button
                onClick={sendMessage}
                className="bg-gradient-chat hover:shadow-glow transition-smooth hover:scale-105"
                disabled={!value.trim()}>
                <Send className="size-4 text-white"/>
              </Button>
        </div>
  )
}

export default MessageInput
