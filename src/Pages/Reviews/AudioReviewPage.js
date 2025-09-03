import React, { useState, useRef } from "react";
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
  Rating,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";
import {
  Star as StarIcon,
  StarHalf as StarHalfIcon,
  StarBorder as StarBorderIcon,
  PlayArrow as PlayArrowIcon,
  Close as CloseIcon,
  MusicNote as MusicNoteIcon,
  Pause as PauseIcon,
} from "@mui/icons-material";

import CustomPagination from "../../components/CustomePagination";
import audio_1 from "../../Assets/audio_reviews/client_1_07-25.ogg";
import audio_2 from "../../Assets/audio_reviews/clinet_2_07-25.ogg";
import audio_3 from "../../Assets/audio_reviews/clinet_3_07-25.ogg";
import audio_4 from "../../Assets/audio_reviews/clinet_4_07-25.ogg";
import audio_5 from "../../Assets/audio_reviews/clinet_5_07-25.ogg";
import audio_6 from "../../Assets/audio_reviews/clinet_6_07-25.ogg";
import audio_7 from "../../Assets/audio_reviews/clinet_7_07-25.ogg";
import audio_8 from "../../Assets/audio_reviews/clinet_8_07-25.ogg";
import audio_9 from "../../Assets/audio_reviews/clinet_9_07-25.ogg";
import audio_10 from "../../Assets/audio_reviews/clinet_10_07-25.ogg";
import audio_11 from "../../Assets/audio_reviews/clinet_11_07-25.ogg";
import audio_12 from "../../Assets/audio_reviews/clinet_12_07-25.ogg";
import audio_13 from "../../Assets/audio_reviews/clinet_13_07-25.ogg";
import audio_14 from "../../Assets/audio_reviews/clinet_14_07-25.ogg";
import audio_15 from "../../Assets/audio_reviews/clinet_15_07-25.ogg";

