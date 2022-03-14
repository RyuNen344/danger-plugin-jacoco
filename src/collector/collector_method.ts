import { Collector, rate } from "@/collector/collector";
import { MethodCoverage } from "@/model/coverage/method_coverage";
import { Method } from "@/model/jacoco/method";
import { Type } from "@/model/jacoco/type";

export class MethodCollector extends Collector {

    data: Method

    constructor(data: Method) {
        super();
        this.data = data;
    }

    collect = (): MethodCoverage => {
        return {
            name: this.data.name,
            instructionsCov: rate(Type.Instruction, this.data.counter),
            branchesCov: rate(Type.Branch, this.data.counter),
            complexityRate: rate(Type.Complexity, this.data.counter),
            coveredLinesRate: rate(Type.Line, this.data.counter),
            coveredMethodsRate: rate(Type.Method, this.data.counter),
            coveredClassesRate: rate(Type.Class, this.data.counter)
        };
    }
}
