import {useAuthStore} from "@/stores/useAuthStore.ts";
import {Navigate, Outlet} from "react-router";
import {useEffect, useState} from "react";

export const ProtectedRoute = () => {
    const {accessToken, user, loading, refresh, fetchMe} = useAuthStore();
    const [starting, setStarting] = useState(true);

    const init = async () => {
        if (!accessToken) {
            await refresh();
        }
        if(!user && accessToken){
            await fetchMe();
        }
        setStarting(false);
    }

    useEffect(() => {
        init()
    }, [])

    if(starting || loading){
        return <div className="flex h-screen items-center justify-center">Loading...</div>
    }

    if (!accessToken) {
        return (
            <Navigate to="/signin" replace></Navigate>
        )
    }
    return (
        <Outlet></Outlet>
    );
};
