import React from 'react';
import './css/BlackyCard.css';
import ApiContext from 'context/api/ApiContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Card = () => {
  const { travelData } = useContext(ApiContext);

  console.log('Approvalsss', travelData);

  return (
    // <div style={{display:'flex'}}>
    <div className="movie-cards-container">
      <>
        {travelData.map((item, index) => (
          <Link to={`/Travelapproval/${index}`} key={index}>
            <article className="movie-card" key={index}>
              {/* <img src="" alt="Avatar wallpaper" /> */}

              <div style={{ display: 'flex', justifyContent: 'end', marginRight: '20px', marginTop: '7px' }}>
                <h2>₹{item.budget}</h2>
              </div>
              <div className="content">
                <h1>
                  {item.from} - {item.to}
                </h1>

                <div>
                  <h2>{item.customerName}</h2>
                  <span>
                    &nbsp;{new Date(item.startdate).toLocaleDateString()}&nbsp;&nbsp;·&nbsp;&nbsp;
                    {new Date(item.enddate).toLocaleDateString()}
                  </span>
                  {/* <p>No of Days :{item.days}</p> */}
                </div>
                <div style={{ marginTop: '20px' }} className="synopsis">
                  <b>Business Justification : {item.business} </b>
                  <b style={{ display: 'block', marginTop: '10px' }}>Claimtype: {item.claimtype}</b>
                  <b style={{ display: 'block', marginTop: '10px' }}>Transport: {item.transport}</b>
                </div>

                <div className="icons">{/* <b>Budget : </b> */}</div>
              </div>
            </article>
          </Link>
        ))}
        {/* //   </div> */}
      </>
    </div>
  );
};

export default Card;
