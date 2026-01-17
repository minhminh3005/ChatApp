import {create} from 'zustand';
import type {ChatState} from "@/types/store.ts";
import {persist} from "zustand/middleware";
import {chatService} from "@/services/chatService.ts";

export const useChatStore = create<ChatState>()(
    persist(
        (set, _) => ({
            conversations: [],
            messages: {},
            activeConversationId: null,
            loading: false,
            reset: () => set({
                conversations: [],
                messages: {},
                activeConversationId: null,
                loading: false,
            }),
            setActiveConversation: (conversationId: string | null) => {
                set({activeConversationId: conversationId});
            },
            fetchConversations: async () => {
                try {
                    set({loading: true});
                    const {conversations} = await chatService.fetchConversations();
                    set({conversations, loading: false });
                }
                catch (error) {
                    console.error(error);
                    set({loading: false});
                }
            }
        }),
        {
            name: 'chat-storage',
            partialize: (state) => ({conversations: state.conversations})
        }
    )
)