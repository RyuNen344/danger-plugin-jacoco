# danger-plugin-jacoco

> Add your JaCoCo reports to Danger.

## Usage

Install:

```sh
yarn add @ryunen344/danger-plugin-jacoco -D
```

At a glance:

```ts
// dangerfile.ts
import jacoco from '@ryunen344/danger-plugin-jacoco'

jacoco("path to xml file") // With optional Option
```

Configuration:
```ts
export interface Option {
    /**
     * If c0 or c1 is below value, will display mark.
     * default 0
     */
    projectCoverageRate: number;

    /**
     * option has PACKAGE, FILE, CLASS, METHOD
     * default FILE
     */ 
    exportUnit: ExportUnit;

    /**
     * If set, will not export set packages.
     */ 
    excludePackages: string[];

    /**
     * If set to false, only modified files results export.
     * If set to true, all results export.
     * 
     * Default: false
     */
    exportAll: boolean;
}

```

## Sample Table
```md
## JaCoCo Report
### `Dagashi`'s Coverages are **27.67%** (c0) and **16.83%** (c1) ✨
| name | c0 cov(%) | c1 cov(%) | complexity(%) | line(%) | methods(%) | class(%) | status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `com/ryunen344/dagashi/ui/web/viewmodel/WebViewModel_Factory.java` | **N/A** | **N/A** | N/A | N/A | N/A | N/A | 🔥 |
| `com/ryunen344/dagashi/ui/web/viewmodel/WebViewModel_HiltModules.java` | **0.00** | **N/A** | 0.00 | 0.00 | 0.00 | 0.00 | ✨ |
| `com/ryunen344/dagashi/ui/web/viewmodel/WebViewModel.kt` | **0.00** | **N/A** | 0.00 | 0.00 | 0.00 | 0.00 | ✨ |
| `com/ryunen344/dagashi/ui/web/viewmodel/WebViewModelInput.kt` | **N/A** | **N/A** | N/A | N/A | N/A | N/A | 🔥 |
| `com/ryunen344/dagashi/ui/web/viewmodel/WebViewModelOutput.kt` | **N/A** | **N/A** | N/A | N/A | N/A | N/A | 🔥 |
```

## Changelog

See the GitHub [release history](https://github.com/RyuNen344/danger-plugin-jacoco/releases)


## License

[MIT](./LICENSE)
