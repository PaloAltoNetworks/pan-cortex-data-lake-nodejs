/**
 * Log levels supported
 */
export declare enum logLevel {
    DEBUG = 0,
    INFO = 1,
    WARNING = 2,
    ERROR = 3,
    NONE = 4
}
/**
 * logs an error object
 * @param error object to be logged
 */
export declare function commonLogger(error: Error): void;
/**
 * logs a message string
 * @param level level of the message
 * @param message the error message
 * @param noPrefix to remove the 'CORTEX_SDK' prefix in the output
 */
export declare function commonLogger(level: logLevel, message: string, noPrefix?: boolean): void;
/**
 * Change the log level of the common logger at runtime
 * @param level
 */
export declare function setLogLevel(level: logLevel): void;
