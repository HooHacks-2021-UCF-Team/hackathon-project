import '../scss/main-page.scss';
import React, { useState } from 'react';
import { Button } from 'antd';
import SideBar from '../components/SideBar';
import PatientCard from '../components/PatientCard';
import PatientProgress from '../components/PatientProgress';
import AssigneeList from '../components/AssigneeList';
import VisitList from '../components/VisitList';
import AddPatientModal from '../components/AddPatientModal';

const date = new Date().toLocaleDateString();
const patients = [
  {
    name: 'Jill Smith',
    location: 'Athens, GA',
    lastVisit: date,
    age: 32,
  },
  {
    name: 'Joe Schmuck',
    location: 'Chicago, IL',
    lastVisit: date,
    age: 48,
  },
  {
    name: 'Billy Bob',
    location: 'Miami, FL',
    lastVisit: date,
    age: 69,
  },
];

const assignees = [
  {
    name: 'John Jones',
    imgURL: 'https://www.stockvault.net/data/2015/09/01/177580/preview16.jpg',
    role: 'Cardiologist',
  },
  {
    name: 'Ryan Baker',
    imgURL: 'https://www.stockvault.net/data/2015/09/01/177580/preview16.jpg',
    role: 'Gynecologist',
  },
];

const visits = [
  '12/25/21',
  '12/25/21',
  '12/25/21',
  '12/25/21',
];

function MainPage() {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <div className="main-page">
      <SideBar>
        <div className="sidebar-content">
          <p className="heading">Your Patients</p>
          <hr />
          {patients.map((patient) => (
            <PatientCard patient={patient} className="patient-card" />
          ))}
          <p className="heading">Requested Reviews</p>
          <hr />
          {patients.reverse().map((patient) => (
            <PatientCard patient={patient} className="patient-card" />
          ))}
        </div>
        <Button className="btn-add-patient" type="primary" onClick={openModal}>
          Add Patient
        </Button>
      </SideBar>
      <div className="content">
        <PatientProgress status="waiting" />
        <div className="content-container">
          <VisitList visits={visits} />
          <div className="photo-gallery">photos</div>
          <AssigneeList assignees={assignees} />
        </div>
      </div>
      <AddPatientModal
        visible={isModalVisible}
        onCancel={closeModal}
        onConfirm={closeModal}
      />
    </div>
  );
}

export default MainPage;