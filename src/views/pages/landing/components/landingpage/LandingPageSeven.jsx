import React from "react";
import { SecondContainers } from "../Navbar/Styled";
import { Container, Grid, Typography, List } from "@mui/material";
import { useState, useEffect, useRef, useMemo } from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

const LandingPageSeven = () => {
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    padding: "16px",
    borderBottom: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    "&:before": {
      display: "none",
    },
  }));

  const memoizedPlaylistItems = useMemo(
    () => [
      {
        movieUrl:
          "https://assets.asana.biz/m/71c4e0669724c7eb/original/custom-fields.mp4",
        moviePoster: "",
      },
      {
        movieUrl:
          "http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4",
      },
      {
        movieUrl: "https://assets.codepen.io/6093409/river.mp4",
      },
    ],
    []
  );

  const [videoSrc, setVideoSrc] = useState(memoizedPlaylistItems[0].movieUrl);
  const [posterSrc, setPosterSrc] = useState(
    memoizedPlaylistItems[0].moviePoster
  );
  const [expanded, setExpanded] = useState("panel1");
  const [videoIndex, setVideoIndex] = useState(0);
  const videoRef = useRef(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const onPlaylistItemClick = (event, index) => {
    const selectedVideo = memoizedPlaylistItems[index];
    setVideoSrc(selectedVideo.movieUrl);
    setPosterSrc(selectedVideo.moviePoster || "");
  };

  useEffect(() => {
    setVideoSrc(memoizedPlaylistItems[videoIndex].movieUrl);
    setPosterSrc(memoizedPlaylistItems[videoIndex].moviePoster);
    setExpanded(`panel${videoIndex + 1}`);
  }, [videoIndex, memoizedPlaylistItems]);

  const handleVideoEnded = () => {
    if (videoIndex < memoizedPlaylistItems.length - 1) {
      setVideoIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    });
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(handleIntersection, options);
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
  }, []);

  return (
    <>
      <SecondContainers>
        <Container style={{ paddingLeft: "0px", paddingRight: "0px" }}>
          <Grid className="fourth-page" container alignItems={"center"}>
            <Grid item lg={6} md={10}>
              <video
                ref={videoRef}
                id="videoarea"
                width={"100%"}
                height={"100%"}
                autoPlay
                preload="auto"
                tabIndex={-1}
                onEnded={handleVideoEnded}
                muted
                poster={posterSrc}
                src={videoSrc}
              ></video>
            </Grid>
            <Grid
              className="fourth-page-spacing"
              item
              lg={6}
              md={10}
              gap={3}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-end"}
            >
              <Grid item lg={10}>
                <List
                  id="playlist"
                  style={{ display: "flex", flexDirection: "column",marginBottom:"30px", padding:"0px 0px 16px 0px" }}

                >
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                    onClick={(event) => onPlaylistItemClick(event, 0)}
                    key={0}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography fontSize={"20px"} fontWeight={"500"}>
                        Happy Fit
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography textAlign={"start"}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2")}
                    onClick={(event) => onPlaylistItemClick(event, 1)}
                    key={1}
                  >
                    <AccordionSummary
                      aria-controls="panel2d-content"
                      id="panel2d-header"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography fontSize={"20px"} fontWeight={"500"}>
                        Sintel
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography textAlign={"start"}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel3"}
                    onChange={handleChange("panel3")}
                    onClick={(event) => onPlaylistItemClick(event, 2)}
                    key={2}
                  >
                    <AccordionSummary
                      aria-controls="panel3d-content"
                      id="panel3d-header"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography fontSize={"20px"} fontWeight={"500"}>
                        Resident Evil
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography textAlign={"start"}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </SecondContainers>
    </>
  );
};
export default LandingPageSeven;
