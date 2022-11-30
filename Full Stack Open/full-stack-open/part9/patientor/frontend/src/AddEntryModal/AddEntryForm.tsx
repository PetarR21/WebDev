import { Grid, Button } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import { DiagnosisSelection, RatingOption, SelectField, TextField } from '../AddPatientModal/FormField';
import { useState, useEffect } from 'react';

import { Diagnosis, Entry, HealthCheckRating } from '../types';
import { apiBaseUrl } from '../constants';
import axios from 'axios';

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryFormValues = UnionOmit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const ratingOptions: RatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'healthy' },
  { value: HealthCheckRating.LowRisk, label: 'low risk' },
  { value: HealthCheckRating.HighRisk, label: 'high risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'critical risk' },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const fetchDiagnosis = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

      setDiagnoses(diagnosesFromApi);
      console.log('fetched');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void fetchDiagnosis();
  }, []);

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        type: 'HealthCheck',
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <Field label='Description' placeholder='Description' name='description' component={TextField} />
            <Field label='Date' placeholder='Date' name='date' component={TextField} />
            <Field label='Specialist' placeholder='Specialist' name='specialist' component={TextField} />
            <SelectField label='Health Check Rating' name='healthCheckRating' options={ratingOptions} />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid item>
                <Button
                  color='secondary'
                  variant='contained'
                  style={{ float: 'left' }}
                  type='button'
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type='submit'
                  variant='contained'
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
