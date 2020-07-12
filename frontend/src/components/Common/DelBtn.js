import React from 'react';

import Swal from '../Common/Swal';
import { useHttpClient } from '../Hooks/HTTPHooks';

const DelBtn = (props) => {
  const { sendRequest } = useHttpClient();

  const state = {
    delOption: {
      title: 'Are you sure?',
      text: 'Your slot will be given to others!',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: {
          text: 'Yes, cancel!',
          value: true,
          visible: true,
          className: 'bg-danger',
          closeModal: true,
        },
      },
    },
  };

  const handleDeleteConfirm = async (isConfirm) => {
    if (isConfirm) {
      try {
        await sendRequest(process.env.REACT_APP_BACKEND_URL + props.delurl, 'DELETE');
        props.onDeleteData(props.docid);
      } catch (err) {}
    }
  };

  return (
    <>
      <Swal options={state.delOption} callback={handleDeleteConfirm} title="Cancel Appointment" className="btn btn-sm btn-danger">
        <i className="fa fa-times"></i>
      </Swal>
    </>
  );
};

export default DelBtn;
