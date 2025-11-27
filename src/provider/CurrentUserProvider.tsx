import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { getCurrentUserQuery } from '@/query/services/user';
import { CurrentUser } from '@/types/user.type';
import { signOut } from 'next-auth/react';

export type CurrentUserContextType = {
  user: CurrentUser | null;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  refetch: () => void;
  clearUser: () => void;
};

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

export function useCurrentUser() {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error('useCurrentUser must be used within a CurrentUserProvider');
  }
  return context;
}

function CurrentUserProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  // Query user
  const { data, isLoading: queryLoading, isFetching, isError, refetch } = getCurrentUserQuery();

  // User state (from localStorage or query)
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('currentUser');

      setUser(saved ? JSON.parse(saved) : null);
    } else {
      setIsLoading(true);
      setUser(null);
    }
  }, []);

  // Update state & localStorage when query data arrives
  useEffect(() => {
    if (data?.data && !queryLoading) {
      setUser(data.data);
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentUser', JSON.stringify(data.data));
      }
      setIsLoading(false);
    }
  }, [data, queryLoading, isFetching]);

  const clearUser = async () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
      await signOut();
    }
  };

  return (
    <CurrentUserContext.Provider
      value={{
        user,
        isLoading,
        isFetching,
        isError,
        refetch: () => {
          setIsLoading(true);
          refetch();
        },
        clearUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export default CurrentUserProvider;
