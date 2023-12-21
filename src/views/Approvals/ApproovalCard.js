import React, { useState, useEffect, useContext } from 'react';
// import './Approval.css';
import ApiContext from 'context/api/ApiContext';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Approval.css'

const ApprovalCard = () => {
  const { getProcruitment } = useContext(ApiContext);
  const authId = useSelector((state) => state.customization.authId);
  const USER_ID = whologin._id;
  const { employeeContextData } = useContext(ApiContext);
  let procData=null
  useEffect(()=>{
    procData=USER_ID
  },[procData])

  const [firtsMemberCard, setFristMemberCard] = useState([]);
  const [secondMemberCard, setSecondMemberCard] = useState([]);
  const[whologin,setWhologin]=useState("")
  console.log("firstMemberData",firtsMemberCard)
  console.log("secondMemberCard",secondMemberCard)
  console.log("MEMID",USER_ID)
  console.log("WhoLogedIN",whologin._id)

  const fetchEmployee = async () => {
    try {
      const res = await employeeContextData;
      const matchingEmployee = res.data.find((emp) => emp.employeeid === authId);
      if (matchingEmployee) {
        setWhologin(matchingEmployee);
      } else {
        console.log('Employee not found for authId:', authId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [employeeContextData]);

  useEffect(() => {
    const firstMemberData = getProcruitment.flatMap(data => data.reportingTo.map(employeeData => employeeData.employee));
    setFristMemberCard(firstMemberData[0]);

    const secondMemberData = getProcruitment.flatMap(data => data.SecondRequest.map(employeeData => employeeData.employee));
    setSecondMemberCard(secondMemberData[0]);
  }, [getProcruitment]);

  return (
    <div className="movie-cards-container">
      <>
        {getProcruitment.map((item, index) => {
          const isUserAuthorized = USER_ID === firtsMemberCard || USER_ID === secondMemberCard;
          const isApproved = getProcruitment
            .flatMap(data => data.reportingTo.map(employeeData => employeeData.approved))
            .some(approved => approved);

          if (isUserAuthorized) {
            return (
              <Link to={`/ApprovalDetails/${index}`} key={index}>
                <article className="movie-card" key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '20px', marginTop: '7px' }}>
                  <div style={{marginLeft:'20px',color:'#00FF00'}}>
                    <h2>{isApproved ? '1st Level Approved' : ''}</h2></div><div><h2> ₹{item.approximateBudget}</h2></div>
                  </div>
                  <div className="content">
                    <h1>{item.productname}</h1>
                    <div>
                      <h2>{item.customerName}</h2>
                      <span>
                        &nbsp;{new Date(item.createdAt).toLocaleDateString()}&nbsp;&nbsp;·&nbsp;&nbsp;{new Date(item.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <div style={{ marginTop: '20px' }} className="synopsis">
                      <b>Specification : {item.productname} </b>
                      <b style={{ display: 'block', marginTop: '10px' }}>Priority: {item.priority}</b>
                    </div>
                    <div className="icons">{/* Add your icons or additional content here */}</div>
                  </div>
                </article>
              </Link>
            );
          }

          return null;
        })}
      </>
    </div>
  );
};

export default ApprovalCard;