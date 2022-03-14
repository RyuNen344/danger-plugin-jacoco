import { Collector, rate } from "@/collector/collector";
import { MethodCollector } from "@/collector/collector_method";
import { ClassCoverage } from "@/model/coverage/class_coverage";
import { Class } from "@/model/jacoco/class";
import { Type } from "@/model/jacoco/type";

export class ClassCollector extends Collector {

    data: Class

    constructor(data: Class) {
        super();
        this.data = data;
    }

    collect = (): ClassCoverage => {
        return {
            name: this.data.name,
            instructionsCov: rate(Type.Instruction, this.data.counter),
            branchesCov: rate(Type.Branch, this.data.counter),
            complexityRate: rate(Type.Complexity, this.data.counter),
            coveredLinesRate: rate(Type.Line, this.data.counter),
            coveredMethodsRate: rate(Type.Method, this.data.counter),
            coveredClassesRate: rate(Type.Class, this.data.counter),
            methods: this.data.method?.map((e) => new MethodCollector(e).collect()) ?? []
        };
    }
}
