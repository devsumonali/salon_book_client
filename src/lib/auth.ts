import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from '@better-auth/mongo-adapter';

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db('salon_booking_db');

export const auth = betterAuth({
    //email and password with registration
    emailAndPassword: {
        enabled: true,
    },

    //social providers
    socialProviders: {
        google: { clientId: '', clientSecret: '' },
    },

    //database connect
    database: mongodbAdapter(db, {
        client,
    }),
});
