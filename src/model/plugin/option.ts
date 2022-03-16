export interface Option {
    projectCoverageRate: number;
    exportUnit: EXPORT_UNIT;
    excludePackages: string[];
}

export const defaultOption: Option = {
    projectCoverageRate: 0,
    exportUnit: EXPORT_UNIT.FILE,
    excludePackages: [],
};
