import type { IUser } from "@/types/user.ts";
import type { Conversation, Message } from "@/types/chat.ts";

export interface AuthState {
    accessToken: string | null;
    user: IUser | null;
    loading: boolean;
    signUp: (username: string, password: string, email: string, firstName: string, lastName: string) => Promise<void>;
    signIn: (username: string, password: string) => Promise<void>;
    fetchMe: () => Promise<void>;
    signOut: () => Promise<void>;
    refresh: () => Promise<void>;
    clearState: () => void;
    setAccessToken: (token: string) => void;
}

export interface ThemeState {
    isDark: boolean;
    toggleTheme: () => void;
    setTheme: (isDark: boolean) => void;
}

export interface ChatState {
    conversations: Conversation[];
    messages: Record<string, {
        items: Message[];
        hasMore: boolean;
        nextCursor: string | null;
    }>;
    activeConversationId: string | null;
    messageLoading: boolean;
    convoLoading: boolean;
    reset: () => void;
    setActiveConversation: (conversationId: string | null) => void;
    fetchConversations: () => void;
    fetchMessages: (conversationId: string) => Promise<void>;
}