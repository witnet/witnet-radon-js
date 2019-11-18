# Witnet Radon Javascript Library

**Allows transform requests to a format that facilitates create UI that manipulates requests**

## Installation

You can simply add the `witnet-radon-js` package as a
dependency with npm:

```console
npm install witnet-radon-js 
```

or

```console
yarn add witnet-radon-js 
```


## Usage

`witnet-radon-js` exports three utilities:
- **mir2markup** function
- **markup2mir** function
- **Radon** class

### mir2markup
WIP

### markup2mir
WIP

### Radon class
This class exposes the following methods:

- getMir()
- getMarkup()
- addSource()
- deleteSource(index: number)
- updateSource(url: string, index: number)
- updateMarkup(id: number, value: number | string | boolean)
- pushOperator(scriptId: number)

## License

`witnet-radon-js` is published under the [MIT license][license].

[license]: https://github.com/witnet/witnet-radon-js/blob/master/LICENSE
