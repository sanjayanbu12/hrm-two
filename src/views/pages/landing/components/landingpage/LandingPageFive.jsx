import React from "react";
import { SecondContainers } from "../Navbar/Styled";
import { ButtonBase, Container, Grid, Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import Listimage2 from "../style/img/templates.6ecfc2b06550698c881s.webp";

const LandingPageFive = () => {
  return (
    <>
      <SecondContainers>
        <Container style={{ paddingLeft: "0px", paddingRight: "0px" }}>
          <Grid className="fifth-page" container alignItems={"center"}>
            <Grid className="fifth-page-spacing" item lg={6} md={10} gap={3}>
              <Grid item lg={10}>
                <Typography
                  fontWeight="400"
                  letterSpacing={"0.4px"}
                  variant="h1"
                  fontSize={"36px"}
                  lineHeight={"44px"}
                >
                  Get a big-picture view of progress
                </Typography>
              </Grid>
              <Grid item lg={10}>
                <Typography
                  fontSize={"16px"}
                  color={"#646F79"}
                  lineHeight={1.75}
                  letterSpacing={"1px"}
                >
                  No meetings required. Get real-time status updates and visual
                  highlights to see where work stands and identify projects at
                  risk.
                </Typography>
              </Grid>
              <Grid item lg={10}>
                <ButtonBase
                  disableRipple
                  disableTouchRipple
                  sx={{
                    fontSize: "16px",
                    letterSpacing: "1.2px",
                    padding: "8px 0px",
                    fontWeight: "bold",
                    "&:hover": { color: "#F06A6A" },
                  }}
                >
                  The 3 essential pieces of work management  <EastIcon />
                </ButtonBase>
              </Grid>
            </Grid>
            <Grid item lg={6} md={10}>
              <img width={"100%"} src={Listimage2} alt="" />
            </Grid>
          </Grid>
        </Container>
      </SecondContainers>
      <style>
        {`
          @media (max-width: 1000px) {
            .fifth-page{
              display:flex;
              flex-direction: column-reverse;
              justify-content:center;
              text-align:center;
              margin-top:40px;
              gap:40px;
            }
            .fifth-page-spacing{
              display:flex;
              flex-direction:column;
              gap:20px;
            }
          }
        `}
      </style>
    </>
  );
};
export default LandingPageFive;
