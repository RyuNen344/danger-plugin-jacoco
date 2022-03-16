import { MethodCoverage } from "@/model/coverage/method_coverage";

export interface ClassCoverage extends MethodCoverage {
    methods: MethodCoverage[];
}
