import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

import '../scss/main-page.scss';

function PatientCard({ patient, className }) {
  return (
    <Card title={patient.name} className={className}>
      <h5>{patient.location}</h5>
      <h5>{patient.lastVisit}</h5>
      <div className="card-age-label">
        <h3>{patient.age}</h3>
      </div>
    </Card>
  );
}

PatientCard.propTypes = {
  patient: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    lastVisit: PropTypes.string,
    age: PropTypes.number,
  }).isRequired,
  className: PropTypes.string,
};

PatientCard.defaultProps = {
  className: '',
};

export default PatientCard;
