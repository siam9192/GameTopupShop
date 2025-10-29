import React, { createContext, useContext, ReactNode } from 'react';
import { getCurrentUserQuery } from '@/query/services/user';
import { CurrentUser } from '@/types/user.type';

export type CurrentUserContextType = {
  user: CurrentUser | null;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  refetch: () => void;
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
  const { data, isLoading, isFetching, isError, refetch } = getCurrentUserQuery();

  const user = data?.data || null;
  

  return (
    <CurrentUserContext.Provider
      value={{
        user,
        isLoading,
        isFetching,
        isError,
        refetch,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export default CurrentUserProvider;
