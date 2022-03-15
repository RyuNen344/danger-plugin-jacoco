const EXPORT_UNIT = {
    PACKAGE: "p",
    FILE: "f",
    CLASS: "c",
    METHOD: "m"
} as const;

type EXPORT_UNIT = typeof EXPORT_UNIT[keyof typeof EXPORT_UNIT];
