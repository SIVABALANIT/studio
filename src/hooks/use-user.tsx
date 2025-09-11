
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/lib/types';
import { users } from '@/lib/data';

interface UserContextType {
  user: User | null;
  addTokens: (amount: number) => void;
  completeLevel: (domainId: string, level: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const initialUser = users.find(u => u.name === 'You') || users[5];
  const [user, setUser] = useState<User | null>(initialUser);

  const addTokens = (amount: number) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      return { ...currentUser, tokens: currentUser.tokens + amount };
    });
  };

  const completeLevel = (domainId: string, level: number) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      const currentProgress = currentUser.progress || {};
      // Only update if the new level is higher than the current one
      if ((currentProgress[domainId] || 0) < level) {
        return {
          ...currentUser,
          progress: {
            ...currentProgress,
            [domainId]: level,
          },
        };
      }
      return currentUser;
    });
  }

  return (
    <UserContext.Provider value={{ user, addTokens, completeLevel }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
