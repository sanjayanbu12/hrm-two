import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import React from 'react'

const ApplicationView = ({ open, handleClose, selectedJob }) => {
  const formatDate =(date) =>{
    const d = new Date(date)
    const day = d.getDate().toString().padStart(2, '0')
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    const year = d.getFullYear()
    return `${day}-${month}-${year}`
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
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
            <DialogTitle variant='h2' align='center'>
              Candidate Application View
            </DialogTitle>
          </Box>
          <Box sx={{ backgroundColor: '#f5f5f5' }}>
            <DialogContent>
              <Box>
                <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                  <b> Job Role</b>
                  <b style={{ marginLeft: '223px', paddingRight: '12px' }}>:</b>
                  {selectedJob.position}
                </Typography>
                <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                  <b>Name</b>
                  <b style={{ marginLeft: '242px', paddingRight: '10px' }}>:</b> {selectedJob.name}
                </Typography>
                <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                  <b> Email</b>
                  <b style={{ marginLeft: '244px', paddingRight: '10px' }}>:</b> {selectedJob.email}
                </Typography>
                <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                  <b> Phone</b>
                  <b style={{ marginLeft: '240px', paddingRight: '10px' }}>:</b> {selectedJob.phone}
                </Typography>
                <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                  <b> Qualification</b>
                  <b style={{ marginLeft: '202px', paddingRight: '10px' }}>:</b> {selectedJob.qualification}
                </Typography>
                <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                  <b> Experience</b>
                  <b style={{ marginLeft: '212px', paddingRight: '10px' }}>:</b> {selectedJob.experience} years
                </Typography>
                <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                  <b> Skills</b>
                  <b style={{ marginLeft: '247px', paddingRight: '10px' }}>:</b> {selectedJob.skills}
                </Typography>
                <Typography sx={{ lineHeight: '4' }} variant='p' component='p'>
                  <b> Applied Date</b>
                  <b style={{ marginLeft: '200px', paddingRight: '12px' }}>:</b>
                  {formatDate(selectedJob.createdAt)}
                </Typography>
              </Box>
            </DialogContent>
          </Box>
        </>
      )}
    </Dialog>
  )
}
export default ApplicationView
