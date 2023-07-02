"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lyapDocs = void 0;
var lyapDocs = {
  name: 'lyap',
  category: 'Matrix',
  syntax: ['lyap(A,Q)'],
  description: 'Solves the Continuous-time Lyapunov equation AP+PA\'+Q=0 for P',
  examples: ['lyap([[-2, 0], [1, -4]], [[3, 1], [1, 3]])', 'lyap(A,Q)'],
  seealso: ['schur', 'sylvester']
};
exports.lyapDocs = lyapDocs;