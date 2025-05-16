import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, accountType = [] }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedAccountType = localStorage.getItem("accountType");

    if (!isLoggedIn || !accountType.includes(storedAccountType)) {
        return <Navigate to="/accessDenied" />;
    }

    return children;
};

export default ProtectedRoute;