import {create} from 'zustand';
import {io, type Socket} from 'socket.io-client';
import {useAuthStore} from './useAuthStore';
import type {SocketState} from "@/types/store.ts";
import {useChatStore} from "@/stores/useChatStore.ts";

const baseUrl = import.meta.env.VITE_SOCKET_URL;

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  onlineUsers: [],
  connect: () => {
    const accessToken = useAuthStore.getState().accessToken;
    const existed = get().socket;
    if (existed) return;
    const socket: Socket = io(baseUrl, {
      auth: {token: accessToken},
      transports: ["websocket"],
    });
    set({socket});

    socket.on("connect", () => console.log("Socket connected!"));

    //   online users
    socket.on("online-users", (userIds) => set({onlineUsers: userIds}));

    socket.on("new-message", ({message, conversation, unreadCounts}) => {
      useChatStore.getState().addMessage(message);

      const lastMessage = {
        _id: conversation.lastMessage._id,
        content: conversation.lastMessage.content,
        createdAt: conversation.lastMessage.createdAt,
        sender: {
          _id: conversation.lastMessage.senderId,
          displayName: "",
          avatarUrl: null
        }
      }

      const updateConversation = {
        ...conversation,
        lastMessage,
        unreadCounts
      }

      if (useChatStore.getState().activeConversationId === message.conversationId) {
        //   mark as read
      }

      useChatStore.getState().updateConversation(updateConversation);
    })
  },
  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      console.log("Disconnecting socket...");
      socket.disconnect();
      set({socket: null, onlineUsers: []});
    }
  }
}))
