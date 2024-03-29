"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRound = void 0;
var _factory = require("../../utils/factory.js");
var _collection = require("../../utils/collection.js");
var _matAlgo11xS0s = require("../../type/matrix/utils/matAlgo11xS0s.js");
var _matAlgo12xSfs = require("../../type/matrix/utils/matAlgo12xSfs.js");
var _matAlgo14xDs = require("../../type/matrix/utils/matAlgo14xDs.js");
var _index = require("../../plain/number/index.js");
var NO_INT = 'Number of decimals in function round must be an integer';
var name = 'round';
var dependencies = ['typed', 'matrix', 'equalScalar', 'zeros', 'BigNumber', 'DenseMatrix'];
var createRound = /* #__PURE__ */(0, _factory.factory)(name, dependencies, function (_ref) {
  var typed = _ref.typed,
    matrix = _ref.matrix,
    equalScalar = _ref.equalScalar,
    zeros = _ref.zeros,
    BigNumber = _ref.BigNumber,
    DenseMatrix = _ref.DenseMatrix;
  var matAlgo11xS0s = (0, _matAlgo11xS0s.createMatAlgo11xS0s)({
    typed: typed,
    equalScalar: equalScalar
  });
  var matAlgo12xSfs = (0, _matAlgo12xSfs.createMatAlgo12xSfs)({
    typed: typed,
    DenseMatrix: DenseMatrix
  });
  var matAlgo14xDs = (0, _matAlgo14xDs.createMatAlgo14xDs)({
    typed: typed
  });

  /**
   * Round a value towards the nearest rounded value.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.round(x)
   *    math.round(x, n)
   *
   * Examples:
   *
   *    math.round(3.22)             // returns number 3
   *    math.round(3.82)             // returns number 4
   *    math.round(-4.2)             // returns number -4
   *    math.round(-4.7)             // returns number -5
   *    math.round(3.22, 1)          // returns number 3.2
   *    math.round(3.88, 1)          // returns number 3.9
   *    math.round(-4.21, 1)         // returns number -4.2
   *    math.round(-4.71, 1)         // returns number -4.7
   *    math.round(math.pi, 3)       // returns number 3.142
   *    math.round(123.45678, 2)     // returns number 123.46
   *
   *    const c = math.complex(3.2, -2.7)
   *    math.round(c)                // returns Complex 3 - 3i
   *
   *    math.round([3.2, 3.8, -4.7]) // returns Array [3, 4, -5]
   *
   * See also:
   *
   *    ceil, fix, floor
   *
   * @param  {number | BigNumber | Fraction | Complex | Array | Matrix} x  Number to be rounded
   * @param  {number | BigNumber | Array} [n=0]                            Number of decimals
   * @return {number | BigNumber | Fraction | Complex | Array | Matrix} Rounded value
   */
  return typed(name, {
    number: _index.roundNumber,
    'number, number': _index.roundNumber,
    'number, BigNumber': function numberBigNumber(x, n) {
      if (!n.isInteger()) {
        throw new TypeError(NO_INT);
      }
      return new BigNumber(x).toDecimalPlaces(n.toNumber());
    },
    Complex: function Complex(x) {
      return x.round();
    },
    'Complex, number': function ComplexNumber(x, n) {
      if (n % 1) {
        throw new TypeError(NO_INT);
      }
      return x.round(n);
    },
    'Complex, BigNumber': function ComplexBigNumber(x, n) {
      if (!n.isInteger()) {
        throw new TypeError(NO_INT);
      }
      var _n = n.toNumber();
      return x.round(_n);
    },
    BigNumber: function BigNumber(x) {
      return x.toDecimalPlaces(0);
    },
    'BigNumber, BigNumber': function BigNumberBigNumber(x, n) {
      if (!n.isInteger()) {
        throw new TypeError(NO_INT);
      }
      return x.toDecimalPlaces(n.toNumber());
    },
    Fraction: function Fraction(x) {
      return x.round();
    },
    'Fraction, number': function FractionNumber(x, n) {
      if (n % 1) {
        throw new TypeError(NO_INT);
      }
      return x.round(n);
    },
    'Fraction, BigNumber': function FractionBigNumber(x, n) {
      if (!n.isInteger()) {
        throw new TypeError(NO_INT);
      }
      return x.round(n.toNumber());
    },
    // deep map collection, skip zeros since round(0) = 0
    'Array | Matrix': typed.referToSelf(function (self) {
      return function (x) {
        return (0, _collection.deepMap)(x, self, true);
      };
    }),
    'SparseMatrix, number | BigNumber': typed.referToSelf(function (self) {
      return function (x, y) {
        return matAlgo11xS0s(x, y, self, false);
      };
    }),
    'DenseMatrix, number | BigNumber': typed.referToSelf(function (self) {
      return function (x, y) {
        return matAlgo14xDs(x, y, self, false);
      };
    }),
    'Array, number | BigNumber': typed.referToSelf(function (self) {
      return function (x, y) {
        // use matrix implementation
        return matAlgo14xDs(matrix(x), y, self, false).valueOf();
      };
    }),
    'number | Complex | BigNumber | Fraction, SparseMatrix': typed.referToSelf(function (self) {
      return function (x, y) {
        // check scalar is zero
        if (equalScalar(x, 0)) {
          // do not execute algorithm, result will be a zero matrix
          return zeros(y.size(), y.storage());
        }
        return matAlgo12xSfs(y, x, self, true);
      };
    }),
    'number | Complex | BigNumber | Fraction, DenseMatrix': typed.referToSelf(function (self) {
      return function (x, y) {
        // check scalar is zero
        if (equalScalar(x, 0)) {
          // do not execute algorithm, result will be a zero matrix
          return zeros(y.size(), y.storage());
        }
        return matAlgo14xDs(y, x, self, true);
      };
    }),
    'number | Complex | BigNumber | Fraction, Array': typed.referToSelf(function (self) {
      return function (x, y) {
        // use matrix implementation
        return matAlgo14xDs(matrix(y), x, self, true).valueOf();
      };
    })
  });
});
exports.createRound = createRound;