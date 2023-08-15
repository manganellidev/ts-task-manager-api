import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf, splat, json } = format;

export interface ILogger {
    info(message: string, userId?: string): void;
    warn(message: string, userId?: string): void;
    error(message: string, userId?: string, stack?: string): void;
}

export default class Logger implements ILogger {
    private readonly _logger;

    private constructor(moduleName: string) {
        this._logger = createLogger({
            defaultMeta: {
                userId: ''
            },
            format: combine(
                label({ label: moduleName }),
                timestamp(),
                splat(),
                this.formatLog(),
                json()
            ),
            transports: new transports.Console()
        });
    }

    static create(moduleName: string) {
        return new Logger(moduleName);
    }

    private formatLog() {
        return printf((info) => {
            const { level, message, label, timestamp, userId } = info;
            const logBaseMsg = `${timestamp} [${label}] ${level}: ${message}`;
            const logWithUserIdMsg = `${logBaseMsg} userId: ${userId}`;
            return userId ? logWithUserIdMsg : logBaseMsg;
        });
    }

    info(message: string, userId?: string): void {
        this._logger.info(message, { userId: userId });
    }

    warn(message: string, userId?: string): void {
        this._logger.warn(message, { userId: userId });
    }

    error(message: string, userId?: string, stack?: string | undefined): void {
        this._logger.error(message, stack, { userId: userId });
    }
}
