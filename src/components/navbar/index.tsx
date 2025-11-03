import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import Text from "../../components/typography/text";
import { Button } from "../../components/button";

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '#about' },
  { name: 'Resources', href: '#resources' },
  { name: 'News', href: '#news' },
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
    setMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return location.hash === href;
    }
    return location.pathname === href;
  };

  const handleLogin = () => {
    navigate("/login");
    setMobileMenuOpen(false);
  };

  return (
    <nav className='px-6 sm:px-10 py-4 bg-white w-full border-b border-gray-200'>
      <div className='flex items-center justify-between'>
        <Text
          size='3xl'
          weight='semibold'
          className='text-shadow-lg cursor-pointer'
          onClick={() => navigate("/")}
        >
          <span className='text-blue-600 text-shadow-lg'>Focus</span>flow
        </Text>
        <div className='hidden md:flex items-center gap-8'>
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.href)}
              className={clsx(
                "transition-colors duration-200 bg-transparent border-none cursor-pointer",
                isActive(item.href)
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600"
              )}
            >
              <Text weight="medium" className="text-shadow-lg">
                {item.name}
              </Text>
            </button>
          ))}
          <Button
            variant="primary"
            size="default"
            onClick={handleLogin}
          >
            <Text weight="medium">Login</Text>
          </Button>
        </div>
        <div className='md:hidden flex items-center'>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Text size='3xl' weight='semibold' className='text-shadow-lg'>
                <span className='text-blue-600 text-shadow-lg'>Focus</span>flow
              </Text>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} />
              </Button>
            </div>

            <div className="flex flex-col gap-6 p-6 flex-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={clsx(
                    "transition-colors duration-200 text-left bg-transparent border-none cursor-pointer py-2",
                    isActive(item.href)
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-blue-600"
                  )}
                >
                  <Text size="lg" weight="medium">
                    {item.name}
                  </Text>
                </button>
              ))}

              <div className="mt-auto pt-6">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleLogin}
                >
                  <Text weight="medium">Login</Text>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;