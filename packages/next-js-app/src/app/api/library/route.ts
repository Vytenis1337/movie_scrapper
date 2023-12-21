import { NextRequest, NextResponse } from 'next/server';
import { LibraryType, librarySchema } from 'src/lib/validators/movie-validator';
import libraryModel, { ILibrarySchema } from 'src/models/library.model';
import connect from 'src/utils/db';

// export interface LibraryApiRequest extends NextApiRequest {
//     body: TypeOf<typeof librarySchema>;
// }

export const POST = async (request: NextRequest) => {
    try {
        await connect();
        const body: unknown = await request.json();

        const validatedBody = librarySchema.parse(body);

        console.log('BODY IS:', body);
        console.log('VALIDATED BODY IS:', validatedBody);

        const newPost: ILibrarySchema = new libraryModel(validatedBody);

        await newPost.save();

        return new NextResponse('Post has been created', { status: 201 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};

export const GET = async (request: NextRequest) => {
    // const url = new URL(request.url);

    // const username = url.searchParams.get("username");

    try {
        await connect();

        const library = await libraryModel.find();

        return new NextResponse(JSON.stringify(library), { status: 200 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};
