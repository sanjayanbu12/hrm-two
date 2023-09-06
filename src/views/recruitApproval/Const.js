import { Card } from '@mui/material';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
export const StyledNode = styled.div`
padding: 5px;
border-radius: 8px;
display: inline-block;
width: 278px;
height: 81px;
background-color: #EFE1FB;
padding-left: 13px;
padding-right: 21px;
padding-top:18px;
`;
export const StyledNodeManager = styled.div`
padding: 5px;
border-radius: 8px;
display: inline-block;
width: 278px;
height: 81px;
background-color: #EFE1FB;
padding-left: 13px;
padding-right: 21px;
`;
export const StyledContainer = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
align-items: center;
`;
export const StyledCard = styled(Card)`
  && {
    height: 81px;
    background-color: #E1EAFB;
    display: flex;
    align-items: center;
    padding-left: 13px;
    padding-right: 21px;
    width: 100%;
    cursor: pointer;
  }
`;
export const StyledModal = styled(Modal)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
  }
`;