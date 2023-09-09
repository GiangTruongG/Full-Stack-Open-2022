import React, { useState, SyntheticEvent } from 'react';
import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';
import patientService from '../../../../services/patients';
import { EntryWithoutId, Patient } from '../../../../types';

interface Error {
  response: {
    data: string;
  };
}

const HospitalCheck = ({ patient, setPatient }: { patient: Patient | null, setPatient: (patient: Patient | null) => void }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddEntry = async (e: SyntheticEvent) => {
    e.preventDefault();

    const newEntry: EntryWithoutId = {
      description: description,
      date: date,
      specialist: specialist,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
      type: "Hospital",
    }

    if (patient !== null && patient.entries) {
      try {
        const addedEntry = await patientService.addPatientEntry(patient.id, newEntry);
        const newEntries = patient.entries.concat(addedEntry);

        const updatedPatient: Patient = {
          ...patient,
          entries: [...newEntries],
        }

        setPatient(updatedPatient);
      } catch (error: unknown) {
        const typedError = error as Error;
        console.log(typedError);
        setErrorMessage(typedError?.response.data);
      }
      
      setDescription('');
      setDate('');
      setSpecialist('');
      setDischargeCriteria('');
      setDischargeDate('');
      setInterval(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <div style={{ border: '3px dotted black', padding: '20px', margin: '20px 0px' }}>
      {errorMessage && <div style={{ color: 'red', fontWeight: 'bold', border: '2px solid red' }}>{errorMessage}</div>}
      <form onSubmit={handleAddEntry}>
        <h3>Hospital check</h3>
        <TextField
          style={{ marginBottom: '15px' }}
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          style={{ marginBottom: '15px' }}
          label="Date"
          fullWidth 
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          style={{ marginBottom: '15px' }}
          label="Specialist"
          fullWidth 
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          style={{ marginBottom: '15px' }}
          label="Discharge Date"
          fullWidth 
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
        />
        <TextField
          style={{ marginBottom: '15px' }}
          label="Discharge Criteria"
          fullWidth 
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />
        <Button type='submit' style={{ margin: '15px 0px' }} variant='contained'>
          Add
        </Button>
      </form>
    </div>
  )
}

export default HospitalCheck;
