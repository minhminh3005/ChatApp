import type { Conversation } from "@/types/chat.ts";
import { useAuthStore } from "@/stores/useAuthStore.ts";
import { useChatStore } from "@/stores/useChatStore.ts";
import ChatCard from "@/components/chat/ChatCard.tsx";
import UnreadCountBadge from "@/components/chat/UnreadCountBadge.tsx";
import GroupChatAvatar from "@/components/chat/GroupChatAvatar.tsx";

function GroupChatCard({ convo }: { convo: Conversation }) {
    const { user } = useAuthStore();
    const { activeConversationId, setActiveConversation, messages, fetchMessages } = useChatStore();

    if (!user) return null;

    const unreadCount = convo.unreadCounts[user._id];
    const name = convo?.group?.name || "Unnamed Group";

    const handleSelectConversation = async (id: string) => {
        setActiveConversation(id);
        if (!messages[id]) {
            await fetchMessages(id);
        }
    }

    return (
        <ChatCard convoId={convo._id} name={name}
            isActive={activeConversationId === convo._id}
            onSelect={handleSelectConversation}
            leftSection={<>
                {unreadCount > 0 && <UnreadCountBadge unreadCount={unreadCount} />}
                <GroupChatAvatar participants={convo.participants} type={"chat"} />
            </>}
            subtitle={
                <p className={"text-sm truncate text-muted-foreground"}>
                    {convo.participants.length} members
                </p>
            }
            timestamp={convo.lastMessage?.createdAt ? new Date(convo.lastMessage.createdAt) : undefined}

        />
    );
}

export default GroupChatCard;