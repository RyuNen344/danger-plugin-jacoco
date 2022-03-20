import { ProjectCoverage } from "@/model/coverage/project-coverage";
import { defaultOption, Option } from "@/model/plugin/option";
import { ProjectCoverageProcessor } from "@/processor/coverage/project-processor";
import { XmlProcessor } from "@/processor/file/xml-processor";
import { FilterProcessor } from "@/processor/filter/filter-processor";
import { MarkdownProcessor } from "@/processor/markdown/markdown-processor";
import { DangerReporter } from "@/reporter/danger-reporter";
import { Reporter } from "@/reporter/reporter";
import * as fs from "fs";

const reporter: Reporter = new DangerReporter();

export function jacoco(filePath: string, option: Option = defaultOption) {
    if (!fs.existsSync(filePath)) {
        reporter.error(`could not found jacoco xml file ${filePath}`);

        return;
    }

    let coverage: ProjectCoverage;
    try {
        const xml = fs.readFileSync(filePath);
        const jacoco = XmlProcessor.importXml(xml);
        coverage = new ProjectCoverageProcessor(jacoco.report).invoke();
    } catch (error) {
        reporter.error(error);

        return;
    }

    const projectReport = MarkdownProcessor.projectReport(option.projectCoverageRate, coverage);

    const coverageReport = MarkdownProcessor.coverageReport(
        option.projectCoverageRate,
        FilterProcessor.extractCoverage(option, coverage)
    );
    reporter.markdown(projectReport + coverageReport);
}
