"use client";
import { createContext, useContext, useState, useEffect, ReactNode, FC } from "react";
import axios from "axios";
import { API } from "@/utils/constant";
import Cookies from "js-cookie";

interface UserInfo {
    avatar: string;
    email: string;
    fullname: string;
    id: number;
    name_role: string;
    address?: {
        province:string;
        district:string;
        ward:string;
        more:string
    };
    phone?: string;
}

interface AuthContextType {
    userInfo: UserInfo | null;
    setUserInfo: (userInfo: UserInfo | null) => void;
    loading: boolean;
    signOut: () => void;
    refreshUserInfo: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUserInfo = async () => {
        const token = Cookies.get("access_token");
        if (token) {
            try {
                const response = await axios.get(`${API.AUTH}/get-user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserInfo(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const signOut = () => {
        Cookies.remove("access_token");
        localStorage.removeItem("access_token");
        setUserInfo(null);
    };

    const refreshUserInfo = async () => {
        setLoading(true);
        await fetchUserInfo();
        setLoading(false);
    };

    const value: AuthContextType = { userInfo, setUserInfo, loading, signOut, refreshUserInfo };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { AuthProvider, useAuth };
