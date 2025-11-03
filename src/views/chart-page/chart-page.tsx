import { DatePicker, Divider } from "antd";
import AnalyticsAreaChart from "./components/line-charts";
import { AnalyticsRadialBarChart } from "./components/radial-bar-chart";
import SEOKeywordTrendChart from "./components/bar-chart";

const { RangePicker } = DatePicker;

const ChartPage = () => {
  return (
    <div className='py-4 px-2 sm:py-6 sm:px-4 md:py-8 md:px-4'>
      <p className='font-bold text-xl sm:text-2xl'>Analytics Center</p>
      <Divider />
      <div className='mt-4 sm:mt-6 md:mt-8 space-y-3 sm:space-y-4'>
        <div className='grid grid-cols-1 gap-2 sm:gap-3'>
          <div className='h-[250px] sm:h-[300px] shadow-md col-span-1 rounded-2xl px-3 py-2 sm:px-4 sm:py-2 space-y-3 sm:space-y-4'></div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3'>
          <div className='min-h-full shadow-md col-span-1 lg:col-span-1 rounded-2xl px-3 py-2 sm:px-4 sm:py-2 space-y-3 sm:space-y-4'>
            <p className='text-base sm:text-lg font-semibold'>
              Conversion Rate (in %)
            </p>
            <AnalyticsRadialBarChart />
          </div>
          <div className='min-h-full shadow-md col-span-1 lg:col-span-2 rounded-2xl px-3 py-2 sm:px-4 sm:py-2 space-y-3 sm:space-y-4'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0'>
              <p className='text-base sm:text-lg font-semibold'>
                Traffic Overview
              </p>
              <RangePicker
                picker='month'
                className='w-full sm:w-auto'
              />
            </div>
            <AnalyticsAreaChart />
          </div>
        </div>
        <div className='grid grid-cols-1 gap-2 sm:gap-3'>
          <div className='min-h-full shadow-md col-span-1 sm:col-span-2 rounded-2xl px-3 py-2 sm:px-4 sm:py-2 space-y-3 sm:space-y-4'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0'>
              <p className='text-base sm:text-lg font-semibold'>
                SEO Keyword Chart
              </p>
              <RangePicker
                picker='month'
                className='w-full sm:w-auto'
              />
            </div>
            <SEOKeywordTrendChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
