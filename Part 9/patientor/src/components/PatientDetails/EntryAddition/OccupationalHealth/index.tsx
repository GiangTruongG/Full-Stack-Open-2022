import React, { useState, SyntheticEvent } from 'react';
import {  TextField, Button } from '@mui/material';
import patientService from '../../../../services/patients';
import { EntryWithoutId, Patient } from '../../../../types';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Error {
  response: {
    data: string;
  };
}

const OccupationalHealth = ({ patient, setPatient }: { patient: Patient | null, setPatient: (patient: Patient | null) => void }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const diagnoses = [
    'M24.2',
    'M51.2',
    'S03.5',
    'J10.1',
    'J06.9',
    'Z57.1',
    'N30.0',
    'H54.7',
    'J03.0',
    'L60.1',
  ];

  function getStyles(name: string, personName: string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();
  const [diagnosisCodes, setDiagnosisCodes] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };  

  const handleAddEntry = async (e: SyntheticEvent) => {
    e.preventDefault();

    const newEntry: EntryWithoutId = {
      description: description,
      date: date,
      specialist: specialist,
      employerName: employerName,
      diagnosisCodes: diagnosisCodes,
      sickLeave: {
        startDate: startDate,
        endDate: endDate,
      },
      type: "OccupationalHealthcare",
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
      setEmployerName('');
      setStartDate('');
      setEndDate('');
      setDiagnosisCodes([]);
      setInterval(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <div style={{ border: '3px dotted black', padding: '20px', margin: '20px 0px' }}>
      {errorMessage && <div style={{ color: 'red', fontWeight: 'bold', border: '2px solid red' }}>{errorMessage}</div>}
      <form onSubmit={handleAddEntry}>
        <h3>Occupational check</h3>
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
          label="Employer Name"
          fullWidth 
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <InputLabel>Sick Leave - start date</InputLabel>
        <TextField
          type='date'
          style={{ marginBottom: '15px' }}
          fullWidth 
          value={startDate}
          onChange={({ target }) => setStartDate(target.value)}
        />
        <InputLabel>Sick Leave - start date</InputLabel>
        <TextField
          type='date'
          style={{ marginBottom: '15px' }}
          fullWidth 
          value={endDate}
          onChange={({ target }) => setEndDate(target.value)}
        />

      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">Diagnose Codes</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={diagnosisCodes}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {diagnoses.map((diagnose) => (
              <MenuItem
                key={diagnose}
                value={diagnose}
                style={getStyles(diagnose, diagnosisCodes, theme)}
              >
                {diagnose}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

        <Button type='submit' style={{ margin: '15px 0px' }} variant='contained'>
          Add
        </Button>
      </form>
    </div>
  )
}

export default OccupationalHealth;
