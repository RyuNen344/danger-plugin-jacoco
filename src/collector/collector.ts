import { Coverage } from "@/model/coverage/coverage";
import { Counter } from "@/model/jacoco/counter";
import { Type } from "@/model/jacoco/type";

export abstract class Collector {
    abstract collect(): Coverage;
}

export const rate = (type: Type, counters?: Counter[]): number => {
    let missed = counters?.filter((e) => e.type == type && e.missed != null).map((e) => e.missed).reduce((a, x) => a + x, 0) ?? 0;
    let covered = counters?.filter((e) => e.type == type && e.covered != null).map((e) => e.covered).reduce((a, x) => a + x, 0) ?? 0;
    let total = missed + covered;

    if (total <= 0) {
        return 0;
    } else {
        return (covered * 100 / total);
    }
}
