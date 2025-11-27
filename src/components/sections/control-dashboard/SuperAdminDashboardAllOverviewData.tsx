import { HiMiniUserGroup, HiOutlineWallet } from 'react-icons/hi2';
import { TbRecharging } from 'react-icons/tb';
import { getSuperAdminDashboardMetadataQuery } from '@/query/services/metadata';
import DashboardOverviewData from '@/components/ui/DashboardOverviewData';
import { GiCash } from 'react-icons/gi';
export default function SuperAdminDashboardAllOverviewData() {
  const { data, isLoading } = getSuperAdminDashboardMetadataQuery();

  const mapping = [
    { key: 'products', label: 'Total Products', icon: HiOutlineWallet },
    { key: 'orders', label: 'Total Orders', icon: TbRecharging },
    { key: 'revenue', label: 'Total Revenue', icon: GiCash, isCurrency: true },
    { key: 'users', label: 'Total Users', icon: HiMiniUserGroup },
  ];

  return <DashboardOverviewData data={data?.data} isLoading={isLoading} mapping={mapping} />;
}
