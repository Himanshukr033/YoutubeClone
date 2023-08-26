import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styles from "./Video.module.css";

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";

// thumbnail fetched for the recommended videos has an error in their url
// has "=>" instead of ":"
const properUrl = (add) => {
  const wrong_Address = add;
  if (!add) return null;
  const correct_Address = wrong_Address.replace("https =>//", "https://");
  return correct_Address;
};

const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
  },
}) => {
  if (!snippet || !snippet.thumbnails) {
    return null; 
  }
  return (
    <Card className={styles.card} sx={{ margin: "0px", padding: "0" }}>
      <Link to={videoId ? `/video/${videoId}` : `/video/FoNeHNicM8U`}>
        <CardMedia
          component="img"
          className={styles.cardMedia}
          src={
            properUrl(snippet?.thumbnails?.high?.url) ||
            properUrl(snippet?.thumbnails?.default?.url) ||
            demoThumbnailUrl
          }
          alt={snippet?.title}
        />
      </Link>
      <CardContent className={styles.cardContent} sx={{height:"auto"}}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography className={styles.title} variant="subtitle1">
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link
          to={
            snippet?.channelId
              ? `/channel/${snippet?.channelId}`
              : demoChannelUrl
          }
        >
          <Typography className={styles.subtitle} variant="subtitle2">
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircleIcon className={styles.icon} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};
export default VideoCard;
