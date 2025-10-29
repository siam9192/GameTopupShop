'use client';
import { useCurrentUser } from '@/provider/CurrentUserProvider';
import SuperAdminDashboardAllOverviewData from '../sections/control-dashboard/SuperAdminDashboardAllOverviewData';
import { Administrator } from '@/types/administrator.type';
import { UserRole } from '@/types/user.type';
import AdminDashboardOverviewData from '../sections/control-dashboard/AdminDashboardAllOverviewData';
import ModeratorDashboardOverviewData from '../sections/control-dashboard/ModeratorDashboardAllOverviewData';
import CustomerDashboardAllOverviewData from '../sections/customer-dashboard/CustomerDashboardAllOverviewData';

function AllOverviewData() {
  const { user } = useCurrentUser();

  let role: UserRole = UserRole.CUSTOMER;

  if (user && 'level' in user && typeof user.level === 'string') {
    role = user.level as any as UserRole;
  }

  
  switch (role) {
    case UserRole.CUSTOMER:
      return <CustomerDashboardAllOverviewData />;
    case UserRole.SUPER_ADMIN:
      return <SuperAdminDashboardAllOverviewData />;
    case UserRole.ADMIN:
      return <AdminDashboardOverviewData />;
    case UserRole.MODERATOR:
      return <ModeratorDashboardOverviewData />;
  }
}

export default AllOverviewData;
