import React from "react";
import { SecondContainers } from "../Navbar/Styled";
import { ButtonBase, Container, Grid, Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import Listimage from "../style/img/list-view.webp"

const LandingPageThree = () => {
  return (
    <>
      <SecondContainers>
        <Container style={{ paddingLeft: "0px", paddingRight: "0px" }}>
          <Grid container className="third-page" alignItems={"center"}>
            <Grid className="spacing" item lg={6} md={10} gap={3}>
              <Grid item lg={10}>
                <Typography
                  fontWeight="400"
                  letterSpacing={"0.4px"}
                  variant="h1"
                  fontSize={"36px"}
                  lineHeight={"44px"}
                >
                  Work better in one shared space
                </Typography>
              </Grid>
              <Grid item lg={10}>
                <Typography
                  fontSize={"16px"}
                  color={"#646F79"}
                  lineHeight={1.75}
                  letterSpacing={"1px"}
                >
                  Find all your team’s work—plans, conversations, docs, and
                  more—in one place. So you can collaborate no matter where you
                  are.
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
                  Why Work Management? An introduction <EastIcon />
                </ButtonBase>
              </Grid>
            </Grid>
            <Grid item lg={6}>
                <img width={"100%"} src={Listimage} alt="" />
            </Grid>
          </Grid>
        </Container>
      </SecondContainers>
      <style>
        {`
          @media (max-width: 1000px) {
            .third-page{
              display:flex;
              flex-direction: column-reverse;
              justify-content:center;
              text-align:center;
              margin-top:40px;
              gap:40px;
            }
            .spacing{
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
export default LandingPageThree;