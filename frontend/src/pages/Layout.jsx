import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SideBar from "../components/Sidebar/Sidebar";

function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const protectedRoutes = [
    "/dashboard",
    "/userprofile",
    "/workout",
    "/progress",
    "/history",
    "/sleep",
    "/mood"
  ];

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    checkToken();
    window.addEventListener("authChanged", checkToken);
    return () => {
      window.removeEventListener("authChanged", checkToken);
    };
  }, []);

  useEffect(() => {
    if (!loading && protectedRoutes.includes(location.pathname)) {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
    }
  }, [loading, location.pathname, navigate]);

  const handleLoginToggle = () => {
    if (isAuthenticated) {
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("authChanged"));
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

      {isAuthenticated && protectedRoutes.includes(location.pathname) && (
        <div className="w-full overflow-x-auto bg-white border-b shadow-sm">
          <div className="flex gap-6 px-4 py-3 min-w-max justify-start items-center">
            <SideBar layout="horizontal" />
          </div>
        </div>
      )}

      <main className="flex-1 p-4 bg-gray-100">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
