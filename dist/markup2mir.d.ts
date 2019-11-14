import { ArgumentInfo, Filter, Markup, MarkupArgument, MarkupOperator, MarkupScript, MarkupSource, Mir, MirArgument, MirOperator, MirScript, MirSource, OperatorCode, OperatorName, Reducer } from './types';
export declare function markup2mir(markup: Markup): Mir;
export declare function generateMirSources(markupSources: Array<MarkupSource>): Array<MirSource>;
export declare function generateMirScript(markupScript: MarkupScript): MirScript;
export declare function generateMirOperator(operatorCode: OperatorCode, args: Array<MirArgument> | null): MirOperator;
export declare function generateMirArguments(operator: MarkupOperator, operatorCode: OperatorCode): Array<MirArgument> | null;
export declare function generateMirArgument(argument: MarkupArgument, argumentInfo: ArgumentInfo): MirArgument;
export declare function getFilterCode(name: Filter): Filter;
export declare function getReducerCode(name: Reducer): Reducer;
export declare function findOperatorCode(name: OperatorName, optionNames: Array<string>): OperatorCode;
//# sourceMappingURL=markup2mir.d.ts.map