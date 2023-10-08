import { database } from './database.config';
import { rateLimit } from './rateLimit.config';
import { cors } from './cors.config';
import { redis } from './redis.config';
import { server } from './server.config';
import { logger } from './logger.config';

export default () => ({
    server,
    database,
    jwt: {
        secret_key: process.env.JWT_SECRETKEY,
        refresh_key: process.env.JWT_REFRESH_SECRET,
        email_key: process.env.JWT_EMAIL_TOKEN,
    },
    rateLimit,
    cors,
    redis,
    logger,
});
