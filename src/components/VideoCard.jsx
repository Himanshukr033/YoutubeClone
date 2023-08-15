import React from 'react'
import { Link } from "react-router-dom"; 
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styles from './Video.module.css';

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants";

const VideoCard = ({ video: { id: { videoId }, snippet } }) => (

  <Card className={styles.card}>
      <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY` }>
      <CardMedia
        className={styles.cardMedia}
        image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
        alt={snippet?.title}
      />
      </Link>
      <CardContent className={styles.cardContent}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl } >
      <Typography className={styles.title} variant="subtitle1">
          {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
        </Typography>
      </Link>
      <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} >
      <Typography className={styles.subtitle} variant="subtitle2">
          {snippet?.channelTitle || demoChannelTitle}
         <CheckCircleIcon className={styles.icon} />
        </Typography>
      </Link>
    </CardContent>
  </Card>
);

export default VideoCard