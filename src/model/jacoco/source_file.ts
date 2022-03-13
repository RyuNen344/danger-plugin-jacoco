import { Counter } from "@/model/jacoco/counter";
import { Line } from "@/model/jacoco/line";

export interface SourceFile {
    name: string;
    line?: Line[];
    counter?: Counter[];
}
