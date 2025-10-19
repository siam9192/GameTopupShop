import { AdministratorActivity } from '@/types/administrator-activity.type';
import { Avatar, Box, Button, Chip, Stack, Typography } from '@mui/material';
import React from 'react';

interface Props {
  activity: AdministratorActivity;
}

const ActivityCard = ({ activity }: Props) => {
  const createdAt = new Date(activity.createdAt);

  const timeAgo = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const actionColor =
    activity.action === 'Create'
      ? 'success'
      : activity.action === 'Update'
      ? 'info'
      : 'error';

  return (
    <Box
      className="relative rounded-xl transition-all duration-300"
    >
       {/* Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        <Avatar
          src={activity.administrator.profilePicture}
          alt={activity.administrator.fullName}
          sx={{ width: 56, height: 56 }}
        />
        <Stack spacing={0.4} flex={1}>
          <Typography
            variant="h6"
            fontWeight={600}
            fontSize={{ xs: 16, md: 18 }}
            color="text.primary"
          >
            {activity.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {activity.description || 'No description provided.'}
          </Typography>
        </Stack>
      </Stack>

      {/* Meta Info */}
      <Stack spacing={1.5} marginTop={3}>
        <Stack
          direction="row"
          flexWrap="wrap"
          spacing={1}
          rowGap={1}
          useFlexGap
        >
          <Chip
            label={`Action: ${activity.action}`}
            color={actionColor as any}
            size="small"
          />
          <Chip
            label={`Category: ${activity.category}`}
            color="default"
            size="small"
            variant="outlined"
          />
          <Chip
            label={`Triggered: ${createdAt.toDateString()}`}
            color="default"
            size="small"
            variant="outlined"
          />
        </Stack>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 0.5, md: 2 }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Typography fontWeight={500} color="text.secondary">
            👤 <span className="text-primary">{activity.administrator.fullName}</span> (
            {activity.administrator.level})
          </Typography>
          <Typography fontWeight={500} color="text.secondary">
            🆔 <span className="text-info">#{activity.administrator._id}</span>
          </Typography>
        </Stack>
      </Stack>

      {/* Footer */}
      <Stack
        direction={{ xs: 'column-reverse', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        marginTop={3}
        spacing={1.5}
      >
      
      
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            className="w-full sm:w-fit"
          >
            View Details
          </Button>
        
      </Stack>

      {/* Timestamp Badge */}
      <div
        className="
          absolute top-2 right-3 
          text-[11px] sm:text-xs font-medium text-primary 
          bg-primary/10 px-2 py-0.5 rounded-full
        "
      >
        2 hrs ago
      </div>
    </Box>
  );
};

export default ActivityCard;
