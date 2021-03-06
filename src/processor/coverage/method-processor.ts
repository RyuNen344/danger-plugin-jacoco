import { MethodCoverage } from "@/model/coverage/method-coverage";
import { Method } from "@/model/jacoco/method";
import { Type } from "@/model/jacoco/type";
import { CoverageProcessor, rate } from "@/processor/coverage/coverage-processor";

export class MethodCoverageProcessor extends CoverageProcessor {
    data: Method;
    className: string;

    constructor(data: Method, className: string) {
        super();
        this.data = data;
        this.className = className;
    }

    invoke = (): MethodCoverage => {
        return {
            name: this.className + "#" + this.data.name,
            instructionsCov: rate(Type.Instruction, this.data.counter),
            branchesCov: rate(Type.Branch, this.data.counter),
            complexityRate: rate(Type.Complexity, this.data.counter),
            coveredLinesRate: rate(Type.Line, this.data.counter),
            coveredMethodsRate: rate(Type.Method, this.data.counter),
            coveredClassesRate: rate(Type.Class, this.data.counter),
        };
    };
}
