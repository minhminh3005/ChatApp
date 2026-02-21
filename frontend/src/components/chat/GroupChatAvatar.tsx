import type {Participant} from "@/types/chat.ts";
import UserAvatar from "@/components/chat/UserAvatar.tsx";
import {Ellipsis} from "lucide-react";

interface  GroupChatAvatarProps {
    participants: Participant[];
    type: "chat" | "sidebar"
}

function GroupChatAvatar({participants, type}: GroupChatAvatarProps) {
  console.log(type)
    const avatars = [] ;
    const limit = Math.min(participants.length, 4);
    for (let i = 0; i < participants.length; i++) {
        const member = participants[i];
        avatars.push(
            <UserAvatar type={type} name={member.displayName} avatarUrl={member.avatarUrl ?? undefined} key={i}/>
        )
    }
    return (
        <div className={"relative flex -space-x-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:ring-2"}>
            {avatars}
            { participants.length > limit &&
                <div className={"flex items-center z-10 justify-center size-8 bg-muted text-muted-foreground rounded-full ring-2 ring-background"}>
                    <Ellipsis className={"size-4"} />
                </div>
            }
        </div>
    );
}

export default GroupChatAvatar;
