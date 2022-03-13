import { Counter } from "@/model/xml/jacoco/counter";
import { Package } from "@/model/xml/jacoco/package";

export interface Group {
    "@_name": string;
    group?: Group[];
    package?: Package[];
    counter?: Counter[];
}
