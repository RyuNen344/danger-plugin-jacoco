import { Class } from "@/model/jacoco/class";
import { Counter } from "@/model/jacoco/counter";
import { SourceFile } from "@/model/jacoco/source_file";

export interface Package {
    name: string;
    class?: Class[];
    sourceFile?: SourceFile[];
    counter?: Counter[];
}
