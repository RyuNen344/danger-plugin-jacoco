import { Method } from "@/model/jacoco/method";
import { Type } from "@/model/jacoco/type";
import { MethodCoverageProcessor } from "@/processor/coverage/method-processor";
import { Logger } from "tslog";

const log = new Logger();

describe("creation markdown table row string from coverage", () => {
    test("should success a.xml", () => {
        const method: Method = {
            name: "invokeSuspend",
            desc: "(Ljava/lang/Object;)Ljava/lang/Object;",
            line: 58,
            counter: [
                {
                    covered: 6440,
                    missed: 16833,
                    type: Type.Instruction,
                },
                {
                    covered: 948,
                    missed: 2784,
                    type: Type.Line,
                },
                {
                    covered: 401,
                    missed: 1501,
                    type: Type.Complexity,
                },
                {
                    covered: 324,
                    missed: 909,
                    type: Type.Method,
                },
                {
                    covered: 94,
                    missed: 320,
                    type: Type.Branch,
                },
            ],
        };

        const coverage = new MethodCoverageProcessor(method).invoke();
        log.debug(coverage.branchesCov);
    });
});
