import { ExportUnit, EXPORT_UNIT } from "@/model/plugin/export-unit";

export interface Option {
    projectCoverageRate: number;
    exportUnit: ExportUnit;
    excludePackages: string[];
    exportAll: boolean;
}

export const defaultOption: Option = {
    projectCoverageRate: 0,
    exportUnit: EXPORT_UNIT.FILE,
    excludePackages: [],
    exportAll: false,
};
