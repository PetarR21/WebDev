import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';

import { Patient } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

        setPatient(patientFromApi);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchPatient();
  }, []);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h2>
        {patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
      </h2>
      <div style={{ fontSize: 18 }}>ssn: {patient.ssn}</div>
      <div style={{ fontSize: 18 }}>occupation: {patient.occupation}</div>
    </div>
  );
};

export default PatientPage;
