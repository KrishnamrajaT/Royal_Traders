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
const staticReviews = [
  {
    id: 1,
    name: "John D.",
    date: "March 15, 2023",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    content:
      '"I\'ve been trading with this platform for 6 months now and the results have been incredible. The tools and signals provided have helped me grow my account by 120%. Highly recommended!"',
    platform: "Trustpilot",
  },
  {
    id: 2,
    name: "Sarah M.",
    date: "February 28, 2023",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.5,
    content:
      '"As a beginner, I was nervous about trading, but the educational resources and support team made it so easy to learn. I\'m now making consistent profits every week. Thank you!"',
    platform: "Google Reviews",
  },
  {
    id: 3,
    name: "Robert T.",
    date: "January 10, 2023",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 5,
    content:
      '"The best trading platform I\'ve used in 10 years of trading. The execution speed is unmatched and the daily analysis is spot on. My portfolio has never looked better."',
    platform: "Facebook",
  },
  {
    id: 4,
    name: "John D.",
    date: "March 15, 2023",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    content:
      '"I\'ve been trading with this platform for 6 months now and the results have been incredible. The tools and signals provided have helped me grow my account by 120%. Highly recommended!"',
    platform: "Trustpilot",
  },
  {
    id: 5,
    name: "Sarah M.",
    date: "February 28, 2023",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.5,
    content:
      '"As a beginner, I was nervous about trading, but the educational resources and support team made it so easy to learn. I\'m now making consistent profits every week. Thank you!"',
    platform: "Google Reviews",
  },
  {
    id: 6,
    name: "Robert T.",
    date: "January 10, 2023",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 5,
    content:
      '"The best trading platform I\'ve used in 10 years of trading. The execution speed is unmatched and the daily analysis is spot on. My portfolio has never looked better."',
    platform: "Facebook",
  },
];
const videos = [
  {
    id: 1,
    title: "Forex Pairs Analysis & Results",
    date: "May 15, 2023",
    thumbnail:
      "https://img.freepik.com/free-photo/graph-screen-with-uptrend-line-digital-stock-market-background_53876-133826.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    profit: "+$2,450 Profit",
  },
  {
    id: 2,
    title: "Crypto Swing Trades Recap",
    date: "May 14, 2023",
    thumbnail:
      "https://img.freepik.com/free-photo/stock-market-graph-with-uptrend-line-digital-stock-market-background_53876-133825.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    profit: "+$3,120 Profit",
  },
  {
    id: 3,
    title: "Weekend Market Review",
    date: "May 13, 2023",
    thumbnail:
      "https://img.freepik.com/free-photo/stock-market-graph-with-downtrend-line-digital-stock-market-background_53876-133827.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    profit: "+$1,890 Profit",
  },
  {
    id: 4,
    title: "Crypto Swing Trades Recap",
    date: "May 14, 2023",
    thumbnail:
      "https://img.freepik.com/free-photo/stock-market-graph-with-uptrend-line-digital-stock-market-background_53876-133825.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    profit: "+$3,120 Profit",
  },
  {
    id: 5,
    title: "Weekend Market Review",
    date: "May 13, 2023",
    thumbnail:
      "https://img.freepik.com/free-photo/stock-market-graph-with-downtrend-line-digital-stock-market-background_53876-133827.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    profit: "+$1,890 Profit",
  },
];

const ReviewPage = () => {
  const theme = useTheme();

  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [reviews, setReviews] = useState(null);

  const [videosPage, setVideosPage] = useState(1);
  const videosPerPage = 3;

  // Calculate current videos to display
  const currentVideos = videos.slice(
    (videosPage - 1) * videosPerPage,
    videosPage * videosPerPage
  );
  const [reviewsPage, setReviewsPage] = useState(1);
  const reviewsPerPage = 3;

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
        setReviews(res.data)
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchReviews();
  }, []);

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
            <Grid container spacing={2}>
              {currentReviews?.map((review) => (
                <Grid item xs={12} sm={6} md={4} key={review.id}>
                  <ReviewCard>
                    <CardContent>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Avatar
                          src={review.avatar}
                          alt={review.name}
                          sx={{ width: 56, height: 56, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {review.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {review.date}
                          </Typography>
                        </Box>
                      </Box>
                      <Rating
                        name="read-only-rating"
                        value={review.rating}
                        precision={0.5}
                        readOnly
                        sx={{
                          "& .MuiRating-iconFilled": {
                            color:
                              "linear-gradient(45deg, #2563eb 0%, #1e40af 100%)",
                          },
                          "& .MuiRating-iconHover": {
                            color:
                              "linear-gradient(45deg, #2563eb 0%, #1e40af 100%)",
                          },
                        }}
                      />
                      <Typography
                        variant="body1"
                        fontStyle="italic"
                        color="text.secondary"
                        mb={2}
                      >
                        {review.content}
                      </Typography>
                    </CardContent>
                  </ReviewCard>
                </Grid>
              ))}
            </Grid>

            {/* Add pagination controls for reviews */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={Math.ceil(reviews?.length / reviewsPerPage)}
                page={reviewsPage}
                onChange={handleReviewsPageChange}
                size="large"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#2563eb", // Default color
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #2563eb 0%, #1e40af 100%)",
                      color: "white",
                    },
                  },
                  "& .Mui-selected": {
                    background:
                      "linear-gradient(45deg, #2563eb 0%, #1e40af 100%)",
                    color: "white",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #2563eb 0%, #1e40af 100%)",
                    },
                  },
                  "& .MuiPaginationItem-ellipsis": {
                    color: "#2563eb",
                  },
                  "& .MuiSvgIcon-root": {
                    fill: "#2563eb",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Videos Section */}
        <Grid container spacing={4}>
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
                  <Chip
                    label={video.profit}
                    sx={{
                      backgroundColor: theme.palette.success.main,
                      color: theme.palette.common.white,
                      fontWeight: 600,
                    }}
                  />
                </CardContent>
              </VideoCard>
            </Grid>
          ))}
        </Grid>

        {/* Add pagination controls */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={Math.ceil(videos.length / videosPerPage)}
            page={videosPage}
            onChange={(event, page) => setVideosPage(page)}
            color="primary"
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#2563eb", // Default color
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #2563eb 0%, #1e40af 100%)",
                  color: "white",
                },
              },
              "& .Mui-selected": {
                background: "linear-gradient(45deg, #2563eb 0%, #1e40af 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #2563eb 0%, #1e40af 100%)",
                },
              },
              "& .MuiPaginationItem-ellipsis": {
                color: "#2563eb",
              },
              "& .MuiSvgIcon-root": {
                fill: "#2563eb",
              },
            }}
          />
        </Box>
        {/* Testimonial Form */}
        <ReviewForm />
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
