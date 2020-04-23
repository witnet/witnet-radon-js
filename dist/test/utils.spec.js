"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../src/utils");
describe('areSoftEqualArrays', function () {
    it('check if two diffrent arrays return false', function () {
        var arr1 = [1, 2];
        var arr2 = [3, 4];
        expect(utils_1.areSoftEqualArrays(arr1, arr2)).toBe(false);
    });
    it('check if two sorted arrays contains the same items', function () {
        var arr1 = [1, 2, 3, 4, 5];
        var arr2 = [1, 2, 3, 4, 5];
        expect(utils_1.areSoftEqualArrays(arr1, arr2)).toBe(true);
    });
    it('check if two unsorted arrays contains the same items', function () {
        var arr1 = [1, 3, 5, 4, 2];
        var arr2 = [5, 2, 3, 4, 1];
        expect(utils_1.areSoftEqualArrays(arr1, arr2)).toBe(true);
    });
    it('check if two different arrays contains the same items', function () {
        var arr1 = [1, 2, 3, 4, 5];
        var arr2 = [1, 2, 3, 4, 6];
        expect(utils_1.areSoftEqualArrays(arr1, arr2)).toBe(false);
    });
    it('check if two different arrays with repeated items contains the same items', function () {
        var arr1 = [1, 3, 5, 4, 5];
        var arr2 = [5, 2, 3, 4, 1];
        expect(utils_1.areSoftEqualArrays(arr1, arr2)).toBe(false);
    });
    it('check if two different sized arrays contains the same items', function () {
        var arr1 = [1, 3, 5, 4];
        var arr2 = [5, 2, 3, 4, 1];
        expect(utils_1.areSoftEqualArrays(arr1, arr2)).toBe(false);
    });
});
describe('getEnumNames', function () {
    it('initialized', function () {
        var Animal;
        (function (Animal) {
            Animal[Animal["Dog"] = 0] = "Dog";
            Animal[Animal["Cat"] = 1] = "Cat";
        })(Animal || (Animal = {}));
        expect(utils_1.getEnumNames(Animal)).toStrictEqual(['Dog', 'Cat']);
    });
    it('non initialized', function () {
        var Animal;
        (function (Animal) {
            Animal["Dog"] = "dog";
            Animal["Cat"] = "cat";
        })(Animal || (Animal = {}));
        expect(utils_1.getEnumNames(Animal)).toStrictEqual(['Dog', 'Cat']);
    });
});
describe('getEnumValues', function () {
    it('initialized', function () {
        var Animal;
        (function (Animal) {
            Animal["Dog"] = "dog";
            Animal["Cat"] = "cat";
        })(Animal || (Animal = {}));
        expect(utils_1.getEnumValues(Animal)).toStrictEqual(['dog', 'cat']);
    });
    it('non initialized', function () {
        var Animal;
        (function (Animal) {
            Animal[Animal["Dog"] = 0] = "Dog";
            Animal[Animal["Cat"] = 1] = "Cat";
        })(Animal || (Animal = {}));
        expect(utils_1.getEnumValues(Animal)).toStrictEqual(['Dog', 'Cat', 0, 1]);
    });
});
