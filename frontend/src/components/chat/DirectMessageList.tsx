import {useChatStore} from "@/stores/useChatStore.ts";
import DirectMessageCard from "@/components/chat/DirectMessageCard.tsx";

function DirectMessageList() {

    const {conversations} = useChatStore();

    if(!conversations || !conversations.length) return;

    const directMessages = conversations.filter(convo => convo.type === 'direct');

    return (
        <div className={"flex-1 overflow-y-auto p-2 space-y-2"}>
            {directMessages.map(convo => (
              <DirectMessageCard convo={convo} key={convo._id} />
            ))}
        </div>
    );
}

export default DirectMessageList;