import {BrowserRouter, Route, Routes} from "react-router";
import {SignIn} from "./pages/SignIn.tsx";
import {SignUp} from "./pages/SignUp.tsx";
import {Toaster} from "sonner";
import {ProtectedRoute} from "@/components/auth/ProtectedRoute.tsx";
import {ChatApp} from "@/pages/ChatApp.tsx";
import {useThemeStore} from "@/stores/useThemeStore.ts";
import {useEffect} from "react";

function App() {
    const {isDark, setTheme} = useThemeStore();

    useEffect(() => {
        setTheme(isDark);
    }, [isDark])

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
