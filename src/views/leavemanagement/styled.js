import styled from 'styled-components';
import { Card } from 'primereact/card';
import { Typography } from '@mui/material';
export const StyledContainer=styled(Card)`
display: flex;
flex-wrap: wrap;
width: 100%;

`
export const StyledCard=styled(Card)`
background-color: antiquewhite;
margin:10px 10px 10px 0;
display: flex;
flex-direction: column;
justify-content: center;
align-items:center ;
`
export const StyledTypography=styled(Typography)`
padding-bottom: 20px;

`
export const parentStyle={
    // margin:" 10px 10px 0 0",
    padding: '10px'
}