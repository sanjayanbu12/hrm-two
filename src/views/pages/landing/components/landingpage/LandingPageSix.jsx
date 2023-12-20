import React from "react";
import { SecondContainers } from "../Navbar/Styled";
import { Container, Grid, Typography } from "@mui/material";

const LandingPageSix = () =>{

    return(
        <>
        <SecondContainers>
            <Container className="container" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
            <Grid className="sixth-page-spacing" container justifyContent={"center"} alignItems={"center"}>
                <Grid item display={"flex"} justifyContent={"center"} flexDirection={"column"} gap={2} lg={10} md={10}>
                    <Typography color={"gray"} textAlign={"center"}>INTEGRATIONS</Typography>
                    <Typography color={"#0D0E10"} variant="h3" textAlign={"center"} fontWeight={400}>Manage work on one platform</Typography>
                    <Typography color={"gray"} variant="h6" textAlign={"center"} fontWeight={300}>With 100+ integrations, you can bring together everything your team needs to communicate, collaborate, and coordinate work, start to finish.</Typography>
                </Grid>
            </Grid>
            </Container>
        </SecondContainers>
        <style>
        {`
          @media (max-width: 1000px) {
            .sixth-page-spacing{
              display:flex;
              flex-direction:column;
              gap:20px;
              margin-top:20px;
              height:83vh;
            }
          }
        `}
        </style>
        </>
    );
};
export default LandingPageSix;