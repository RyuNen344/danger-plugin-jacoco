import { Coverage } from "@/model/coverage/coverage";
import { PackageCoverage } from "@/model/coverage/package_coverage";

export interface ProjectCoverage extends Coverage {
    packages: PackageCoverage[];
}
