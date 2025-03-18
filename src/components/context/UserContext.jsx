import React, { createContext, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase.js";
import { getMyInfor } from "../service/userApi.js";
import { ACCESS_TOKEN } from "../service/api.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user")) || {};
            return storedUser.username
                ? { ...storedUser, displayName: storedUser.fullname }
                : null;
        } catch (error) {
            console.error("Error parsing user data:", error);
            return null;
        }
    });

    const location = useLocation();
    const [lastLocation, setLastLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchFailed, setFetchFailed] = useState(false);

    const fetchUser = useCallback(async () => {
        if (isLoading || fetchFailed) return;
        
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setUser(null);
            return;
        }
        
        setIsLoading(true);
        try {
            const response = await getMyInfor();
            const gotUser = response?.result;
            if (gotUser) {
                const formattedUser = {
                    ...gotUser,
                    displayName: gotUser?.fullname,
                };
                localStorage.setItem("user", JSON.stringify(formattedUser));
                setUser(formattedUser);
            }
            setFetchFailed(false);
        } catch (error) {
            console.error("Error fetching user info:", error);
            if (error?.response?.status === 401 || error?.response?.status === 404) {
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem("user");
                setUser(null);
                setFetchFailed(true);
            }
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, fetchFailed]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                localStorage.setItem("user", JSON.stringify(firebaseUser));
            } else {
                setUser(null);
                localStorage.removeItem("user");
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!user && token && !fetchFailed) {
            fetchUser();
        }
    }, [fetchUser, user, fetchFailed]);

    useEffect(() => {
        if (!user && location.pathname !== lastLocation && !fetchFailed) {
            setLastLocation(location.pathname);
            fetchUser();
        }
    }, [location, fetchUser, user, lastLocation, fetchFailed]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
