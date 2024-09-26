import { Request, Response, NextFunction } from 'express';
import Tour from '../models/tourModel';
import { ITour } from '../models/tourModel';
import { HydratedDocument } from 'mongoose';

export const checkID = (
  req: Request,
  res: Response,
  next: NextFunction,
  val: string
) => {
  console.log(`Tour id is: ${val}`);

  //   if (parseInt(req.params.id) > tours.length) {
  //     return res.status(404).json({
  //       status: 'fail',
  //       message: 'Invalid ID',
  //     });
  //   }
  next();
};

export const getAllTours = async (req: Request, res: Response) => {
  try {
    const queryObj = { ...req.query };

    const queryString = ['sort', 'limit', 'page', 'sort'];
    queryString.forEach((element) => delete queryObj[element]);

    let query = Tour.find(queryObj);

    if (req.query.sort) {
      query = query.sort(req.query.sort as string);
    } else {
      query = query.sort('-createdAt');
    }

    //sort

    const tours: ITour[] = await query;

    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

export const getTour = async (req: Request, res: Response) => {
  try {
    const tour: ITour = (await Tour.findById(req.params.id)) as ITour;
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

export const createTour = async (req: Request, res: Response) => {
  try {
    const newTour: ITour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

export const updateTour = async (req: Request, res: Response) => {
  try {
    const newTour: ITour = (await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )) as ITour;
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

export const deleteTour = async (req: Request, res: Response) => {
  try {
    const newTour: ITour = (await Tour.findByIdAndDelete(
      req.params.id
    )) as ITour;
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};
