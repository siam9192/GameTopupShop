import React, { ReactNode } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useCurrentUser } from '@/provider/CurrentUserProvider';
import { Typography } from '@mui/material';
interface Props {
  children: ReactNode;
}
function UserLoading({ children }: Props) {
  const { user, isLoading } = useCurrentUser();
  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center ">
        <div className="text-center">
          <CircularProgress size={80} color="primary" />
          <Typography color="white" mt={2} fontSize={20}>
            Loading...
          </Typography>
        </div>
      </div>
    );
  } else if (user) {
    return children;
  }

  return null;
}

export default UserLoading;
