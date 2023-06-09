import { NextResponse } from 'next/server';
import connect from '../../../../utils/db';
import movieModel from 'src/models/movie.model';

export const GET = async (request: any, { params }: any) => {
    const { id } = params;
    try {
        await connect();

        const movie = await movieModel.findById(id);

        return new NextResponse(JSON.stringify(movie), { status: 200 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};
