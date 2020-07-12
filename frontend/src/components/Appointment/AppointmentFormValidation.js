import React, { useEffect } from 'react';
import moment from 'moment';

import { useHttpClient } from '../Hooks/HTTPHooks';

const AppointmentFormValidation = (initialFormValues, AppointmentFormValidationRules, props) => {
  const [values, setValues] = React.useState(initialFormValues);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        const createAppointment = async () => {
          try {
            await sendRequest(
              process.env.REACT_APP_BACKEND_URL + '/appointment',
              'POST',
              JSON.stringify({
                nm: values.nm,
                em: values.em,
                mobno: values.mobno,
                carbd: values.carbd,
                dat: values.dat,
                tm: values.tm,
              }),
              {
                'Content-Type': 'application/json',
              }
            );
            setIsSubmitting(false);
            props.history.push('/myappointment');
          } catch (err) {}
        };
        createAppointment();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [isSubmitting]); // eslint-disable-line

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value, // use the bracket surrounding the event.target.name to dynamically change the property.
    });
  };

  const handleDateChange = (fieldname, value) => {
    if (value === '') {
      setValues({
        ...values,
        [fieldname]: moment(values[fieldname]),
      });
    } else {
      setValues({
        ...values,
        [fieldname]: value,
      });
    }
  };

  const handleBlur = () => {
    setErrors(AppointmentFormValidationRules(values));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(AppointmentFormValidationRules(values));
    setIsSubmitting(true);
    // Move to call useEffect
    // If there is error, no submit.
  };

  return { handleSubmit, handleChange, handleDateChange, handleBlur, values, errors, isSubmitting };
};

export default AppointmentFormValidation;
