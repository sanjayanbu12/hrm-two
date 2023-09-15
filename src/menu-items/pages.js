// assets
import { IconKey } from '@tabler/icons';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AllOutIcon from '@mui/icons-material/AllOut';
import PaidIcon from '@mui/icons-material/Paid';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CameraFrontIcon from '@mui/icons-material/CameraFront';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
// import InsightsIcon from '@mui/icons-material/Insights';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DvrIcon from '@mui/icons-material/Dvr';
// import { useSelector,useDispatch } from 'react-redux';
// const isAdmin = (state=>state.customi)
// constant
const icons = {
  IconKey,
  BadgeOutlinedIcon,
  AssignmentOutlinedIcon,
  PermIdentityOutlinedIcon,
  AccountTreeOutlinedIcon,
  AutoStoriesIcon,
  EventNoteIcon,
  AllOutIcon,
  PaidIcon,
  EmojiEmotionsIcon,
  CameraFrontIcon,
  PersonSearchIcon,
  DvrIcon
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
          id: 'jobform',
          title: 'Job Posting',
          type: 'item',
          url: '/jobform'
        },
        {
          id: 'jobtable',
          title: 'Position Details',
          type: 'item',
          url: '/jobtable'
        },
        {
          id: 'applicationtracker',
          title: 'Interview Process ',
          type: 'collapse',
          url: '/applicationtracker',
          icon: icons.PersonSearchIcon,
          children:[
            {
              id: 'applicationtracker',
              title: 'Application Tracker',
              type: 'item',
              url: '/applicationtracker',
            },   
            {
              id: 'shortlist',
              title: ' Candidates Shortlisting',
              type: 'item',
              url: '/shortlist'
            },
            {
              id: 'interviewboard',
              title: 'Interview Board',
              type: 'item',
              url: '/interviewboard'
            },    
          ]
        },       
      ]
    },
    {
      id: 'employees',
      title: 'Employees',
      type: 'collapse',
      icon: icons.BadgeOutlinedIcon,

      children: [
        // {
        //   id: 'employeeform',
        //   title: 'Employee Information',
        //   type: 'item',
        //   url: '/newemployee'
        // },
        {
          id: 'basictable',
          title: 'Employee Information Management',
          type: 'item',
          url: '/basictable'
        },
        {
          id: 'applicationtracker',
          title: 'Leave & Attendance',
          type: 'collapse',
          icon: icons.AccountTreeOutlinedIcon,
          children:[
        {
          id: 'leavetrackerform',
          title: ' Request Leave',
          type: 'item',
          url: '/leavetrackerform'
        },
        // {
        //   id: 'Attendance Regulation',
        //   title: 'Attendance Regulation',
        //   type: 'item',
        //   url: '/attendanceManagement'
        // },
        {
          id: 'leavetrackerlist',
          title: 'View leave',
          type: 'item',
          url: '/leavetrackerlist'
        },
        {
          id: 'approveleave',
          title: 'Track Leave',
          type: 'item',
          url: '/approveleave'
        },
      ],
    },
    {
      id: 'Organisation Chart',
      title: 'Organisation Chart',
      type: 'item',
      url: '/payroll'
    },
    // {
    //   id: 'employeeengagement',
    //   title: 'Employee Engagement & Surveys',
    //   type: 'item',
    //   url: '/employeeengagement'
    // },
    // {
    //   id: 'employeeselfservices',
    //   title: 'Employee Self Services',
    //   type: 'item',
    //   url: '/employeeselfservices'
    // },
      ]
    },
    {
      id: 'Learning & Development',
      title: 'Learning & Development',
      type: 'collapse',
      icon: icons.AutoStoriesIcon,

      children: [
        {
          id: 'Learning Uploads',
          title: 'Course Upload',
          type: 'item',
          url: '/LearningUploads'
        },
        {
          id: 'Learning Module',
          title: 'Course Review',
          type: 'item',
          url: '/LearningModule'
        },
        {
          id: 'CourseOverview',
          title: 'Course Catalog',
          type: 'item',
          url: '/CourseOverview'
        },
      ]
    },
    {
      id: 'performance',
      title: 'Performance Management',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'skillsetmatrix',
          title: 'Skill Matrix',
          type: 'item',
          url: '/skillsetmatrix'
        },
        {
          id: 'feedbacks',
          title: 'Review Feedbacks',
          type: 'item',
          url: '/feedbacks'
        },       
      ]
    },
  ]
};

export default pages;
