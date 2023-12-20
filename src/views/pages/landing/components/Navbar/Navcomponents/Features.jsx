import { React } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import { Box, Zoom, Typography , Button, Stack } from "@mui/material";
import { NewButton } from "../Styled";

const Features = ({anchorEl,setAnchorEl,openPopper , setOpenPopper}) => {

  const handleClick = (event, popperName) => {
    if (openPopper === popperName) {
      setOpenPopper(null);
      document.body.style.overflow = 'unset';
      // const arrow = document.querySelector(".Arrow-down2");
      // arrow.style.transform = "none"
    } else {
      setAnchorEl(event.currentTarget);
      setOpenPopper(popperName);
      document.body.style.overflow = 'hidden';
      // const arrow = document.querySelector(".Arrow-down2");
      // arrow.style.transform = "rotate(180deg)"
    }
  };

  const canBeOpen = Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  return (
    <>
    <Box className="Features-hide">
      <Button
        variant="contained"
        onClick={(e) => {handleClick(e , "Features")}}
        // isButtonClicked={openPopper}
        disableElevation
        disableFocusRipple
        disableRipple
        disableTouchRipple
        endIcon={<KeyboardArrowDownIcon className="Arrow-down2" htmlColor="rgb(128, 128, 128)" />}
        sx={{
          textTransform: 'none',
          fontSize: "1rem",
          fontWeight: "600",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          background:"none",
          color: "rgba(255, 255, 255, .8)",
          "&:hover": {
            background: "none",
            color: "rgba(255, 255, 255, 1)",
          },
        }}
      >
        Features
      </Button>

      <Popper id={id} open={openPopper === "Features"} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Box height={"100vh"} width={"100vw"} sx={{backgroundColor:"rgba(0,0,0,0.9)"}}>
            <Box
              sx={{
                mt: 0.8,
                bgcolor: "rgba(22, 22, 23, .88)",
                padding: "20px 64px",
                
              }}
            >
              <Zoom in={openPopper === "Features"}>
              <Box>
              <Typography sx={{ width:"850px" }} letterSpacing={"1px"} paddingBottom={"18px"} borderBottom={"1px solid #b7bfc6"} fontSize={12} fontWeight={500} variant="h3" color={"white"} component={"h2"}>WHY GESTION</Typography>
              <Stack direction={"row"} width={"850px"} gap={6}>
                <Stack flexBasis={"250px"}>
                <Typography letterSpacing={"0.5px"} paddingTop={"18px"} fontSize={"14px"} fontWeight={500} variant="h3" color={"white"} component={"h3"}>Overviewsss</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build project plans, coordinate tasks, and hit deadlines</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" color={"white"} component={"h2"}>For Marketing</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Plan and track campaigns, launches, and more</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" color={"white"} component={"h2"}>For Operations</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build, scale and streamline processes to improve efficiency</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" color={"white"} component={"h2"}>For Leaders <NewButton>NEW</NewButton></Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Improve clarity, focus, and personal growth</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" color={"white"} component={"h2"}>For Product</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build roadmaps, plan sprints, manage shipping and launches</Typography>
                </Stack>

                <Stack flexBasis={"250px"}>
                <Typography letterSpacing={"0.5px"} paddingTop={"18px"} fontSize={"14px"} fontWeight={500} variant="h3" color={"white"} component={"h3"}>Overview</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build project plans, coordinate tasks, and hit deadlines</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" color={"white"} component={"h2"}>For Marketing</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Plan and track campaigns, launches, and more</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" color={"white"} component={"h2"}>For Operations</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build, scale and streamline processes to improve efficiency</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" color={"white"} component={"h2"}>For Leaders <NewButton>NEW</NewButton></Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Improve clarity, focus, and personal growth</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" color={"white"} component={"h2"}>For Product</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build roadmaps, plan sprints, manage shipping and launches</Typography>

                </Stack>

                <Stack flexBasis={"250px"}>
                <Typography letterSpacing={"0.5px"} paddingTop={"18px"} fontSize={"14px"} fontWeight={500} variant="h3" color={"white"} component={"h3"}>Overview</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build project plans, coordinate tasks, and hit deadlines</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" color={"white"} component={"h2"}>For Marketing</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Plan and track campaigns, launches, and more</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" color={"white"} component={"h2"}>For Operations</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build, scale and streamline processes to improve efficiency</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" color={"white"} component={"h2"}>For Leaders <NewButton>NEW</NewButton></Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Improve clarity, focus, and personal growth</Typography>
                    <Typography letterSpacing={"1px"} paddingTop={"18px"} fontSize={12} fontWeight={500} variant="h3" color={"white"} component={"h2"}>For Product</Typography>
                    <Typography letterSpacing={"0.5px"} lineHeight={1.5} paddingTop={"7px"} marginBottom={"20px"} fontSize={"12px"} fontWeight={500} variant="h3" color={"gray"} component={"h3"}>Build roadmaps, plan sprints, manage shipping and launches</Typography>
                </Stack>
              </Stack>
              </Box>
              </Zoom>  
            </Box>
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
    <style>
        {`
          @media (max-width: 1000px) {
            .Features-hide{
              display:none;
            }
          }
          `
        }      
      </style>
    </>
  );
};
export default Features;