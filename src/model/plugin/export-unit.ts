export const EXPORT_UNIT = {
    PACKAGE: "p",
    FILE: "f",
    CLASS: "c",
    METHOD: "m",
} as const;

export type ExportUnit = typeof EXPORT_UNIT[keyof typeof EXPORT_UNIT];
