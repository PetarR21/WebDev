import { HospitalEntry } from '../types';
import { Diagnosis } from '../types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const Hospital = ({ hospitalEntry }: { hospitalEntry: HospitalEntry }) => {
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
        {hospitalEntry.date} <MedicalServicesIcon />
      </p>
      <p>
        <em>{hospitalEntry.description}</em>
      </p>
      <p>
        discharge {hospitalEntry.discharge.date} {hospitalEntry.discharge.criteria}
      </p>
      {!hospitalEntry.diagnosisCodes ? (
        ''
      ) : (
        <ul>
          {hospitalEntry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code} {getDiagnosisDescription(code)}
            </li>
          ))}
        </ul>
      )}
      <p>diagnose by {hospitalEntry.specialist}</p>
    </div>
  );
};

export default Hospital;
