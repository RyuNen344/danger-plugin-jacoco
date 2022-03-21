import { Method } from "@/model/jacoco/method";
import { Type } from "@/model/jacoco/type";
import { MethodCoverageProcessor } from "@/processor/coverage/method-processor";
import { ProjectCoverageProcessor } from "@/processor/coverage/project-processor";
import { XmlProcessor } from "@/processor/file/xml-processor";
import * as fs from "fs";
import { Logger } from "tslog";

const log = new Logger();

describe("import xml file and deserialize it", () => {
    test("should success modeling from xml", () => {
        const xml = fs.readFileSync("test/__resource__/sample_jacoco_dagashi.xml");
        const jacoco = XmlProcessor.importXml(xml);

        const coverage = new ProjectCoverageProcessor(jacoco.report).invoke();
        log.debug(coverage.name);
        log.debug(`instructionsCov ${coverage.instructionsCov != null ? coverage.instructionsCov : "N/A"}`);
        log.debug(`branchesCov ${coverage.branchesCov != null ? coverage.branchesCov : "N/A"}`);
        log.debug(`complexityRate ${coverage.complexityRate != null ? coverage.complexityRate : "N/A"}`);
        log.debug(`coveredLinesRate ${coverage.coveredLinesRate != null ? coverage.coveredLinesRate : "N/A"}`);
        log.debug(`coveredMethodsRate ${coverage.coveredMethodsRate != null ? coverage.coveredMethodsRate : "N/A"}`);
        log.debug(`coveredClassesRate ${coverage.coveredClassesRate != null ? coverage.coveredClassesRate : "N/A"}`);
    });

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

        const collcetor = new MethodCoverageProcessor(method, "name");
        const coverage = collcetor.invoke();
        log.debug(coverage.branchesCov);
    });
});
