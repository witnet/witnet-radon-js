import { Reducer, OutputType, MarkupOption, MarkupSelectedOption, MarkupInput, MarkupSelect, MarkupOperator, Markup, OperatorCode, MirArgument, MirOperator, MirScript, Mir, GeneratedMarkupScript, OperatorInfo, FilterArgument } from './types';
export declare function mir2markup(mir: Mir): Markup;
export declare function generateMarkupScript(script: MirScript, cache: any): GeneratedMarkupScript;
export declare function generateMarkupOperator(operator: MirOperator): MarkupOperator;
export declare function generateMarkupOptions(operatorInfo: OperatorInfo, _code: OperatorCode, _args: Array<MirArgument> | null): Array<MarkupOption>;
export declare function generateSelectedOption(operatorInfo: OperatorInfo, code: OperatorCode, args: Array<MirArgument> | null): MarkupSelectedOption;
export declare function generateOperatorArguments(operatorInfo: OperatorInfo, args: Array<MirArgument>): Array<MarkupInput | MarkupSelect>;
export declare function generateFilterArgumentOptions(): Array<MarkupOption>;
export declare function generateReducerArgumentOptions(): Array<MarkupOption>;
export declare function generateSelectedFilterArgument(filterArgument: FilterArgument): MarkupSelectedOption;
export declare function generateSelectedReducerArgument(reducer: Reducer): MarkupSelectedOption;
export declare function findOutputType(code: OperatorCode): OutputType | Array<OutputType>;
export declare function getMirOperatorInfo(operator: MirOperator): {
    code: OperatorCode;
    args: Array<MirArgument> | null;
};
//# sourceMappingURL=mir2markup.d.ts.map