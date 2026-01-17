import {SidebarProvider} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/sidebar/app-sidebar.tsx";
import ChatWindowLayout from "@/components/chat/ChatWindowLayout.tsx";

export const ChatApp = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex h-screen w-full p-2">
                <ChatWindowLayout />
            </div>
        </SidebarProvider>
    )
};
