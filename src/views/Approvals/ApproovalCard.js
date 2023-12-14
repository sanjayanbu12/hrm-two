import React from 'react';
import './Approval.css';
import ApiContext from 'context/api/ApiContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const ApproovalCard = () => {
      const { getProcruitment } = useContext(ApiContext);
    
console.log("Approvalsss",getProcruitment);

 
  return (
    // <div style={{display:'flex'}}>
    <div className="movie-cards-container">
    <>
    {getProcruitment.map((item, index) => (
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
     
    ))}
{/* //   </div> */}

</>
</div>
  )
}

export default ApproovalCard