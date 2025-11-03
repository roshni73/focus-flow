import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import clsx from "clsx";
import {
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlineUser,
  HiOutlineLogout,
} from "react-icons/hi";
import { RiDashboardLine } from "react-icons/ri";
import Text from "../../components/typography/text";
import { getCookie } from "../../../utils/cookies";
import { clearAllCookies } from "../../../utils/cookies";
import { Tag } from "antd";

interface NavItem {
  id: number;
  label: string;
  route: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

interface AppSideBarProps {
  onNavigate?: () => void;
}

const allNavigation: NavItem[] = [
  {
    id: 1,
    label: "Dashboard",
    route: "/app/dashboard",
    icon: <RiDashboardLine size={20} />,
  },
  {
    id: 2,
    label: "Charts",
    route: "/app/chart-page",
    icon: <HiOutlineChartBar size={20} />,
    adminOnly: true,
  },
  {
    id: 3,
    label: "User Table",
    route: "/app/user-table",
    icon: <HiOutlineUsers size={20} />,
  },
  {
    id: 4,
    label: "Profile",
    route: "/app/profile",
    icon: <HiOutlineUser size={20} />,
  },
];

const Navbar = ({ onNavigate }: AppSideBarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState(getCookie("auth_name") || "User");
  const [userEmail, setUserEmail] = useState(getCookie("auth_email") || "");
  const userRole = getCookie("auth_role") || "user";

  // Listen for profile updates
  useEffect(() => {
    const handleProfileUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ name: string; email: string }>;
      if (customEvent.detail) {
        setUserName(customEvent.detail.name);
        setUserEmail(customEvent.detail.email);
      }
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);

    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate);
    };
  }, []);

  const handleNavigation = (route: string, isDisabled: boolean) => {
    if (isDisabled) return;
    navigate(route);
    if (onNavigate) {
      onNavigate();
    }
  };

  const handleLogout = () => {
    clearAllCookies();
    navigate("/auth/login");
  };

  return (
    <div className='h-full flex flex-col lg:sticky lg:top-0'>
      <div className='hidden lg:flex px-6 py-8 border-b border-gray-100'>
        <Text
          size='2xl'
          weight='semibold'
          className='text-shadow-lg'
        >
          <span className='text-primary text-shadow-lg'>Awww</span>some.
        </Text>
      </div>

      <nav className='flex-1 px-4 py-6 space-y-2 overflow-y-auto'>
        {allNavigation.map((item) => {
          const isActive = location.pathname === item.route;
          const isDisabled = !!(item.adminOnly && userRole !== "admin");
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.route, isDisabled)}
              disabled={isDisabled}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isDisabled
                  ? "text-gray-400 cursor-not-allowed opacity-60"
                  : isActive
                  ? "bg-primary-50 text-primary-600 shadow-sm cursor-pointer"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
              )}
            >
              <span
                className={clsx(
                  "transition-colors",
                  isDisabled
                    ? "text-gray-300"
                    : isActive
                    ? "text-primary-600"
                    : "text-gray-400 group-hover:text-gray-600"
                )}
              >
                {item.icon}
              </span>
              <span className='text-sm font-medium'>{item.label}</span>
              {isActive && !isDisabled && (
                <div className='ml-auto w-1.5 h-1.5 rounded-full bg-primary-600' />
              )}
            </button>
          );
        })}
      </nav>

      <div className='px-4 py-4 border-t border-gray-100 space-y-3'>
        <div className='px-4 py-3 rounded-xl'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-semibold'>
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2'>
                <p className='text-sm font-semibold text-gray-900 truncate'>
                  {userName}
                </p>

                <Tag
                  className={clsx(
                    "px-2! py-1! rounded-2xl!",
                    userRole === "admin"
                      ? "bg-primary-500! text-white!"
                      : "bg-gray-200! text-gray-700!"
                  )}
                >
                  <p className='text-xs'>
                    {userRole === "admin" ? "Admin" : "User"}
                  </p>
                </Tag>
              </div>
              <p className='text-xs text-gray-500 truncate'>{userEmail}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 group'
        >
          <HiOutlineLogout
            size={20}
            className='group-hover:rotate-12 transition-transform'
          />
          <span className='text-sm font-medium'>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
