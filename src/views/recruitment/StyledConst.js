import { Button } from '@mui/material';
import styled from 'styled-components';
export const HrBtn = styled(Button)`
  && {
    background-color: hsl(105, 100%, 50%);
    color: #fff;
    transition: background-color 0.3s;
    width: 60%;
    &:hover {
      cursor: pointer;
      background-color: #d9d9d9;
      color: black;
      opacity: 0.5;
    }
    &:disabled {
      background-color: grey;
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;
export const Reject = styled(Button)`
  && {
    background-color: hsl(0, 100%, 50%);
    color: white;
    width: 60%;
    transition: background-color 0.3s;
    &:hover {
      cursor: pointer;
      background-color: #ff785a;
      color: #fff;
      opacity: 0.5;
    }
  }
`;
