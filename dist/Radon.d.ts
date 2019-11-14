import { Markup, Mir, MirScript, MirOperator, OperatorInfo, OperatorCode, MirArgument, MarkupOption, MarkupSelectedOption, MarkupInput, FilterArgument, OutputType, Reducer, CacheRef, MarkupSource, MarkupScript, MarkupOperator, MarkupArgument, CachedMarkupSelectedOption, CachedArgument, CachedMarkup, CachedMarkupSelect, CachedMarkupScript, CachedMarkupOperator } from './types';
export declare class Radon {
    private cache;
    private cachedMarkup;
    constructor(mir?: Mir);
    wrapResultInCache(result: Markup | CachedMarkupSelect | CachedMarkupSelectedOption | CachedArgument): CacheRef;
    unwrapResultFromCache(ref: CacheRef): MarkupInput | Markup | CachedMarkupSelect | CachedMarkupSelectedOption;
    mir2markup(mir: Mir): CachedMarkup;
    getMir(): Mir;
    getMarkup(): Markup;
    generateMarkupScript(script: MirScript): CachedMarkupScript;
    generateMarkupOperator(operator: MirOperator): CachedMarkupOperator;
    generateSelectedOption(operatorInfo: OperatorInfo, code: OperatorCode, args: Array<MirArgument> | null): CachedMarkupSelectedOption;
    generateOperatorArguments(operatorInfo: OperatorInfo, args: Array<MirArgument>): Array<CacheRef>;
    generateInputArgument(value: string | number | boolean): MarkupInput;
    generateFilterArgument(label: string, filter: FilterArgument): CachedMarkupSelect;
    generateReducerArgument(label: string, reducer: Reducer): CachedMarkupSelect;
    generateSelectedFilterArgument(filterArgument: FilterArgument): CachedMarkupSelectedOption;
    generateSelectedReducerArgument(reducer: Reducer): MarkupSelectedOption;
    unwrapSource(source: CacheRef): MarkupSource;
    unwrapScript(script: Array<CacheRef>): MarkupScript;
    unwrapOperator(operator: CachedMarkupOperator, id: number): MarkupOperator;
    unwrapSelectedOption(selectedOption: CacheRef): MarkupSelectedOption;
    unwrapArgument(arg: CacheRef): MarkupArgument;
    findOutputType(code: OperatorCode): OutputType | Array<OutputType>;
    getMirOperatorInfo(operator: MirOperator): {
        code: OperatorCode;
        args: Array<MirArgument> | null;
    };
    generateMarkupOptions(operatorInfo: OperatorInfo, _code: OperatorCode, _args: Array<MirArgument> | null): Array<MarkupOption>;
}
//# sourceMappingURL=Radon.d.ts.map