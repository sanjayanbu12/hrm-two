import MaterialTable from "material-table";
import tableIcons from "./MaterialTableIcons";
import axios from 'axios'
import { useState,useEffect } from "react";
const columns = [
  { title: "EmployeeId", field: "employeeid" },
  { title: "Name", field: "name" },
  { title: "Designation", field: "desi" },
  { title: "Gender", field: "gender" },
  { title: "Email", field: "email" },
  { title: "Type", field: "type" },
];

export const BasicTable = () => {
  const [edata, setedata] = useState([]);
  const fetchEmployees = async () => {
    const res = await axios.get(`https://hrm-backend-square.onrender.com/api/allemployee`);
    setedata(res.data.reverse());
    console.log(edata[1])
  };
  useEffect(() => {
    fetchEmployees();
  }, []);
  return <MaterialTable 
  title="Basic Table" 
  columns={columns} 
  data={edata} 
  icons={tableIcons} 
  actions={[
    {
      icon: 'save',
      tooltip: 'Save User',
      isFreeAction: true,
      onClick: (event, rowData) => alert("You saved " + rowData.name)
    },
    rowData => ({
      icon: 'delete',
      tooltip: 'Delete User',
      isFreeAction: true,
      onClick: (event, rowData) => confirm("You want to delete " + rowData.name),
      disabled: rowData.birthYear < 2000
    })
  ]}

  options={{
    actionsColumnIndex:   6,    
      exportButton: true

  }}
  />;
};