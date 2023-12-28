import React, { useState, useEffect, useContext } from 'react';
// import './Approval.css';
import ApiContext from 'context/api/ApiContext';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Approval.css';
import image1 from './BackgroundImages/bg-2.jpg';
import image2 from './BackgroundImages/bg-3.jpg';
// import image3 from './BackgroundImages/bg-3.jpg';


const ApprovalCard = () => {
  const { getProcruitment } = useContext(ApiContext);
  const authId = useSelector((state) => state.customization.authId);

  const { employeeContextData } = useContext(ApiContext);
  let procData=null
  useEffect(()=>{
    procData=USER_ID
  },[procData])

  const [firtsMemberCard, setFristMemberCard] = useState([]);
  const [secondMemberCard, setSecondMemberCard] = useState([]);
  const [secondLevelApproved, setSecondLevelApproved] = useState(false);
  const[whologin,setWhologin]=useState("")
  console.log("firstMemberData",firtsMemberCard)
  console.log("secondMemberCard",secondMemberCard)
  console.log("secondMemberCard",secondLevelApproved)
  const USER_ID = whologin._id;
  console.log("MEMID",USER_ID)
  console.log("WhoLogedIN",whologin._id)

  const determineBackgroundImage = (index) => {
    const images = [image1, image2];
    return images[index % images.length];
  };

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

    const isSecondApproved = getProcruitment
      .flatMap(data => data.SecondRequest.map(employeeData => employeeData.approved))
      .some(approved => approved);

    setSecondLevelApproved(isSecondApproved);
  }, [getProcruitment]);

  return (
    <div className="movie-cards-container">
      <>
      {getProcruitment.map((item, index) => {
        const firstMemberData = item.reportingTo.map(employeeData => employeeData.employee);
        const secondMemberData = item.SecondRequest.map(employeeData => employeeData.employee);
        const isUserAuthorized = USER_ID === firstMemberData[0] || USER_ID === secondMemberData[0];
        
        const isFirstApproved = item.reportingTo.some(employeeData => employeeData.approved);
        const isRejected = item.reportingTo.some(employeeData => employeeData.rejected);
        const isSecondApproved = item.SecondRequest.some(employeeData => employeeData.approved);
        
        
        const isCardApproved = isFirstApproved && isSecondApproved;
        

        // Check if the conditions for the link to work are met
        const isLinkAccessible = isUserAuthorized && (!isRejected && !isCardApproved || USER_ID === secondMemberData[0]);
        return ( 
          <div key={index}>
            {isUserAuthorized && ( 
              <Link to={isLinkAccessible ? `/ApprovalDetails/${index}` : '#'}>
                <article
                    className={`movie-card`}
                    style={{ backgroundImage: `url(${determineBackgroundImage(index)})` }}
                    key={index}
                  >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '20px', marginTop: '7px',textDecoration: 'none' }}>
                  <div style={{ marginLeft: '20px', color: isRejected ? '#FF0000' : (isFirstApproved || isCardApproved) ? '#00FF00' : '' ,textDecoration:'none'}}>
                  <h2>{isRejected ? 'Rejected' : (isFirstApproved && !isSecondApproved) ? '1st Level Approved' : isCardApproved ? 'Card Approved' : ''}</h2>
                    </div><div><h2> ₹{item.approximateBudget}</h2></div>
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
      )}
    </div>
  )
          // return null;
        })}
      </>
    </div>
  );
};

export default ApprovalCard;