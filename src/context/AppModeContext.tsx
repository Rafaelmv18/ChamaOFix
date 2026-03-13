import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { supabase } from "../lib/supabase";

type AppMode = "client" | "provider";

interface AppModeContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  loading: boolean;
}

const AppModeContext = createContext<AppModeContextType | undefined>(undefined);

export function AppModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>("client");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function syncModeWithProfile() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("user_type")
            .eq("id", session.user.id)
            .single();
          
          if (profile?.user_type) {
            setMode(profile.user_type as AppMode);
          }
        }
      } catch (error) {
        console.error("Error syncing app mode:", error);
      } finally {
        setLoading(false);
      }
    }

    syncModeWithProfile();

    // Listen for auth changes to re-sync
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        syncModeWithProfile();
      } else {
        setMode("client");
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AppModeContext.Provider value={{ mode, setMode, loading }}>
      {children}
    </AppModeContext.Provider>
  );
}

export function useAppMode() {
  const context = useContext(AppModeContext);
  if (context === undefined) {
    throw new Error("useAppMode must be used within an AppModeProvider");
  }
  return context;
}
