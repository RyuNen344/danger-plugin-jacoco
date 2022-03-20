import { MethodCoverage } from "@/model/coverage/method-coverage";

export interface ClassCoverage extends MethodCoverage {
    sourceFileName?: string;
    methods: MethodCoverage[];
}
