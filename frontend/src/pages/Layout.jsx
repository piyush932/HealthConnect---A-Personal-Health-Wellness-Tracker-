import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SideBar from "../components/Sidebar/Sidebar";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const protectedRoutes = ["/userprofile", "/workout", "/progress", "/history","/sleep"];

  // ✅ Check token from localStorage on mount and on custom event
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    checkToken();

    // 🔁 Listen for auth change events
    window.addEventListener("authChanged", checkToken);

    return () => {
      window.removeEventListener("authChanged", checkToken);
    };
  }, []);

  // 🔁 Redirect unauthenticated users trying to access protected routes
  useEffect(() => {
    if (!loading && protectedRoutes.includes(location.pathname)) {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
    }
  }, [loading, location.pathname, navigate]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLoginToggle = () => {
    if (isAuthenticated) {
      localStorage.removeItem("token"); // logout
      window.dispatchEvent(new Event("authChanged")); // inform layout
      setIsAuthenticated(false);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        isAuthenticated={isAuthenticated}
        handleLoginToggle={handleLoginToggle}
      />
      <div className="md:flex flex-1 bg-gray-100">
        {isAuthenticated && protectedRoutes.includes(location.pathname) && (
          <SideBar isSidebarOpen={isSidebarOpen} />
        )}
        <main className="flex-1 p-4 pt-20">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
