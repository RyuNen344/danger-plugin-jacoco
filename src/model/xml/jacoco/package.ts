import { Counter } from "@model/xml/jacoco/counter";
import { ClassElement, SourcefileElement } from "@model/xml/jacoco/element";

export interface Package {
    class: ClassElement[] | ClassElement;
    sourcefile: SourcefileElement[] | SourcefileElement;
    counter?: Counter[];
    "@_name": string;
}
