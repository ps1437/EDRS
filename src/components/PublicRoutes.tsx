import React from "react"

import {Navigate, Outlet} from "react-router-dom"

const useAuth = () => {
	const auth = localStorage.getItem("username")
	return auth;
}

const PublicRoutes = () => {
	const auth = useAuth();
 return auth ? <Navigate to="/login" />:<Outlet />  
	
}

export default PublicRoutes