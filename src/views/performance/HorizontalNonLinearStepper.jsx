import React from 'react'
// import Marker1 from '../../assets/images/icons/progress_1.svg';
// import Marker2 from '../../assets/images/icons/progress_2.svg';

const HorizontalNonLinearStepper = () => {
  return (
    <>

    <div display="flex" height='65px'><svg width='100%' height='50px' display="flex">
      
    <g className='bars'>

    <rect fill='#eef2f6' width='100%' height='25'></rect>;

    <rect fill='#3d5599' width='30%' height='25'> </rect>;
    <rect x="80%" fill='#000000' width='1%' height='25'> </rect>;
    </g>


    






    </svg>
    </div>
    </>
  )
}

export default HorizontalNonLinearStepper