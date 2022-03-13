import { Counter } from "@/model/jacoco/counter";
import { Package } from "@/model/jacoco/package";

export interface Group {
    name: string;
    group?: Group[];
    package?: Package[];
    counter?: Counter[];
}
