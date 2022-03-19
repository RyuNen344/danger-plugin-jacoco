import { MethodCoverage } from "@/model/coverage/method-coverage";

export interface ClassCoverage extends MethodCoverage {
    methods: MethodCoverage[];
}
