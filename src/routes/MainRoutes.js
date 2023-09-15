import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import EmployeeForm from 'views/addemployeeform/EmployeeForm';
import Recruitment from 'views/recruitment/BasicRecruittable';
import RequestLeave from 'views/leavemanagement/RequestLeave';
import ViewLeave from 'views/leavemanagement/ViewLeave';
import ApproveLeave from 'views/leavemanagement/ApproveLeave';
import Employeeperformance from 'views/addemployeetable/Employeeperformance';
import Viewdetails from 'views/addemployeetable/Viewdetails';
import RecruitmentForm from 'views/recruitment/RecruitmentForm';
import RecruitmentTable from 'views/recruitment/RecruitmentTable';
import ApplicationTracker from 'views/recruitment/ApplicationTracker';
import AttendanceSystem from 'views/attendanceManagement/AttendanceSystem';
import Newevent from 'views/dashboard/Default/Newevent';
import LeaveCalendar from 'views/leavemanagement/LeaveCalendar';
import EmployeeSelfServices from 'views/employeeselfservices/EmployeeSelfServices';
import EmployeeEngagement from 'views/employeeengagement/EmployeeEngagement';
import Payroll from 'views/payroll/Payroll';
import Shortlist from 'views/recruitment/Shortlist';
import { BasicTable } from 'views/addemployeetable/Basictable';
import RecruitmentView from 'views/recruitment/RecruitmentView';
import ApplicationView from 'views/recruitment/ApplicationView';
import BasicApptable from 'views/recruitment/BasicApptable';
import LearningModule from 'views/learninganddevelopment/LearningModule';
import LearningUploads from 'views/learninganddevelopment/LearningUploads';
import CourseOverview from 'views/learninganddevelopment/CourseOverview';
import ViewApproval from 'views/recruitApproval/ViewApproval';
import HrApproval from 'views/recruitApproval/HrApproval';
import ManagerApproval from 'views/recruitApproval/ManagerApproval';
import Goals from 'views/performance/Goals/Goals';
import Feedback from 'views/performance/Feedback/Feedback';
import SkillsetMatrix from 'views/performance/SkillSet/SkillsetMatrix';
import InterviewBoard from 'views/recruitment/InterviewBoard';
import ApplicationView1 from 'views/recruitment/ApplicationView1';
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: '/recruitment',
      element: <Recruitment />
    },
   
    {
      path: '/Requestleave',
      element: <RequestLeave />
    },
    {
      path: '/applicationtracker',
      element: <ApplicationTracker />
    },
    {
      path: '/viewleave',
      element: <ViewLeave />
    },
    {
      path: '/approveleave',
      element: <ApproveLeave />
    },
    {
      path: '/leavecalendar',
      element: <LeaveCalendar/>
    },
    {
      path: '/attendanceManagement',
      element: <AttendanceSystem/>
    },
    {
      path: '/goals',
      element: <Goals />
    },
    {
      path: '/feedbacks',
      element: <Feedback />
    },
    {
      path: '/skillsetmatrix',
      element: <SkillsetMatrix />
    },   
    {
      path: '/Jobtable',
      element: <RecruitmentTable />
    },
    {
      path: '/Jobform/:id',
      element: <RecruitmentForm />
    },
    {
      path: '/Jobform',
      element: <RecruitmentForm />
    },
    {
      path: '/Basictable',
      element: <BasicTable />
    },
    {
      path: '/employeeperformance',
      element: <Employeeperformance />
    },
    {
      path: '/employeeselfservices',
      element: <EmployeeSelfServices />
    },
    {
      path: '/employeeengagement',
      element: <EmployeeEngagement />
    },
    {
      path: '/learningUploads',
      element: <LearningUploads/>
    },
    {
      path: '/learningModule',
      element: <LearningModule />
    },
    {
      path: '/CourseOverview',
      element: <CourseOverview />
    },  
    {
      path: '/payroll',
      element: <Payroll />
    },
    {
      path: '/shortlist',
      element: <Shortlist />
    },
    {
      path:'/interviewboard',
      element:<InterviewBoard/>
    },
    {
      path: '/newemployee',
      element: <EmployeeForm />
    },
    {
      path: '/newemployee/:id',
      element: <EmployeeForm />
    },
    {
      path: '/viewapp',
      element: <ViewApproval />
    },
    {
      path: '/viewdetails/:employeeid',
      element: <Viewdetails />
    },
    {
      path: '/applicationview1/:id',
      element: <ApplicationView1 />
    },  
    {
      path: '/applicationview/:id',
      element: <ApplicationView />
    },
    {
      path: '/recruitmentview/:id',
      element: <RecruitmentView />
    },
    {
      path: '/basicapptable',
      element: <BasicApptable />
    },
    {
      path: '/newevent',
      element: <Newevent />
    },
    {
      path: '/hrapproval/:id',
      element: <HrApproval />
    },
    {
      path: '/managerapproval/:id',
      element: <ManagerApproval />
    }  
  ]
};

export default MainRoutes;
