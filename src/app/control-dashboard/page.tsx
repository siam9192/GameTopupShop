'use client';
import AllOverviewData from '@/components/ui/AllOverviewData';
import OrdersStatusChart from '@/components/sections/control-dashboard/OrdersStatusChart';
import RecentOrders from '@/components/sections/control-dashboard/RecentOrders';
import RevenueChart from '@/components/sections/control-dashboard/RevenueChart';
import TargetProgress from '@/components/sections/control-dashboard/TargetProgress';
import TopCustomers from '@/components/sections/control-dashboard/TopCustomers';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import React from 'react';

function page() {
  return (
    <div>
      <DashboardPageHeading title="Home" />
      <AllOverviewData />
      <div className="mt-10 grid  lg:grid-cols-3 gap-5 ">
        <div className=" grid lg:col-span-2 gap-5 h-fit">
          <RevenueChart />
          <RecentOrders />
        </div>

        <div className=" grid gap-5 h-fit">
          <OrdersStatusChart />
          <TargetProgress />
          <TopCustomers />
        </div>
      </div>
    </div>
  );
}

export default page;
