import { Button, Grid, List, ListItem, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { HiMiniWallet } from 'react-icons/hi2';

const paymentOptions = [
  {
    name: 'GameTop Wallet',
    logo: 'https://brandlogos.net/wp-content/uploads/2025/05/samsung_wallet-logo_brandlogos.net_lurfi.png',
  },
  {
    name: 'Paypal',
    logo: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/250_Paypal_logo-512.png',
  },
];

function page() {
  const data = [
    {
      label: 'Full Name',
      placeholder: 'Enter your name',
      type: 'text',
      select: false,
      options: [],
      required: true,
      minLength: true,
      maxLength: 50,
    },
    {
      label: 'Age',
      placeholder: 'Enter your age',
      type: 'number',
      select: false,
      options: [],
      required: true,
      minLength: false,
      maxLength: 3,
    },
    {
      label: 'Gender',
      placeholder: 'Select gender',
      type: 'radio-select',
      select: true,
      options: [
        { display: 'Male', value: 'male' },
        { display: 'Female', value: 'female' },
        { display: 'Other', value: 'other' },
      ],
      required: true,
      minLength: false,
      maxLength: 0,
    },
    {
      label: 'Hobbies',
      placeholder: 'Choose your hobbies',
      type: 'multiselect',
      select: true,
      options: [
        { display: 'Reading', value: 'reading' },
        { display: 'Gaming', value: 'gaming' },
        { display: 'Traveling', value: 'traveling' },
      ],
      required: false,
      minLength: false,
      maxLength: 5,
    },
  ];

  return (
    <div className="w-full">
      <Typography variant="h4" fontSize={{
        xs:24,
        lg:28
      }} color="text.primary" fontWeight={600}>
        Game: Free fire
      </Typography>
      <Image
        src={
          'https://dl.dir.freefiremobile.com/common/web_event/hash/54f31449f5f91cf0cc223cc635cd5952jpg'
        }
        alt=""
        width={1000}
        height={600}
        className="mx-auto mt-5 rounded-lg"
      />
      <div className=" lg:w-10/12 lg:mx-auto">
        <Stack direction={'column'} gap={2} className="mt-5 ">
          <div>
            <Typography variant="h5" color="text.primary" fontWeight={600}>
              Select Recharge:
            </Typography>

            <Grid
              marginTop={3}
              container
              spacing={2}
              columns={{
                xs: 2,
                md: 2,
                lg: 3,
                xl: 4,
              }}
             
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <Grid
                  size={1}
                  key={index}
                  display={'flex'}
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  justifyItems={'space-between'}
                  border={'2px  solid var(--secondary-color)'}
                  padding={'10px'}
                  borderRadius={2}
              
                >
                  <Typography variant="body1" color="text.secondary">
                    💎25 diamond
                  </Typography>
                  <Typography color="primary" fontWeight={600} variant="body1">
                    $25
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </div>
          <div></div>
        </Stack>
        <div className="mt-5">
          <Typography  color="text.primary" fontWeight={600} variant="h5">
            Fill The Info files:
          </Typography>
          <Grid container marginTop={3} columns={2} spacing={2}>
            {data.map((_, index) => (
              <Grid size={1} key={index}>
                <TextField fullWidth id="outlined-search" label={_.label} type="text" />
              </Grid>
            ))}
          </Grid>
        </div>
        <div className="mt-5">
          <Typography color="text.primary" fontWeight={600} variant="h5">
            Chose payment option :
          </Typography>
          <Stack direction={'row'} gap={2} marginTop={3} marginX={'auto'} width={'fit-content'}>
            {paymentOptions.map((option, index) => (
              <div
                key={index}
                className="border-gray-700 border-2 p-5 size-fit rounded-lg max-w-sm space-y-2 text-center"
              >
                <img src={option.logo} alt="" className="size-32" />
                <Typography color="primary" fontFamily={'jost'}>
                  {option.name}
                </Typography>
              </div>
            ))}
          </Stack>
        </div>

       <div  className='mt-5 text-center'>
         <Button variant='outlined' size="large" fullWidth  sx={{
          width:{
            sx:"100%",
            md:"50%"
          },
         }} >
          Purchase now
        </Button>
       </div>
      </div>

      <div className="mt-20 space-y-5">
        <div>
          <Typography variant="h5" fontWeight={500} color="text.primary">
            Instructions:
          </Typography>
          <Typography marginTop={2} color="text.secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, porro dignissimos! Ipsa
            deleniti blanditiis soluta pariatur voluptatibus optio consectetur commodi qui
            temporibus explicabo? Quis aut unde vitae blanditiis ad iusto! Odit ab nulla, nobis iure
            cum ipsum magnam beatae accusantium similique ducimus alias. Quam tempore temporibus,
            perspiciatis illo itaque, iure consequuntur quaerat quos, obcaecati quidem laudantium
            perferendis! Accusamus cupiditate, expedita fugiat consectetur ex labore fugit
            reiciendis ipsa perspiciatis veniam! Laboriosam rerum nulla sunt consectetur incidunt
            tempora accusantium in reiciendis sit ad? Laborum veniam alias vitae illum eos
            voluptates omnis repellendus cupiditate iste reprehenderit temporibus dignissimos
            tenetur consequatur accusantium, ipsa maiores.
          </Typography>
        </div>
        <div>
          <Typography variant="h5" fontWeight={500} color="text.primary">
            About Free Fire:
          </Typography>
          <Typography marginTop={2} color="text.secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, porro dignissimos! Ipsa
            deleniti blanditiis soluta pariatur voluptatibus optio consectetur commodi qui
            temporibus explicabo? Quis aut unde vitae blanditiis ad iusto! Odit ab nulla, nobis iure
            cum ipsum magnam beatae accusantium similique ducimus alias. Quam tempore temporibus,
            perspiciatis illo itaque, iure consequuntur quaerat quos, obcaecati quidem laudantium
            perferendis! Accusamus cupiditate, expedita fugiat consectetur ex labore fugit
            reiciendis ipsa perspiciatis veniam! Laboriosam rerum nulla sunt consectetur incidunt
            tempora accusantium in reiciendis sit ad? Laborum veniam alias vitae illum eos
            voluptates omnis repellendus cupiditate iste reprehenderit temporibus dignissimos
            tenetur consequatur accusantium, ipsa maiores.
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default page;
