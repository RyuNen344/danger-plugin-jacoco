import { Coverage } from "@/model/coverage/coverage";
import { Counter } from "@/model/jacoco/counter";
import { Type } from "@/model/jacoco/type";

export abstract class CoverageProcessor {
    abstract invoke(): Coverage;
}

export const rate = (type: Type, counters?: Counter[]): number | undefined => {
    const missed = counters
        ?.filter((e) => e.type === type)
        .map((e) => e.missed)
        .reduce((a, x) => a + x, 0);
    const covered = counters
        ?.filter((e) => e.type === type)
        .map((e) => e.covered)
        .reduce((a, x) => a + x, 0);

    if (missed == null || covered == null) return undefined;
    const total = missed + covered;

    if (total <= 0) {
        return undefined;
    } else {
        return (covered * 100) / total;
    }
};
