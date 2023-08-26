import React from 'react';
import Marker1 from '../../assets/images/icons/progress_1.svg';
import Marker2 from '../../assets/images/icons/progress_2.svg';
import { Typography,} from '@mui/material';



const HorizontalNonLinearStepper = ({size,size1,size2, name}) => {
  let mark2;
  if(size2>=0){
    mark2=size2-2.05;
  }
  else{
    mark2=1000;
  }
  let mark1=size1-1.7;

 size=size-1;
  return (
    <>
    <div style={{  display: "flex",}}>
      <div >
        <Typography variant="h4"
            body1="span"
            sx={{
              fontWeight: 500,
              fontSize: 'small',
              color: '#697586',
              width: "40px",
              marginTop: "2px",
              whiteSpace: "nowrap"
              

            }}>{name}</Typography>
            </div>

      <div  style={{ width:"99%", marginLeft:"140px", height: '20px'}}>
        <svg width="100%" height="20px" style={{}}>
          <g style={{}}>
            <rect y="40%" fill="#eef2f6" width="100%" height="5"  />
            <rect  y="40%"  fill="#3d5599" width = {`${size}%`} height="5"  />
            <image height={"20px"} x={`${mark2}%`}  href={Marker2}  />
            
            <image y="15%" x={`${mark1}%`} href={Marker1}> </image>
          </g>
        </svg>
      </div>

      </div>
      

    </>
  );
}

export default HorizontalNonLinearStepper;
