// assets
import { IconKey } from '@tabler/icons';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';

// constant
const icons = {
  IconKey,
  BadgeOutlinedIcon,
  AssignmentOutlinedIcon,
  PermIdentityOutlinedIcon,
  AccountTreeOutlinedIcon,
  EventNoteIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
 

  type: 'group',
  children: [
   
    {
      id: 'recruitment',
      title: 'Recruitment',
      type: 'collapse',
      url: '/recruitment',
      icon: icons.AccountTreeOutlinedIcon,
      children: [
        {
          id: 'recruitmentform',
          title: 'Recruitment Form',
          type: 'item',
          url: '/recruitmentform'
        },
        {
          id: 'recruitmenttable',
          title: 'Recruitment Table',
          type: 'item',
          url: '/recruitmenttable'
        },
        {
          id: 'applicationtracker',
          title: 'Application Tracker',
          type: 'item',
          url: '/applicationtracker'
        }
      ]
    },

    {
      id: 'employees',
      title: 'Employees',
      type: 'collapse',
      icon: icons.BadgeOutlinedIcon,

      children: [
      
        {
          id: 'employeelist',
          title: 'Employee Information Management',
          type: 'item',
          url: '/addemployeetable'
        },
        {
          id: 'employeeperformance',
          title: 'Employee Performance',
          type: 'item',
          url: '/employeeperformance'
        }
      ]
    },
    {
      id: 'leavemanagement',
      title: 'Leave Management',
      type: 'collapse',
      icon: icons.PermIdentityOutlinedIcon,

      children: [
        {
          id: 'leavetrackerform',
          title: 'Leave Request Form',
          type: 'item',
          url: '/leavetrackerform'
        },
        {
          id: 'leavetrackerlist',
          title: 'Applied Leave List',
          type: 'item',
          url: '/leavetrackerlist'
        },
        {
          id: 'approveleave',
          title: 'ApproveLeave',
          type: 'item',
          url: '/approveleave'
        },
       
      ]
    },
    {
      id: 'Attendance Management',
      title: 'Attendance Management',
      type: 'collapse',
      icon: icons.EventNoteIcon,

      children: [
        {
          id: 'Attendance Regulation',
          title: 'Attendance Regulation',
          type: 'item',
          url: '/attendanceManagement'
        },
      ]
    },
    {
      id: 'performance',
      title: 'Performance',
      type: 'item',
      icon: icons.IconKey,
      url: '/performance'
    }
  ]
};

export default pages;
