import { Navigate, Outlet, useLocation } from "react-router-dom";

import Loading from "../loading/Loading";

import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute() {
    const {user, loading} = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading/>
    }

    if (!user) {
        return(
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }
    
    return <Outlet />;
}