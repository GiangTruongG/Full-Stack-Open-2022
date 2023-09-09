import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Patient, Diagnosis } from '../../types';
import { Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import diagnoseService from '../../services/diagnoses';
import EntryDetails from '../EntryDetails/index';
import AddEntryForm from './EntryAddition';

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatientById = async (id: string | undefined) =>{
      const patient = await patientService.getPatientById(id);
      const diagnoses = await diagnoseService.getAllDiagnoses();
      
      setDiagnoses(diagnoses);
      setPatient(patient);
    };

    void fetchPatientById(id);
  }, [id]);
  
  return (
    <div style={{ marginTop: '10px' }}>
      <Typography variant='h5' style={{ fontWeight: 'bold' }}>
        {patient?.name} {patient?.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
      </Typography>
      <Typography>
        SSN: {patient?.ssn}
      </Typography>
      <Typography>
        Occupation: {patient?.occupation}
      </Typography>
      {patient && <AddEntryForm patient={patient} setPatient={setPatient} />}
      <Typography variant='h6'>
        Entries
      </Typography>
      {patient?.entries && <EntryDetails entries={patient?.entries} diagnoses={diagnoses} />}
    </div>
  )
}

export default PatientDetails