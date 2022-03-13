import { Type } from "@/model/jacoco/type";

export interface Counter {
    type: Type;
    missed: number;
    covered: number;
}
