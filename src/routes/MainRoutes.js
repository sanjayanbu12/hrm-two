import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import EmployeeForm from 'views/addemployeeform/EmployeeForm';
import Recruitment from 'views/recruitment/BasicRecruittable';
import RequestLeave from 'views/leavemanagement/RequestLeave';
import ViewLeave from 'views/leavemanagement/ViewLeave';
import ApproveLeave from 'views/leavemanagement/TrackLeave';
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
import CourseUpload from 'views/coursemodule/CourseUpload';
import CourseReview from 'views/coursemodule/CourseReview';
import CourseCatalog from 'views/coursemodule/CourseCatalog';
import ViewApproval from 'views/recruitApproval/ViewApproval';
import HrApproval from 'views/recruitApproval/HrApproval';
import ManagerApproval from 'views/recruitApproval/ManagerApproval';
import Goals from 'views/performance/Goals/Goals';
import YourGoalTab from 'views/performance/Goals/YourGoalTab';
import Feedback from 'views/performance/Feedback/Feedback';
import SkillsetMatrix from 'views/performance/SkillSet/SkillsetMatrix';
import InterviewBoard from 'views/recruitment/InterviewBoard';
import ApplicationView1 from 'views/recruitment/ApplicationView1';
import { FeedSelectedTable } from 'views/recruitment/FeedSelectedTable';
import ApplicationTrackTab from 'views/recruitment/ApplicationTrackTab';
// dashboard routing
import LeaveTab from 'views/leavemanagement/LeaveTab';
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
      path: '/board/:id',
      element: <YourGoalTab />
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
      path: '/courseupload',
      element: <CourseUpload />
    },
    {
      path: '/coursereview',
      element: <CourseReview />
    }, 
    {
      path: '/coursecatalog',
      element: <CourseCatalog />
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
      path: '/leave',
      element: <LeaveTab />
    },
    {
      path: '/hrapproval/:id',
      element: <HrApproval />
    },
    {
      path: '/managerapproval/:id',
      element: <ManagerApproval />
    },
    {
      path: '/FeedSelectedTable',
      element: <FeedSelectedTable />
    },
    
    {
      path: '/ApplicationTrackTab',
      element: <ApplicationTrackTab />
    }

    
  ]
};

export default MainRoutes;
