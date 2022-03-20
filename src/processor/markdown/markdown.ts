import { Coverage } from "@/model/coverage/coverage";
import { CoverageStatus, COVERAGE_STATUS } from "@/model/coverage/coverage-status";
import { ProjectCoverage } from "@/model/coverage/project-coverage";

export type MarkdownStr = string;

export class MarkdownProcessor {
    private static readonly MARKDOWN_TABLE_HEADER =
        "| name | c0 cov(%) | c1 cov(%) | complexity(%) | line(%) | methods(%) | class(%) | status |\n";

    private static readonly MARKDOWN_TABLE_DIVIDER = "| --- | --- | --- | --- | --- | --- | --- | --- |\n";

    public static projectReport(minRate: number, coverage: ProjectCoverage): MarkdownStr {
        return [
            `## JaCoCo Report\n`,
            `### \`${coverage.name}\`'s Coverages are `,
            `**${coverage.instructionsCov != null ? coverage.instructionsCov.toFixed(2) : "N/A"}%** (c0) and `,
            `**${coverage.branchesCov != null ? coverage.branchesCov.toFixed(2) : "N/A"}%** (c1) `,
            `${status(minRate, coverage.instructionsCov, coverage.branchesCov)} `,
            `\n`,
        ].join("");
    }

    public static coverageReport(minRate: number, coverages: Coverage[]): MarkdownStr {
        return [this.MARKDOWN_TABLE_HEADER, this.MARKDOWN_TABLE_DIVIDER]
            .concat(coverages.map((e) => coverageRow(minRate, e)))
            .join("");
    }
}

export const coverageRow = (minRate: number, coverage: Coverage): MarkdownStr => {
    const row = [
        `| \`${coverage.name}\` `,
        `| **${coverage.instructionsCov != null ? coverage.instructionsCov.toFixed(2) : "N/A"}** `,
        `| **${coverage.branchesCov != null ? coverage.branchesCov.toFixed(2) : "N/A"}** `,
        `| ${coverage.complexityRate != null ? coverage.complexityRate.toFixed(2) : "N/A"} `,
        `| ${coverage.coveredLinesRate != null ? coverage.coveredLinesRate.toFixed(2) : "N/A"} `,
        `| ${coverage.coveredMethodsRate != null ? coverage.coveredMethodsRate.toFixed(2) : "N/A"} `,
        `| ${coverage.coveredClassesRate != null ? coverage.coveredClassesRate.toFixed(2) : "N/A"} `,
        `| ${status(minRate, coverage.instructionsCov, coverage.branchesCov)} `,
        `|\n`,
    ];

    return row.join("");
};

export const status = (minimun: number, c0rate?: number, c1rate?: number): CoverageStatus => {
    if (c0rate == null && c1rate == null) {
        // either of coverage, must be not null
        return COVERAGE_STATUS.BAD;
    } else if (c0rate != null && c0rate >= minimun) {
        return COVERAGE_STATUS.OK;
    } else if (c1rate != null && c1rate >= minimun) {
        return COVERAGE_STATUS.OK;
    } else {
        return COVERAGE_STATUS.BAD;
    }
};
