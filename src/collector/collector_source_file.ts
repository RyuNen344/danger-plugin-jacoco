import { Collector, rate } from "@/collector/collector";
import { SourceFileCoverage } from "@/model/coverage/source_file_coverage";
import { SourceFile } from "@/model/jacoco/source_file";
import { Type } from "@/model/jacoco/type";

export class SourceFileCollector extends Collector {
    data: SourceFile;

    constructor(data: SourceFile) {
        super();
        this.data = data;
    }

    collect = (): SourceFileCoverage => {
        return {
            name: this.data.name,
            instructionsCov: rate(Type.Instruction, this.data.counter),
            branchesCov: rate(Type.Branch, this.data.counter),
            complexityRate: rate(Type.Complexity, this.data.counter),
            coveredLinesRate: rate(Type.Line, this.data.counter),
            coveredMethodsRate: rate(Type.Method, this.data.counter),
            coveredClassesRate: rate(Type.Class, this.data.counter),
        };
    };
}
