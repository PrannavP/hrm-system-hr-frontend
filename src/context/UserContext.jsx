import { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const isTokenExpired = decodedToken.exp * 1000 < Date.now();

                if (!isTokenExpired) {
                    setUser(decodedToken);
                } else {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            } catch (error) {
                console.error("Invalid token:", error);
                setUser(null);
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};