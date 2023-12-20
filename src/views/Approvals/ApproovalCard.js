import React, { useState,useEffect } from 'react';
import './Approval.css';
import ApiContext from 'context/api/ApiContext';
import { useContext} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ApproovalCard = () => {
      const { getProcruitment } = useContext(ApiContext);
      const { employeeContextData } = useContext(ApiContext);
      const authId = useSelector((state) => state.customization.authId);
      console.log(authId)

      const[firtsMemberCard,setFristMemberCard]=useState('');
      const[secondMemberCard,setSecondMemberCard]=useState("");
      const[loginId,setLoginId]=useState('');
     
      useEffect(() => {
        setLoginId(getProcruitment.map((data) => data._id))
        setSecondMemberCard(getProcruitment.map((data) => data.reportingTo.map((data) => data.employee)))
        setFristMemberCard(getProcruitment.map((data) => data.SecondRequest.map((data) => data.employee)))
      }, [getProcruitment]);
    
      console.log("firtsMemberCard",firtsMemberCard);
      console.log("secondMemberCard",secondMemberCard);
      console.log("loginId",loginId);
    
console.log("Approvalsss",getProcruitment);
console.log("employeeeeeez",employeeContextData);
const isMemberCard = loginId === firtsMemberCard || loginId === secondMemberCard;
  return (
    // <div style={{display:'flex'}}>
    <div className="movie-cards-container">
    <>
    {getProcruitment.map((item, index) => (
      
        isMemberCard ? (
         <Link to={`/ApprovalDetails/${index}`} key={index}>
      <article  className="movie-card" key={index}>
        {/* <img src="" alt="Avatar wallpaper" /> */}
      
        <div style={{ display: 'flex', justifyContent: 'end', marginRight: '20px', marginTop: '7px' }}>
          <h2>₹{item.approximateBudget}</h2>    
        </div>
        <div className="content">
          <h1>{item.productname}</h1>

          <div>
            <h2>{item.customerName}</h2>
            <span>&nbsp;{new Date(item.createdAt).toLocaleDateString()}&nbsp;&nbsp;·&nbsp;&nbsp;{new Date(item.createdAt).toLocaleTimeString()}</span>
          </div>
          <div style={{marginTop:'20px'}} className="synopsis">
            <b>Specification : {item.productname} </b>
            <b style={{ display: 'block', marginTop: '10px' }}>Prority: {item.priority}</b>
          </div>

          <div className="icons">
            {/* <b>Budget : </b> */}
          </div>
        </div>
       
      </article>
      </Link>
       ): null
     
    ))}
{/* //   </div> */}

</>
</div>
  )
}

export default ApproovalCard