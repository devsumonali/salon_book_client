import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { jwt } from 'better-auth/plugins';
import { APIError, createAuthMiddleware } from 'better-auth/api';

const client = new MongoClient(process.env.MONGODB_URI as string);
await client.connect();
const db = client.db('salon_booking_db');
const authUrl = (process.env.BETTER_AUTH_URL || 'http://localhost:3000').replace(/\/$/, '');

export const auth = betterAuth({
    baseURL: authUrl,
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: [authUrl],
    // The browser keeps its normal session. Express receives a short-lived signed JWT.
    plugins: [
        jwt({
            jwt: {
                issuer: authUrl,
                audience: authUrl,
                expirationTime: '15m',
                definePayload: ({ session }) => ({ sessionId: session.id }),
            },
        }),
    ],
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path === '/sign-up/email') {
                const password = ctx.body?.password;
                if (
                    typeof password !== 'string' ||
                    password.length < 6 ||
                    !/[A-Z]/.test(password) ||
                    !/[a-z]/.test(password)
                ) {
                    throw new APIError('BAD_REQUEST', {
                        message:
                            'Use at least 6 characters with an uppercase and a lowercase letter.',
                    });
                }
            }
            if (ctx.path === '/sign-in/email' && typeof ctx.body?.email === 'string') {
                const user = await db
                    .collection('user')
                    .findOne({ email: ctx.body.email.toLowerCase() });
                if (user?.isBlocked)
                    throw new APIError('FORBIDDEN', {
                        message: 'Your account is blocked. Please contact the salon.',
                    });
            }
        }),
    },
    //email and password with registration
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
    },

    //social providers
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: (process.env.GOOGLE_CLIENT_SECRET ||
                process.env.GOOGLE_CLIENT_SCREET_KEY) as string,
        },
    },

    //define user role
    user: {
        additionalFields: {
            isBlocked: { type: 'boolean', defaultValue: false, input: false },
            phone: {
                type: 'string',
                required: false,
                input: false,
            },
            role: {
                type: ['admin', 'user'],
                input: false,
                defaultValue: 'user',
            },
        },
    },

    //database connect
    database: mongodbAdapter(db, {
        client,
    }),
});
