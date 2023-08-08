import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import React from "react"; 



const ApplicationView=({ open, handleClose, selectedJob })=>{

return(
<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
{selectedJob && (
  <>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        background: '#2196f3',
        marginBottom: '1px'
      }}
    >
      <DialogTitle variant="h2" align="center">
        Candidate Application View
      </DialogTitle>
    </Box>
    <Box sx={{ backgroundColor: '#f5f5f5' }}>
      <DialogContent>
        <Box>
          <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
            <b> Job Role</b>
            <b style={{ marginLeft: '223px', paddingRight: '10px' }}>:</b>
            {selectedJob.Jobrole}
          </Typography>
          <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
            <b>No. of Openings</b>
            <b style={{ marginLeft: '178px', paddingRight: '10px' }}>:</b> {selectedJob.Openings}
          </Typography>
          <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
            <b> Company</b>
            <b style={{ marginLeft: '220px', paddingRight: '10px' }}>:</b> {selectedJob.Company}
          </Typography>
          <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
            <b> Location</b>
            <b style={{ marginLeft: '225px', paddingRight: '10px' }}>:</b> {selectedJob.Location}
          </Typography>
          <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
            <b> Worktype</b>
            <b style={{ marginLeft: '221px', paddingRight: '10px' }}>:</b> {selectedJob.Worktype}
          </Typography>
          <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
            <b> Qualification</b>
            <b style={{ marginLeft: '200px', paddingRight: '10px' }}>:</b> {selectedJob.Education}
          </Typography>
          <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
            <b> Year of Passing</b>
            <b style={{ marginLeft: '180px', paddingRight: '10px' }}>:</b>{' '}
            {!selectedJob.Year ? <span>Not Mentioned </span> : selectedJob.Year}
          </Typography>
          <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
            <b> Experience</b>
            <b style={{ marginLeft: '211px', paddingRight: '10px' }}>:</b> {selectedJob.ExperienceFrom} to{' '}
            {selectedJob.ExperienceTo} Years
          </Typography>
          <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
            <b> Description</b>
            <b style={{ marginLeft: '210px', paddingRight: '10px' }}>:</b>
            {selectedJob.Description}
          </Typography>
          <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
            <b> ApplicationLink</b>
            <b style={{ marginLeft: '183px', paddingRight: '10px' }}>:</b> {selectedJob.ApplicationLink}
          </Typography>
          <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
            <b> Last Date to Apply</b>
            <b style={{ marginLeft: '168px', paddingRight: '10px' }}>:</b> {selectedJob.Deadline}
          </Typography>
          <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
            <b> Application Count</b>
            <b style={{ marginLeft: '170px', paddingRight: '10px' }}>:</b> {selectedJob.ApplicationCount}
          </Typography>
          <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
            <b> Selected</b>
            <b style={{ marginLeft: '228px', paddingRight: '10px' }}>:</b> {selectedJob.SelectedCount}
          </Typography>
          <Typography sx={{ lineHeight: '4' }} variant="p" component="p">
            <b> Remaining</b>
            <b style={{ marginLeft: '215px', paddingRight: '10px' }}>:</b> {selectedJob.RemainingCount}
          </Typography>
        </Box>
      </DialogContent>
    </Box>
  </>
)}
</Dialog>
)
}
export default ApplicationView;