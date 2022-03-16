import { Collector, rate } from "@/collector/collector";
import { PackageCollector } from "@/collector/collector_package";
import { ProjectCoverage } from "@/model/coverage/project_coverage";
import { Report } from "@/model/jacoco/report";
import { Type } from "@/model/jacoco/type";

export class ProjectCollector extends Collector {
    data: Report;

    constructor(data: Report) {
        super();
        this.data = data;
    }

    collect = (): ProjectCoverage => {
        return {
            name: this.data.name,
            instructionsCov: rate(Type.Instruction, this.data.counter),
            branchesCov: rate(Type.Branch, this.data.counter),
            complexityRate: rate(Type.Complexity, this.data.counter),
            coveredLinesRate: rate(Type.Line, this.data.counter),
            coveredMethodsRate: rate(Type.Method, this.data.counter),
            coveredClassesRate: rate(Type.Class, this.data.counter),
            packages: this.data.package?.map((e) => new PackageCollector(e).collect()) ?? [],
        };
    };
}
