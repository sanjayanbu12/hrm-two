import React,{useState} from 'react';
import { StyledContainer, StyledCard, parentStyle, StyledTypography } from '../leavemanagement/styled';
import Grid from '@mui/material/Grid';
import { Button } from 'primereact/button';
import { useParams } from 'react-router-dom';
import ApiContext from 'context/api/ApiContext';
import { useContext } from 'react';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const Travelapproval = () => {
  const { travelData } = useContext(ApiContext);
  const { index } = useParams();

  const item = travelData[index];
  const [openDialog, setOpenDialog] = useState('');

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleAcceptConfirmation = async () => {
    try {
      // Check if reportingTo exists and is not empty
      if (item.reportingTo && item.reportingTo.length > 0) {
        const updatedReportingTo = item.reportingTo.map((report) => ({
          ...report,
          approved: true
        }));

        const updatedItem = {
          ...item,
          reportingTo: updatedReportingTo
        };

        await axios.put(`http://localhost:3001/travel/updateApprovalStatus/${item._id}`, updatedItem);

        handleClose();
      } else {
        console.warn('No reportingTo data found');
      }
    } catch (error) {
      console.error('Error accepting request', error);
    }
  };

  return (
    <div>
      <StyledContainer title="Travel Request">
        <Grid container spacing={2} rowSpacing={3} style={parentStyle}>
          <Grid xs={12}>
            <StyledCard>
              <StyledTypography variant="h4">
                From&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item?.from}
              </StyledTypography>
              <StyledTypography variant="h4">
                To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item?.to}
              </StyledTypography>
              <StyledTypography variant="h4">
                Start
                Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{new Date(item?.startdate).toLocaleDateString()}
              </StyledTypography>
              <StyledTypography variant="h4">
                End
                Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{new Date(item?.enddate).toLocaleDateString()}
              </StyledTypography>
              <StyledTypography variant="h4">
                No of
                Days&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item?.days}
              </StyledTypography>
              <StyledTypography variant="h4">
                Budget&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item?.budget}
              </StyledTypography>
              <StyledTypography variant="h4">
                Business Justification&nbsp;&nbsp;&nbsp;&nbsp; :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item?.business}
              </StyledTypography>
              <StyledTypography variant="h4">
                Claim
                Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item?.claimtype}
              </StyledTypography>
              <StyledTypography variant="h4">
                Transport&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item?.transport}
              </StyledTypography>
              <StyledTypography variant="h4">
                Attachments&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                <a href={item?.attachments?.url} target="_blank" rel="noopener noreferrer">
                  {item?.attachments?.url}
                </a>
              </StyledTypography>
              <>
                <Button
                  onClick={handleOpen}
                  text
                  raised
                  style={{ marginRight: 12 }}
                  icon="pi pi-check"
                  rounded
                  outlined
                  aria-label="Filter"
                />
                 <Dialog open={openDialog} onClose={handleClose}>
                  <DialogTitle>Acceptance Confirmation</DialogTitle>
                  <DialogContent>
                    <DialogContentText>Are you sure you want to accept this request?</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleAcceptConfirmation} color="primary">
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
                <Button text raised icon="pi pi-times" rounded outlined severity="danger" aria-label="Cancel" />
              </>
            </StyledCard>
          </Grid>
        </Grid>
      </StyledContainer>
    </div>
  );
};

export default Travelapproval;
