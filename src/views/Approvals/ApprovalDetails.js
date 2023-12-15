import React ,{useState} from 'react';
import { StyledContainer, StyledCard, parentStyle, StyledTypography } from '../leavemanagement/styled';
import Grid from '@mui/material/Grid';
import { Button } from 'primereact/button';
import { useParams } from 'react-router-dom';
import ApiContext from 'context/api/ApiContext';
import { useContext } from 'react';
import SecondApproval from './SecondApproval';

const ApprovalDetails = () => {
  const { getProcruitment } = useContext(ApiContext);
  const { index } = useParams();
  const[modalOpen,setModalOpen]=useState(false)

  const handleOpen=()=>{
    setModalOpen(true)
  }
  const handleClose=()=>{
    setModalOpen(false)
  }

  const item = getProcruitment[index];
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
                <Button text raised icon="pi pi-times" rounded outlined severity="danger" aria-label="Cancel" />
              </>

            </StyledCard>
          </Grid>

        </Grid>
      </StyledContainer>
      <SecondApproval handleOpen={handleOpen} handleClose={handleClose} modalOpen={modalOpen} />

    </div>
  )
}

export default ApprovalDetails