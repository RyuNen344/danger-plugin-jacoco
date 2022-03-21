import { Coverage } from "@/model/coverage/coverage";
import { PackageCoverage } from "@/model/coverage/package-coverage";

export interface ProjectCoverage extends Coverage {
    packages: PackageCoverage[];
}
