import {BrowserRouter, Route, Routes} from "react-router";
import {SignIn} from "./pages/SignIn.tsx";
import {SignUp} from "./pages/SignUp.tsx";
import {Toaster} from "sonner";
import {ProtectedRoute} from "@/components/auth/ProtectedRoute.tsx";
import {ChatApp} from "@/pages/ChatApp.tsx";
import {useThemeStore} from "@/stores/useThemeStore.ts";
import {useEffect} from "react";
import {useAuthStore} from "@/stores/useAuthStore.ts";
import {useSocketStore} from "@/stores/useSocketStore.ts";

function App() {
    const {isDark, setTheme} = useThemeStore();
    const {accessToken} = useAuthStore();
    const {connect, disconnect} = useSocketStore();

    useEffect(() => {
        setTheme(isDark);
    }, [isDark]);

  useEffect(() => {
    if(accessToken){
      connect();
    }
    return () => disconnect();
  }, [accessToken]);

    return (<>
        <Toaster richColors/>
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                {/* protectect routes */}
                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/"
                        element={<ChatApp />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    </>)
}

export default App
