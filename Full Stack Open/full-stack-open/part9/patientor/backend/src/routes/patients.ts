import express from 'express';
import patientsService from '../services/patientsService';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPublicPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.findById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += 'Error:' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = toNewEntry(req.body);

    const updatedPatient = patientsService.addEntry(newEntry, id);

    if (!updatedPatient) {
      res.sendStatus(404);
    } else {
      res.json(updatedPatient);
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += 'Error:' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
