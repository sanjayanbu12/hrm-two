import * as yup from 'yup';


export const updateValidateSchema = yup.object().shape({
  employeeId: yup.string(),
  employeeName: yup.string(),
  leaveType: yup.string(),
  startDate: yup
    .date()
    .nullable()
    .min(new Date(), 'Start Date must be today or later'),
  endDate: yup
    .date()
    .nullable()
    .min(yup.ref('startDate'), 'End Date must be after or equal to Start Date'),
  numberOfDays: yup
    .number()
    .positive('Number of Days must be positive')
    .integer('Number of Days must be an integer')
    .transform((value) => (isNaN(value) ? undefined : value)),
  attachments: yup.array().of(yup.string()),
  reason: yup.string(),
});
