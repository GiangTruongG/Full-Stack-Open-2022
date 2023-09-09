import axios from "axios";
import { Patient, PatientFormValues, EntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatientById = async (id: string | undefined) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addPatientEntry = async (id: string | undefined, entry: EntryWithoutId) => {
  const { data } = await axios.post<EntryWithoutId>(`${apiBaseUrl}/patients/${id}/entries`, entry);

  return data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, getPatientById, addPatientEntry
};

