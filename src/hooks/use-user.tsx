
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@/lib/types';
import { users } from '@/lib/data';
import { useAuth } from './use-auth';

interface UserContextType {
  user: User | null;
  addTokens: (amount: number) => void;
  completeLevel: (domainId: string, level: number) => void;
  updateUser: (updatedData: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { firebaseUser, loading } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (loading) return;
  
    if (firebaseUser) {
      // Don't do anything if we already have a user and the UID matches
      if(user && user.id === firebaseUser.uid) {
        return;
      }
      
      const isNewUser = firebaseUser.metadata.creationTime === firebaseUser.metadata.lastSignInTime;
  
      // If it's a new user, create a fresh profile.
      if (isNewUser) {
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'New User',
          avatar: firebaseUser.photoURL || `https://picsum.photos/seed/${firebaseUser.uid}/100/100`,
          tokens: 50,
          contact: firebaseUser.email || '',
          location: '',
          socials: {
            twitter: '',
            linkedin: '',
          },
          streak: 0,
          progress: {},
        });
      } else {
        // For a returning user, use mock data as a base.
        // In a real app, you would fetch this from your database.
        const mockUser = users.find(u => u.id === 'user-you') || users[5];
        setUser({
          ...mockUser,
          id: firebaseUser.uid,
          name: firebaseUser.displayName || mockUser.name,
          contact: firebaseUser.email || mockUser.contact,
          avatar: firebaseUser.photoURL || mockUser.avatar,
        });
      }
    } else {
      // User is logged out, clear the user state.
      setUser(null);
    }
  // We only want this to run when the firebaseUser or loading state changes.
  }, [firebaseUser, loading]);
  

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
        // In a real app, you'd also update the streak here after a test is passed
        const newStreak = (currentUser.streak || 0) + 1;
        return {
          ...currentUser,
          streak: newStreak,
          progress: {
            ...currentProgress,
            [domainId]: level,
          },
        };
      }
      return currentUser;
    });
  }

  const updateUser = (updatedData: Partial<User>) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      // In a real app, you'd also update this in Firestore
      return { ...currentUser, ...updatedData };
    });
  };

  return (
    <UserContext.Provider value={{ user, addTokens, completeLevel, updateUser }}>
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
