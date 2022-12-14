import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';

import { Entry, Patient } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Hospital from '../components/Hospital';
import HealthCheck from '../components/HealthCheck';
import Occupational from '../components/Occupational';
import { Button } from '@material-ui/core';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => {
    setModalOpen(true);
    console.log(modalOpen);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    console.log(values);
    try {
      //eslint-disable-next-line
      await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values);

      await fetchPatient();
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(String(e?.response?.data?.error) || 'Unrecognized axios error');
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  const fetchPatient = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

      setPatient(patientFromApi);
      console.log('fetched');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void fetchPatient();
  }, []);

  if (!patient) {
    return null;
  }

  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  const getEntry = (entry: Entry) => {
    switch (entry.type) {
      case 'Hospital':
        return <Hospital hospitalEntry={entry} />;
      case 'HealthCheck':
        return <HealthCheck healthCheckEntry={entry} />;

      case 'OccupationalHealthcare':
        return <Occupational occupationalEntry={entry} />;

      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <h2>
        {patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
      </h2>
      <div style={{ fontSize: 18 }}>ssn: {patient.ssn}</div>
      <div style={{ fontSize: 18 }}>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      {patient.entries.map((e) => {
        return (
          <div key={e.id} style={{ border: 'black 1px solid', borderRadius: 6, padding: 10, marginBottom: 25 }}>
            {getEntry(e)}
          </div>
        );
      })}
      <AddEntryModal modalOpen={modalOpen} onSubmit={submitNewEntry} error={error} onClose={closeModal} />
      <Button onClick={openModal} variant='contained' color='primary'>
        ADD NEW ENTRY
      </Button>
    </div>
  );
};

export default PatientPage;
