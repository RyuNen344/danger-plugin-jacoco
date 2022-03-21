export const COVERAGE_STATUS = {
    OK: "✨",
    BAD: "🔥",
} as const;

export type CoverageStatus = typeof COVERAGE_STATUS[keyof typeof COVERAGE_STATUS];
