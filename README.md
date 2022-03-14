# danger-plugin-jacoco

# 欲しいオプション
- 表示を無視するクラス
- 全部出すのか modifiedのクラスのみ出すのか
- 表示する単位
  - project is always
  - package, class, method
- minimum c0, c1 cov percentage

missed instructions
Type.Instructionのcovered / (covered + missed)

missed branch
Type.Branchのcovered / (covered + missed)

complexy
lines
methods
classes
missed, (covered + missed)を表示させるだけ

dangerのgitうんちゃらから.ktファイルと.javaファイルを全部取り出す
com/ryunen344/dagashi/ui/web/viewmodel/WebViewModel
👆をテーブルとして表示して上げるためには
```ts
class[].filter((e) => new Regex(完全位置 or _が続く or $が続く or Ktが続く).test(e.name)).map((e) => e.hogehoge)
```
でデータを整えてあげる必要がある


## 表示されるテーブル
| name | c0 cov(%) | c1 cov(%) | complexity(%) | line(%) | methods(%) | class(%) | status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| package or class or method name | percentage of instructions cov | percentage of branches | percentage of complexity rate | percentage of covered lines | percentage of covered methods | percentage of covered classes | c0 and c1 is over minimum rate |
| `com/ryunen344/Hoge` | 30.65% | 35.65% | 50.65% | 66.66% | 33.33% | N/A | --- |
| `com/ryunen344/Hoge` | 30.65% | 35.65% | 50.65% | 66.66% | 33.33% | N/A | :fire: |
| `com/ryunen344/Hoge` | 30.65% | 35.65% | 50.65% | 66.66% | 33.33% | N/A | :sparkles: |
