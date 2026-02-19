import { useAppSettings } from '@/provider/AppSettingsProvider';
import { AppStatus } from '@/types/app-setting.type';
import { usePathname } from 'next/navigation';
import React from 'react';
import MaintenanceMessage from './MaintanceMessage';
import SiteClosedMessage from './SiteClosedMessage';
interface Props {
  children: React.ReactNode;
}
function AppStatusChecker({ children }: Props) {
  const { queryResult } = useAppSettings();
  const settings = queryResult.data?.data;
  const appStatus = settings?.appStatus;
  const pathname = usePathname();

  if (queryResult.isLoading) return null;
  if (!pathname.includes('control-dashboard')) {
    if (appStatus === AppStatus.MAINTENANCE) {
      return <MaintenanceMessage />;
    } else if (appStatus === AppStatus.CLOSED) {
      return <SiteClosedMessage />;
    }
  }

  return children;
}

export default AppStatusChecker;
