"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSetSize = void 0;
var _array = require("../../utils/array.js");
var _factory = require("../../utils/factory.js");
var name = 'setSize';
var dependencies = ['typed', 'compareNatural'];
var createSetSize = /* #__PURE__ */(0, _factory.factory)(name, dependencies, function (_ref) {
  var typed = _ref.typed,
    compareNatural = _ref.compareNatural;
  /**
   * Count the number of elements of a (multi)set. When a second parameter is 'true', count only the unique values.
   * A multi-dimension array will be converted to a single-dimension array before the operation.
   *
   * Syntax:
   *
   *    math.setSize(set)
   *    math.setSize(set, unique)
   *
   * Examples:
   *
   *    math.setSize([1, 2, 2, 4])          // returns 4
   *    math.setSize([1, 2, 2, 4], true)    // returns 3
   *
   * See also:
   *
   *    setUnion, setIntersect, setDifference
   *
   * @param {Array | Matrix} a  A multiset
   * @param {boolean} [unique]  If true, only the unique values are counted. False by default
   * @return {number}           The number of elements of the (multi)set
   */
  return typed(name, {
    'Array | Matrix': function ArrayMatrix(a) {
      return Array.isArray(a) ? (0, _array.flatten)(a).length : (0, _array.flatten)(a.toArray()).length;
    },
    'Array | Matrix, boolean': function ArrayMatrixBoolean(a, unique) {
      if (unique === false || a.length === 0) {
        return Array.isArray(a) ? (0, _array.flatten)(a).length : (0, _array.flatten)(a.toArray()).length;
      } else {
        var b = (0, _array.flatten)(Array.isArray(a) ? a : a.toArray()).sort(compareNatural);
        var count = 1;
        for (var i = 1; i < b.length; i++) {
          if (compareNatural(b[i], b[i - 1]) !== 0) {
            count++;
          }
        }
        return count;
      }
    }
  });
});
exports.createSetSize = createSetSize;