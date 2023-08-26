import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Box, CardMedia, CardContent, IconButton } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { sanitize } from 'dompurify';


import { demoProfilePicture } from '../utils/constants';
import { Loader } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import styles from './Video.module.css';

const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'k';
  }
  return num;
};

const CommentComponent = ({ comment }) => {
    return (
      <div dangerouslySetInnerHTML={{ __html: sanitize(comment) }} />
    );
  };

const VideoComment = () => {
  const [commentDetails, setCommentDetails] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const commentData = await fetchFromAPI(`commentThreads?part=snippet&videoId=${id}`);
        setCommentDetails(commentData.items);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();
  }, [id]);

  if (!commentDetails.length) return <Loader />;

  return (
    <Box height="50vh" sx= {{overflowX: "hidden", overflowY: "scroll"}} >
      {commentDetails.map((commentDetail, index) => (
        <CardContent key={index} className={styles.cardContent} 
            sx={{color: "white", display: "flex",gap:"15px",padding:"0", margin: " 10px 20px", height:"auto"}}>
          <Link to={`/channel/${commentDetail.snippet.topLevelComment.snippet.authorChannelId.value}`}>
            <CardMedia
              image={commentDetail.snippet.topLevelComment.snippet.authorProfileImageUrl || demoProfilePicture}
              alt={commentDetail.snippet.topLevelComment.snippet.authorDisplayName}
              className={styles.cardMedia}
            sx={{height: "40px", width: "40px", borderRadius: "50%"}}/>
          </Link>
          <div className={styles.content}>
          {commentDetail.snippet.topLevelComment.snippet && (
              <Typography className={styles.commentAurthor} variant="body" sx={{fontSize: "0.9rem"}} >
                <Link to={`/channel/${commentDetail.snippet.topLevelComment.snippet.authorChannelId.value}`} style={{color: "white"}}>
                   {`@ ${commentDetail.snippet.topLevelComment.snippet.authorDisplayName}`}
                </Link>
              </Typography>
            )}
            {commentDetail.snippet.topLevelComment.snippet && (
              <Typography className={styles.comment} sx={{fontSize: "0.8rem"}}>
                <CommentComponent comment={commentDetail.snippet.topLevelComment.snippet.textDisplay} />
                
              </Typography>
            )}
            <Typography className={styles.commentInfo} sx={{fontSize: "0.8rem"}} fontWeight={300}>
              {commentDetail.snippet.topLevelComment.snippet && (
                <>
                  <IconButton style={{ color: 'white' }}>
                    <ThumbUpOffAltIcon />
                  </IconButton>
                  {' '}
                  {formatNumber(parseInt(commentDetail.snippet.topLevelComment.snippet.likeCount))} {' '}
                  <IconButton style={{ color: 'white' }}>
                    <ThumbDownOffAltIcon />
                  </IconButton>
                </>
              )}
            </Typography>
            {'  '} { commentDetail.snippet.canReply &&(
                    <Typography sx={{color: "#3ea6ff", fontSize: "1rem", marginLeft: "15px"}}>
                       {formatNumber(parseInt(commentDetail.snippet.totalReplyCount))} {' '} {'reply'}
                    </Typography>
            )}
          </div>
        </CardContent>
      ))}
    </Box>
  );
};

export default VideoComment;
