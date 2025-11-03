import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Drawer, Button } from "antd";
import { HiMenuAlt3 } from "react-icons/hi";
import AppSideBar from "./app-side-bar";
import ProtectedRoute from "../../../route/protected-route";
import Text from "../../components/typography/text";

const AppLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <ProtectedRoute>
        <div className='h-screen w-full max-w-[1440px] mx-auto px-2 sm:px-4 grid grid-cols-1 lg:grid-cols-8 gap-2 sm:gap-4 overflow-hidden'>
          <div className='hidden lg:block col-span-2 py-4 lg:py-6 h-full overflow-hidden'>
            <div className='h-full bg-white shadow-md border border-gray-200 rounded-2xl overflow-hidden'>
              <AppSideBar />
            </div>
          </div>

          <div className='col-span-1 lg:col-span-6 py-2 sm:py-4 lg:py-6 h-full overflow-hidden flex flex-col'>
            <div className='bg-white shadow-md border border-gray-200 rounded-2xl h-full overflow-hidden flex flex-col flex-1 min-h-0'>
              <div className='lg:hidden flex items-center gap-3 px-3 sm:px-4 py-3'>
                <Button
                  type='text'
                  icon={
                    <HiMenuAlt3
                      size={24}
                      className='text-gray-600'
                    />
                  }
                  onClick={showDrawer}
                  className='p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0 mt-1'
                  aria-label='Open menu'
                />
                <Text
                  size='2xl'
                  weight='semibold'
                  className='text-shadow-lg'
                >
                  <span className='text-primary text-shadow-lg'>Awww</span>some.
                </Text>
              </div>

              {/* Main Content */}
              <div className='px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-0 h-full overflow-y-auto flex-1 min-h-0'>
                <Outlet />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Drawer */}
        <Drawer
          title={
            <span className='text-primary font-semibold text-xl'>
              <span className='text-primary'>Awww</span>some.
            </span>
          }
          placement='left'
          onClose={closeDrawer}
          open={drawerOpen}
          width={280}
          className='lg:hidden'
          styles={{
            body: { padding: 0 },
            header: { padding: "16px 20px", borderBottom: "1px solid #e5e7eb" },
          }}
        >
          <AppSideBar onNavigate={closeDrawer} />
        </Drawer>
      </ProtectedRoute>
    </>
  );
};

export default AppLayout;
