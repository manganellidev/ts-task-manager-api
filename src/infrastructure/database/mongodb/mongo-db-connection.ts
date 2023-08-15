import mongoose from 'mongoose';

export default class MongoDBConnection {
    static async connect() {
        await mongoose.connect(process.env.MONGODB_URL ?? '');
    }
}
