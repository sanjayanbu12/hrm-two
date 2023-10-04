import { Box, Paper } from '@mui/material';
import { styled } from '@mui/system';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: 'black',
  boxShadow: theme.shadows[2]
}));

export const StyledBox = styled(Box)`
  && {
    height: 650px;
    width: 100%;
    background: white;
  }
`;
export const FlexContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

export const PaddedDiv = styled(Box)`
  padding-left: 40px;
  padding-top: 40px;
`;
export const Coloredcontainer = styled(Box)`
  background-color: #f0de36;
  height: 30px;
  width: 350px;
`;

export const Container = styled(Box)`
  display: flex;
  justify-content: flex-end;
`;

