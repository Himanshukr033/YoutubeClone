import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos, Loader, Comments } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

import styles from "./Video.module.css";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoData = await fetchFromAPI(`videos?part=snippet,statistics&id=${id}`);
        setVideoDetail(videoData.items[0]);
  
        const relatedVideosData = await fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`);
        setVideos(relatedVideosData.items);
        console.log(relatedVideosData);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };
  
    fetchVideoData();
  }, [id]);
  
  if(!videoDetail?.snippet) return <Loader />;

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="90vh" overflow={'hidden'}>
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1} minWidth={'73svw'}>
          <Box className={styles.reactPlayer}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player"
            playing={true} controls={true} />
            
            <Typography className={styles.titleText}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: "subtitle1", md: 'h6' }}  color="#fff" >
                  {channelTitle}
                  <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
            <Comments/>
          </Box>

        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" overflow="scroll" height="135vh">
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
