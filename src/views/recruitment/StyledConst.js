import {Button} from '@mui/material'
import styled from 'styled-components';
export const HrBtn=styled(Button)`
&&{
    background-color: #FC2F00;
    color: #fff;
    border-radius: 15px;
    margin-right: 20px;
    transition: background-color 0.3s;
    &:hover {
      cursor:pointer;   
      background-color: #FF785A;
      color: #fff;
    }
    &:disabled {
      background-color: grey;
      cursor: not-allowed;
      opacity: 0.5;
    }
}
`