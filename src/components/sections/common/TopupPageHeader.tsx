import { Topup } from '@/types/topup.type';
import { Typography } from '@mui/material';
import React from 'react';
interface Props {
  topup: Topup;
}
function TopupPageHeader({ topup }: Props) {
  return (
    <div className="text-center space-y-3">
      <Typography variant="h4" fontWeight={700} color="text.primary">
        {topup.name}
      </Typography>

      <Typography variant="h6" color="text.secondary">
        Platform: <span className="font-medium text-primary">{topup.platformName}</span>
      </Typography>
    </div>
  );
}

export default TopupPageHeader;
