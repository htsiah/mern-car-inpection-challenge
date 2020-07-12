import React, { useState } from 'react';
import { withNamespaces, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import AppointmentTable from './AppointmentTable';

const Appointment = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const changeLanguage = (lng) => {
    props.i18n.changeLanguage(lng);
  };

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <ContentWrapper>
      <div className="content-heading">
        <div>
          <Trans i18nKey="myappointment.TITLE"></Trans>
        </div>
        {/* START Language list */}
        <div className="ml-auto">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle>English</DropdownToggle>
            <DropdownMenu className="dropdown-menu-right-forced animated fadeInUpShort">
              <DropdownItem onClick={() => changeLanguage('en')}>English</DropdownItem>
              <DropdownItem onClick={() => changeLanguage('ch')}>Chinese</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        {/* END Language list */}
      </div>
      <Row>
        <AppointmentTable />
      </Row>
    </ContentWrapper>
  );
};

export default withNamespaces('translations')(Appointment);
