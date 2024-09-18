import { Router } from 'express';
// import * as tourFunctions from '../controller/tourController.js';
const tourFunctions = require('../controller/tourController.js');
const router = Router();

router.param('id', tourFunctions.checkID);
console.log('h', process.env.USER_NAME, 'hh');

router
  .route('/')
  .get(tourFunctions.getAllTours)
  .post(tourFunctions.checkBody, tourFunctions.postTour);
router
  .route('/:id')
  .get(tourFunctions.getTours)
  .patch(tourFunctions.patchTour)
  .delete(tourFunctions.deleteTour);

export default router;
