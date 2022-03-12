import { Type } from "@model/xml/jacoco/type";

export interface Counter {
    "@_covered": string;
    "@_missed": string;
    "@_type": Type;
}
