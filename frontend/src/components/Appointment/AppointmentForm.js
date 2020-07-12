import React, { useState } from 'react';
import { withNamespaces, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import { Card, CardBody, FormGroup, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import AppointmentFormValidation from './AppointmentFormValidation';
import AppointmentFormValidationRules from './AppointmentFormValidationRules';

const AppointmentForm = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const changeLanguage = (lng) => {
    props.i18n.changeLanguage(lng);
  };

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Initial Fields Value
  const INITIAL_FIELDS_VALUES = {
    nm: '',
    em: '',
    mobno: '',
    carbd: '',
    dat: moment(),
    tm: '9:00 AM',
  };

  // Selectable date
  const selectableDate = (current) => {
    const yesterday = Datetime.moment().subtract(1, 'day');
    const threeweeks = Datetime.moment().add(21, 'day');
    return current.isAfter(yesterday) && current.isBefore(threeweeks) && current.day() !== 0;
  };

  const { handleSubmit, handleChange, handleDateChange, handleBlur, values, errors, isSubmitting } = AppointmentFormValidation(
    INITIAL_FIELDS_VALUES,
    AppointmentFormValidationRules,
    props
  );

  return (
    <ContentWrapper>
      <div className="content-heading">
        <div>
          <Trans i18nKey="makeappointment.TITLE"></Trans>
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

      <Card className="card-default">
        <CardBody>
          <form className="form-horizontal" onSubmit={handleSubmit}>
            <FormGroup row>
              <label className="col-xl-2 col-form-label">
                <Trans i18nKey="form.NAME"></Trans>
                <span className="text-danger"> *</span>
              </label>
              <div className="col-xl-10">
                <Input
                  id="nm"
                  name="nm"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nm}
                  className={errors.nm ? 'is-invalid' : ''}
                />
                {errors.nm && <p className="text-danger">{errors.nm}</p>}
              </div>
            </FormGroup>
            <FormGroup row>
              <label className="col-xl-2 col-form-label">
                <Trans i18nKey="form.EMAIL"></Trans>
              </label>
              <div className="col-xl-10">
                <Input
                  id="em"
                  name="em"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.em}
                  className={errors.em ? 'is-invalid' : ''}
                />
                {errors.em && <p className="text-danger">{errors.em}</p>}
              </div>
            </FormGroup>
            <FormGroup row>
              <label className="col-xl-2 col-form-label">
                <Trans i18nKey="form.MOBILE"></Trans> <span className="text-danger"> *</span>
              </label>
              <div className="col-xl-10">
                <Input
                  id="mobno"
                  name="mobno"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mobno}
                  className={errors.mobno ? 'is-invalid' : ''}
                />
                {errors.mobno && <p className="text-danger">{errors.mobno}</p>}
              </div>
            </FormGroup>
            <FormGroup row>
              <label className="col-xl-2 col-form-label">
                <Trans i18nKey="form.CARBRAND"></Trans>
              </label>
              <div className="col-xl-10">
                <select
                  id="carbd"
                  name="carbd"
                  type="text"
                  onChange={handleChange}
                  defaultValue={values.carbd}
                  className="custom-select custom-select-sm"
                >
                  <option value="">Please select</option>
                  <option value="Proton">Proton</option>
                  <option value="Honda">Honda</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Nissan">Nissan</option>
                </select>
              </div>
            </FormGroup>
            <FormGroup row>
              <label className="col-xl-2 col-form-label">
                <Trans i18nKey="form.DATE"></Trans>
              </label>
              <div className="col-xl-10">
                <Datetime
                  dateFormat="DD-MMM-YYYY"
                  timeFormat={false}
                  closeOnSelect={true}
                  onChange={(value) => handleDateChange('dat', value)}
                  value={values.dat}
                  isValidDate={selectableDate}
                  inputProps={{ id: 'dat', name: 'dat', className: 'form-control' }}
                />
              </div>
            </FormGroup>
            <FormGroup row>
              <label className="col-xl-2 col-form-label">
                <Trans i18nKey="form.TIME"></Trans>
              </label>
              <div className="col-xl-10">
                <select
                  id="tm"
                  name="tm"
                  type="text"
                  onChange={handleChange}
                  defaultValue={values.tm}
                  className="custom-select custom-select-sm"
                >
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="9:30 AM">9:30 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="12:30 PM">12:30 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="1:30 PM">1:30 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="2:30 PM">2:30 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="3:30 PM">3:30 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="4:30 PM">4:30 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                  <option value="5:30 PM">5:30 PM</option>
                </select>
              </div>
            </FormGroup>
            <div className="text-right">
              <button className="btn btn-sm btn-secondary" type="submit" disabled={isSubmitting}>
                Book My Appointment
              </button>
            </div>
          </form>
        </CardBody>
      </Card>
    </ContentWrapper>
  );
};

export default withNamespaces('translations')(AppointmentForm);
