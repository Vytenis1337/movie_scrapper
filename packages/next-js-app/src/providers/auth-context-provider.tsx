'use client';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

import { createContext, useState, useEffect, ReactNode, SetStateAction, Dispatch } from 'react';
import { SignOutUser, userStateListener } from 'src/utils/firebase';

interface Props {
    children?: ReactNode;
}

export const AuthContext = createContext({
    currentUser: {} as User | null,
    setCurrentUser: (_user: User) => {},
    signOut: () => {},
    libraryCount: 0,
    setLibraryCount: (libraryCount: any) => {},
});

export const AuthProvider = ({ children }: Props) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [libraryCount, setLibraryCount] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = userStateListener((user) => {
            if (user) {
                setCurrentUser(user);
            }
        });
        return unsubscribe;
    }, [setCurrentUser]);

    const signOut = () => {
        SignOutUser();
        setCurrentUser(null);
        router.push('/');
    };

    const value = {
        currentUser,
        setCurrentUser,
        signOut,
        libraryCount,
        setLibraryCount,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
