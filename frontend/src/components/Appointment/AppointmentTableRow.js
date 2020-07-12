import React from 'react';
import moment from 'moment';

const AppointmentTableRow = (props) => {
  return (
    <>
      {props.data.map((Appointment) => (
        <tr>
          <td>{Appointment.nm}</td>
          <td>{Appointment.em}</td>
          <td>{Appointment.mobno}</td>
          <td>{Appointment.carbd}</td>
          <td>{moment(Appointment.dat).format('DD-MMM-YYYY')}</td>
          <td>{Appointment.tm}</td>
          <td>Cancel Appointment</td>
        </tr>
      ))}
    </>
  );
};

export default AppointmentTableRow;
