import { ProjectCollector } from "@/collector/collector_project";
import { importXml } from "@/file/parser_xml";
import { ProjectCoverage } from "@/model/coverage/project_coverage";
import { JaCoCo } from "@/model/jacoco/jacoco";
import { defaultOption, Option } from "@/model/plugin/option";
import * as fs from "fs";
import { Logger } from "tslog";

const log: Logger = new Logger();

export function jacoco(filePath: string, option: Option = defaultOption) {
    log.debug("import xml file " + filePath);

    if (!fs.existsSync(filePath)) {
        log.error(`could not found jacoco xml file ${filePath}`);
        fail(`could not found jacoco xml file ${filePath}`);
    }

    let coverage: ProjectCoverage;
    try {
        const xml: Buffer = fs.readFileSync(filePath);
        const jacoco: JaCoCo = importXml(xml);
        coverage = new ProjectCollector(jacoco.report).collect();
    } catch (error) {
        log.error(error);
        fail("could not parse jacoco xml file");
    }

    log.debug(coverage.name);

    const fuga = "| name | c0 cov(%) | c1 cov(%) | complexity(%) | line(%) | methods(%) | class(%) | status |";

    switch (option.exportUnit) {
        case EXPORT_UNIT.PACKAGE:
            break;
        case EXPORT_UNIT.FILE:
            break;
        case EXPORT_UNIT.CLASS:
            break;
        case EXPORT_UNIT.METHOD:
            break;
    }
}
