import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Addemployeetable from 'views/addemployeetable/Addemployeetable';
import EmployeeForm from 'views/addemployeeform/EmployeeForm';
import Recruitment from 'views/recruitment/RecruitmentTable';
import LeaveTrackerForm from 'views/leavemanagement/LeaveTrackerForm';
import LeaveTrackerList from 'views/leavemanagement/LeaveTrackerList';
import AttendanceTracker from 'views/leavemanagement/AttendanceTracker';
import Performance from 'views/performance/Performance';
import Employeeperformance from 'views/addemployeetable/Employeeperformance';
import Viewdetails from 'views/addemployeetable/Viewdetails';
import RecruitmentForm from 'views/recruitment/RecruitmentForm';
import RecruitmentTable from 'views/recruitment/RecruitmentTable';
import ApplicationTracker from 'views/recruitment/ApplicationTracker';

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
      path: '/leavetrackerlist',
      element: <LeaveTrackerList />
    },
    {
      path: '/attendancetracker',
      element: <AttendanceTracker />
    },
    {
      path: '/performance',
      element: <Performance />
    },
    // {
    //   path: '/wfhtracker',
    //   element: <WfhTracker />
    // },
    {
      path: '/Recruitmenttable',
      element: <RecruitmentTable />
    },
    {
      path: '/Recruitmentform/:id',
      element: <RecruitmentForm />
    },
    {
      path: '/Recruitmentform',
      element: <RecruitmentForm />
    },
    {
      path: '/Applicationtracker',
      element: <ApplicationTracker />
    },
    // {
    //   path: '/projectlist',
    //   element: <ProjectList />
    // },
    // {
    //   path: "/newproject",
    //   element: <AddProject />
    // },
    // {
    //   path: "/editproject/:id",
    //   element: <AddProject />
    // },
    // {
    //   path: "/projectdetails/:id",
    //   element: <Projectdetails />
    // },
    // {
    //   path: '/UserList',
    //   element: <UserList />
    // },
    // {
    //   path: '/userform/:id',
    //   element: <UserForm />},
    {
      path: '/Addemployeetable',
      element: <Addemployeetable />
    },
    {
      path: '/employeeperformance',
      element: <Employeeperformance />
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
    }
  ]
};

export default MainRoutes;
