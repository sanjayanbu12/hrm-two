import CameraFrontIcon from '@mui/icons-material/CameraFront';

const pages = {
  type: 'group', 
  children: [
    { 
      id: 'employee',
      title: 'Employees Self Services',
      icon: CameraFrontIcon,
      type: 'collapse',

      children: [
        {
          id: 'employeeselfservices',
          title: 'Employee Module',
          type: 'item',
          url: '/employeedomain'
        },
      ]
    }
  ],
};



export default pages;
