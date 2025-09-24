import { Stack } from '@mui/material';
import React from 'react';
import { FiSearch } from 'react-icons/fi';
interface Props {
  onChange: (value: string) => void | any;
  placeholder?: string;
}
function DashboardSearchInput({ onChange, placeholder }: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      className="bg-secondary/10 px-2 py-4 rounded-lg"
    >
      <span className="text-xl font-medium text-txt-primary">
        <FiSearch />
      </span>
      <input
        onChange={e => onChange(e.target.value)}
        type="text"
        className="grow bg-transparent border-none outline-none font-secondary font-medium text-gray-950 dark:text-gray-100 placeholder:text-primary"
        placeholder={placeholder || ''}
      />
    </Stack>
  );
}

export default DashboardSearchInput;
