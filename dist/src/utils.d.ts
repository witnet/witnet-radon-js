import { ArgumentInfo, MarkupInputType, MirArgumentType, MarkupArgumentType, MirOperator, OperatorCode, MirArgument, OutputType, Type, OperatorName } from './types';
import { Operator } from './operator';
export declare function areSoftEqualArrays(arr1: any[], arr2: any[]): boolean;
export declare function areValidConsecutiveOperators(operators: Array<Operator>, idx: number): boolean;
export declare function fromOutputTypeToType(type: OutputType): Type | null;
export declare function getEnumNames(e: any): Array<any>;
export declare function getEnumValues(e: any): Array<any>;
export declare function getMarkupInputTypeFromArgumentType(argumentType: MirArgumentType): MarkupInputType;
export declare function getOperatorCodeFromOperatorName(name: OperatorName): OperatorCode;
export declare function getArgumentInfoType(info: ArgumentInfo): MarkupArgumentType;
export declare function getDefaultMirArgumentByType(type: MirArgumentType): MirArgument;
export declare function getDefaultMirOperatorByType(type: Type): MirOperator;
export declare function getMirOperatorInfo(operator: MirOperator): {
    code: OperatorCode;
    args: Array<MirArgument>;
};
export declare function isArrayType(type: OutputType): boolean;
export declare function isBooleanType(type: OutputType): boolean;
export declare function isBytesType(type: OutputType): boolean;
export declare function isFloatType(type: OutputType): boolean;
export declare function isIntegerType(type: OutputType): boolean;
export declare function isMapType(type: OutputType): boolean;
export declare function isStringType(type: OutputType): boolean;
//# sourceMappingURL=utils.d.ts.map