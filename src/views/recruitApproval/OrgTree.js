import React from 'react';
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';

const initechOrg = {
  name: "Bill Lumbergh",
  actor: "Gary Cole",
  children: [
    {
      name: "Peter Gibbons",
      actor: "Ron Livingston",
      children: [
        {
          name: "And More!!",
          actor: "This is just to show how to build a complex tree with multiple levels of children. Enjoy!"
        }
      ]
    },
    {
      name: "Milton Waddams",
      actor: "Stephen Root"
    },
    {
      name: "Bob Slydell",
      actor: "John C. McGi..."
    },
  ]
};

const MyNodeComponent = ({ node }) => {
  const handleInteraction = () => {
    alert("Hi my real name is: " + node.actor);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleInteraction();
    }
  };

  return (
    <div
      className="initechNode"
      onClick={handleInteraction}
      onKeyDown={handleKeyDown}
      role="button" // Provide a role to indicate interactivity
      tabIndex="0"   // Make the element focusable
    >
      {node.name}
    </div>
  );
};

const MyOrgChart = () => {
  return (
    <OrgChart tree={initechOrg} NodeComponent={MyNodeComponent} />
  );
};

export default MyOrgChart;
