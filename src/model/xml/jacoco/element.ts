import { Counter } from "@/model/xml/jacoco/counter";

export interface ClassElement {
    "@_name": string;
    "@_sourcefilename"?: string;
    method?: MethodElement[];
    counter?: Counter[];
}

export interface MethodElement {
    "@_name": string;
    "@_desc": string;
    "@_line"?: string;
    counter?: Counter[];
}

export interface SourcefileElement {
    "@_name": string;
    line?: LineElement[];
    counter?: Counter[];
}

export interface LineElement {
    "@_nr": string;
    "@_mi"?: string;
    "@_ci"?: string;
    "@_mb"?: string;
    "@_cb"?: string;
}
