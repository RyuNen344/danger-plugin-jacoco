import { ProjectCoverage } from "@/model/coverage/project_coverage";
import { Report } from "@/model/jacoco/report";
import { Type } from "@/model/jacoco/type";
import { CoverageProcessor, rate } from "@/processor/coverage/coverage-processor";
import { PackageCoverageProcessor } from "@/processor/coverage/package-processor";

export class ProjectCoverageProcessor extends CoverageProcessor {
    data: Report;

    constructor(data: Report) {
        super();
        this.data = data;
    }

    invoke = (): ProjectCoverage => {
        return {
            name: this.data.name,
            instructionsCov: rate(Type.Instruction, this.data.counter),
            branchesCov: rate(Type.Branch, this.data.counter),
            complexityRate: rate(Type.Complexity, this.data.counter),
            coveredLinesRate: rate(Type.Line, this.data.counter),
            coveredMethodsRate: rate(Type.Method, this.data.counter),
            coveredClassesRate: rate(Type.Class, this.data.counter),
            packages: this.data.package?.map((e) => new PackageCoverageProcessor(e).invoke()) ?? [],
        };
    };
}
