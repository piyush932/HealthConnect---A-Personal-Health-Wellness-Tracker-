import React from "react";
import {
  Dumbbell,
  Home,
  BarChart2,
  Clock,
  User,
  Smile,
  BedDouble,
  BookText,
  HeartPulse,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const links = [
  { name: "Dashboard", path: "/dashboard", icon: <Home className="h-5 w-5" /> },
  { name: "Profile", path: "/userprofile", icon: <User className="h-5 w-5" /> },
  { name: "Workout", path: "/workout", icon: <Dumbbell className="h-5 w-5" /> },
  {
    name: "Progress",
    path: "/progress",
    icon: <BarChart2 className="h-5 w-5" />,
  },
  { name: "Activity History", path: "/history", icon: <BookText className="h-5 w-5" /> },
  {
    name: "Sleep Tracker",
    path: "/sleep",
    icon: <BedDouble className="h-5 w-5" />,
  },
  {
    name: "Sleep History",
    path: "/sleepHistory",
    icon: <Clock className="h-5 w-5" />,
  },
  { name: "Mood Tracker", path: "/mood", icon: <Smile className="h-5 w-5" /> },
];

function SideBar() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChanged"));
    navigate("/");
  };

  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 whitespace-nowrap text-sm font-medium no-underline ${
              isActive
                ? "text-indigo-700 bg-indigo-100"
                : "text-gray-700 hover:text-indigo-700 hover:bg-indigo-100"
            }`
          }
        >
          {link.icon}
          {link.name}
        </NavLink>
      ))}

      <button
        onClick={handleLogOut}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors duration-200 whitespace-nowrap"
      >
        <BiLogOut className="h-5 w-5" />
        Logout
      </button>
    </>
  );
}

export default SideBar;
