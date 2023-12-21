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

        return new NextResponse(JSON.stringify(movie), { status: 200 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};
