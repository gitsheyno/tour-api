import { Router } from 'express';

import {
  getAllTours,
  checkBody,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkID,
} from '../controllers/tourController';

const router = Router();

router.param('id', checkID);

router.route('/').get(getAllTours).post(checkBody, createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default router;
