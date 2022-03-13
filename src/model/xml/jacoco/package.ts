import { Counter } from "@/model/xml/jacoco/counter";
import { ClassElement, SourcefileElement } from "@/model/xml/jacoco/element";

export interface Package {
    "@_name": string;
    class?: ClassElement[];
    sourcefile?: SourcefileElement[];
    counter?: Counter[];
}
