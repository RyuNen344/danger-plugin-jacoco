import { Counter } from "@/model/jacoco/counter";

export interface Method {
    name: string;
    desc: string;
    line?: number;
    counter?: Counter[];
}
