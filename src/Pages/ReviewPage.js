import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  IconButton,
  Modal,
  TextField,
  Select,
  MenuItem,
  Button,
  Chip,
  Divider,
  Rating,
  useMediaQuery,
  useTheme,
  styled,
  Pagination,
} from "@mui/material";
import {
  Star as StarIcon,
  StarHalf as StarHalfIcon,
  StarBorder as StarBorderIcon,
  PlayArrow as PlayArrowIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import ReviewForm from "./ReviewForm";
import axios from "axios";
import dayjs from "dayjs";
import CustomPagination from "../components/CustomePagination";
import videoPrePic from "../Assets/Main_Logo.png";

// Styled components using the styled API
const ReviewCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[8],
  },
}));

const VideoCard = styled(Card)({
  position: "relative",
  overflow: "hidden",
});

const PlayButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 60,
  height: 60,
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.common.white,
    transform: "translate(-50%, -50%) scale(1.1)",
  },
}));

const ModalContent = styled(Box)(({ theme }) => ({
  width: "80%",
  maxWidth: 800,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  position: "relative",
  outline: "none",
}));

const videos = [
  {
    id: 1,
    title: "📢 Live REVIEWS | Premium Group Members (Part 1) 💰",
    date: "May 2025",
    thumbnail: videoPrePic,
    videoUrl: "https://www.youtube.com/embed/JoX9KZKDjjo",
  },
  {
    id: 1,
    title: "📢 Live REVIEWS | Premium Group Members (Part 2) 💰",
    date: "May 2025",
    thumbnail: videoPrePic,
    videoUrl: "https://www.youtube.com/embed/iAaM_m2lfh8",
  },
  {
    id: 1,
    title: "📢 Live REVIEWS | Premium Group Members (Part 3) 💰",
    date: "May 2025",
    thumbnail: videoPrePic,
    videoUrl: "https://www.youtube.com/embed/8-4VPEjgQ-Y",
    
  }, {
    id: 1,
    title: "📢 Live REVIEWS | Premium Group Members (Part 4) 💰",
    date: "May 2025",
    thumbnail: videoPrePic,
    videoUrl: "https://www.youtube.com/embed/O2Gp0mZVV-0",
    
  }, {
    id: 1,
    title: "📢 Live REVIEWS | Premium Group Members (Part 5) 💰",
    date: "May 2025",
    thumbnail: videoPrePic,
    videoUrl: "https://www.youtube.com/embed/YAe7C5kHZ00",
    
  },
  
];

const ReviewPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [reviews, setReviews] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);

  const [videosPage, setVideosPage] = useState(1);
  const videosPerPage = 3;

  // Calculate current videos to display
  const currentVideos = videos.slice(
    (videosPage - 1) * videosPerPage,
    videosPage * videosPerPage
  );
  const [reviewsPage, setReviewsPage] = useState(1);
  const reviewsPerPage = isMobile ? 3 : 9;

  const currentReviews = reviews?.slice(
    (reviewsPage - 1) * reviewsPerPage,
    reviewsPage * reviewsPerPage
  );

  // Calculate the reviews to display for the current page

  // Handle page change
  const handleReviewsPageChange = (event, page) => {
    setReviewsPage(page);
  };

  // Sample client reviews data

  // Sample trading videos data

  const handleVideoOpen = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentVideo("");
  };
  let REVIEW_URL = "https://royal-traders-5euy.vercel.app/rating";
  const fetchReviews = () => {
    axios
      .get(REVIEW_URL)
      .then((res) => {
        console.log(res.data);
        setReviews(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchReviews();
  }, [isRefresh]);

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          background: `linear-gradient(45deg, #2563eb 0%, #1e40af 100%)`,
          color: theme.palette.common.white,
          padding: "64px 8px 64px 8px",
          textAlign: "center",
          mb: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "30px",
              sm: "2.4rem",
              md: "3rem",
            },
            fontWeight: 700,
            lineHeight: 1.2,
          }}
          component="h1"
          gutterBottom
        >
          Reviews & Trading Results
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: "20px",
              sm: "1.5rem",
              md: "2rem",
            },
            lineHeight: 1.2,
          }}
          gutterBottom
        >
          See what our clients say and watch our daily profit videos
        </Typography>
      </Box>

      <Box maxWidth="lg" mx="auto">
        {/* Reviews Section */}
        <Box mb={3}>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            sx={{
              position: "relative",
              color: "black",
              "&::after": {
                content: '""',
                display: "block",
                width: 80,
                height: 4,
                background: "linear-gradient(45deg, #2563eb 0%, #1e40af 100%)",
                margin: theme.spacing(2, "auto"),
                borderRadius: 2,
              },
            }}
          >
            Client Testimonials
          </Typography>
          <Box>
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                spacing={3}
                sx={{
                  // Explicitly define grid layout for 3 rows
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)", // 1 column on mobile
                    sm: "repeat(2, 1fr)", // 2 columns on tablet
                    md: "repeat(3, 1fr)", // 3 columns on desktop
                  },
                  gridAutoRows: "1fr", // Equal row height
                  gap: 3, // Consistent spacing
                }}
              >
                {currentReviews?.map((review) => (
                  <Grid
                    item
                    key={review.id}
                    sx={{
                      display: "flex",
                      minHeight: "300px", // Fixed minimum height per card
                    }}
                  >
                    <ReviewCard
                      sx={{
                        width: "100%",
                        height: "100%", // Fill grid cell
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        {/* Review content */}
                        <Box display="flex" alignItems="center" mb={2}>
                          <Avatar
                            src={review.avatar}
                            sx={{ width: 56, height: 56, mr: 2 }}
                          />
                          <Box>
                            <Typography fontWeight="bold">
                              {review.name}
                            </Typography>
                            <Typography>
                              {dayjs(review.createdAt).format("YYYY-MM-DD")}
                            </Typography>
                          </Box>
                        </Box>
                        <Rating
                          value={review.rating}
                          precision={0.5}
                          readOnly
                          sx={{
                            "& .MuiRating-iconFilled": {
                              color: "primary.main",
                            },
                            "& .MuiRating-iconHover": {
                              color: "primary.dark",
                            },
                          }}
                        />
                        <Typography
                          variant="body1"
                          fontStyle="italic"
                          sx={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {review.message}
                        </Typography>
                      </CardContent>
                    </ReviewCard>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Add pagination controls for reviews */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CustomPagination
                count={Math.ceil(reviews?.length / reviewsPerPage)}
                page={reviewsPage}
                onChange={handleReviewsPageChange}
              />
            </Box>
          </Box>
        </Box>

        {/* Videos Section */}

        <Box sx={{ width: "100%" }}>
          <Grid
            container
            spacing={3}
            sx={{
              // Explicitly define grid layout for 3 rows
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)", // 1 column on mobile
                sm: "repeat(2, 1fr)", // 2 columns on tablet
                md: "repeat(3, 1fr)", // 3 columns on desktop
              },
              gridAutoRows: "1fr", // Equal row height
              gap: 3, // Consistent spacing
            }}
          >
            {currentVideos.map((video) => (
              <Grid item xs={12} sm={6} md={4} key={video.id}>
                <VideoCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={video.thumbnail}
                    alt={video.title}
                  />
                  <PlayButton onClick={() => handleVideoOpen(video.videoUrl)}>
                    <PlayArrowIcon color="primary" fontSize="large" />
                  </PlayButton>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="primary"
                      fontWeight="medium"
                      mb={1}
                    >
                      {video.date}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="h3"
                      fontWeight="bold"
                      mb={1}
                    >
                      {video.title}
                    </Typography>
                    {/* <Chip
                      label={video.profit}
                      sx={{
                        backgroundColor: theme.palette.success.main,
                        color: theme.palette.common.white,
                        fontWeight: 600,
                      }}
                    /> */}
                  </CardContent>
                </VideoCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Add pagination controls */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CustomPagination
            count={Math.ceil(videos.length / videosPerPage)}
            page={videosPage}
            onChange={(event, page) => setVideosPage(page)}
          />
        </Box>
        {/* Testimonial Form */}
        <ReviewForm isRefresh={isRefresh} setIsRefresh={setIsRefresh} />
      </Box>

      {/* Video Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          outline: "none",
        }}
      >
        <ModalContent>
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "common.white",
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          <iframe
            src={currentVideo}
            width="100%"
            height="450"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Trading video"
          ></iframe>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ReviewPage;
