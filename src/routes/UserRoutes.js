import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AttendanceSystem from 'views/attendanceManagement/AttendanceSystem';
import EmployeeForm from 'views/addemployeeform/EmployeeForm';
import Employeeperformance from 'views/addemployeetable/Employeeperformance';
import Newevent from 'views/dashboard/Default/Newevent';
import LeaveCalendar from 'views/leavemanagement/LeaveCalendar';
import EmployeeSelfServices from 'views/employeeselfservices/EmployeeSelfServices';
import EmployeeEngagement from 'views/employeeengagement/EmployeeEngagement';
import NotFound404 from './NotFound404';
import RecruitmentForm from 'views/recruitment/RecruitmentForm';
import LeaveTrackerForm from 'views/leavemanagement/LeaveTrackerForm';
import EmployeeLogin from 'views/employeeselfservices/EmployeeLogin';
// dashboard routing
const DashboardEmployee = Loadable(lazy(() => import('views/dashboard/Employee')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardEmployee />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardEmployee />
        }
      ]
    },
    {
      path: '/leavecalendar',
      element: <LeaveCalendar/>
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
      path: '/newemployee',
      element: <EmployeeForm />
    },
    {
      path: '*',
      element: <NotFound404 />
    },{
    path: '/recruitment',
    element: <RecruitmentForm />
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
    path: '/attendanceManagement',
    element: <AttendanceSystem />
  },
  {
    path: '/leavetrackerform',
    element: <LeaveTrackerForm />
  },
    {
      path: '/newevent',
      element: <Newevent />
    },
    {
      path: '/employeedomain',
      element: <EmployeeLogin />
    },
  ]
};

export default MainRoutes;
