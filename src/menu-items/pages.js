// assets
import { IconKey } from '@tabler/icons';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
// import { useSelector,useDispatch } from 'react-redux';
// const isAdmin = (state=>state.customi)
// constant
const icons = {
  IconKey,
  BadgeOutlinedIcon,
  AssignmentOutlinedIcon,
  PermIdentityOutlinedIcon,
  AccountTreeOutlinedIcon,
  EventNoteIcon,
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
          title: 'Job Description Form',
          type: 'item',
          url: '/jobform'
        },
        {
          id: 'recruitmenttable',
          title: 'Job Description Table',
          type: 'item',
          url: '/jobtable'
        },
        {
          id: 'applicationtracker',
          title: 'Application Tracker',
          type: 'item',
          url: '/applicationtracker'
        },
        {
          id: 'interviewdetails',
          title: 'Interview Details',
          type: 'item',
          url: '/interviewdetails'
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
      title: 'Time and Attendance',
      type: 'collapse',
      icon: icons.PermIdentityOutlinedIcon,

      children: [
        {
          id: 'Attendance Regulation',
          title: 'Attendance Regulation',
          type: 'item',
          url: '/attendanceManagement'
        },
       
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
        // {
        //   id: '/leavecalendar',
        //   title: 'leavecalendar',
        //   type: 'item',
        //   url: '/leavecalendar'
        // },
      ]
    },
    
    {
      id: 'employeeselfservices',
      title: 'Employee Self Services',
      icon: icons.BadgeOutlinedIcon,
      type: 'item',
      url: '/employeeselfservices'
    },

    {
      id: 'employeeengagement',
      title: 'Employee Engagement & Surveys',
      icon: icons.BadgeOutlinedIcon,
      type: 'item',
      url: '/employeeengagement'
    },

    {
      id: 'performance',
      title: 'Performance Management',
      type: 'item',
      icon: icons.IconKey,
      url: '/performance'
    },

    {
      id: 'learninganddevelopment',
      title: 'Learning & Development',
      type: 'item',
      icon: icons.IconKey,
      url: '/learninganddevelopment'
    },
    
    {
      id: 'payroll',
      title: 'Payroll',
      type: 'item',
      icon: icons.IconKey,
      url: '/payroll'
    }

  ]
};

export default pages;
