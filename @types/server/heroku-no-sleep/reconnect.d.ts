/****************************************************************************
 **
 **  2. Функция reconnect, пока существует Таймер herokuTimer, пытается с
 **     интервалом reconnectInterval подключиться к rsis-webapp.herokuapp.com
 **     На каждом цикле используется до TOTAL_ATTEMPTS попыток включительно,
 **     с интервалом между попытками MILLISECONDS_BETWEEN_ATTEMPTS.
 **     Если попытки не удались, то через reconnectInterval - повтор попыток
 **
 **  3. API возвращает объект: { message: 'app', attempt: 1..5, ms: 5501 }
 **
 **==========================================================================
***/
export function reconnect(): Promise<void>;
export function isNowInWorkTime(): boolean;
