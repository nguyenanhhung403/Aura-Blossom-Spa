import React, {createContext, useCallback, useEffect, useState} from 'react';
import { ACCESS_TOKEN } from "../service/api.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase.js";
import { getMyInfor } from "../service/userApi.js";
import { useLocation } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user") || "{}";
        const parseUser = JSON.parse(storedUser);
        return parseUser.username ? {
            ...parseUser,
            displayName: parseUser.fullname,
        } : null;
    });

    const location = useLocation();
    const [lastLocation, setLastLocation] = useState(null);

    const fetchUser = useCallback(async () => {
        try {
            const response = await getMyInfor();
            const gotUser = response?.result;
            if (gotUser) {
                localStorage.setItem("user", JSON.stringify(gotUser));
                setUser({
                    ...gotUser,
                    displayName: gotUser?.fullname,
                })
            }
        }catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        if (user) {
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            user && setUser(user);
        });

        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            fetchUser();
        }

        return () => unsubscribe();
    }, [fetchUser, user]);

    useEffect(() => {
        if (user || location.pathname === lastLocation) {
            return;
        }

        setLastLocation(location.pathname);

        fetchUser();
    }, [location, fetchUser, location, user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};