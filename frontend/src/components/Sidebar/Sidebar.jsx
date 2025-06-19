import React from "react";
import { Dumbbell, Home, BarChart2, Clock, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

function SideBar({ isSidebarOpen }) {
  const handleLogOut = () => {
    // Dummy logout handler (no Appwrite logic)
    console.log("Logged out (dummy)");
  };

  return (
    <div
      className={`md:w-64 h-auto md:mr-0 pt-8 bg-gray-100 mt-10 ${
        isSidebarOpen ? "block" : "hidden"
      } md:block`}
    >
      <nav className="flex flex-col space-y-2 pl-4 no-underline">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 hover:text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors duration-300 no-underline ${
              isActive ? "text-indigo-700 bg-indigo-100" : "text-gray-700"
            }`
          }
        >
          <Home className="mr-3 h-5 w-5" />
          Dashboard
        </NavLink>

        <NavLink
          to="/userprofile"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 hover:text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors duration-300 no-underline ${
              isActive ? "text-indigo-700 bg-indigo-100" : "text-gray-700"
            }`
          }
        >
          <User className="mr-3 h-5 w-5" />
          Profile
        </NavLink>

        <NavLink
          to="/workout"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 hover:text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors duration-300  no-underline ${
              isActive ? "text-indigo-700 bg-indigo-100" : "text-gray-700"
            }`
          }
        >
          <Dumbbell className="mr-3 h-5 w-5" />
          Workout
        </NavLink>

        <NavLink
          to="/progress"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 hover:text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors duration-300 no-underline ${
              isActive ? "text-indigo-700 bg-indigo-100" : "text-gray-700"
            }`
          }
        >
          <BarChart2 className="mr-3 h-5 w-5" />
          Progress
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 hover:text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors duration-300 no-underline ${
              isActive ? "text-indigo-700 bg-indigo-100" : "text-gray-700"
            }`
          }
        >
          <Clock className="mr-3 h-5 w-5" />
          History
        </NavLink>

        <NavLink
          to="/sleep"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 hover:text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors duration-300 no-underline ${
              isActive ? "text-indigo-700 bg-indigo-100" : "text-gray-700"
            }`
          }
        >
          <Clock className="mr-3 h-5 w-5" />
          Sleep Tracker
        </NavLink>

        <NavLink
          to="/login"
          onClick={handleLogOut}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 hover:text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors duration-300 no-underline ${
              isActive ? "text-indigo-700 bg-indigo-100" : "text-gray-700"
            }`
          }
        >
          <BiLogOut className="mr-3 h-5 w-5" />
          Logout
        </NavLink>
      </nav>
    </div>
  );
}

export default SideBar;
