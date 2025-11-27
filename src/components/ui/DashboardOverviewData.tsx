'use client';
import React from 'react';
import { Grid, Stack, Typography, Box, Skeleton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useAppSettings } from '@/provider/AppSettingsProvider';

interface OverviewItem {
  name: string;
  icon: React.ElementType;
  value: number;
  change?: number;
  isCurrency?: boolean;
}

interface DashboardOverviewDataProps {
  data?: Record<string, number> | null;
  isLoading: boolean;
  mapping: {
    key: string;
    label: string;
    icon: React.ElementType;
    isCurrency?: boolean;
  }[];
}

const DashboardOverviewData: React.FC<DashboardOverviewDataProps> = ({
  data,
  isLoading,
  mapping,
}) => {
  const { currency } = useAppSettings();
  if (isLoading) {
    return (
      <Grid container spacing={2} columns={{ xs: 1, sm: 2, xl:4 }}>
        {Array.from({ length: 4 }).map((_, idx) => (
          <Grid size={1} key={idx}>
            <Skeleton
              variant="rectangular"
              height={200}
              animation="wave"
              sx={{ borderRadius: 3 }}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  const overviewData: OverviewItem[] = mapping.map(item => ({
    name: item.label,
    icon: item.icon,
    value: data?.[item.key] ?? 0,
    isCurrency: item.isCurrency,
    change: Math.floor(Math.random() * 10) - 5, // example change % (optional)
  }));

  return (
    <Box>
      <Grid container spacing={3} columns={{ xs: 1, sm: 2,xl:4 }}>
        {overviewData.map((item, index) => {
          const isPositive = (item.change ?? 0) >= 0;
          const Icon = isPositive ? ArrowUpwardIcon : ArrowDownwardIcon;
          const color = isPositive ? '#16C47F' : '#F93827';
          const formattedValue = item.isCurrency
            ? `${currency.symbol}${item.value.toLocaleString()}`
            : item.value.toLocaleString();

          return (
            <Grid size={1} key={index}>
              <div className="glass p-5 rounded-2xl min-h-[200px] hover:shadow-md transition-all duration-300">
                <Typography fontWeight={600} fontSize={18} color="text.primary" gutterBottom>
                  {item.name}
                </Typography>

                <Stack
                  marginTop={4}
                  direction={'row'}
                  gap={2}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <item.icon className="text-txt-primary text-4xl md:text-5xl" />
                  <Typography
                    fontWeight={600}
                    align="center"
                    component={'h1'}
                    variant="h3"
                    fontSize={{ xs: 28, sm: 34, md: 40 }}
                    color="secondary"
                    fontFamily={'jost'}
                  >
                    {formattedValue}
                  </Typography>
                </Stack>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  marginTop={2}
                  gap={0.5}
                >
                  <Icon sx={{ fontSize: 18, color }} />
                  <Typography variant="body2" fontWeight={600} color={color}>
                    {isPositive ? `+${item.change}%` : `${item.change}%`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    than last month
                  </Typography>
                </Box>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default DashboardOverviewData;
