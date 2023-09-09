/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NewPatientInput, Gender, EntryWithoutId } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseField = (input: unknown): string => {
  if (!input || !isString(input)) {
    throw new Error('Incorrect or missing comment');
  }
  
  return input;
};

const isGender = (input: string): input is Gender => {
  return Object.values(Gender).map(gender => gender.toString()).includes(input);
};

const parseGender = (input: unknown): string => {
  if (!input || !isString(input) || !isGender(input)) {
    throw new Error('Incorrect or missing gender');
  }
  
  return input;
};

const toNewPatientEntry = (input: { name: unknown; dateOfBirth: unknown; ssn: unknown; gender: unknown; occupation: unknown; }): NewPatientInput => {  
  if (!input || typeof input !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  const newEntry: NewPatientInput = {
    name: parseField(input.name),
    dateOfBirth: parseField(input.dateOfBirth),
    ssn: parseField(input.ssn),
    gender: parseGender(input.gender),
    occupation: parseField(input.occupation)
  };

  return newEntry;
};

export const toNewEntry = (input: EntryWithoutId): EntryWithoutId => {
  if (!input || typeof input !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  let newEntry: EntryWithoutId;

  switch (input.type) {
    case 'HealthCheck':
      newEntry ={
        healthCheckRating: input.healthCheckRating,
        description: parseField(input.description),
        date: parseField(input.date),
        specialist: parseField(input.specialist),
        type: "HealthCheck",
        ...input,
      };
      break;
    case 'OccupationalHealthcare':
      newEntry ={
        description: parseField(input.description),
        date: parseField(input.date),
        specialist: parseField(input.specialist),
        type: "OccupationalHealthcare",
        employerName: parseField(input.employerName),
        ...input,
      };
      break;
    case 'Hospital':
      newEntry ={
        description: parseField(input.description),
        date: parseField(input.date),
        specialist: parseField(input.specialist),
        type: "Hospital",
        ...input,
      };
      break;
    default:
      throw new Error('Incorrect or missing data');
      break;
  }

  return newEntry;
};

export default toNewPatientEntry;
