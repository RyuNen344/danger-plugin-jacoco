import { ClassCoverage } from "@/model/coverage/class_coverage"
import { Coverage } from "@/model/coverage/coverage"
import { SourceFileCoverage } from "@/model/coverage/source_file_coverage"

export interface PackageCoverage extends Coverage {
    classes: ClassCoverage[]
    sourceFiles: SourceFileCoverage[]
}
