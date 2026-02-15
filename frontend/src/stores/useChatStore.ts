import { create } from 'zustand';
import type { ChatState } from "@/types/store.ts";
import { persist } from "zustand/middleware";
import { chatService } from "@/services/chatService.ts";
import { useAuthStore } from './useAuthStore';

export const useChatStore = create<ChatState>()(
    persist(
        (set, get) => ({
            conversations: [],
            messages: {},
            activeConversationId: null,
            convoLoading: false,
            messageLoading: false,
            reset: () => set({
                conversations: [],
                messages: {},
                activeConversationId: null,
                convoLoading: false,
                messageLoading: false,
            }),
            setActiveConversation: (conversationId: string | null) => {
                set({ activeConversationId: conversationId });
            },
            fetchConversations: async () => {
                try {
                    set({ convoLoading: true });
                    const { conversations } = await chatService.fetchConversations();
                    set({ conversations, convoLoading: false });
                }
                catch (error) {
                    console.error(error);
                    set({ convoLoading: false });
                }
            },
            fetchMessages: async (conversationId: string) => {
                const { activeConversationId, messages } = get();
                const { user } = useAuthStore.getState();
                const convoId = conversationId ?? activeConversationId;
                if (!convoId) return;

                const current = messages?.[convoId];
                const nextCursor = current?.nextCursor === undefined ? "" : current?.nextCursor;

                if (nextCursor === null) return;

                set({ messageLoading: true });
                try {
                    const { messages: fetchedMessages, cursor } = await chatService.fetchMessages(convoId, nextCursor);
                    const processedMessages = fetchedMessages.map((message) => ({
                        ...message,
                        isMe: message.senderId === user?._id,
                    }));

                    set((state) => {
                        const prev = state.messages[convoId]?.items || [];
                        const merged = prev.length > 0 ? [...processedMessages, ...prev] : processedMessages;
                        return {
                            messages: {
                                ...state.messages,
                                [convoId]: {
                                    items: merged,
                                    nextCursor: cursor ?? null,
                                    hasMore: !!cursor
                                }
                            },
                            messageLoading: false
                        }
                    })

                } catch (error) {
                    console.error("Failed to fetch messages:", error);
                    set({ messageLoading: false });
                }
            },
        }),
        {
            name: 'chat-storage',
            partialize: (state) => ({ conversations: state.conversations })
        }
    )
)