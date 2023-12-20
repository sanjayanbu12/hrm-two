import React, { useState } from 'react';
import { StyledContainer, StyledCard, parentStyle, StyledTypography } from '../leavemanagement/styled';
import Grid from '@mui/material/Grid';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'; // Import Dialog components
import { useParams } from 'react-router-dom';
import ApiContext from 'context/api/ApiContext';
import { useContext } from 'react';
import SecondApproval from './SecondApproval';
import { Button } from 'primereact/button';
import axios from 'axios';

const ApprovalDetails = () => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const { getProcruitment } = useContext(ApiContext);
  const { index } = useParams();
  const[modalOpen,setModalOpen]=useState(false);
  // http://localhost:3001/proc/update-rejected/:id

  const handleOpen=()=>{
    setModalOpen(true)
  }
  const handleClose=()=>{
    setModalOpen(false)
  }

  const item = getProcruitment[index];
  const handleOpenConfirmModal = () => {
    setConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setConfirmModalOpen(false);
  };

  const handleRejectConfirmation = async() => {
    
try {
  const updatedReportingTo = item.reportingTo.map(report => ({
    ...report,
    rejected: true,
  }));

  // Update the local state with the modified reportingTo array
  const updatedItem = {
    ...item,
    reportingTo: updatedReportingTo,
  };

    await axios.put(`http://localhost:3001/proc/update-rejected/${item._id}`,updatedItem)
  handleCloseConfirmModal();
} catch (error) {
   console.error('Error updating data', error);
  
}
  
  
  };


  console.log("index_id",item._id)
  return (
    <div>
      <StyledContainer title="Procurement Request">
        <Grid container spacing={2} rowSpacing={3} style={parentStyle}>
          <Grid xs={12}>
            <StyledCard>
              <StyledTypography variant="h4">
                Product Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {item?.productname}
              </StyledTypography>
              <StyledTypography variant="h4">
                Specification&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item?.Specification}
              </StyledTypography>
              <StyledTypography variant="h4">
                Business Justification&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item?.businessJustification}
              </StyledTypography>
              <StyledTypography variant="h4">
                Quantity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item?.quantity}
              </StyledTypography>
              <StyledTypography variant="h4">
                Approximate Budget&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item?.approximateBudget}
              </StyledTypography>
              <StyledTypography variant="h4">
                Priority &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item?.priority}
              </StyledTypography>

              <StyledTypography variant="h4">
                product Link&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item?.productLink}
              </StyledTypography>
              <StyledTypography variant="h4">
                Vendor Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item?.vendorName}
              </StyledTypography>
              <StyledTypography variant="h4">
                Vendor Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item?.vendorNumber}
              </StyledTypography>
              <StyledTypography variant="h4">
                Photos &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href={item?.attachments?.url} target="_blank" rel="noopener noreferrer">
                  {item?.attachments?.url}
                </a>
              </StyledTypography>
              <StyledTypography variant="h4">
                createdAt &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item?.createdAt}
              </StyledTypography>
              <>
                <Button
                  text
                  raised
                  style={{ marginRight: 12 }}
                  icon="pi pi-check"
                  rounded
                  outlined
                  aria-label="Filter"
                  onClick={handleOpen}
                />
                <Button
          text
          raised
          icon="pi pi-times"
          rounded
          outlined
          severity="danger"
          aria-label="Cancel"
          onClick={handleOpenConfirmModal}
        />
              </>
              <Dialog open={confirmModalOpen} onClose={handleCloseConfirmModal}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reject this request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRejectConfirmation} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

            </StyledCard>
          </Grid>

        </Grid>
      </StyledContainer>
      <SecondApproval handleOpen={handleOpen} handleClose={handleClose} modalOpen={modalOpen} itemId={item?._id} />

    </div>
  )
}

export default ApprovalDetails