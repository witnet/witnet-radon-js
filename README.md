# Witnet Radon Javascript Library

**Utility library that allows transform requests to a format that facilitates create UI that manipulates requests**

## Installation

You can simply add the `witnet-radon-js` package as a
dependency with npm:

```console
pnpm add witnet-radon-js
```


## Usage

`witnet-radon-js` exports four classes:
- **Radon**
- **Source**
- **Script**
- **Operator**

### Radon
It has the following methods:

- getMir(): MirRequest
- getMarkup(): MarkupRequest
- updateSource(sourceIndex: number, { kind: string, url: string }): void
- deleteSource(index: number): void
- update(id: number, value: any): void
- addOperator(scriptId: number): void
- addSource(scriptId: number): void

## Source
It has the following methods:

- update(args: { kind: string, url: string }): void
- getMir(): MirSource
- getMarkup(): MarkupSource
- getOutputType(): OutputType

## Script
It has the following methods:

- getMir(): MirScript
- getMarkup(): MarkupScript
- validateScript (): MarkupSource
- onChildrenEvent(): { emit: Function }
- getOutputType(): OutputType
- getLastOperator(): Operator | null
- push(operator: MirOperator): void
- addOperator(): void

## Operator
It has the following methods:

  - update(value: OperatorName | OperatorCode): void
  - getMir(): MirOperator
  - getMarkup: MarkupOperator

## Argument
It has the following methods:

  - getMir(): MirArgument
  - getMarkup(): MarkupOperator
  - update(value: string | number | boolean | Filter): void

## License

`witnet-radon-js` is published under the [GPL-3.0][license].

[license]: https://github.com/witnet/witnet-radon-js/blob/master/LICENSE
