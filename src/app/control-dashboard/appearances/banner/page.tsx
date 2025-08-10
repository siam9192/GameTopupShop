import AddNewBannerModal from '@/components/sections/control-dashboard/AddNewBannerModal';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { CiEdit } from 'react-icons/ci';
import { RiImageAddFill } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';

function page() {
  return (
    <div>
      <DashboardPageHeading title="Banner Appearance" />
      <Grid marginTop={2} container columns={{ xs: 2, lg: 3 }} spacing={{ xs: 3, md: 5 }}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Grid size={1} key={index}>
            <Box>
              <Typography color="secondary" fontWeight={600} fontFamily={'jost'} fontSize={23}>
                No: {index + 1}
              </Typography>
              <div className="relative group hover:scale-90 hover:cursor-pointer duration-75">
                <img
                  src="http://localhost:3000/_next/image?url=https%3A%2F%2Fstaticg.sportskeeda.com%2Feditor%2F2021%2F12%2F606e9-16392154686721-1920.jpg%3Fw%3D640&w=1200&q=75"
                  alt=""
                  className="mt-3 outline-2 outline-offset-4 rounded-lg outline-secondary  group-hover:outline-primary  "
                />
                <div className="  opacity-0 group-hover:opacity-100 duration-75 ease-in absolute inset-0 bg-gray-900/40 flex   justify-center items-center gap-2">
                  <button className="text-[80px] text-white p-3 bg-secondary rounded-full">
                    <CiEdit />
                  </button>
                  <button className="text-[80px] text-white p-3 bg-red-600 rounded-full">
                    <RxCross2 />
                  </button>
                </div>
              </div>
            </Box>
          </Grid>
        ))}
        <Grid size={1}>
          <Box height={'100%'} flexDirection={'column'} display={'flex'}>
            <Typography color="text.primary" fontWeight={600} fontFamily={'jost'} fontSize={23}>
              Add New
            </Typography>
            <div className=" grow mt-3 outline-2 outline-offset-4 rounded-lg outline-secondary  flex justify-center items-center hover:outline-primary hover:cursor-pointer hover:scale-90 duration-75">
              <AddNewBannerModal />
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default page;
