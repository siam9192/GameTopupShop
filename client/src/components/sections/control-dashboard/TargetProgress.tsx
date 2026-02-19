import { useState } from 'react';
import { Typography, LinearProgress, Box, Tabs, Tab } from '@mui/material';

interface TargetItem {
  label: string;
  current: number;
  target: number;
  color?: string;
}

const data: Record<string, TargetItem[]> = {
  daily: [
    { label: 'Orders', current: 40, target: 50, color: 'success' },
    { label: 'New Users', current: 15, target: 25, color: 'info' },
    { label: 'Revenue', current: 8500, target: 10000, color: 'warning' },
  ],
  weekly: [
    { label: 'Orders', current: 300, target: 350, color: 'success' },
    { label: 'New Users', current: 120, target: 200, color: 'info' },
    { label: 'Revenue', current: 65000, target: 80000, color: 'warning' },
  ],
  monthly: [
    { label: 'Orders', current: 1200, target: 1500, color: 'success' },
    { label: 'New Users', current: 450, target: 600, color: 'info' },
    { label: 'Revenue', current: 250000, target: 300000, color: 'warning' },
  ],
  yearly: [
    { label: 'Orders', current: 15000, target: 20000, color: 'success' },
    { label: 'New Users', current: 5200, target: 7000, color: 'info' },
    { label: 'Revenue', current: 2800000, target: 3500000, color: 'warning' },
  ],
};

export default function TargetProgress() {
  const [tab, setTab] = useState<keyof typeof data>('daily');
  const targets = data[tab];

  return (
    <div className="max-h[500px] p-3 md:p-5 glass rounded-xl shadow-sm">
      {/* Header */}
      <Typography
        component="h1"
        variant="h5"
        fontFamily="jost"
        fontWeight={600}
        color="text.primary"
        mb={2}
      >
        Target Progress
      </Typography>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          mb: 3,
          '& .MuiTab-root': {
            minWidth: { xs: 80, sm: 100, md: 120 }, // smaller tabs on mobile
            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
          },
        }}
      >
        <Tab label="Daily" value="daily" />
        <Tab label="Weekly" value="weekly" />
        <Tab label="Monthly" value="monthly" />
        <Tab label="Yearly" value="yearly" />
      </Tabs>

      {/* Progress List */}
      <div className="flex flex-col gap-5">
        {targets.map(({ label, current, target, color }) => {
          const percent = Math.min((current / target) * 100, 100);

          return (
            <Box key={label}>
              <div className="flex justify-between mb-1">
                <Typography fontWeight={500} color="text.primary">
                  {label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {current}/{target} ({percent.toFixed(0)}%)
                </Typography>
              </div>
              <LinearProgress
                variant="determinate"
                value={percent}
                color={color as any}
                sx={{ height: 10, borderRadius: 5 }}
              />
            </Box>
          );
        })}
      </div>
    </div>
  );
}
