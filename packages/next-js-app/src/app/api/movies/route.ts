import modelName from 'src/models/movie.model';
import connect from '../../../utils/db';

import { NextResponse } from 'next/server';

export const GET = async (request: { url: string | URL; json: () => any }) => {
    const url = new URL(request.url);

    const chosenGenres = url.searchParams.get('genres');
    const search = url.searchParams.get('search');
    // const page: any = url.searchParams.get('page');
    // const limit: any = url.searchParams.get('limit');

    // console.log('genres are:', chosenGenres);
    // console.log('page are:', page);
    // console.log('limit are:', limit);

    // const skip = (page - 1) * limit;

    const filters = {
        ...(chosenGenres && { genres: { $in: [chosenGenres] } }),

        ...(search && { title: { $regex: search, $options: 'i' } }),
    };
    console.log(search);
    console.log('filter are', filters);

    try {
        await connect();

        const posts = await modelName.find(filters);

        return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};
