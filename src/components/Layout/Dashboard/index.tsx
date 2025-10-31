import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {

  return (
    <div className="flex h-screen bg-gray-50">

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
    </div>
  );
}