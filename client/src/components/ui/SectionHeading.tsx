import { Typography } from '@mui/material';
import React from 'react';

interface IProps {
  title: string;
}
function SectionHeading({ title }: IProps) {
  return (
    <Typography
      fontSize={{
        xs: 28,
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

export default SectionHeading;
