const COVERAGE_STATUS = {
    OK: '✨',
    BAD: '🔥'
} as const;

type COVERAGE_STATUS = typeof COVERAGE_STATUS[keyof typeof COVERAGE_STATUS];
