import React from 'react';

const Overview = ({ name, description }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p className="m-0">{description}</p>
    </div>
  );
};

export default Overview;
