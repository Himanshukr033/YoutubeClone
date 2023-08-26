import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack } from "@mui/material";

import { Videos, ChannelCard, Sidebar } from "../components";
import { fetchFromAPI } from "../utils/fetchFromAPI";

import styles from '../components/Channel.module.css';

const ChannelDetail = () => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);
      console.log(data);

      setChannelDetail(data?.items[0]);

      const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`);

      setVideos(videosData?.items);
    };

    fetchResults();
  }, [id]);

  return (
    <Stack sx={{ flexDirection: "row" }}>
      <Box className={styles.sidebar}>
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>
      <Box className={styles.mainContent}>
        <Box>
          <div
            className={styles.backgroundImage}
            style={{
              backgroundImage: `url(${channelDetail?.brandingSettings?.image?.bannerExternalUrl})`,
            }}
          />
          <ChannelCard channelDetail={channelDetail} />
        </Box>

        <Box display="flex">
          <Videos videos={videos} />
        </Box>
      </Box>
    </Stack>
  );
};

export default ChannelDetail;
