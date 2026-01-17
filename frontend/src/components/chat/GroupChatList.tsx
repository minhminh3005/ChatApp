import {useChatStore} from "@/stores/useChatStore.ts";
import GroupChatCard from "@/components/chat/GroupChatCard.tsx";

function GroupChatList() {
    const {conversations} = useChatStore();

    if(!conversations || !conversations.length) return;

    const groupChats = conversations.filter(convo => convo.type === 'group');

    return (
        <div className={"flex-1 overflow-y-auto p-2 space-y-2"}>
            {groupChats.map(convo => (
                <GroupChatCard convo={convo} key={convo._id}/>
            ))}
        </div>
    );
}

export default GroupChatList;