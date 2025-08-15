'use client';
import { Box, Typography } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ManualPayment from '@/components/sections/CustomerDashboard/ManualPayment';
import DirectPayment from '@/components/sections/CustomerDashboard/DirectPayment';
import DashboardSectionHeading from '@/components/ui/DashboardSectionHeading';
import ManageLivePayment from '@/components/sections/control-dashboard/ManageLivePayment';
import ManageManualPayment from '@/components/sections/control-dashboard/ManageManualPayment';

function CustomTabPanel(props: any) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 1, md: 3 } }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function page() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <DashboardSectionHeading title="Manage Payment Methods" />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Live Payment" {...a11yProps(0)} />
            <Tab label="Manual Payment" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <ManageLivePayment />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ManageManualPayment />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
    </div>
  );
}

export default page;
