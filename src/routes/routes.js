import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProtectedRoutes from "../components/ProtectedRoutes";
import PublicRoutes from "../components/PublicRoutes";
import { AuthProvider } from "../context/AuthProvider";
import Dashboard from "../pages/dashboard/Dashboard";
import HomePage from "../pages/home/HomePage";
import Login from "../pages/login/Login";
import StepperForm from "../pages/stepper/StepperForm";

export const NavRoutes = () => {
  return (
    <Routes>
      <Route path="home" exact element={<HomePage />} />
      <Route path="analysis" exact element={<Dashboard />} />
      <Route path="report" exact element={<StepperForm />} />
      <Route path="*" element={<Navigate to="/edrs/home" replace />} />
    </Routes>
  );
};

export const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<ProtectedRoutes />}>
      <Route path="/" element={<Navigate to="/edrs/home" />} />
      <Route
        path="edrs/*"
        element={
          <AuthProvider>
            <Layout>
              <NavRoutes />
            </Layout>
          </AuthProvider>
        }
      />
      <Route path="*" element={<Navigate to="/edrs/home" />} />
    </Route>
    <Route path="/" element={<PublicRoutes />}>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Route>
  </Routes>
);
