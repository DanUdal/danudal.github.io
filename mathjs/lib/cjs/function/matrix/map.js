"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMap = void 0;
var _applyCallback = require("../../utils/applyCallback.js");
var _factory = require("../../utils/factory.js");
var name = 'map';
var dependencies = ['typed'];
var createMap = /* #__PURE__ */(0, _factory.factory)(name, dependencies, function (_ref) {
  var typed = _ref.typed;
  /**
   * Create a new matrix or array with the results of a callback function executed on
   * each entry of a given matrix/array.
   *
   * For each entry of the input, the callback is invoked with three arguments:
   * the value of the entry, the index at which that entry occurs, and the full
   * matrix/array being traversed. Note that because the matrix/array might be
   * multidimensional, the "index" argument is always an array of numbers giving
   * the index in each dimension. This is true even for vectors: the "index"
   * argument is an array of length 1, rather than simply a number.
   *
   * Syntax:
   *
   *    math.map(x, callback)
   *
   * Examples:
   *
   *    math.map([1, 2, 3], function(value) {
   *      return value * value
   *    })  // returns [1, 4, 9]
   *
   *    // The callback is normally called with three arguments:
   *    //    callback(value, index, Array)
   *    // If you want to call with only one argument, use:
   *    math.map([1, 2, 3], x => math.format(x)) // returns ['1', '2', '3']
   *
   * See also:
   *
   *    filter, forEach, sort
   *
   * @param {Matrix | Array} x    The input to iterate on.
   * @param {Function} callback
   *     The function to call (as described above) on each entry of the input
   * @return {Matrix | array}
   *     Transformed map of x; always has the same type and shape as x
   */
  return typed(name, {
    'Array, function': _map,
    'Matrix, function': function MatrixFunction(x, callback) {
      return x.map(callback);
    }
  });
});

/**
 * Map for a multi dimensional array
 * @param {Array} array
 * @param {Function} callback
 * @return {Array}
 * @private
 */
exports.createMap = createMap;
function _map(array, callback) {
  var recurse = function recurse(value, index) {
    if (Array.isArray(value)) {
      return value.map(function (child, i) {
        // we create a copy of the index array and append the new index value
        return recurse(child, index.concat(i));
      });
    } else {
      // invoke the callback function with the right number of arguments
      return (0, _applyCallback.applyCallback)(callback, value, index, array, 'map');
    }
  };
  return recurse(array, []);
}