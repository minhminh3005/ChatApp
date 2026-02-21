import ChatWindowHeader from "@/components/chat/ChatWindowHeader.tsx";
import {SidebarInset} from "@/components/ui/sidebar.tsx";

// const suggestions = [
//   { icon: "✉️", text: "Help me write a professional email" },
//   { icon: "💡", text: "Explain a complex concept simply" },
//   { icon: "🎨", text: "Generate creative ideas for my project" },
//   { icon: "📝", text: "Review and improve my writing" }
// ];

function ChatWelcomeScreen() {
    return (
      <SidebarInset className={"flex w-full h-full bg-transparent"}>
        <ChatWindowHeader />
        <div className="flex bg-primary-foreground rounded-2xl flex-1 items-center justify-center">
          <div className="text-center max-w-3xl px-6">
            <div className="size-24 mx-auto mb-6 bg-gradient-chat rounded-full flex items-center justify-center shadow-glow pulse-ring">
              <span className="text-3xl">💬</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 bg-gradient-chat bg-clip-text text-transparent">
              Welcome to Chat App
            </h2>
            <p className="text-muted-foreground mb-8">
              Select a suggestion to get started
            </p>

            {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-3">*/}
            {/*  {suggestions.map((suggestion, index) => (*/}
            {/*    <button*/}
            {/*      key={index}*/}
            {/*      className="flex items-center gap-3 p-4 bg-background/50 hover:bg-background/80 border border-border rounded-lg transition-all hover:shadow-md text-left"*/}
            {/*    >*/}
            {/*      <span className="text-2xl">{suggestion.icon}</span>*/}
            {/*      <span className="text-sm text-foreground">{suggestion.text}</span>*/}
            {/*    </button>*/}
            {/*  ))}*/}
            {/*</div>*/}
          </div>
        </div>
      </SidebarInset>
    )
}

export default ChatWelcomeScreen
