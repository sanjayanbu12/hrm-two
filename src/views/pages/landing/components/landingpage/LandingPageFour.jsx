import React from "react";
import { SecondContainers } from "../Navbar/Styled";
import { ButtonBase, Container, Grid, Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import Listimage1 from "../style/img/templates.webp";

const LandingPageFour = () => {
  return (
    <>
      <SecondContainers>
        <Container style={{ paddingLeft: "0px", paddingRight: "0px" }}>
          <Grid className="fourth-page" container alignItems={"center"}>
            <Grid item lg={6}>
              <img width={"100%"} src={Listimage1} alt="" />
            </Grid>
            <Grid className="fourth-page-spacing" item lg={6} md={10} gap={3} display={"flex"} flexDirection={"column"} alignItems={"flex-end"}>
              <Grid item lg={10}>
                <Typography
                  fontWeight="400"
                  letterSpacing={"0.4px"}
                  variant="h1"
                  fontSize={"36px"}
                  lineHeight={"44px"}
                >
                  Set up your workflows in a snap
                </Typography>
              </Grid>
              <Grid item lg={10}>
                <Typography
                  fontSize={"16px"}
                  color={"#646F79"}
                  lineHeight={1.75}
                  letterSpacing={"1px"}
                >
                  Get started with 50+ templates. Fine tune them to do work your
                  way. Make sure no one misses a step. And keep your team rowing
                  in the same direction.
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
                    textAlign:"left",
                    "&:hover": { color: "#F06A6A" },
                  }}
                >
                  Understanding work management vs project management <EastIcon />
                </ButtonBase>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </SecondContainers>
      <style>
        {`
          @media (max-width: 1000px) {
            .fourth-page{
              display:flex;
              justify-content:center;
              margin-top:40px;
              gap:40px;
              text-align:center;
            }
            .fourth-page-spacing{
              display:flex;
              flex-direction:column;
              align-items:center;
              gap:20px;
            }
          }
        `}
      </style>
    </>
  );
};
export default LandingPageFour;
