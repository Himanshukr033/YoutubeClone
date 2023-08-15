import React from 'react';
import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { demoProfilePicture } from '../utils/constants';
import styles from './Channel.module.css';


const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + "B";
  }
  else if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + "k";
  }
  return num;
};


const ChannelCard = ({ channelDetail}) => (
  <Box className={styles.channelCard}>
      <CardContent className={styles.cardContent}>
        <CardMedia
          image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
          alt={channelDetail?.snippet?.title}
          className={styles.cardMedia}>
        </CardMedia>
        <div className={styles.content}>
          <Typography className={styles.channelTitle} variant="h6">
            {channelDetail?.snippet?.title}{' '}
            <CheckCircleIcon className={styles.checkIcon} />
          </Typography>
          {channelDetail?.statistics?.subscriberCount && (
            <Typography className={styles.channelDescription} fontWeight={500}>
              {channelDetail?.snippet?.customUrl}{' '} {formatNumber(parseInt(channelDetail?.statistics?.subscriberCount))} Subscribers {' '} 
              { channelDetail?.statistics?.videoCount} {' '} Videos
            </Typography>
          )}
          <Typography className={styles.channelDescription} fontWeight={500}>
            {channelDetail?.snippet?.description &&
            channelDetail?.snippet?.description.split(' ').slice(0, 7).join(' ')}
            {channelDetail?.snippet?.description &&
            channelDetail?.snippet?.description.split(' ').length > 7 && '...'}
          </Typography>
        </div>
      </CardContent>
  </Box>
);

export default ChannelCard;
