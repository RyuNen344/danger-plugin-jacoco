import { ClassCoverage } from "@/model/coverage/class-coverage";
import { Class } from "@/model/jacoco/class";
import { Type } from "@/model/jacoco/type";
import { CoverageProcessor, rate } from "@/processor/coverage/coverage-processor";
import { MethodCoverageProcessor } from "@/processor/coverage/method-processor";

export class ClassCoverageProcessor extends CoverageProcessor {
    data: Class;
    packageName: string;

    constructor(data: Class, packageName: string) {
        super();
        this.data = data;
        this.packageName = packageName;
    }

    invoke = (): ClassCoverage => {
        return {
            name: this.data.name,
            sourceFileName: this.data.sourceFileName,
            instructionsCov: rate(Type.Instruction, this.data.counter),
            branchesCov: rate(Type.Branch, this.data.counter),
            complexityRate: rate(Type.Complexity, this.data.counter),
            coveredLinesRate: rate(Type.Line, this.data.counter),
            coveredMethodsRate: rate(Type.Method, this.data.counter),
            coveredClassesRate: rate(Type.Class, this.data.counter),
            methods:
                this.data.method?.map((e) =>
                    new MethodCoverageProcessor(e, this.data.name).invoke()
                ) ?? [],
        };
    };
}
