import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import Datatable from '../Common/Datatable';

import AppointmentTableRow from './AppointmentTableRow';

const AppointmentTable = (props) => {
  const [tableData, setTableData] = useState([{}]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        setLoading(true);
        const responce = await fetch(process.env.REACT_APP_BACKEND_URL + '/appointment');
        const responceData = await responce.json();
        setTableData(responceData);
        setLoading(false);
      } catch (err) {}
    };

    fetchAppointment();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteData = (id) => {
    setTableData((prevTableData) => prevTableData.filter((data) => data.id !== id));
  };

  const state = {
    dtOptions: {
      pageLength: 50, // Show 50 rows
      paging: true, // Table pagination
      ordering: true, // Column ordering
      info: true, // Bottom left status text
      responsive: false,
      bAutoWidth: false, //for better responsiveness
      columnDefs: [
        {
          targets: [6],
          className: 'text-center',
          orderable: false,
        },
      ],
      // Datatable Buttons setup
      dom: 'Bfrtip',
      buttons: [
        { extend: 'copy', className: 'btn-info' },
        {
          extend: 'csv',
          className: 'btn-info',
          title: 'Appointment',
          exportOptions: {
            columns: ':visible',
          },
        },
        {
          extend: 'excel',
          className: 'btn-info',
          title: 'Appointment',
          exportOptions: {
            columns: ':visible',
          },
        },
        {
          extend: 'print',
          className: 'btn-info',
          exportOptions: {
            columns: ':visible',
          },
        },
        {
          extend: 'colvis',
          className: 'btn-info',
          text: 'Hide / Show',
        },
      ],
    },
  };

  return (
    <Container fluid>
      {loading && (
        <Card>
          <CardBody>
            <div className="card-body d-flex align-items-center justify-content-center">
              <div className="sk-circle">
                <div className="sk-circle1 sk-child"></div>
                <div className="sk-circle2 sk-child"></div>
                <div className="sk-circle3 sk-child"></div>
                <div className="sk-circle4 sk-child"></div>
                <div className="sk-circle5 sk-child"></div>
                <div className="sk-circle6 sk-child"></div>
                <div className="sk-circle7 sk-child"></div>
                <div className="sk-circle8 sk-child"></div>
                <div className="sk-circle9 sk-child"></div>
                <div className="sk-circle10 sk-child"></div>
                <div className="sk-circle11 sk-child"></div>
                <div className="sk-circle12 sk-child" s></div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
      {tableData !== undefined && (
        <Card>
          <CardBody>
            <div className="table-responsive">
              <Datatable options={state.dtOptions}>
                <table id="table" className="table table-striped my-4 w-100">
                  <thead>
                    <tr>
                      <th data-priority="1">Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Car Brand</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <AppointmentTableRow data={tableData} onDeleteData={handleDeleteData} />
                  </tbody>
                </table>
              </Datatable>
            </div>
          </CardBody>
        </Card>
      )}
    </Container>
  );
};

export default AppointmentTable;
