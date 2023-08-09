import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import MainCard from 'ui-component/cards/MainCard'
import { saveAs } from 'file-saver'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import VisibilityIcon from '@mui/icons-material/Visibility'

import { Box } from '@mui/system'
import ApplicationView from './ApplicationView'
const ApplicationTracker = () => {
  const [Data, setData] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [open, setOpen] = useState(false)
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    fetchData()
  }, [])
  const downloadStyles = {
    cursor: 'pointer',
    transform: 'scale(1.1)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      backgroundColor: 'blue',
      color: 'white',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)'
    }
  }
  const fetchData = async () => {
    try {
      const response = await axios.get('https://hrm-backend-square.onrender.com/ats/')
      const newData = response.data.getData
      console.log(newData)
      setData(newData)
      setLoader(false)
      console.log(response.data.getData, ' this is the new data')
    } catch (error) {
      console.log(newData)
    }
  }
  const handleView = id => {
    const job = Data.find(item => item._id === id)
    setSelectedJob(job)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleResume = async (id, name) => {
    try {
      const response = await axios.get(`https://hrm-backend-square.onrender.com/ats/resume/${id}`, {
        responseType: 'arraybuffer'
      })
      const byteArray = new Uint8Array(response.data)
      const blob = new Blob([byteArray], { type: 'application/pdf' })
      saveAs(blob, `${name} resume.pdf`)
    } catch (error) {
      console.log('Error downloading resume:', error)
    }
  }

  const handlePhotoDown = async (id, name) => {
    console.log(`id  = ${id}`)
    try {
      const response = await axios.get(`https://hrm-backend-square.onrender.com/ats/photo/${id}`, {
        responseType: 'arraybuffer'
      })
      const contentType = response.headers['Content-Type']
      const extension = contentType === 'image/jpeg' ? 'jpeg' : 'png'
      console.log(`type  = ${extension}`)
      const byteArray = new Uint8Array(response.data)
      console.log(`byteArray  = ${byteArray}`)
      const blob = new Blob([byteArray], { type: contentType })
      console.log(`blob  = ${blob}`)
      saveAs(blob, `${name}.${extension}`)
    } catch (error) {
      console.log('Error downloading resume:', error)
    }
  }

  return (
    <MainCard title='Application Tracker'>
      <TableContainer component={Paper}>
        {loader ? (
          <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Jobrole</TableCell>
                <TableCell>Photo</TableCell>
                <TableCell>Resume</TableCell>
                <TableCell>Mobile No</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Data.map(x => (
                <TableRow key={x._id}>
                  <TableCell>{x.name}</TableCell>
                  <TableCell>{x.position}</TableCell>
                  <TableCell>
                    {x.photo && (
                      <Tooltip title='Download Photo'>
                        <InsertPhotoIcon style={downloadStyles} onClick={() => handlePhotoDown(x._id, x.name)} />
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>
                    {x.resume && (
                      <Tooltip title='Download Resume'>
                        <TextSnippetIcon style={downloadStyles} onClick={() => handleResume(x._id, x.name)} />
                      </Tooltip>
                    )}
                  </TableCell>

                  <TableCell>{x.phone}</TableCell>
                  <TableCell>{x.email}</TableCell>
                  <TableCell align='center'>
                    <Tooltip title='Click to View'>
                      <VisibilityIcon
                        fontSize='small'
                        onClick={() => {
                          handleView(x._id)
                        }}
                      />
                    </Tooltip>
                  </TableCell>
                  <ApplicationView open={open} handleClose={handleClose} selectedJob={selectedJob} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </MainCard>
  )
}

export default ApplicationTracker
