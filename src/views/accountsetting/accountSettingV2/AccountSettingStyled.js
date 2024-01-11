import styled from '@emotion/styled';
import { Tabs, Typography } from '@mui/material';

export const TopBarText = styled(Typography)`
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 10px;
`;

export const TopBarSubText = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 20px;
`;

export const StyledSmallText = styled(Typography)`
  font-size: 12px;
  color: gray;
`;

export const InputText = styled.input`
  display: flex;
  margin-top: 10px;
  flex: 1;
  width: 100%;
  height: 40px;
  border-radius: 15px;
  border: 0.1px ridge lightgrey;
  font-size: 1rem;
  font-weight: 400;
  padding-left: 15px;
  &:focus {
    outline: none;
  }
`;

export const PasswordToggle = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  vertical-align: middle;
`;

export const SaveButton = styled.button`
  margin-top: 20px;
  width: 350px;
  height: 40px;
  border-radius: 7px;
  border: 0.1px ridge lightgrey;
  font-size: 1rem;
  font-weight: 500;
  background-color: black;
  color: white;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #ffd84f;
    border: 0.1px ridge #ffd84f;
    color: black;
  }
`;

export const Indicator = styled(Tabs)`
  .css-lfwcke-MuiTabs-flexContainer {
    align-items: center !important;
  }
  .MuiTabs-indicator {
    height: 35px !important;
    left: 0;
    top: auto 6px !important;
  }

  .MuiTab-root {
    padding: 0px 16px;
    align-items: flex-start;
  }

  .css-np8rp3-MuiButtonBase-root-MuiTab-root {
    min-height: 40px;
  }
`;

export const CustomImageContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
`;

export const CustomImageStyle = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

export const SelectIcon = styled.div`
  position: absolute;
  top: 85%;
  left: 85%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: #000;
  z-index: 999;
  cursor: pointer;
  &:hover {
    color: #ffd84f;
  }
`;
