import React from 'react';
import { StyledContainer, StyledCard, parentStyle, StyledTypography } from '../leavemanagement/styled';
import Grid from '@mui/material/Grid';
import { Button } from 'primereact/button';
import { useParams } from 'react-router-dom';
import ApiContext from 'context/api/ApiContext';
import { useContext } from 'react';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';

const Travelapproval = () => {
  const { travelData } = useContext(ApiContext);
  const { index } = useParams();

  const item = travelData[index];
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
              <>
                <Button text raised style={{ marginRight: 12 }} icon="pi pi-check" rounded outlined aria-label="Filter" />
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
