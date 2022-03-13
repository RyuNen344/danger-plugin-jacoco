import { Type } from "@/model/xml/jacoco/type";

export interface Counter {
    "@_type": Type;
    "@_missed": string;
    "@_covered": string;
}
