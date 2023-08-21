import React from 'react'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { fetchEmployees } from 'store/fetchEmployees'
const HrApproval = () => {
    const employees=useSelector(state=>state.customization.employees)
    console.log(employees)
    const dispatch = useDispatch()
    useEffect(()=>{
     dispatch(fetchEmployees())
    },[dispatch])
  return (
    <div>

    </div>
  )
}

export default HrApproval