import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Addemployeetable from 'views/addemployeetable/Addemployeetable';
import EmployeeForm from 'views/addemployeeform/EmployeeForm';
import Recruitment from 'views/recruitment/RecruitmentTable';
import LeaveTrackerForm from 'views/leavemanagement/LeaveTrackerForm';
import LeaveTrackerList from 'views/leavemanagement/LeaveTrackerList';
import ApproveLeave from 'views/leavemanagement/ApproveLeave';
import Performance from 'views/performance/Performance';
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
import LearningandDevelopment from 'views/learninganddevelopment/LearningandDevelopment';
import Payroll from 'views/payroll/Payroll';

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
      path: '/leavetrackerform',
      element: <LeaveTrackerForm />
    },
    {
      path: '/applicationtracker',
      element: <ApplicationTracker />
    },
    {
      path: '/leavetrackerlist',
      element: <LeaveTrackerList />
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
      path: '/performance',
      element: <Performance />
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
      path: '/Addemployeetable',
      element: <Addemployeetable />
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
      path: '/learninganddevelopment',
      element: <LearningandDevelopment />
    },
    {
      path: '/payroll',
      element: <Payroll />
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
      path: '/viewdetails/:employeeid',
      element: <Viewdetails />
    },
    {
      path: '/newevent',
      element: <Newevent />
    }
  ]
};

export default MainRoutes;
