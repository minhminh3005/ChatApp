import api from "@/lib/axios.ts"
import type { ConversationResponse, Message } from "@/types/chat.ts";

interface FetchMessagesResponse {
    messages: Message[];
    cursor: string | null;
}

const DEFAULT_LIMIT = 50;

export const chatService = {
    async fetchConversations(): Promise<ConversationResponse> {
        const res = await api.get("/conversations");
        return res.data;
    },

    async fetchMessages(id: string, cursor?: string): Promise<FetchMessagesResponse> {
        const res = await api.get(`/conversations/${id}/messages?limit=${DEFAULT_LIMIT}&cursor=${cursor}`);
        return {
            messages: res.data.messages,
            cursor: res.data.nextCursor
        }
    }
}

