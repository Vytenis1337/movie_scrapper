import { NextRequest, NextResponse } from 'next/server';
import connect from '../../../../utils/db';
import movieModel from 'src/models/movie.model';

type PageProps = {
    params: {
        id: string;
    };
};

export const GET = async (req: NextRequest, { params }: PageProps) => {
    const { id } = params;
    try {
        await connect();
        const movie = await movieModel.findById(id);
        if (!movie) {
            console.error(`Movie not found with id: ${id}`);
            return new NextResponse('Movie not found', { status: 404 });
        }
        return new NextResponse(JSON.stringify(movie), { status: 200 });
    } catch (error: any) {
        console.error(`Error fetching movie with id ${id}: ${error.message}`);
        return new NextResponse('Error fetching movie data', { status: 500 });
    }
};
