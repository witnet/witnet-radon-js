export declare type Locale = 'en' | 'es';
export declare class I18n {
    private i18n;
    constructor(defaultLocale?: Locale);
    setLocale(locale: Locale): void;
    t(key: string, value?: Record<string, string | number>): string;
}
//# sourceMappingURL=i18n.d.ts.map