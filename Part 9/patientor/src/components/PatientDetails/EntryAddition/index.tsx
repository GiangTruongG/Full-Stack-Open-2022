import React, { useState, SyntheticEvent } from 'react';
import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';
import patientService from '../../../services/patients';
import { EntryWithoutId, Patient } from '../../../types';
import HealthCheck from './HealthCheck';
import OccupationalHealth from './OccupationalHealth';
import HospitalCheck from './HospitalCheck';

const AddEntryForm = ({ patient, setPatient }: { patient: Patient | null, setPatient: (patient: Patient | null) => void }) => {
  const [type, setType] = useState('Hospital');  

  return (
    <div>
      <select onChange={(e) => setType(e.target.value)}>
        <option value="Hospital">Hospital</option>
        <option value="OccupationalHealthcare">OccupationalHealthcare</option>
        <option value="HealthCheck">HealthCheck</option>
      </select>
      {type === 'Hospital' ? <HospitalCheck patient={patient} setPatient={setPatient} />
        : type === 'OccupationalHealthcare' ? <OccupationalHealth patient={patient} setPatient={setPatient} />
        : type === 'HealthCheck' ? <HealthCheck patient={patient} setPatient={setPatient} /> : null}
    </div>
  )
}

export default AddEntryForm
