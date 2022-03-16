import { Collector, rate } from "@/collector/collector";
import { ClassCollector } from "@/collector/collector_class";
import { SourceFileCollector } from "@/collector/collector_source_file";
import { PackageCoverage } from "@/model/coverage/package_coverage";
import { Package } from "@/model/jacoco/package";
import { Type } from "@/model/jacoco/type";

export class PackageCollector extends Collector {
    data: Package;

    constructor(data: Package) {
        super();
        this.data = data;
    }

    collect = (): PackageCoverage => {
        return {
            name: this.data.name,
            instructionsCov: rate(Type.Instruction, this.data.counter),
            branchesCov: rate(Type.Branch, this.data.counter),
            complexityRate: rate(Type.Complexity, this.data.counter),
            coveredLinesRate: rate(Type.Line, this.data.counter),
            coveredMethodsRate: rate(Type.Method, this.data.counter),
            coveredClassesRate: rate(Type.Class, this.data.counter),
            classes: this.data.class?.map((e) => new ClassCollector(e).collect()) ?? [],
            sourceFiles: this.data.sourceFile?.map((e) => new SourceFileCollector(e).collect()) ?? [],
        };
    };
}
