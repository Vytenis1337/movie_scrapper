import modelName from 'src/models/movie.model';
import connect from '../../../utils/db';

import { NextResponse } from 'next/server';

export const GET = async (request: { url: string | URL; json: () => any }) => {
    const url = new URL(request.url);

    const choosenGenres = url.searchParams.get('genres');
    console.log(request);
    console.log(choosenGenres);

    const filters = {
        ...(choosenGenres && { genres: { $in: [choosenGenres] } }),

        // ...(q.search && { title: { $regex: q.search, $options: 'i' } }),
    };
    console.log(filters);

    try {
        await connect();

        const posts = await modelName.find(filters);

        return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};
