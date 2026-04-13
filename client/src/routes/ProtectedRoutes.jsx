import Loading from "../components/common/Loading";

import { useAuth } from "../hooks/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
	const { isAuthenticated, loading } = useAuth();
	if (loading) return <Loading />;
	return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
