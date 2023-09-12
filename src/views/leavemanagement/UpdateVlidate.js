
import * as yup from 'yup';

export const updateValidateSchema = yup.object().shape({
  employeeId: yup.string().notRequired(),
  employeeName: yup.string().notRequired(),
  leaveType: yup.string().notRequired(),
  startDate: yup.date().notRequired(),
  endDate: yup.date()
    .notRequired()
    .when('startDate', (startDate, schema) => {
      return startDate
        ? schema.min(startDate, 'End Date must be after or equal to Start Date')
        : schema;
    }),
  numberOfDays: yup.number().notRequired().positive('Number of Days must be positive'),
  attachments: yup.array().of(yup.string()).notRequired(),
  reason: yup.string().notRequired(),
});