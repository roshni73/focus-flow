import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Drawer, Button } from "antd";
import { HiOutlineMenu } from "react-icons/hi";
import clsx from "clsx";
import Text from "../../components/typography/text";
import AppPrimaryButton from "../../components/button/app-primary-button";

const navigation = [
  { id: 1, label: "Home", route: "/" },
  { id: 2, label: "About Us", route: "/about-us" },
  { id: 3, label: "Services", route: "/services" },
  { id: 4, label: "News", route: "/news" },
];

const SiteNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  return (
    <nav className='px-6 sm:px-10 py-4 bg-white w-full'>
      <div className='flex items-center justify-between'>
        <Text
          size='2xl'
          weight='semibold'
          className='text-shadow-lg'
        >
          <span className='text-primary text-shadow-lg'>Awww</span>some.
        </Text>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center gap-8'>
          {navigation.map((item) => {
            const isActive = location.pathname === item.route;
            return (
              <a
                key={item.id}
                href={item.route}
                className={clsx(
                  "transition-colors duration-200",
                  isActive
                    ? "text-primary font-semibold"
                    : "text-gray-700 text-shadow-lg hover:text-primary"
                )}
              >
                {item.label}
              </a>
            );
          })}
          <AppPrimaryButton
            size='large'
            onClick={() => navigate("/auth/login")}
          >
            Login
          </AppPrimaryButton>
        </div>

        {/* Hamburger Icon */}
        <div className='md:hidden flex items-center'>
          <Button
            type='text'
            icon={<HiOutlineMenu size={28} />}
            onClick={showDrawer}
          />
        </div>
      </div>

      {/* Ant Design Drawer */}
      <Drawer
        title='Menu'
        placement='right'
        onClose={closeDrawer}
        open={visible}
        bodyStyle={{ padding: 0 }}
      >
        <div className='flex flex-col gap-6 p-6'>
          {navigation.map((item) => {
            const isActive = location.pathname === item.route;
            return (
              <a
                key={item.id}
                href={item.route}
                onClick={closeDrawer}
                className={clsx(
                  "transition-colors duration-200 text-lg",
                  isActive
                    ? "text-primary font-semibold"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                {item.label}
              </a>
            );
          })}
          <AppPrimaryButton
            size='large'
            className='mt-4'
            onClick={() => {
              navigate("/auth/login");
              closeDrawer();
            }}
          >
            Login
          </AppPrimaryButton>
        </div>
      </Drawer>
    </nav>
  );
};

export default SiteNavBar;
