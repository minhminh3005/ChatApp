import {cn} from "@/lib/utils.ts";

function StatusBadge({status}: {
    status: 'online' | 'offline' | 'busy' | 'away';
}) {
    return (
        <div className={cn(
            "absolute -bottom-0.5 -right-0.5 size-4 rounded-full border-2 border-card",
            status === "online" ? "status-online" : "status-offline",
        )}>

        </div>
    );
}

export default StatusBadge;