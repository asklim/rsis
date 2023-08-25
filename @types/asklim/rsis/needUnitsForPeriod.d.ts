import { TItem } from "../types";
/**
 * Объектов из api/sum/weeknatural для расчёта нужного
 * количества коробок/Units на требуемое количество:
 * 12, 24, 36, 96 рабочих дней или другое.
 * ***
 * Настраивается в /src/config/enum-values/procurementPeriods
 * @return
 * * [ unitsForLast, unitsForAverage, unitsForMaximal ]
 * * Возвращает массив из трех значений:
 * * - сколько нужно коробок на период period
 * * @ по частоте продаж:
 * * - последней, средней за 6 недель, максимальной за 6 недель
 * */
declare const needUnitsForPeriod: (item: TItem, period: number) => number[];
export default needUnitsForPeriod;
//# sourceMappingURL=needUnitsForPeriod.d.ts.map