import { NextResponse } from 'next/server';
import libraryModel from 'src/models/library.model';
import connect from 'src/utils/db';

export const POST = async (request: { json: () => any }) => {
    
    const body = await request.json();

    const newPost = new libraryModel(body);

    try {
        await connect();

        await newPost.save();

        return new NextResponse('Post has been created', { status: 201 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};

export const GET = async (request: any) => {
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
