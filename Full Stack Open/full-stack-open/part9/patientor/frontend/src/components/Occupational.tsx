import { useEffect, useState } from 'react';
import { apiBaseUrl } from '../constants';
import { Diagnosis, OccupationalHealthcareEntry } from '../types';
import axios from 'axios';
import WorkIcon from '@mui/icons-material/Work';

const Occupational = ({ occupationalEntry }: { occupationalEntry: OccupationalHealthcareEntry }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const fetchDiagnoses = async () => {
      const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

      setDiagnoses(diagnosesFromApi);
    };

    void fetchDiagnoses();
  }, []);

  if (!diagnoses) {
    return null;
  }

  const getDiagnosisDescription = (code: string): string => {
    const diagnosis = diagnoses.find((d) => d.code === code);

    if (diagnosis) {
      return diagnosis.name;
    } else {
      return 'unknown diagnosis code';
    }
  };

  return (
    <div>
      <p>
        {occupationalEntry.date} <WorkIcon /> {occupationalEntry.employerName}
      </p>
      <p>
        <em>{occupationalEntry.description}</em>
      </p>
      {!occupationalEntry.diagnosisCodes ? (
        ''
      ) : (
        <ul>
          {occupationalEntry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code} {getDiagnosisDescription(code)}
            </li>
          ))}
        </ul>
      )}
      {!occupationalEntry.sickLeave ? (
        ''
      ) : (
        <p>
          sick leave: from {occupationalEntry.sickLeave.startDate} to {occupationalEntry.sickLeave.endDate}
        </p>
      )}
      <p>diagnose by {occupationalEntry.specialist}</p>
    </div>
  );
};

export default Occupational;
