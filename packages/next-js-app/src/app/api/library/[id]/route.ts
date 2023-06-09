import { NextResponse } from 'next/server';
import libraryModel from 'src/models/library.model';
import connect from 'src/utils/db';

export const DELETE = async (request: any, { params }: any) => {
    const { id } = params;

    try {
        await connect();

        await libraryModel.findByIdAndDelete(id);

        return new NextResponse('Post has been deleted', { status: 200 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};
