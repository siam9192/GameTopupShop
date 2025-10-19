import { useCurrentUser } from '@/provider/CurrentUserProvider';
import SuperAdminDashboardAllOverviewData from './SuperAdminDashboardAllOverviewData';
import { Administrator } from '@/types/administrator.type';
import { UserRole } from '@/types/user.type';
import AdminDashboardOverviewData from './AdminDashboardAllOverviewData';
import ModeratorDashboardOverviewData from './ModeratorDashboardAllOverviewData';

function AllOverviewData() {
  const { user } = useCurrentUser();

  let role: UserRole = UserRole.CUSTOMER;

  if (user && 'level' in user && typeof user.level === 'string') {
    role = user.level as any as UserRole;
  }
  switch (role) {
    case UserRole.CUSTOMER:
      return null;
    case UserRole.SUPER_ADMIN:
      return <SuperAdminDashboardAllOverviewData />;
    case UserRole.ADMIN:
      return <AdminDashboardOverviewData />;
    case UserRole.MODERATOR:
      return <ModeratorDashboardOverviewData />;
  }
}

export default AllOverviewData;
