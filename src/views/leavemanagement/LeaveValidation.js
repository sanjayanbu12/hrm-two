import * as yup from 'yup';

const validationSchema = yup.object().shape({
  employeeId: yup.string().required('Employee ID is required'),
  employeeName: yup.string().required('Employee Name is required'),
  leaveType: yup.string().required('Leave Type is required'),
  startDate: yup
    .date()
    .required('Start Date is required')
    .nullable()
    .min(new Date(), 'Start Date must be today or later')
    .test('startDate', 'Start Date must be earlier than End Date', function (
      startDate
    ) {
      const { endDate } = this.parent;
      if (!startDate || !endDate) {
        return true; // Skip validation if either date is not set
      }
      return new Date(startDate) < new Date(endDate);
    }),
  endDate: yup
    .date()
    .required('End Date is required')
    .nullable()
    .min(yup.ref('startDate'), 'End Date must be after or equal to Start Date'),
  numberOfDays: yup
    .number()
    .required('Number of Days is required')
    .positive('Number of Days must be positive')
    .integer('Number of Days must be an integer')
    .test(
      'is-valid-number-of-days',
      'Invalid number of days',
      function (numberOfDays) {
        const { startDate, endDate } = this.parent;
        if (!startDate || !endDate) {
          return true; // Skip validation if either date is not set
        }
        const daysDiff = Math.floor(
          (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
        );
        return numberOfDays === daysDiff;
      }
    ),
  attachments: yup.array().of(yup.string()),
  reason: yup.string().required('Reason is required'),
});

export default validationSchema;
