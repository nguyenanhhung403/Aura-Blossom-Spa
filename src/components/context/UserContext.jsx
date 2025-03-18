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

    const fetchUser = useCallback(async () => {
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
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    }, []);

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
        if (!user && token) {
            fetchUser();
        }
    }, [fetchUser, user]);

    useEffect(() => {
        if (!user && location.pathname !== lastLocation) {
            setLastLocation(location.pathname);
            fetchUser();
        }
    }, [location, fetchUser, user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
