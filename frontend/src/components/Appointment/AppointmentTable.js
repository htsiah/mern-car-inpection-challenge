import React, { useState, useEffect } from 'react';
import { withNamespaces, Trans } from 'react-i18next';
import { Container, Card, CardBody } from 'reactstrap';
import Datatable from '../Common/Datatable';

import AppointmentTableRow from './AppointmentTableRow';

const AppointmentTable = (props) => {
  const [tableData, setTableData] = useState([{}]);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const responce = await fetch(process.env.REACT_APP_BACKEND_URL + '/appointment');
        const responceData = await responce.json();
        setTableData(responceData);
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
      {tableData !== undefined && (
        <Card>
          <CardBody>
            <div className="table-responsive">
              <Datatable options={state.dtOptions}>
                <table id="table" className="table table-striped my-4 w-100">
                  <thead>
                    <tr>
                      <th data-priority="1">
                        <Trans i18nKey="form.NAME"></Trans>
                      </th>
                      <th>
                        <Trans i18nKey="form.EMAIL"></Trans>
                      </th>
                      <th>
                        <Trans i18nKey="form.MOBILE"></Trans>
                      </th>
                      <th>
                        <Trans i18nKey="form.CARBRAND"></Trans>
                      </th>
                      <th>
                        <Trans i18nKey="form.DATE"></Trans>
                      </th>
                      <th>
                        <Trans i18nKey="form.TIME"></Trans>
                      </th>
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

export default withNamespaces('translations')(AppointmentTable);
