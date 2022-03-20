import { importXml } from "@/file/xml-parser";
import { ProjectCoverage } from "@/model/coverage/project-coverage";
import { JaCoCo } from "@/model/jacoco/jacoco";
import { EXPORT_UNIT } from "@/model/plugin/export-unit";
import { defaultOption, Option } from "@/model/plugin/option";
import { ProjectCoverageProcessor } from "@/processor/coverage/project-processor";
import { MarkdownProcessor } from "@/processor/markdown/markdown";
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
        coverage = new ProjectCoverageProcessor(jacoco.report).invoke();
    } catch (error) {
        log.error(error);
        fail("could not parse jacoco xml file");
    }

    log.debug(coverage.name);

    const projectReport = MarkdownProcessor.projectReport(option.projectCoverageRate, coverage);
    let coverageReport: string;
    switch (option.exportUnit) {
        case EXPORT_UNIT.PACKAGE:
            coverageReport = MarkdownProcessor.coverageReport(option.projectCoverageRate, coverage.packages);
            break;
        case EXPORT_UNIT.FILE:
            coverageReport = MarkdownProcessor.coverageReport(option.projectCoverageRate, coverage.packages);
            break;
        case EXPORT_UNIT.CLASS:
            coverageReport = MarkdownProcessor.coverageReport(option.projectCoverageRate, coverage.packages);
            break;
        case EXPORT_UNIT.METHOD:
            coverageReport = MarkdownProcessor.coverageReport(option.projectCoverageRate, coverage.packages);
            break;
    }

    log.debug(projectReport + coverageReport);
}
