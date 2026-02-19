import { Typography } from '@mui/material';
import React from 'react';

interface IProps {
  title: string;
}
function PageHeading({ title }: IProps) {
  return (
    <Typography
      fontSize={{
        xs: 24,
        md: 28,
        lg: 32,
      }}
      fontFamily={'jost'}
      fontWeight={600}
      color="text.primary"
    >
      {title}
    </Typography>
  );
}

export default PageHeading;
