/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientData from '../data/patients';
import { Patient, NewPatientInput, Entry, EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid';

const getAllPatients = (): Patient[] => {
  return patientData;
};

const getNonSensitiveData = (): Patient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const addPatient = ( entry: NewPatientInput ): Patient => {

  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry
  };

  const obj2 = newPatient as { id: string, name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string, entries: [] };

  patientData.push(obj2);
  return newPatient;
};

const addEntry = (entry: EntryWithoutId, id: string): Entry => {

  const addedEntry: Entry = {
    id: uuid(),
    ...entry,
  };

  let found = false;

  patientData.forEach(patient => {
    if (patient.id === id && patient.entries) {
      patient.entries.push(addedEntry);
      found = true;
    }
  });

  if (!found) {
    throw new Error(`Patient with ID ${id} not found.`);
  }

  return addedEntry;
};


export default {
  getAllPatients,
  getNonSensitiveData,
  addPatient,
  addEntry
};
