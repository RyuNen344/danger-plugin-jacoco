import { Counter } from "@/model/jacoco/counter";
import { Method } from "@/model/jacoco/method";

export interface Class {
    name: string;
    sourceFileName?: string;
    method?: Method[];
    counter?: Counter[];
}
