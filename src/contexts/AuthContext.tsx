import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

export interface User {
  userId: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/me', {
          credentials: 'include'
        });

        if (response.status === 401) {
          // 401 Unauthorized는 로그아웃 상태를 의미하므로 정상적인 케이스로 처리합니다.
          setUser(null);
          return;
        }

        if (!response.ok) {
          console.error('Failed to fetch user status:', response.status, response.statusText);
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Logout Failed');
      }

      // 로그아웃 성공 시 user 상태를 null 로 즉시 업데이트
      setUser(null);
    } catch (e) {
      console.error(`Logout error: ${e}`);
      throw e;
    }
  };

  // 로그인 성공 시, user 상태를 업데이트하는 함수
  const login = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const value = { user, setUser, isLoggedIn: !!user, isLoading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
