import { NextFunction, Request, Response } from 'express';
import libraryModel from '../models/library.model';
import movieModel from '../models/movie.model';

export const createLibrary = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const newLibrary = new libraryModel({
        ...req.body,
    });
    try {
        const savedLibrary = await newLibrary.save();
        res.status(201).json(savedLibrary);
    } catch (err) {
        next(err);
    }
};

export const getLibrary = async (req: Request, res: Response, next: NextFunction) => {
    const q: any = req.query;
    const filters = {
        ...(q.userId && { userId: q.userId }),
    };
    try {
        const library = await libraryModel.find(filters).sort({ [q.sort]: -1 });
        if (!library) next(404);
        res.status(200).send(library);
    } catch (err) {
        next(err);
    }
};

export const deleteLibrary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await libraryModel.findByIdAndDelete(req.params.id);
        res.status(200).send('Movie has been deleted!');
    } catch (err) {
        next(err);
    }
};
