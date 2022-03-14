import { MethodCollector } from '@/collector/collector_method';
import { ProjectCollector } from '@/collector/collector_project';
import { importXml } from '@/file/parser_xml';
import { Method } from '@/model/jacoco/method';
import { Type } from '@/model/jacoco/type';
import * as fs from 'fs';
import { Logger } from 'tslog';

const log = new Logger();

describe("import xml file and deserialize it", () => {
    test('should success modeling from xml', () => {
        let xml = fs.readFileSync("test/__resource__/sample_jacoco_dagashi.xml")
        let jacoco = importXml(xml);

        let coverage = new ProjectCollector(jacoco.report).collect();
        log.debug('name ' + coverage.name);
        log.debug('instructionsCov ' + coverage.instructionsCov);
        log.debug('branchesCov ' + coverage.branchesCov);
        log.debug('complexityRate ' + coverage.complexityRate);
        log.debug('coveredLinesRate ' + coverage.coveredLinesRate);
        log.debug('coveredMethodsRate ' + coverage.coveredMethodsRate);
        log.debug('coveredClassesRate ' + coverage.coveredClassesRate);
    });

    test('should success a.xml', () => {
        let method: Method = {
            name: "invokeSuspend",
            desc: "(Ljava/lang/Object;)Ljava/lang/Object;",
            line: 58,
            counter: [
                {
                    covered: 6440,
                    missed: 16833,
                    type: Type.Instruction
                },
                {
                    covered: 948,
                    missed: 2784,
                    type: Type.Line
                },
                {
                    covered: 401,
                    missed: 1501,
                    type: Type.Complexity
                },
                {
                    covered: 324,
                    missed: 909,
                    type: Type.Method
                }
            ]
        };

        let collcetor = new MethodCollector(method);
        let coverage = collcetor.collect();
        log.debug(coverage.name);
        log.debug(coverage.instructionsCov);
        log.debug(coverage.branchesCov);
        log.debug(coverage.complexityRate);
        log.debug(coverage.coveredLinesRate);
        log.debug(coverage.coveredMethodsRate);
        log.debug(coverage.coveredClassesRate);
    });
});