const audios = [
  {
    id: 1,
    date: "July, 2025",
    title: "Client Success Story #1",
    description: "How Royal Traders helped me achieve consistent profits",
    audioUrl: audio_1,
    duration: "2:45",
  },
  {
    id: 2,
    date: "July, 2025",
    title: "Client Success Story #2",
    description: "My experience with Royal Traders' expert advisors",
    audioUrl: audio_2,
    duration: "1:58",
  },
  {
    id: 3,
    date: "July, 2025",
    title: "Client Success Story #3",
    description: "The training program that changed my trading approach",
    audioUrl: audio_3,
    duration: "3:12",
  },
  {
    id: 4,
    date: "July, 2025",
    title: "Client Success Story #4",
    description: "From beginner to profitable trader with Royal Traders",
    audioUrl: audio_4,
    duration: "2:30",
  },
  {
    id: 5,
    date: "July, 2025",
    title: "Client Success Story #5",
    description: "How the signals service improved my results",
    audioUrl: audio_5,
    duration: "2:15",
  },
  {
    id: 6,
    date: "July, 2025",
    title: "Client Success Story #6",
    description: "The support team that actually cares",
    audioUrl: audio_6,
    duration: "1:45",
  },
  {
    id: 7,
    date: "July, 2025",
    title: "Client Success Story #7",
    description: "My journey to financial freedom with Royal Traders",
    audioUrl: audio_7,
    duration: "3:45",
  },
  {
    id: 8,
    date: "July, 2025",
    title: "Client Success Story #8",
    description: "Why I trust Royal Traders with my investments",
    audioUrl: audio_8,
    duration: "2:22",
  },
  {
    id: 9,
    date: "July, 2025",
    title: "Client Success Story #9",
    description: "The tools that gave me an edge in the markets",
    audioUrl: audio_9,
    duration: "2:08",
  },
  {
    id: 10,
    date: "July, 2025",
    title: "Client Success Story #10",
    description: "How I doubled my account in 6 months",
    audioUrl: audio_10,
    duration: "3:02",
  },
  {
    id: 11,
    date: "July, 2025",
    title: "Client Success Story #11",
    description: "The community that supports my trading journey",
    audioUrl: audio_11,
    duration: "2:18",
  },
  {
    id: 12,
    date: "July, 2025",
    title: "Client Success Story #12",
    description: "My first profitable month with Royal Traders",
    audioUrl: audio_12,
    duration: "1:52",
  },
  {
    id: 13,
    date: "July, 2025",
    title: "Client Success Story #13",
    description: "Why I recommend Royal Traders to all my friends",
    audioUrl: audio_13,
    duration: "2:37",
  },
  {
    id: 14,
    date: "July, 2025",
    title: "Client Success Story #14",
    description: "The strategy that works in any market condition",
    audioUrl: audio_14,
    duration: "3:15",
  },
  {
    id: 15,
    date: "July, 2025",
    title: "Client Success Story #15",
    description: "How Royal Traders helped me quit my 9-5 job",
    audioUrl: audio_15,
    duration: "4:02",
  },
];
const AudioTestimonials = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentAudioId, setCurrentAudioId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPage, setAudioPage] = useState(1);
  const audiosPerPage = isMobile ? 3 : 9;
  const audioRefs = useRef({});

  const currentAudios = audios?.slice(
    (audioPage - 1) * audiosPerPage,
    audioPage * audiosPerPage
  );

  const handleAudioPlay = (audio) => {
    const audioElement = audioRefs.current[audio.id];

    // If clicking the currently playing audio, pause it
    if (currentAudioId === audio.id && isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
      return;
    }

    // Pause any currently playing audio
    if (currentAudioId) {
      const prevAudio = audioRefs.current[currentAudioId];
      prevAudio.pause();
    }

    // Play the new audio
    audioElement
      .play()
      .then(() => {
        setCurrentAudioId(audio.id);
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Audio playback failed:", error);
        // Fallback for iOS - sometimes requires additional user interaction
        alert("Please tap again to play the audio (iOS requirement)");
      });
  };

  return (
    <>
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
          {currentAudios.map((audio) => (
            <Grid
              key={audio.id}
              sx={{
                display: "flex",
                minHeight: "300px", // Fixed minimum height per card
              }}
            >
              <Card sx={{ height: "100%" }}>
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Your existing UI components */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <MusicNoteIcon
                      sx={{ fontSize: 40, mr: 2, color: "#1976d2" }}
                    />
                    <Box>
                      <Typography
                        variant="h6"
                        component="h3"
                        fontWeight="bold"
                        sx={{ color: "#1976d2" }}
                      >
                        {audio.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {audio.date}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="body1"
                    paddingLeft={"12px"}
                    color="text.secondary"
                    mb={2}
                  >
                    {audio.description}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                        handleAudioPlay(audio);
                      }}
                      color="primary"
                      sx={{ mr: 2 }}
                    >
                      {currentAudioId === audio.id && isPlaying ? (
                        <PauseIcon sx={{ color: "#1976d2" }} />
                      ) : (
                        <PlayArrowIcon sx={{ color: "#1976d2" }} />
                      )}
                    </IconButton>
                    <Typography variant="body2">{audio.duration}</Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Hidden audio element with ref */}
              <audio
                ref={(el) => (audioRefs.current[audio.id] = el)}
                preload="none"
                onPlay={() => {
                  setIsPlaying(true);
                  setCurrentAudioId(audio.id);
                }}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              >
                <source src={audio.audioUrl} type="audio/mp3" />
                <source src={audio.audioUrl} type="audio/mpeg" />
                <source src={audio.audioUrl} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            </Grid>
          ))}
        </Grid>
        {/* Add pagination controls */}
        <Box height={20}>
          <CustomPagination
            count={Math.ceil(audios?.length / audiosPerPage)}
            page={audioPage}
            onChange={(event, page) => setAudioPage(page)}
          />
        </Box>
      </Box>
    </>
  );
};
export default AudioTestimonials;
