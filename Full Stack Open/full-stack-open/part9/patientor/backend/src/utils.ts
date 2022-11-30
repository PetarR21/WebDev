import { Gender, HealthCheckRating, NewEntry, NewPatient } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missisng name: ' + name);
  }

  return name;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missisng description: ' + description);
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missisng specialist: ' + specialist);
  }

  return specialist;
};

const isType = (param: unknown): param is EntryType => {
  return param === 'HealthCheck' || param === 'Hospital' || param === 'OccupationalHealthcare';
};

const parseType = (type: unknown): EntryType => {
  if (!type || !isType(type)) {
    throw new Error('Incorrect or missisng type: ' + type);
  }

  return type;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if ((rating !== 0 && !rating) || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missisng health check rating: ' + rating);
  }

  return rating;
};

const parseDiagnosisCodes = (codes: Array<unknown>): Array<string> => {
  for (let i: number = 0; i < codes.length; i++) {
    if (!isString(codes[i])) {
      throw new Error('Incorrect diagnosis code: ' + codes[i]);
    }
  }

  return codes as Array<string>;
};

const isDischarge = (param: any): param is Discharge => {
  const keys = Object.keys(param);

  return (
    keys.includes('date') &&
    keys.includes('criteria') &&
    isString(param.date) &&
    isDate(param.date) &&
    isString(param.criteria)
  );
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }

  return discharge;
};

const isSickLeave = (param: any): param is SickLeave => {
  const keys = Object.keys(param);

  return (
    keys.includes('startDate') &&
    keys.includes('endDate') &&
    isString(param.startDate) &&
    isDate(param.startDate) &&
    isString(param.endDate) &&
    isDate(param.endDate)
  );
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave && !isSickLeave(sickLeave)) {
    throw new Error('Incorrect sick leave: ' + sickLeave);
  }

  return sickLeave as SickLeave;
};

const parseEmployerName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missisng employer name: ' + name);
  }

  return name;
};

type Fields = { name: unknown; dateOfBirth: unknown; gender: unknown; ssn: unknown; occupation: unknown };

export const toNewPatient = ({ name, dateOfBirth, gender, ssn, occupation }: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    ssn: parseSsn(ssn),
    occupation: parseOccupation(occupation),
    entries: [],
  };

  return newPatient;
};

type Discharge = {
  date: string;
  criteria: string;
};

type SickLeave = {
  startDate: string;
  endDate: string;
};

type EntryType = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';

type EntryFields = {
  employerName: unknown;
  sickLeave?: unknown;
  discharge: unknown;
  diagnosisCodes?: Array<unknown>;
  healthCheckRating?: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  type: unknown;
};

export const toNewEntry = (args: EntryFields): NewEntry => {
  const descriptionCheck = parseDescription(args.description);
  const dateCheck = parseDate(args.date);
  const specialistCheck = parseSpecialist(args.specialist);
  const typeCheck = parseType(args.type);

  if (typeCheck === 'HealthCheck') {
    if (args.diagnosisCodes) {
      const newEntry: NewEntry = {
        description: descriptionCheck,
        date: dateCheck,
        specialist: specialistCheck,
        type: typeCheck,
        healthCheckRating: parseHealthCheckRating(args.healthCheckRating),
        diagnosisCodes: parseDiagnosisCodes(args.diagnosisCodes),
      };
      return newEntry;
    } else {
      const newEntry: NewEntry = {
        description: descriptionCheck,
        date: dateCheck,
        specialist: specialistCheck,
        type: typeCheck,
        healthCheckRating: parseHealthCheckRating(args.healthCheckRating),
      };
      return newEntry;
    }
  } else if (typeCheck === 'Hospital') {
    if (args.diagnosisCodes) {
      const newEntry: NewEntry = {
        description: descriptionCheck,
        date: dateCheck,
        specialist: specialistCheck,
        type: typeCheck,
        discharge: parseDischarge(args.discharge),
        diagnosisCodes: parseDiagnosisCodes(args.diagnosisCodes),
      };
      return newEntry;
    } else {
      const newEntry: NewEntry = {
        description: descriptionCheck,
        date: dateCheck,
        specialist: specialistCheck,
        type: typeCheck,
        discharge: parseDischarge(args.discharge),
      };

      return newEntry;
    }
  } else if (typeCheck === 'OccupationalHealthcare') {
    if (args.sickLeave) {
      const newEntry: NewEntry = {
        description: descriptionCheck,
        date: dateCheck,
        specialist: specialistCheck,
        type: typeCheck,
        employerName: parseEmployerName(args.employerName),
        sickLeave: parseSickLeave(args.sickLeave),
      };
      return newEntry;
    } else {
      const newEntry: NewEntry = {
        description: descriptionCheck,
        date: dateCheck,
        specialist: specialistCheck,
        type: typeCheck,
        employerName: parseEmployerName(args.employerName),
      };
      return newEntry;
    }
  } else {
    throw new Error('internal server error');
  }
};
