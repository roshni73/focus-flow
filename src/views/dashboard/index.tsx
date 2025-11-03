import { DatePicker, Divider, Tag } from "antd";
import { RiFolderLine, RiTimeLine } from "react-icons/ri";
import MonthlyRevenueChart from "./component/monthly-line-chart";
import ClientSourceBreakdown from "./component/client-source-piechart";
import AppSecondaryButton from "../../shared/components/button/app-secondary-button";
import { getCookie } from "../../utils/cookies";
import clsx from "clsx";
import { getStatusColor } from "../../utils/helper";
import {
  KPI,
  RECENT_ACTIVITIES,
  TOP_CLIENTS,
  USER_KPI,
} from "./component/mock-data";

const Dashboard = () => {
  const userRole = getCookie("auth_role");
  const displayKPI = userRole === "user" ? USER_KPI : KPI;
  return (
    <div className='py-4 px-2 sm:py-6 sm:px-4 md:py-8 md:px-4'>
      <p className='font-bold text-xl sm:text-2xl'>Dashboard</p>
      <Divider />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'>
        {displayKPI.map((value, id) => (
          <div
            key={id}
            className='min-h-full px-3 py-3 sm:px-4 sm:py-4 border border-gray-200 shadow-md rounded-2xl'
          >
            <div className='flex item-center justify-between'>
              <p className='text-base sm:text-lg font-semibold text-text'>
                {value?.title}
              </p>
              <div className='bg-gray-200 p-2 max-h-8 rounded-full text-base sm:text-lg'>
                {value?.icon}
              </div>
            </div>
            <div className='mt-4 sm:mt-6 md:mt-8 flex flex-col gap-2'>
              <p className='text-2xl sm:text-3xl md:text-4xl font-semibold'>
                {value?.value}
              </p>
              <div className='text-xs sm:text-sm'>
                <span className='px-2 py-1 bg-green-100 rounded-2xl'>
                  {value.metrics}%
                </span>{" "}
                increase in {value?.stats}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='min-h-full rounded-2xl px-3 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 space-y-3 sm:space-y-4 border border-gray-200 mt-3 sm:mt-4 shadow-md'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0'>
          <p className='text-base sm:text-lg font-semibold text-text'>
            {userRole === "admin"
              ? "Monthly Revenue Growth (in $)"
              : "Monthly Task Completion"}
          </p>
          <DatePicker
            picker='year'
            className='w-full sm:w-auto'
          />
        </div>
        <MonthlyRevenueChart />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4'>
        <div className='min-h-full rounded-2xl px-3 py-3 sm:px-4 sm:py-4 space-y-3 sm:space-y-4 border border-gray-200 mt-3 sm:mt-4 shadow-md'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0'>
            <p className='text-base sm:text-lg font-semibold text-text'>
              {userRole === "admin"
                ? "Client Source Breakdown"
                : "Project Type Breakdown"}
            </p>
            <DatePicker
              picker='month'
              className='w-full sm:w-auto'
            />
          </div>
          <ClientSourceBreakdown />
        </div>
        <div className='min-h-full rounded-2xl px-3 py-3 sm:px-4 sm:py-4 space-y-3 sm:space-y-4 border border-gray-200 mt-3 sm:mt-4 shadow-md flex flex-col'>
          <div className='flex items-center justify-between'>
            <p className='text-base sm:text-lg font-semibold text-text'>
              {userRole === "user" ? "Recent Activities" : "Top Clients"}
            </p>
          </div>
          <div className='flex-1 space-y-2 sm:space-y-3'>
            {userRole === "user"
              ? RECENT_ACTIVITIES.map((activity) => (
                  <div
                    key={activity.id}
                    className='px-3 py-3 sm:px-4 sm:py-3.5 border border-gray-200 rounded-xl hover:cursor-pointer hover:shadow-md hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 group'
                  >
                    <div className='flex items-start justify-between gap-3'>
                      <div className='flex items-start gap-3 flex-1 min-w-0'>
                        <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary-400 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm mt-0.5'>
                          <RiFolderLine
                            size={18}
                            className='sm:w-5 sm:h-5'
                          />
                        </div>
                        <div className='min-w-0 flex-1 pt-0.5'>
                          <p className='text-sm sm:text-base font-semibold text-gray-800 group-hover:text-primary-700 transition-colors mb-1 line-clamp-2'>
                            {activity.title}
                          </p>
                          <p className='text-xs sm:text-sm text-gray-500 mb-2 truncate'>
                            {activity.project}
                          </p>
                          <div className='flex items-center gap-2 flex-wrap'>
                            <Tag
                              className={clsx(
                                "px-2 py-0.5 rounded-2xl! text-xs! font-medium! border",
                                getStatusColor(activity.status)
                              )}
                            >
                              {activity.status}
                            </Tag>
                            <div className='flex items-center gap-1 text-xs text-gray-400'>
                              <RiTimeLine size={14} />
                              <span>{activity.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : TOP_CLIENTS.map((client) => (
                  <div
                    key={client.id}
                    className='px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-200 rounded-xl hover:cursor-pointer hover:shadow-md hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 group'
                  >
                    <div className='flex items-center justify-between gap-2'>
                      <div className='flex items-center gap-2 sm:gap-3 flex-1 min-w-0'>
                        <div className='w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-400 flex items-center justify-center text-white font-semibold text-xs sm:text-sm group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0'>
                          {client.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div className='min-w-0 flex-1'>
                          <p className='text-sm sm:text-base font-semibold text-gray-800 group-hover:text-primary-700 transition-colors truncate'>
                            {client.name}
                          </p>
                          <p className='text-xs sm:text-sm text-gray-500 truncate'>
                            {client.company}
                          </p>
                        </div>
                      </div>
                      <div className='text-right shrink-0'>
                        <p className='text-xs sm:text-sm font-semibold text-primary-600'>
                          {client.revenue}
                        </p>
                        <p className='text-xs text-gray-400'>Revenue</p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          <div className='pt-2 border-t border-gray-200'>
            <AppSecondaryButton
              variant='link'
              className='w-full!'
            >
              View All
            </AppSecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
