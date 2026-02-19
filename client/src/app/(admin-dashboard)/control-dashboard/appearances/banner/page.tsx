'use client';
import { deleteBanner } from '@/api-services/banner';
import AddNewBannerModal from '@/components/sections/control-dashboard/AddNewBannerModal';
import AlertDialog from '@/components/ui/AleartDialog';
import DashboardPageHeading from '@/components/ui/DashboardPageHeading';
import EditBannerDialog from '@/components/ui/EditBannerDialog';
import { queryClient } from '@/provider/Provider';
import { deleteBannerMutation, getBannersQuery } from '@/query/services/banner';
import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';

function page() {
  const [editId, setEditId] = useState<string | null>(null);
  const { data, isLoading } = getBannersQuery([]);
  const banners = data?.data;

  const defaultBanner =
    'http://localhost:3000/_next/image?url=https%3A%2F%2Fstaticg.sportskeeda.com%2Feditor%2F2021%2F12%2F606e9-16392154686721-1920.jpg%3Fw%3D640&w=1200&q=75';

  const { mutate } = deleteBannerMutation();

  const handelDelete = async (id: string) => {
    console.log(id);
    mutate(id, {
      onSuccess: data => {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ['getBanners'],
        });
      },
      onError: data => {
        toast.error(data.message);
      },
    });
  };

  return (
    <div>
      <DashboardPageHeading title="Banner Appearance" />

      <Grid marginTop={2} container columns={{ xs: 1, md: 2, lg: 3 }} spacing={{ xs: 3, md: 5 }}>
        {banners?.map((_, index) => (
          <Grid size={1} key={index}>
            <Box>
              <Typography color="secondary" fontWeight={600} fontFamily={'jost'} fontSize={23}>
                No: {index + 1}
              </Typography>
              <div className="relative group hover:scale-90 hover:cursor-pointer duration-75 h-60 lg:h-72">
                <img
                  src={_.image || defaultBanner}
                  alt=""
                  className="mt-3 outline-2 outline-offset-4 rounded-lg outline-secondary  group-hover:outline-primary h-72 "
                />
                <div className="  opacity-0 group-hover:opacity-100 duration-75 ease-in absolute inset-0 bg-gray-900/40 flex   justify-center items-center gap-2">
                  <button
                    onClick={() => setEditId(_._id)}
                    className="text-[80px] text-white p-3 bg-secondary rounded-full"
                  >
                    <CiEdit />
                  </button>
                  <AlertDialog
                    title="Are you sure?"
                    description="This action cannot be undone. The banner will be permanently deleted."
                    onAgree={() => handelDelete(_._id)}
                  >
                    <button className="text-[80px] text-white p-3 bg-red-600 rounded-full">
                      <RxCross2 />
                    </button>
                  </AlertDialog>
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
            <div className=" grow mt-3 outline-2 outline-offset-4 rounded-lg outline-secondary  flex justify-center items-center hover:outline-primary hover:cursor-pointer hover:scale-90 duration-75 min-h-60">
              <AddNewBannerModal />
            </div>
          </Box>
        </Grid>
      </Grid>

      {editId && <EditBannerDialog onClose={() => setEditId(null)} id={editId} />}
    </div>
  );
}

export default page;
