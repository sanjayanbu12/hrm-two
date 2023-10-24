import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import useToast from './useToast';
import { Toast } from 'primereact/toast';
const SwalComp = ({ leaveId, fetchLeave }) => {
  const { toast, showToast } = useToast();
  const updateLeaveStatus = async () => {
    try {
      const response = await axios.put(`https://pulsehr-express-server.onrender.com/api/leave/${leaveId}`, {
        reportingto: {
          status: true
        }
      });
      if (response.status === 200) {
        Swal.fire('Updated!', 'Leave status has been updated.', 'success');
        fetchLeave(); // fetch the data again after updating the status
      }
    } catch (error) {
      console.log(error);
      error && showToast('error', error.message, 'Message Content');
    }
  };

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      updateLeaveStatus();
    }
  });
  return <Toast ref={toast} />;
};

export default SwalComp;
