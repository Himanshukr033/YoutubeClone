import { useState, useEffect } from "react";
import { Typography, Box, Stack } from "@mui/material";
import {  useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";

const SearchFeed = () => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();
 
  

  useEffect(() => {
    setVideos(null);
    const category = selectedCategory || searchTerm; 

    const fetchData = async () => {
      try {
        const data = await fetchFromAPI(`search?part=snippet&q=${category}`);
        setVideos(data.items);
      } catch (error) {
        console.error("An error occurred while fetching data.", error);
      } finally {
      }
    };

    fetchData();
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSelectedCategory();
        const data = await fetchFromAPI(`search?part=snippet&q=${searchTerm}&regionCode=IN`);
        setVideos(data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [searchTerm]);
  
  
  

  return (
    <Stack direction={ "row" }>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight={900}
          color="white"
          mb={3}
          ml={{ sm: "100px" }}
        >
          Search Results for{" "}
          <span style={{ color: "#FC1503" }}>{selectedCategory ? selectedCategory : searchTerm}</span> videos
        </Typography> 
        <Videos videos={videos} /> 
      </Box>
    </Stack>
  );
};

export default SearchFeed;
