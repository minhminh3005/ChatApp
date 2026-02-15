"use client"

import * as React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupAction,
    SidebarGroupContent, SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar.tsx"
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch.tsx";
import CreateNewChat from "@/components/chat/CreateNewChat.tsx";
import GroupChatModal from "@/components/chat/GroupChatModal.tsx";
import GroupChatList from "@/components/chat/GroupChatList.tsx";
import AddFriendModal from "@/components/chat/AddFriendModal.tsx";
import DirectMessageList from "@/components/chat/DirectMessageList.tsx";
import { useThemeStore } from "@/stores/useThemeStore.ts";
import { useAuthStore } from "@/stores/useAuthStore";
import { NavUser } from "./nav-user";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { isDark, toggleTheme } = useThemeStore();
    const { user } = useAuthStore();
    return (<>
        <Sidebar variant="inset" {...props}>
            {/* Header */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className={"bg-gradient-primary"}>
                            <a href="#">
                                <div className="flex w-full items-center px-2 justify-between">
                                    <h1 className="text-xl font-bold text-white">
                                        Chat App
                                    </h1>
                                    <div className="flex items-center gap-2">
                                        <Sun className={"size-4 text-white/80"} />
                                        <Switch
                                            checked={isDark}
                                            onCheckedChange={toggleTheme}
                                            className={"data-[state=checked]:bg-background/80"}
                                        />
                                        <Moon className={"size-4 text-white/80"} />
                                    </div>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Content */}
            <SidebarContent>
                {/* New Chat*/}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <CreateNewChat />
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Group Chat*/}
                <SidebarGroup>
                    <SidebarGroupLabel className={"uppercase"}>
                        Group Chats
                    </SidebarGroupLabel>
                    <SidebarGroupAction title={"Create New Group Chat"} className={"cursor-pointer"}>
                        <GroupChatModal />
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <GroupChatList />
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Direct Message*/}
                <SidebarGroup>
                    <SidebarGroupLabel className={"uppercase"}>
                        Friends
                    </SidebarGroupLabel>
                    <SidebarGroupAction title={"Add friend"} className={"cursor-pointer"}>
                        <AddFriendModal />
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <DirectMessageList />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}

            <SidebarFooter>
                {user && <NavUser user={user} />}
            </SidebarFooter>
        </Sidebar>
    </>)
}
