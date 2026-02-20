import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "../layout/PublicLayout";
import AppShell from "../layouts/AppShell";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import TheSystem from "../pages/TheSystem";
import ForIndia from "../pages/ForIndia";
import WhySambhav from "../pages/WhySambhav";
import Dashboard from "../pages/Dashboard";
import Plans from "../pages/Plans";
import ConfirmPlan from "../pages/ConfirmPlan";
import Policies from "../pages/Policies";
import PolicyDetails from "../pages/PolicyDetails";
import NewClaim from "../pages/NewClaim";
import Receipt from "../pages/Receipt";
import DBSTest from "../pages/DBSTest";
import Profile from "../pages/Profile";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminPolicies from "../pages/admin/AdminPolicies";
import AdminClaims from "../pages/admin/AdminClaims";
import AdminUsers from "../pages/admin/AdminUsers";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/the-system" element={<TheSystem />} />
          <Route path="/for-india" element={<ForIndia />} />
          <Route path="/why-sambhav" element={<WhySambhav />} />
        </Route>

        {/* USER DASHBOARD */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/plans/confirm" element={<ConfirmPlan />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/policies/:policyId" element={<PolicyDetails />} />
            <Route path="/claims/new" element={<NewClaim />} />
            <Route path="/receipt/:policyId" element={<Receipt />} />
            <Route path="/dbs-test" element={<DBSTest />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* ADMIN */}
        <Route element={<ProtectedRoute requireAdmin />}>
          <Route element={<AppShell />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/policies" element={<AdminPolicies />} />
            <Route path="/admin/claims" element={<AdminClaims />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
