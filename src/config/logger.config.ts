import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const isDevelopment = process.env.NODE_ENV === 'development';
const isDebug = process.env.DEBUG === 'true';
const level = isDebug ? 'debug' : 'info';
const loggerConfig = WinstonModule.forRoot({
    transports: [
        new winston.transports.Console({
            level,
            format: isDevelopment
                ? winston.format.combine(
                      winston.format.colorize(),
                      winston.format.errors({ stack: true }),
                      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                      winston.format.printf((info) => {
                          const { timestamp, level, message, stack } = info;
                          return `${timestamp} ${level}: ${message}${stack ? `\n${stack}` : ''}`;
                      }),
                  )
                : winston.format.simple(),
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
    // other options
});
export { loggerConfig as logger };
