'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/lib/types';
import { users } from '@/lib/data';

interface UserContextType {
  user: User | null;
  addTokens: (amount: number) => void;
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

  return (
    <UserContext.Provider value={{ user, addTokens }}>
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
