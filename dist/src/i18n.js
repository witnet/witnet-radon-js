"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18n = void 0;
var rosetta_1 = __importDefault(require("rosetta"));
var en_1 = require("./locales/en");
var es_1 = require("./locales/es");
var DEFAULT_LOCALE = 'en';
var I18n = /** @class */ (function () {
    function I18n(defaultLocale) {
        if (defaultLocale === void 0) { defaultLocale = DEFAULT_LOCALE; }
        var i18n = rosetta_1.default({
            en: en_1.en,
            es: es_1.es,
        });
        i18n.locale(defaultLocale);
        this.i18n = i18n;
    }
    I18n.prototype.setLocale = function (locale) {
        this.i18n.locale(locale);
    };
    I18n.prototype.t = function (key, value) {
        return this.i18n.t(key, value);
    };
    return I18n;
}());
exports.I18n = I18n;
