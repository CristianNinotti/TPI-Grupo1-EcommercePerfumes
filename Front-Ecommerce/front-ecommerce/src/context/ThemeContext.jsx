// ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState("light");

    useEffect(() => {
        const savedMode = localStorage.getItem("theme");
        if (savedMode) setMode(savedMode);
    }, []);

    useEffect(() => {
        if (mode === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [mode]);

    const toggleTheme = () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        localStorage.setItem("theme", newMode);
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
