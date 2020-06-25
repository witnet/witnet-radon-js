"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Source = void 0;
var types_1 = require("./types");
var script_1 = require("./script");
var Source = /** @class */ (function () {
    function Source(cache, source) {
        this.id = cache.insert(this).id;
        this.cache = cache;
        this.kind = source.kind || 'HTTP-GET';
        this.url = source.url || '';
        this.contentType = source.contentType || 'JSON API';
        this.script = new script_1.Script(cache, source.script, types_1.OutputType.String);
    }
    Source.prototype.getJs = function (index) {
        var script = this.script.getJs();
        return "const source_" + index + " = new Witnet.Source(\"" + this.url + "\")\n        " + script;
    };
    Source.prototype.getMir = function () {
        return {
            kind: this.kind,
            url: this.url,
            contentType: this.contentType,
            script: this.script.getMir(),
        };
    };
    Source.prototype.getMarkup = function () {
        return {
            kind: this.kind,
            url: this.url,
            contentType: this.contentType,
            script: this.script.getMarkup(),
            scriptId: this.script.scriptId,
        };
    };
    Source.prototype.getOutputType = function () {
        return this.script.getOutputType();
    };
    Source.prototype.update = function (args) {
        var _a = args.kind, kind = _a === void 0 ? this.kind : _a, _b = args.url, url = _b === void 0 ? this.url : _b, _c = args.contentType, contentType = _c === void 0 ? this.contentType : _c;
        this.kind = kind;
        this.url = url;
        this.contentType = contentType;
    };
    return Source;
}());
exports.Source = Source;
