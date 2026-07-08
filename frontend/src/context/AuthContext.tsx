import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import type { Session, User } from "@supabase/supabase-js";

import { supabase } from "../lib/supabase";

interface AuthContextData {
    session: Session | null;
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext =
    createContext<AuthContextData | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSession() {
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                console.error("Erro ao carregar sessão:", error);
            }

            setSession(data.session);
            setUser(data.session?.user ?? null);
            setLoading(false);
        }

        void loadSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, currentSession) => {
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            throw error;
        }
    }, []);

    const logout = useCallback(async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw error;
        }
    }, []);

    const value = useMemo(
        () => ({
            session,
            user,
            loading,
            isAuthenticated: Boolean(session),
            login,
            logout,
        }),
        [session, user, loading, login, logout]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}