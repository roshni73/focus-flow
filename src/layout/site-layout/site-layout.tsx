import { Outlet } from "react-router-dom";
import SiteNavBar from "./site-nav-bar";
import SiteFooter from "./site-footer";

const SiteLayout = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='w-full max-w-[1440px]'>
        <SiteNavBar />
        <div className='h-full'>
          <Outlet />
        </div>
        <SiteFooter />
      </div>
    </div>
  );
};

export default SiteLayout;
