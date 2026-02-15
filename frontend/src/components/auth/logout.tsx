import { Button } from "@/components/ui/button.tsx";
import { useAuthStore } from "@/stores/useAuthStore.ts";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";

export const Logout = () => {
    const { signOut } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut();
            navigate("/signin");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Button variant={"completeGhost"} onClick={handleLogout}>
            <LogOut className="text-destructive" />
            Logout
        </Button>
    );
};
