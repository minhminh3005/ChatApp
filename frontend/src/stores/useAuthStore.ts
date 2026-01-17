import {create} from "zustand";
import {toast} from "sonner";
import {authService} from "@/services/authService.ts";
import type {AuthState} from "@/types/store.ts";
import api from "@/lib/axios.ts";
import {persist} from "zustand/middleware";
import {useChatStore} from "@/stores/useChatStore.ts";


export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            accessToken: null,
            user: null,
            loading: false,
            signUp: async (username, password, email, firstName, lastName) => {
                try {
                    set({loading: true});
                    await authService.signUp(username, password, email, firstName, lastName);
                    toast.success("Sign up successful! Please sign in.");
                } catch (error) {
                    console.error(error);
                    toast.error("Sign up failed. Please try again.");
                } finally {
                    set({loading: false});
                }
            },
            signIn: async (username, password) => {
                try {
                    set({loading: true});
                    localStorage.clear();
                    useChatStore.getState().reset();
                    const {accessToken} = await authService.signIn(username, password);
                    get().setAccessToken(accessToken)
                    await get().fetchMe();
                    useChatStore.getState().fetchConversations();
                    toast.success("Sign in successful! Welcome back.");
                } catch (error) {
                    console.error(error);
                    toast.error("Sign in failed. Please try again.");
                } finally {
                    set({loading: false});
                }
            },
            signOut: async () => {
                return api.post('/auth/signout', {}, {withCredentials: true});
            },
            fetchMe: async () => {
                try {
                    set({loading: true});
                    const user = await authService.fetchMe();
                    set({user});
                } catch (error) {
                    console.error(error);
                    set({user: null, accessToken: null});
                    toast.error("Failed to fetch user data.");
                } finally {
                    set({loading: false});
                }
            },
            refresh: async () => {
                try {
                    set({loading: true});
                    const {user, fetchMe} = get();

                    const accessToken = await authService.refresh();
                    get().setAccessToken(accessToken)

                    if (!user) {
                        await fetchMe();
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to refresh user data.");
                    get().clearState();
                } finally {
                    set({loading: false});
                }
            },
            clearState: () => {
                set({ accessToken: null, user: null, loading: false });
                localStorage.clear();
                useChatStore.getState().reset();
            },
            setAccessToken: (accessToken: string) => {
                set({ accessToken });
            }
        }), {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
            }),
        }
    )
);