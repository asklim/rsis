/**
 * День делиться на две части:
 * точка delta - начало нового рабочего дня.
 * 1-я: до точки delta - отображается на вчера
 * 2-я: после точки - рабочий день в этих сутках
 * Смещение для Отображения
 *     |   Before delta  |   After delta
 * ----|-----------------|---------------
 * Mon | -delta          |    0-ONE_DAY
 * Tue | -delta-ONE_DAY  |    0
 * ----|-----------------|---------------
 * Wed | -delta          |    0
 * Thu | -delta          |    0
 * Fri | -delta          |    0
 * Sat | -delta          |    0
 * Sun | -delta          |    0
 * --------------------------------------
**/
import { DateTypes, WorkDateOption } from '../types';
declare function factory(options: WorkDateOption): {
    week: (atDate?: DateTypes) => number;
    toISODay: (offset?: number, baseDay?: DateTypes) => string | undefined;
    today: () => string | undefined;
    msFromMidnight: (atDate: Date) => number;
    mappedUnixTime: (atDate: Date) => number;
    theMappedDeltaDate: (startDate: Date, offset?: number) => Date;
};
export default factory;
//# sourceMappingURL=workDate.d.ts.map