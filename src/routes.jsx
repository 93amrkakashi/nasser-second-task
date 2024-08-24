import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBookForm from "./pages/AdminBookForm";
import ProtectedRoute from "./components/ProtectedRoute";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/new"
        element={
          <ProtectedRoute>
            <AdminBookForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/edit/:id"
        element={
          <ProtectedRoute>
            <AdminBookForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
