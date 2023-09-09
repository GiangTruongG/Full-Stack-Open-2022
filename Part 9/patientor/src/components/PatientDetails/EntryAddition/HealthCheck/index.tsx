import React, { useState, SyntheticEvent } from 'react';
import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';
import patientService from '../../../../services/patients';
import { EntryWithoutId, Patient } from '../../../../types';

interface Error {
  response: {
    data: string;
  };
}

const HealthCheck = ({ patient, setPatient }: { patient: Patient | null, setPatient: (patient: Patient | null) => void }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddEntry = async (e: SyntheticEvent) => {
    e.preventDefault();

    const newEntry: EntryWithoutId = {
      healthCheckRating: Number(healthCheckRating),
      description: description,
      date: date,
      specialist: specialist,
      type: "HealthCheck",
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
      setHealthCheckRating('');
      setInterval(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <div style={{ border: '3px dotted black', padding: '20px', margin: '20px 0px' }}>
      {errorMessage && <div style={{ color: 'red', fontWeight: 'bold', border: '2px solid red' }}>{errorMessage}</div>}
      <form onSubmit={handleAddEntry}>
        <h3>New HealthCheck Entry</h3>
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
          label="HealthCheck Rating"
          fullWidth 
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />
        <Button type='submit' style={{ margin: '15px 0px' }} variant='contained'>
          Add
        </Button>
      </form>
    </div>
  )
}

export default HealthCheck;
