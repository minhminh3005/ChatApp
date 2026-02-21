import type {IUser} from "@/types/user.ts";
import type {Conversation, Message} from "@/types/chat.ts";
import type {Socket} from "socket.io-client";

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
  messages: Record<
    string,
    {
      items: Message[];
      hasMore: boolean;
      nextCursor?: string | null;
    }
  >;
  activeConversationId: string | null;
  convoLoading: boolean;
  messageLoading: boolean;
  loading: boolean;
  reset: () => void;

  setActiveConversation: (id: string | null) => void;
  fetchConversations: () => Promise<void>;
  fetchMessages: (conversationId?: string) => Promise<void>;
  sendDirectMessage: (
    recipientId: string,
    content: string,
    imgUrl?: string
  ) => Promise<void>;
  sendGroupMessage: (
    conversationId: string,
    content: string,
    imgUrl?: string
  ) => Promise<void>;
  addMessage: (message: Message) => Promise<void>;
  updateConversation: (conversation: Conversation) => void;
  markAsSeen: () => Promise<void>;
  addConvo: (convo: Conversation) => void;
  createConversation: (
    type: "group" | "direct",
    name: string,
    memberIds: string[]
  ) => Promise<void>;
}


export interface SocketState {
  socket: Socket | null;
  onlineUsers: string[];
  connect: () => void;
  disconnect: () => void;
}
