/**
 * @name getDB
 * @memberof /api/models
 * @summary Возвращает указанную базу данных
 * @param {String} dbType The database type
 * @return {Mongoose.Connection} The connection to database
 *
**/
export function getDB(dbType: string): Mongoose.Connection;
export function createMongoDBConnections(): void;
/**
 * @description To be called when process is restarted Nodemon or terminated
 * @param {String} msg - message for output to console
 * @param {Function} next - Функция вызывается после закрытия всех подключений
 *                          к базам данных
 *
**/
export function databasesShutdown(msg: string, next: Function): Promise<void>;
