import { createContext, useContext, useEffect, useState } from 'react';
import { getProfile, loginUser, registerUser, updateProfileApi } from '@/lib/api';

const TOKEN_KEY = 'agriToken';
const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [profile, setProfile] = useState(null);

  const loadProfile = async (token) => {
    try {
      const data = await getProfile(token);
      setUser({ id: data.id, email: data.email });
      setRole(data.role);
      setProfile({ fullName: data.fullName, avatarUrl: data.avatarUrl, bio: data.bio, location: data.location });
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY);
      setSession(null);
      setUser(null);
      setRole(null);
      setProfile(null);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      if (session) {
        await loadProfile(session);
      }
      setLoading(false);
    };
    initialize();
  }, [session]);

  const signUp = async (email, password, fullName, selectedRole) => {
    const data = await registerUser(email, password, fullName, selectedRole);
    if (!data.accessToken) throw new Error('Unable to register user.');
    localStorage.setItem(TOKEN_KEY, data.accessToken);
    setSession(data.accessToken);
    setUser({ id: data.id, email: data.email });
    setRole(data.role);
    setProfile({ fullName: data.fullName, avatarUrl: data.avatarUrl, bio: data.bio, location: data.location });
  };

  const signIn = async (email, password) => {
    const data = await loginUser(email, password);
    if (!data.accessToken) throw new Error('Unable to sign in.');
    localStorage.setItem(TOKEN_KEY, data.accessToken);
    setSession(data.accessToken);
    setUser({ id: data.id, email: data.email });
    setRole(data.role);
    setProfile({ fullName: data.fullName, avatarUrl: data.avatarUrl, bio: data.bio, location: data.location });
  };

  const signOut = async () => {
    localStorage.removeItem(TOKEN_KEY);
    setSession(null);
    setUser(null);
    setRole(null);
    setProfile(null);
  };

  const updateProfile = async (fullName, bio, location) => {
    if (!session) throw new Error('Not authenticated');
    const data = await updateProfileApi(session, fullName, bio, location);
    setProfile({ fullName: data.fullName, avatarUrl: data.avatarUrl, bio: data.bio, location: data.location });
    setUser({ id: data.id, email: data.email });
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, role, profile, signUp, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
