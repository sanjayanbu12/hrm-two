import React, { useState, useEffect } from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';

const Layout = () => {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    // Fetch data from MongoDB (replace with your actual API endpoint)
    fetch('http://localhost:3001/videos/getall')
      .then((response) => response.json())
      .then((data) => {
        setCourseData(data); // Assuming data structure matches the MongoDB response
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to generate the menu items based on fetched data
  const generateMenuItems = () => {
    return courseData.map((course) => {
      return {
        label: course.moduleName,
        icon: 'pi pi-fw pi-folder-open',
        items: course.videoUrls.map((videoUrl, index) => ({
          label: `Video ${index + 1}`,
          icon: 'pi pi-fw pi-youtube',
          url: videoUrl,
        })),
      };
    });
  };

  return (
    <div className="card flex justify-content-center" style={{ width: '100%' }}>
      <PanelMenu model={generateMenuItems()} className="w-full md:w-25rem" />
    </div>
  );
};

export default Layout;
