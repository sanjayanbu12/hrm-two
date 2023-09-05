import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import MainCard from 'ui-component/cards/MainCard'

const InterviewBoard = ({Shortlist}) => {
  const [candidate,setcandidate]=useState([]);
  useEffect(()=>{
    setcandidate({Shortlist})
  },[])
  console.log(candidate)
  return (
  <MainCard title='Interview Board'></MainCard>
  )
}

export default InterviewBoard