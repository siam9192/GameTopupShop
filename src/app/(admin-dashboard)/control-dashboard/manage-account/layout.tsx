import ManageAccountSidebar from '@/components/shared/ManageAccountSidebar';
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Typography fontSize={28} fontWeight={600} color="text.primary">
        Manage Account
      </Typography>

      <Stack
        marginTop={5}
        direction={{
          xs: 'column',
          xl: 'row',
        }}
        gap={2}
      >
        <Box>
          <ManageAccountSidebar for="control-dashboard" />
        </Box>
        <Box sx={{ flex: 1, p: 5, bgcolor: 'background.default' }}>{children}</Box>
      </Stack>
    </Box>
  );
}

export default layout;
