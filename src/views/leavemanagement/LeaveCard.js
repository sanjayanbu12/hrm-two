import React from 'react'
import styled from 'styled-components'

const Cards = styled.div`
display: flex;
gap: 70px;
justify-content: center;
`

const Card1 = styled.div`
height: 150px;
background-color: #000;
width: 300px;
border-radius: 5px;
color: #fff;
`;

const Card2 = styled.div`
height: 150px;
background-color: #000;
width: 300px;
border-radius: 5px;
color: #fff;

`
const Card3 = styled.div`
height: 150px;
background-color: #000;
width: 300px;
border-radius: 5px;
color: #fff;

`

const LeaveCard = () => {
  return (
 <Cards>
 <Card1>
Annual Leave
 </Card1>
 <Card2>
Leave Taken
 </Card2>
<Card3>
Remaining Leave
</Card3>
 </Cards>
  )
}

export default LeaveCard
