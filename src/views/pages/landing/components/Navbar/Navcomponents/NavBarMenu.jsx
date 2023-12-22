import React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Popper,Fade,Box,List,Grid,Zoom,Button,Typography,Stack } from "@mui/material";
import { NewButton } from "../Styled";
import EastIcon from '@mui/icons-material/East';
import { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { CustomContextHook } from "../../usecontext/CustomContextHook";

const NavBarMenu = () => {
  const [expanded, setExpanded] = useState(" ");
  const { anchorEl, setAnchorEl, openPopper, setOpenPopper } = CustomContextHook();
  const handleClick = (event, popperName) => {
    if (openPopper === popperName) {
      setOpenPopper(null);
      document.body.style.overflow = "unset";
      const rotate = document.querySelector(".rotate");
      rotate.style.transform = "none";
    } else {
      setAnchorEl(event.currentTarget);
      setOpenPopper(popperName);
      document.body.style.overflow = "hidden";
      const rotate = document.querySelector(".rotate");
      rotate.style.color = "gray";
      rotate.style.transform = "rotate(-90deg)";
      rotate.style.color = "gray";
    }
  };
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
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const canBeOpen = Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  return (
    <>
    <Box className="only-mobile">
      <Button
        variant="contained"
        onClick={(e) => handleClick(e, "Menu")}
        disableElevation
        disableFocusRipple
        disableRipple
        disableTouchRipple
        sx={{
          fontSize: "1rem",
          fontWeight: "600",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "gray",
          "&:hover": {
            background: "none",
            color: "black",
          },
        }}
      >
        <MenuRoundedIcon className="rotate" fontSize="large" />
      </Button>

      <Popper
        id={id}
        open={openPopper === "Menu"}
        anchorEl={anchorEl}
        transition  
        style={{ maxHeight: '520px', overflowY: 'auto' }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Box
              sx={{
                mt: 0.8,
                bgcolor: "white",
                paddingBottom:"20px",
                display: "flex",
              }}
            >
              <Zoom in={openPopper === "Menu"}>
                <Box sx={{ display: "flex" }}>
                  <Grid
                    item
                    lg={5}
                    md={10}
                    display={"flex"}
                    marginTop={"20px"}
                    justifyContent={"flex-end"}
                  >
                    <List
                      id="playlist"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <Accordion
                        style = {{backgroundColor:"white", color:"black", borderBottom:"1px solid gray",}}
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                      >
                        <AccordionSummary
                          aria-controls="panel1d-content"
                          id="panel1d-header"
                          expandIcon={<ExpandMoreIcon htmlColor="gray" />}
                        >
                          <Typography color={"#727272"} fontSize={"16px"} fontWeight={"500"}>
                            Why Gestion?    
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails >
                        <Box sx={{ display : "flex", gap:"50px",  }}>            
                        <Box>
                        <Typography letterSpacing={"1px"} paddingBottom={"18px"} borderBottom={"1px solid #b7bfc6"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>WHY GESTION</Typography>
                        <Typography letterSpacing={"0.5px"} paddingTop={"18px"} fontSize={"14px"} fontWeight={500} variant="h3" component={"h3"}>Overview</Typography>
                        <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build project plans, coordinate tasks, and hit deadlines</Typography>
                        <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Marketing</Typography>
                        <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Plan and track campaigns, launches, and more</Typography>
                        <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Operations</Typography>
                        <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build, scale and streamline processes to improve efficiency</Typography>
                        <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Leaders <NewButton>NEW</NewButton></Typography>
                        <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Improve clarity, focus, and personal growth</Typography>
                        <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Product</Typography>
                        <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build roadmaps, plan sprints, manage shipping and launches</Typography>
                        </Box>
                    <Box>
                    <Typography letterSpacing={"1px"} paddingBottom={"18px"} borderBottom={"1px solid #b7bfc6"} fontSize={"12px"} fontWeight={500} variant="h3" component={"h2"}>FOR YOUR WORKFLOW</Typography>
                  <Stack direction={"row"} gap={6}>
                  <Stack flexBasis={"250px"}>
                    <Typography letterSpacing={"0.5px"} paddingTop={"18px"} fontSize={"14px"} fontWeight={500} variant="h3" component={"h3"}>Project Management</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build project plans, coordinate tasks, and hit deadlines</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>Campagin Management</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Plan and track campaigns, launches, and more</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>Creative Production</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build, scale and streamline processes to improve efficiency</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>Request Tracking <NewButton>NEW</NewButton></Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Improve clarity, focus, and personal growth</Typography>                   
                  </Stack>

                  <Stack flexBasis={"250px"}>
                    <Typography letterSpacing={"0.5px"} paddingTop={"18px"} fontSize={"14px"} fontWeight={500} variant="h3" component={"h3"}>Remote Teams <NewButton>POPULAR</NewButton></Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build project plans, coordinate tasks, and hit deadlines</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>Productivity</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Plan and track campaigns, launches, and more</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>Agile Management</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build, scale and streamline processes to improve efficiency</Typography>
                    <Typography sx={{cursor:"pointer"}} letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>See all workflows <EastIcon sx={{verticalAlign:"middle", cursor:"pointer"}} fontSize="small" htmlColor="gray"/></Typography>
                  </Stack>                 
                    </Stack>
                    </Box>                              
                    </Box> 
                    </AccordionDetails>
                    </Accordion>
                      <Accordion
                        style = {{backgroundColor:"white", color:"black", borderBottom:"1px solid gray",}}
                        expanded={expanded === "panel2"}
                        onChange={handleChange("panel2")}
                      >
                        <AccordionSummary
                          aria-controls="panel2d-content"
                          id="panel2d-header"
                          expandIcon={<ExpandMoreIcon htmlColor="gray" />}
                        >
                          <Typography color={"#727272"} fontSize={"16px"} fontWeight={"500"}>
                            Features
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Box>
                        <Typography sx={{ width:"850px" }} letterSpacing={"1px"} paddingBottom={"18px"} borderBottom={"1px solid #b7bfc6"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>WHY GESTION</Typography>
                        <Stack direction={"row"} width={"850px"} gap={6}>
                <Stack flexBasis={"250px"}>
                    <Typography letterSpacing={"0.5px"} paddingTop={"18px"} fontSize={"14px"} fontWeight={500} variant="h3" component={"h3"}>Overviewsss</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build project plans, coordinate tasks, and hit deadlines</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Marketing</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Plan and track campaigns, launches, and more</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Operations</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build, scale and streamline processes to improve efficiency</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Leaders <NewButton>NEW</NewButton></Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Improve clarity, focus, and personal growth</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Product</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build roadmaps, plan sprints, manage shipping and launches</Typography>
                </Stack>

                <Stack flexBasis={"250px"}>
                <Typography letterSpacing={"0.5px"} paddingTop={"18px"} fontSize={"14px"} fontWeight={500} variant="h3" component={"h3"}>Overview</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build project plans, coordinate tasks, and hit deadlines</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Marketing</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Plan and track campaigns, launches, and more</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Operations</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build, scale and streamline processes to improve efficiency</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Leaders <NewButton>NEW</NewButton></Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Improve clarity, focus, and personal growth</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Product</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build roadmaps, plan sprints, manage shipping and launches</Typography>

                </Stack>

                <Stack flexBasis={"250px"}>
                <Typography letterSpacing={"0.5px"} paddingTop={"18px"} fontSize={"14px"} fontWeight={500} variant="h3" component={"h3"}>Overview</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build project plans, coordinate tasks, and hit deadlines</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Marketing</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Plan and track campaigns, launches, and more</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Operations</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build, scale and streamline processes to improve efficiency</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Leaders <NewButton>NEW</NewButton></Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Improve clarity, focus, and personal growth</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Product</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build roadmaps, plan sprints, manage shipping and launches</Typography>
                </Stack>
                </Stack>
                </Box>
                    </AccordionDetails>
                    </Accordion>
                      <Accordion
                        style = {{backgroundColor:"white", color:"black", borderBottom:"1px solid gray",}}
                        expanded={expanded === "panel3"}
                        onChange={handleChange("panel3")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                          expandIcon={<ExpandMoreIcon htmlColor="gray" />}
                        >
                          <Typography color={"#727272"} fontSize={"16px"} fontWeight={"500"}>
                            Resources
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Box>
            <Typography sx={{ width:"850px" }} letterSpacing={"1px"} paddingBottom={"18px"} borderBottom={"1px solid #b7bfc6"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>WHY GESTION</Typography>
              <Stack direction={"row"} width={"850px"} gap={6}>
                <Stack flexBasis={"250px"}>
                    <Typography letterSpacing={"0.5px"} paddingTop={"18px"} fontSize={"14px"} fontWeight={500} variant="h3" component={"h3"}>Overview</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build project plans, coordinate tasks, and hit deadlines</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Marketing</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Plan and track campaigns, launches, and more</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Operations</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build, scale and streamline processes to improve efficiency</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Leaders <NewButton>NEW</NewButton></Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Improve clarity, focus, and personal growth</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Product</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build roadmaps, plan sprints, manage shipping and launches</Typography>
                </Stack>

                <Stack flexBasis={"250px"}>
                    <Typography letterSpacing={"0.5px"} paddingTop={"18px"} fontSize={"14px"} fontWeight={500} variant="h3" component={"h3"}>Overview</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build project plans, coordinate tasks, and hit deadlines</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Marketing</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Plan and track campaigns, launches, and more</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Operations</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build, scale and streamline processes to improve efficiency</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Leaders <NewButton>NEW</NewButton></Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Improve clarity, focus, and personal growth</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Product</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build roadmaps, plan sprints, manage shipping and launches</Typography>

                </Stack>

                <Stack flexBasis={"250px"}>
                    <Typography letterSpacing={"0.5px"} paddingTop={"18px"} fontSize={"14px"} fontWeight={500} variant="h3" component={"h3"}>Overview</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build project plans, coordinate tasks, and hit deadlines</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Marketing</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Plan and track campaigns, launches, and more</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Operations</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build, scale and streamline processes to improve efficiency</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Leaders <NewButton>NEW</NewButton></Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Improve clarity, focus, and personal growth</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" component={"h2"}>For Product</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build roadmaps, plan sprints, manage shipping and launches</Typography>
                    </Stack>
                    </Stack>
                    </Box>
                        </AccordionDetails>
                      </Accordion>
                    </List>
                  </Grid>
                </Box>
              </Zoom>
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
    <style>
        {`
            @media (min-width: 1000px) {
                .only-mobile{
                  display:none;
                }
            }
        `}
    </style>
    </>
  );
};
export default NavBarMenu;