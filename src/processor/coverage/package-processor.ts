import { PackageCoverage } from "@/model/coverage/package_coverage";
import { Package } from "@/model/jacoco/package";
import { Type } from "@/model/jacoco/type";
import { ClassCoverageProcessor } from "@/processor/coverage/class-processor";
import { CoverageProcessor, rate } from "@/processor/coverage/coverage-processor";
import { SourceFileCoverageProcessor } from "@/processor/coverage/source-file-processor";

export class PackageCoverageProcessor extends CoverageProcessor {
    data: Package;

    constructor(data: Package) {
        super();
        this.data = data;
    }

    invoke = (): PackageCoverage => {
        return {
            name: this.data.name,
            instructionsCov: rate(Type.Instruction, this.data.counter),
            branchesCov: rate(Type.Branch, this.data.counter),
            complexityRate: rate(Type.Complexity, this.data.counter),
            coveredLinesRate: rate(Type.Line, this.data.counter),
            coveredMethodsRate: rate(Type.Method, this.data.counter),
            coveredClassesRate: rate(Type.Class, this.data.counter),
            classes: this.data.class?.map((e) => new ClassCoverageProcessor(e).invoke()) ?? [],
            sourceFiles: this.data.sourceFile?.map((e) => new SourceFileCoverageProcessor(e).invoke()) ?? [],
        };
    };
}
