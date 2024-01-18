import React,{useEffect, useState} from 'react';
import './css/Blacky.css'
import { useSelector } from 'react-redux';
import ApiContext from 'context/api/ApiContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import  img2 from './images/img2.jpg'


const Card = () => {
  const [whologin, setWhologin] = useState('');
  const USER_ID = whologin._id;
  console.log('useriddd', USER_ID);

  const { travelData } = useContext(ApiContext);
  const authId = useSelector((state) => state.customization.authId);
  const { employeeContextData } = useContext(ApiContext);

  let procData = null;
  useEffect(() => {
    procData = USER_ID;
  }, [procData]);

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

  console.log('Approvalsss', travelData);

  const BackgroundImage = (index) => {
    const images = [img2];
    return images[index % images.length];
  };

  return (
    <div className="movie-cards-container">
        {travelData.map((item, index) => {
          const reportingid = item.reportingTo.map((data) => data.employee);
          console.log('reportingto', reportingid[0]);
          const isCardFor = USER_ID === reportingid[0];

          return (
            <>
              {isCardFor && (
                <Link to={`/Travelapproval/${index}`} key={index}>
                 <article
                    className={`movie-card`}
                    style={{ backgroundImage: `url(${BackgroundImage(index)})` }}
                    key={index}
                  >
                    <div style={{ display: 'flex', justifyContent: 'end', marginRight: '20px', marginTop: '7px' }}>
                      <h2>₹{item.budget}</h2>
                    </div>
                    <div className="content">
                      <h1>
                        {item.from} - {item.to}
                        {item.reportingTo.some((report) => report.approved) && (
                          <span style={{ color: 'green', marginLeft: '10px' }}>Approved</span>
                        )}
                      </h1>
                      <div style={{ marginTop: '10px' }}>
                        <h2>{item.customerName}</h2>
                        <span>
                          &nbsp;{new Date(item.startdate).toLocaleDateString()}&nbsp;&nbsp;·&nbsp;&nbsp;
                          {new Date(item.enddate).toLocaleDateString()}
                        </span>
                      </div>
                      <div style={{ marginTop: '20px' }} className="synopsis">
                        <b>Business Justification : {item.business} </b>
                        <b style={{ display: 'block', marginTop: '10px' }}>Claimtype: {item.claimtype}</b>
                        <b style={{ display: 'block', marginTop: '10px' }}>Transport: {item.transport}</b>
                      </div>
                      <div className="icons"></div>
                    </div>
                  </article>
                </Link>
              )}
            </>
          );
        })}
    </div>
  );
};

export default Card;
