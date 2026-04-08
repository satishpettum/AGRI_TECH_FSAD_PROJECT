import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);
    const [profile, setProfile] = useState(null);
    const fetchUserData = async (userId) => {
        const [{ data: roleData }, { data: profileData }] = await Promise.all([
            supabase.from('user_roles').select('role').eq('user_id', userId).single(),
            supabase.from('profiles').select('full_name, avatar_url, bio, location').eq('user_id', userId).single(),
        ]);
        if (roleData)
            setRole(roleData.role);
        if (profileData)
            setProfile(profileData);
    };
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                setTimeout(() => fetchUserData(session.user.id), 0);
            }
            else {
                setRole(null);
                setProfile(null);
            }
            setLoading(false);
        });
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user)
                fetchUserData(session.user.id);
            setLoading(false);
        });
        return () => subscription.unsubscribe();
    }, []);
    const signUp = async (email, password, fullName, selectedRole) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName }, emailRedirectTo: window.location.origin },
        });
        if (error)
            throw error;
        if (data.user) {
            await supabase.from('user_roles').insert({ user_id: data.user.id, role: selectedRole });
        }
    };
    const signIn = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error)
            throw error;
    };
    const signOut = async () => {
        await supabase.auth.signOut();
        setRole(null);
        setProfile(null);
    };
    return (<AuthContext.Provider value={{ user, session, loading, role, profile, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>);
}
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
