import type {Conversation} from "@/types/chat.ts";
import {useAuthStore} from "@/stores/useAuthStore.ts";
import {useChatStore} from "@/stores/useChatStore.ts";
import ChatCard from "@/components/chat/ChatCard.tsx";
import {cn} from "@/lib/utils.ts";
import UserAvatar from "@/components/chat/UserAvatar.tsx";
import StatusBadge from "@/components/chat/StatusBadge.tsx";
import UnreadCountBadge from "@/components/chat/UnreadCountBadge.tsx";

function DirectMessageCard({convo}: { convo: Conversation }) {
    const {user} = useAuthStore();
    const {activeConversationId, setActiveConversation, messages} = useChatStore();

    if (!user) return null;

    const otherUser = convo.participants.find(participant => participant._id !== user._id);
    if (!otherUser) return null;

    const unreadCount = convo.unreadCounts[user._id];
    const lastMessage = convo.lastMessage?.content ?? "";

    const handleSelectConversation = async (id: string) => {
        setActiveConversation(id);
        if (!messages[id]) {
            /*fetch messages*/
        }
    }


    return (<ChatCard convoId={convo._id} name={otherUser.displayName ?? ""}
                      timestamp={convo.lastMessage?.createdAt ? new Date(convo.lastMessage.createdAt) : undefined}
                      leftSection={<>
                        <UserAvatar type={"sidebar"} name={otherUser.displayName ?? ""} avatarUrl={otherUser.avatarUrl ?? undefined} />
                          <StatusBadge status={"offline"} />
                          {unreadCount > 0 && <UnreadCountBadge unreadCount={unreadCount} />}
                      </>}
                      unreadCount={unreadCount}
                      isActive={activeConversationId === convo._id}
                      onSelect={handleSelectConversation}
                      subtitle={<p
                          className={cn("text-sm truncate", unreadCount > 0 ? "font-medium text-forground" : "text-muted-foreground")}>
                          {lastMessage}
                      </p>}
    />);
}

export default DirectMessageCard;