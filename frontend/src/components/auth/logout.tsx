import {Button} from "@/components/ui/button.tsx";
import {useAuthStore} from "@/stores/useAuthStore.ts";
import {useNavigate} from "react-router";

export const Logout = () => {
    const {signOut} = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try{
            await signOut();
            navigate("/signin");
        }catch(error){
            console.error(error);
        }
    }

    return (
        <Button onClick={handleLogout}>Logout</Button>
    );
};
