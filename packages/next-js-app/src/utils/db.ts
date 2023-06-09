import mongoose from 'mongoose';

const connect = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://vyteniskondrackis:Zalgiris!1@merncluster.svzxnze.mongodb.net/?retryWrites=true&w=majority&dbname=imdb'
        );
    } catch (error) {
        throw new Error('Connection failed!');
    }
};

export default connect;
