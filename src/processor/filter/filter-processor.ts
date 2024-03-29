// Provides dev-time type structures for  `danger` - doesn't affect runtime.
import { Coverage } from "@/model/coverage/coverage";
import { PackageCoverage } from "@/model/coverage/package-coverage";
import { ProjectCoverage } from "@/model/coverage/project-coverage";
import { EXPORT_UNIT } from "@/model/plugin/export-unit";
import { Option } from "@/model/plugin/option";
import { DangerDSLType } from "danger/distribution/dsl/DangerDSL";

// eslint-disable-next-line no-var
declare var danger: DangerDSLType;

export class FilterProcessor {
    public static extractCoverage(option: Option, projectCoverage: ProjectCoverage): Coverage[] {
        const packageExcluded = this.filterPackage(option.excludePackages, projectCoverage);
        const displayFiles: string[] = [...danger.git.created_files, ...danger.git.modified_files]
            .filter((e) => e.endsWith(".kt") || e.endsWith(".java") || e.endsWith(".scala"));

        switch (option.exportUnit) {
            case EXPORT_UNIT.PACKAGE:
                return this.extractPackages(!option.exportAll, displayFiles, packageExcluded);
            case EXPORT_UNIT.FILE:
                return this.extractFiles(!option.exportAll, displayFiles, packageExcluded);
            case EXPORT_UNIT.CLASS:
                return this.extractClasses(!option.exportAll, displayFiles, packageExcluded);
            case EXPORT_UNIT.METHOD:
                return this.extractMethods(!option.exportAll, displayFiles, packageExcluded);
        }
    }

    private static filterPackage(excludePackages: string[], projectCoverage: ProjectCoverage): PackageCoverage[] {
        return projectCoverage.packages.filter((e) => !excludePackages.includes(e.name));
    }

    private static extractPackages(
        isEnabledFileNameFilter: boolean,
        displayFiles: string[],
        packageCoverages: PackageCoverage[]
    ): Coverage[] {
        if (isEnabledFileNameFilter) {
            return packageCoverages.filter((p) => displayFiles.find((v) => v.includes(p.name)));
        } else {
            return packageCoverages;
        }
    }

    private static extractFiles(
        isEnabledFileNameFilter: boolean,
        displayFiles: string[],
        packageCoverages: PackageCoverage[]
    ): Coverage[] {
        const sourceFileCoverages = packageCoverages.flatMap((e) => e.sourceFiles);
        if (isEnabledFileNameFilter) {
            return sourceFileCoverages.filter((e) => displayFiles.map((e) => e.split("/")[e.split("/").length - 1]).includes(e.name.split("/")[e.name.split("/").length - 1]));
        } else {
            return sourceFileCoverages;
        }
    }

    private static extractClasses(
        isEnabledFileNameFilter: boolean,
        displayFiles: string[],
        packageCoverages: PackageCoverage[]
    ): Coverage[] {
        const classCoverages = packageCoverages.flatMap((e) => e.classes);
        if (isEnabledFileNameFilter) {
            return classCoverages.filter((e) => e.sourceFileName != null && displayFiles.map((e) => e.split("/")[e.split("/").length - 1]).includes(e.sourceFileName));
        } else {
            return classCoverages;
        }
    }

    private static extractMethods(
        isEnabledFileNameFilter: boolean,
        displayFiles: string[],
        packageCoverages: PackageCoverage[]
    ): Coverage[] {
        const classCoverages = packageCoverages.flatMap((e) => e.classes);
        if (isEnabledFileNameFilter) {
            return classCoverages
                .filter((e) => e.sourceFileName != null && displayFiles.map((e) => e.split("/")[e.split("/").length - 1]).includes(e.sourceFileName))
                .flatMap((e) => e.methods);
        } else {
            return classCoverages.flatMap((e) => e.methods);
        }
    }
}
