import { NewPatient, PublicPatient, Patient, NewEntry } from '../types';
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, id: string): Patient | null => {
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return null;
  }

  let newEntry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);

  patients.map((p) => (p.id === patient.id ? patient : p));

  return patient;
};

export default {
  getPatients,
  getPublicPatients,
  findById,
  addPatient,
  addEntry,
};
