import React from "react";
import {Grid } from "@mui/material";

import { ChannelCard, Loader, VideoCard } from "../components";

const Videos = ({ videos, direction }) => {
  if(!videos?.length) return <Loader />;
  
  return (
    <Grid container spacing={2}>
      {videos.map((item, idx) => (
        <Grid
        item
        xs={direction === "column" ? 12 : 12}
        sm={direction === "column" ? 12 : 6}
        md={direction === "column" ? 12 : 4} 
        lg={direction === "column" ? 12 : 3} 
        key={idx}
      >
          {item.id.videoId && <VideoCard video={item} /> }
          {item.id.channelId && <ChannelCard channelDetail={item} />}
          </Grid>
      ))}
    </Grid>
  );
}

export default Videos;
