"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Radon = void 0;
var types_1 = require("./types");
var structures_1 = require("./structures");
var source_1 = require("./source");
var aggregationTallyScript_1 = require("./aggregationTallyScript");
var utils_1 = require("./utils");
var Radon = /** @class */ (function () {
    function Radon(radRequest) {
        var _this = this;
        this.cache = new structures_1.Cache();
        this.timelock = radRequest.timelock;
        this.retrieve = radRequest.retrieve.map(function (source) { return new source_1.Source(_this.cache, source); });
        this.aggregate = new aggregationTallyScript_1.AggregationTallyScript(this.cache, radRequest.aggregate);
        this.tally = new aggregationTallyScript_1.AggregationTallyScript(this.cache, radRequest.tally);
    }
    Radon.prototype.addOperator = function (scriptId) {
        ;
        this.cache.get(scriptId).addOperator();
    };
    Radon.prototype.addSource = function () {
        this.retrieve.push(new source_1.Source(this.cache, {
            url: '',
            script: [types_1.OperatorCode.StringAsFloat],
            kind: 'HTTP-GET',
            contentType: 'JSON API',
        }));
    };
    Radon.prototype.deleteOperator = function (scriptId, operatorId) {
        ;
        this.cache.get(scriptId).deleteOperator(operatorId);
    };
    Radon.prototype.deleteSource = function (sourceIndex) {
        this.retrieve.splice(sourceIndex, 1);
    };
    Radon.prototype.getJs = function () {
        var sourcesDeclaration = this.retrieve
            .map(function (source, index) { return "" + source.getJs(index); })
            .join('\n');
        var aggregatorDeclaration = this.aggregate.getJs('aggregator');
        var tallyDeclaration = this.tally.getJs('tally');
        var addSources = this.retrieve
            .map(function (_, index) { return '.addSource(source_' + index + ')\n'; })
            .join('');
        var js = "import * as Witnet from \"witnet-requests\"\n\n                const request = new Witnet.Request()\n\n                " + sourcesDeclaration + "\n\n                " + aggregatorDeclaration + "\n\n                " + tallyDeclaration + "\n\n                const request = new Witnet.Request()\n                  " + addSources + "\n                  .setAggregator(aggregator) // Set the aggregator function\n                  .setTally(tally) // Set the tally function\n                  .setQuorum(4, 70) // Set witness count\n                  .setFees(10, 1, 1, 1) // Set economic incentives\n                  .schedule(0) // Make this request immediately solvable\n\n                export { request as default }";
        return utils_1.formatJs(js);
    };
    Radon.prototype.getMarkup = function () {
        return {
            timelock: this.timelock,
            retrieve: this.retrieve.map(function (source) { return source.getMarkup(); }),
            aggregate: this.aggregate.getMarkup(),
            tally: this.tally.getMarkup(),
        };
    };
    Radon.prototype.getMir = function () {
        return {
            timelock: this.timelock,
            retrieve: this.retrieve.map(function (source) { return source.getMir(); }),
            aggregate: this.aggregate.getMir(),
            tally: this.tally.getMir(),
        };
    };
    // TODO: Remove any
    Radon.prototype.update = function (id, value) {
        ;
        this.cache.get(id).update(value);
    };
    Radon.prototype.updateSource = function (sourceIndex, args) {
        this.retrieve[sourceIndex].update(args);
    };
    return Radon;
}());
exports.Radon = Radon;
