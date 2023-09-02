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
import InsightsIcon from '@mui/icons-material/Insights';
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
  CameraFrontIcon
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
          title: 'Job Description Form',
          type: 'item',
          url: '/jobform'
        },
        {
          id: 'jobtable',
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
          id: 'shortlist',
          title: 'Shortlist Candidates',
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

    {
      id: 'employees',
      title: 'Employees',
      type: 'collapse',
      icon: icons.BadgeOutlinedIcon,

      children: [
        {
          id: 'employeeform',
          title: 'Employee Information',
          type: 'item',
          url: '/newemployee'
        },
        {
          id: 'basictable',
          title: 'Employee Information Management',
          type: 'item',
          url: '/basictable'
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
        }
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
          title: 'Learning Uploads',
          type: 'item',
          url: '/LearningUploads'
        },
        {
          id: 'Learning Module',
          title: 'Learning Module',
          type: 'item',
          url: '/LearningModule'
        },
        {
          id: 'CourseOverview',
          title: 'Course Overview',
          type: 'item',
          url: '/CourseOverview'
        },
      ]
    },

    {
      id: 'Organisation Chart',
      title: 'Organisation Chart',
      type: 'item',
      icon: InsightsIcon,
      url: '/payroll'
    },

    {
      id: 'employeeselfservices',
      title: 'Employee Self Services',
      icon: CameraFrontIcon,
      type: 'item',
      url: '/employeeselfservices'
    },

    {
      id: 'employeeengagement',
      title: 'Employee Engagement & Surveys',
      icon: EmojiEmotionsIcon,
      type: 'item',
      url: '/employeeengagement'
    },

    {
      id: 'performance',
      title: 'Performance Management',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
      
        {
          id: 'feedbacks',
          title: 'Feedbacks',
          type: 'item',
          url: '/feedbacks'
        },
        {
          id: 'skillsetmatrix',
          title: 'Skill Set Matrix',
          type: 'item',
          url: '/skillsetmatrix'
        }
      ]
    },
  ]
};

export default pages;
