import {create} from "zustand";
import {persist} from "zustand/middleware";
import type {ThemeState} from "@/types/store.ts";

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            isDark: false,
            toggleTheme: () => {
                const newVal = !get().isDark;
                set({isDark: newVal});
                if(newVal) {
                    document.documentElement.classList.add("dark");
                }else {
                    document.documentElement.classList.remove("dark");
                }
            },
            setTheme: (isDark: boolean) => {
                set({isDark})
                if(isDark) {
                    document.documentElement.classList.add("dark");
                }else {
                    document.documentElement.classList.remove("dark");
                }
            },
        }),
        {
            name: "theme-storage",
        }
    )
)