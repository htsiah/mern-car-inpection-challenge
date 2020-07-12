export default function AppointmentFormValidationRules(values) {
  let errors = {};

  if (!values.nm) {
    errors.nm = 'Please enter Name.';
  }

  if (!values.mobno) {
    errors.mobno = 'Please select Mobile No.';
  }

  if (!values.dat) {
    errors.dat = 'Please select Date.';
  }

  if (!values.tm) {
    errors.tm = 'Please select Time.';
  }
  return errors;
}
