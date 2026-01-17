import api from "@/lib/axios.ts"
import type {ConversationResponse} from "@/types/chat.ts";

export const chatService = {
    async fetchConversations(): Promise<ConversationResponse> {
        const res = await api.get("/conversations");
        return res.data;
    }
}