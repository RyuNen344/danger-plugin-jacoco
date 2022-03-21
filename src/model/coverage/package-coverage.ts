import { ClassCoverage } from "@/model/coverage/class-coverage";
import { Coverage } from "@/model/coverage/coverage";
import { SourceFileCoverage } from "@/model/coverage/source-file-coverage";

export interface PackageCoverage extends Coverage {
    classes: ClassCoverage[];
    sourceFiles: SourceFileCoverage[];
}
