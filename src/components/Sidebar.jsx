import React, {useState} from "react";
import { Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import ToolBar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useMediaQuery } from "@mui/material";

import { categories } from "../utils/constants";

const Categories = ({ selectedCategory, setSelectedCategory }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <ToolBar disableGutters style={{ minHeight: 30, minWidth: 50 }}>
        {isMobile && (
          <IconButton
            onClick={toggleMenu}
            style={{
              color: "white",
              padding: "0px 10px",
              margin: "0px",
              height: "30px",
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <SwipeableDrawer
          anchor="left"
          open={open}
          onOpen={toggleMenu}
          onClose={toggleMenu}
          
        >
          <div onClick={toggleMenu} role="button" tabIndex={0} style={{backgroundColor: "black"}}>
            <IconButton style={{color: "white"}}>
              <ChevronRightIcon />
            </IconButton>
          </div>
          <Stack
            sx={{
              overflowY: "auto",
              height:  "100vh" ,
              flexDirection: "column",
              backgroundColor: "black",
            }}
          >
            {categories.map((category) => (
              <motion.button
                className="category-btn"
                onClick={() => setSelectedCategory(category.name)}
                key={category.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.5, delay: 0.2 },
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  backgroundColor:
                    category.name === selectedCategory && "#FC1503",
                  color: "white",
                }}
              >
                <span
                  style={{
                    color: category.name === selectedCategory ? "white" : "red",
                    marginRight: "15px",
                  }}
                >
                  {category.icon}
                </span>
                <span
                  style={{
                    opacity: category.name === selectedCategory ? 1 : 0.8,
                  }}
                >
                  {category.name}
                </span>
              </motion.button>
            ))}
          </Stack>
        </SwipeableDrawer>

        {!isMobile && (
          <Stack
            sx={{
              overflowY: "auto",
              overflowX: "hidden",
              height: "90vh" ,
              width: "100%",
              flexDirection: "column",
            }}
          >
            {categories.map((category) => (
              <motion.button
                className="category-btn"
                onClick={() => setSelectedCategory(category.name)}
                key={category.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.5, delay: 0.2 },
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  backgroundColor:
                    category.name === selectedCategory && "#FC1503",
                  color: "white",
                }}
              >
                <span
                  style={{
                    color: category.name === selectedCategory ? "white" : "red",
                    marginRight: "15px",
                  }}
                >
                  {category.icon}
                </span>
                <span
                  style={{
                    opacity: category.name === selectedCategory ? 1 : 0.8,
                  }}
                >
                  {category.name}
                </span>
              </motion.button>
            ))}
            <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
                    Copyright © 2023 Himanshu Kumar
            </Typography>
          </Stack>
        )}
      </ToolBar>
    </>
  );
};

export default Categories;
