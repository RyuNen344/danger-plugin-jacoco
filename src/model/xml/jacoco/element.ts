import { Counter } from "@model/xml/jacoco/counter";

export interface ClassElement {
    method?: MethodElement[] | MethodElement;
    counter?: Counter[];
    "@_name": string;
    "@_sourcefilename": string;
}

export interface MethodElement {
    counter: Counter[];
    "@_name": string;
    "@_desc": string;
    "@_line": string;
}

export interface SourcefileElement {
    "@_name": string;
    line?: LineElement[] | LineElement;
    counter?: Counter[];
}

export interface LineElement {
    "@_cb": string;
    "@_ci": string;
    "@_mb": string;
    "@_mi": string;
    "@_nr": string;
}
