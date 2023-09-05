
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
	const auth = localStorage.getItem("username")
	return auth;
}

const ProtectedRoutes = () => {
const auth = useAuth();
 return auth ? <Outlet /> : <Navigate to="/login" />
	
}

export default ProtectedRoutes