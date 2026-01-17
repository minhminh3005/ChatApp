import {type ReactNode} from 'react';
import {Card} from "@/components/ui/card.tsx";
import {cn, formatOnlineTime} from "@/lib/utils.ts";
import {MoreHorizontal} from "lucide-react";

interface ChatCardProps {
    convoId: string;
    name: string;
    timestamp?: Date;
    isActive: boolean;
    onSelect: (id: string) => void;
    unreadCount?: number;
    leftSection: ReactNode;
    subtitle: ReactNode;
}

function ChatCard({...props}: ChatCardProps) {
    return (<>
            <Card key={props.convoId}
                  className={cn("border-none p-3 cursor-pointer transition-smooth glass hover:bg-mnuted/30", props.isActive && "ring-2 ring-primary/50 bg-gradient-to-tr from-primary-glow/10 to-primary-foreground")}
                  onClick={() => props.onSelect(props.convoId)}
            >
                <div className="flex items-center gap-3">
                    <div className="relative">
                        {props.leftSection}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                            <h3 className={cn("font-semibold text-sm truncate", props.unreadCount && props.unreadCount > 0 && "text-foreground",)}>

                            </h3>
                            <span className={"text-xs text-muted-forground"}>
                                {props?.timestamp ? formatOnlineTime(props.timestamp) : ""}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 flex-1 min-w-0">
                                {props.subtitle}
                            </div>
                            <MoreHorizontal
                                className={"size-4 text-muted-foreground opacity-0 group-hover:opacity-100 hover:size-5 transition-smooth"}
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </>);
}

export default ChatCard;