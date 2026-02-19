import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { RecentUser, UserRole } from '@/types/user.type';
import { getTimeAgo } from '@/utils/helper';
import { DEFAULT_PROFILE_PICTURE } from '@/utils/constant';
import CustomerDetailsDialog from '../ui/CustomerDetailsDialog';
import AdministratorDetailsDialog from '../ui/AdministratorDetailsDialog';
interface Props {
  user: RecentUser;
}
function RecentUserCard({ user }: Props) {
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  return (
    <>
      <div className=" p-2 md:p-3 relative">
        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          spacing={2}
        >
          <Box>
            <img
              src={user.profilePicture || DEFAULT_PROFILE_PICTURE}
              alt=""
              className="size-14 object-cover rounded-lg"
            />
          </Box>
          <Stack spacing={0.5}>
            <Typography fontWeight={500} fontSize={20} color="text.primary">
              {user.fullName}
            </Typography>

            <Stack
              marginTop={2}
              direction={'row'}
              alignItems={{
                xs: 'start',
                md: 'center',
              }}
              flexWrap={'wrap'}
              gap={{
                xs: 1,
                md: 1,
              }}
            >
              <Typography
                fontSize={{
                  xs: 14,
                  lg: 16,
                }}
                fontWeight={500}
                color="text.secondary"
              >
                Role:
                <Typography
                  fontSize={'inherit'}
                  component={'span'}
                  display={'inline'}
                  fontWeight={500}
                  color="info"
                >
                  {' '}
                  {user.role}
                </Typography>
              </Typography>

              <Typography
                fontWeight={500}
                fontSize={{
                  xs: 14,
                  lg: 16,
                }}
                color="text.secondary"
              >
                Signup Method : {user.provider}
              </Typography>
              <Typography
                fontSize={{
                  xs: 14,
                  lg: 16,
                }}
                fontWeight={500}
                color="text.secondary"
              >
                Date:
                <Typography
                  fontSize={'inherit'}
                  component={'span'}
                  display={'inline'}
                  fontWeight={500}
                  color="info"
                >
                  {' '}
                  {new Date(user.createdAt).toDateString()} -{' '}
                  {new Date(user.createdAt).toLocaleTimeString()}
                </Typography>
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack direction={'row'} justifyContent={'end'}>
          <Button
            variant="outlined"
            onClick={() => setIsDetailsOpen(true)}
            className="w-fit "
            color="secondary"
          >
            Details
          </Button>
        </Stack>

        <p className="text-primary font-medium absolute right-1 top-0 ">
          {getTimeAgo(user.createdAt)}
        </p>
      </div>

      {isDetailsOpen &&
        (user.role === UserRole.CUSTOMER ? (
          <CustomerDetailsDialog onClose={() => setIsDetailsOpen(false)} id={user._id} />
        ) : (
          <AdministratorDetailsDialog onClose={() => setIsDetailsOpen(false)} id={user._id} />
        ))}
    </>
  );
}

export default RecentUserCard;
