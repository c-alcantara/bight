"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_VantaComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/VantaComponent */ \"./src/components/VantaComponent.tsx\");\n/* harmony import */ var _components_Bight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/Bight */ \"./src/components/Bight.tsx\");\n/* harmony import */ var _Interact__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Interact */ \"./src/pages/Interact.tsx\");\n/* harmony import */ var _components_Calcantara__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Calcantara */ \"./src/components/Calcantara.tsx\");\n/* harmony import */ var _private_keys__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/private/keys */ \"./src/private/keys.ts\");\n/* harmony import */ var _components_AudioPlayer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/AudioPlayer */ \"./src/components/AudioPlayer.tsx\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nfunction Home() {\n    _s();\n    const [highColor, setHigh] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(Math.floor(Math.random() * 0xFFFFFF));\n    const [midColor, setMid] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(Math.floor(Math.random() * 0xFFFFFF));\n    const [lowColor, setLow] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0xffffff);\n    const [base, setBase] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0x0);\n    const [speed, setSpeed] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(2);\n    const updateColors = ()=>{\n        setHigh(Math.floor(Math.random() * 0xFFFFFF));\n        setMid(Math.floor(Math.random() * 0xFFFFFF));\n        setLow(Math.floor(Math.random() * 0xFFFFFF));\n        setBase(Math.floor(Math.random() * 0xFFFFFF));\n        setSpeed(20);\n    };\n    const useDefaults = ()=>{\n        setHigh(highColor);\n        setMid(midColor);\n        setLow(lowColor);\n        setBase(base);\n        setSpeed(3);\n    };\n    const key = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>\"\".concat(highColor, \"-\").concat(midColor, \"-\").concat(lowColor, \"-\").concat(base, \"-\").concat(speed), [\n        highColor,\n        midColor,\n        lowColor,\n        base,\n        speed\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"p-6 flex flex-col items-center justify-center h-screen w-100 z-10 relative\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"scale-90 w-full md:w-3/7 lg:w-3/4 mx-auto p-5 z-10\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"fade-in-main bg-white shadow-2xl p-10 rounded-[40px] z-10 relative\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Calcantara__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {}, void 0, false, {\n                            fileName: \"/Users/christianalcantara/Library/Mobile Documents/com~apple~CloudDocs/Code/dev/Bight.ai/src/pages/index.tsx\",\n                            lineNumber: 41,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Bight__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n                            fileName: \"/Users/christianalcantara/Library/Mobile Documents/com~apple~CloudDocs/Code/dev/Bight.ai/src/pages/index.tsx\",\n                            lineNumber: 42,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Interact__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                            updateColors: updateColors,\n                            useDefaults: useDefaults,\n                            assistantId: _private_keys__WEBPACK_IMPORTED_MODULE_6__.keys.assistantID,\n                            apiKey: _private_keys__WEBPACK_IMPORTED_MODULE_6__.keys.openKey\n                        }, void 0, false, {\n                            fileName: \"/Users/christianalcantara/Library/Mobile Documents/com~apple~CloudDocs/Code/dev/Bight.ai/src/pages/index.tsx\",\n                            lineNumber: 43,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/christianalcantara/Library/Mobile Documents/com~apple~CloudDocs/Code/dev/Bight.ai/src/pages/index.tsx\",\n                    lineNumber: 40,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/christianalcantara/Library/Mobile Documents/com~apple~CloudDocs/Code/dev/Bight.ai/src/pages/index.tsx\",\n                lineNumber: 39,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_VantaComponent__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                highColor: highColor,\n                midColor: midColor,\n                lowColor: lowColor,\n                base: base,\n                speed: speed\n            }, void 0, false, {\n                fileName: \"/Users/christianalcantara/Library/Mobile Documents/com~apple~CloudDocs/Code/dev/Bight.ai/src/pages/index.tsx\",\n                lineNumber: 52,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_AudioPlayer__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                voiceChoice: \"piTKgcLEGmPE4e6mEKli\",\n                inputText: '\"Artificial Intelligence is the frontier of digital cognizance',\n                onPlay: updateColors,\n                onEnded: useDefaults\n            }, void 0, false, {\n                fileName: \"/Users/christianalcantara/Library/Mobile Documents/com~apple~CloudDocs/Code/dev/Bight.ai/src/pages/index.tsx\",\n                lineNumber: 59,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/christianalcantara/Library/Mobile Documents/com~apple~CloudDocs/Code/dev/Bight.ai/src/pages/index.tsx\",\n        lineNumber: 38,\n        columnNumber: 5\n    }, this);\n} //, manifesting the ability\n //o//f machines to emulate human intellect and perform\n //tasks autonomously,\n_s(Home, \"147IWzCox3B/Q4FRbGwKWitg4Hk=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvaW5kZXgudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBaUQ7QUFDUTtBQUNsQjtBQUNMO0FBQ2dCO0FBQ1o7QUFDYTtBQUlwQyxTQUFTUzs7SUFDdEIsTUFBTSxDQUFDQyxXQUFXQyxRQUFRLEdBQUdWLCtDQUFRQSxDQUFDVyxLQUFLQyxLQUFLLENBQUNELEtBQUtFLE1BQU0sS0FBSztJQUNqRSxNQUFNLENBQUNDLFVBQVVDLE9BQU8sR0FBR2YsK0NBQVFBLENBQUNXLEtBQUtDLEtBQUssQ0FBQ0QsS0FBS0UsTUFBTSxLQUFLO0lBQy9ELE1BQU0sQ0FBQ0csVUFBVUMsT0FBTyxHQUFHakIsK0NBQVFBLENBQUM7SUFDcEMsTUFBTSxDQUFDa0IsTUFBTUMsUUFBUSxHQUFHbkIsK0NBQVFBLENBQUM7SUFDakMsTUFBTSxDQUFDb0IsT0FBT0MsU0FBUyxHQUFHckIsK0NBQVFBLENBQUM7SUFFbkMsTUFBTXNCLGVBQWU7UUFDbkJaLFFBQVFDLEtBQUtDLEtBQUssQ0FBQ0QsS0FBS0UsTUFBTSxLQUFLO1FBQ25DRSxPQUFPSixLQUFLQyxLQUFLLENBQUNELEtBQUtFLE1BQU0sS0FBSztRQUNsQ0ksT0FBT04sS0FBS0MsS0FBSyxDQUFDRCxLQUFLRSxNQUFNLEtBQUs7UUFDbENNLFFBQVFSLEtBQUtDLEtBQUssQ0FBQ0QsS0FBS0UsTUFBTSxLQUFLO1FBQ25DUSxTQUFTO0lBQ1g7SUFFQSxNQUFNRSxjQUFjO1FBQ2xCYixRQUFRRDtRQUNSTSxPQUFPRDtRQUNQRyxPQUFPRDtRQUNQRyxRQUFRRDtRQUNSRyxTQUFTO0lBQ1g7SUFHQSxNQUFNRyxNQUFNdkIsOENBQU9BLENBQUMsSUFBTSxHQUFnQmEsT0FBYkwsV0FBVSxLQUFlTyxPQUFaRixVQUFTLEtBQWVJLE9BQVpGLFVBQVMsS0FBV0ksT0FBUkYsTUFBSyxLQUFTLE9BQU5FLFFBQVM7UUFBQ1g7UUFBV0s7UUFBVUU7UUFBVUU7UUFBTUU7S0FBTTtJQUUvSCxxQkFDRSw4REFBQ0s7UUFBS0MsV0FBVTs7MEJBQ2QsOERBQUNDO2dCQUFJRCxXQUFVOzBCQUNiLDRFQUFDQztvQkFBSUQsV0FBVTs7c0NBQ2IsOERBQUNyQiw4REFBVUE7Ozs7O3NDQUNYLDhEQUFDRix5REFBS0E7Ozs7O3NDQUNOLDhEQUFDQyxpREFBUUE7NEJBQ1BrQixjQUFjQTs0QkFDZEMsYUFBYUE7NEJBQ2JLLGFBQWF0QiwrQ0FBSUEsQ0FBQ3VCLFdBQVc7NEJBQzdCQyxRQUFReEIsK0NBQUlBLENBQUN5QixPQUFPOzs7Ozs7Ozs7Ozs7Ozs7OzswQkFLMUIsOERBQUM3QixrRUFBY0E7Z0JBQ2JPLFdBQVdBO2dCQUNYSyxVQUFVQTtnQkFDVkUsVUFBVUE7Z0JBQ1ZFLE1BQU1BO2dCQUNORSxPQUFPQTs7Ozs7OzBCQUVULDhEQUFDYiwrREFBV0E7Z0JBQ1p5QixhQUFZO2dCQUNaQyxXQUFVO2dCQUVWQyxRQUFRWjtnQkFDUmEsU0FBU1o7Ozs7Ozs7Ozs7OztBQUlmLEVBS0EsMkJBQTJCO0NBQzNCLHNEQUFzRDtDQUN0RCxxQkFBcUI7R0FoRUdmO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9wYWdlcy9pbmRleC50c3g/MTlhMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZU1lbW8gfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVmFudGFDb21wb25lbnQgZnJvbSBcIkAvY29tcG9uZW50cy9WYW50YUNvbXBvbmVudFwiO1xuaW1wb3J0IEJpZ2h0IGZyb20gJ0AvY29tcG9uZW50cy9CaWdodCc7XG5pbXBvcnQgSW50ZXJhY3QgZnJvbSAnLi9JbnRlcmFjdCc7XG5pbXBvcnQgQ2FsY2FudGFyYSBmcm9tICcuLi9jb21wb25lbnRzL0NhbGNhbnRhcmEnO1xuaW1wb3J0IHsga2V5cyB9IGZyb20gJ0AvcHJpdmF0ZS9rZXlzJztcbmltcG9ydCBBdWRpb1BsYXllciBmcm9tICdAL2NvbXBvbmVudHMvQXVkaW9QbGF5ZXInO1xuaW1wb3J0IHsgUmFuZG9tIH0gZnJvbSAnLi4vY29tcG9uZW50cy9SYW5kb20nO1xuaW1wb3J0IHsgdm9pY2VfaWRzIH0gZnJvbSAnQC9wcml2YXRlL3ZvaWNlX2lkcyc7XG5pbXBvcnQgVG9kYXkgZnJvbSAnQC9jb21wb25lbnRzL1RvZGF5JztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XG4gIGNvbnN0IFtoaWdoQ29sb3IsIHNldEhpZ2hdID0gdXNlU3RhdGUoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMHhGRkZGRkYpKTtcbiAgY29uc3QgW21pZENvbG9yLCBzZXRNaWRdID0gdXNlU3RhdGUoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMHhGRkZGRkYpKTtcbiAgY29uc3QgW2xvd0NvbG9yLCBzZXRMb3ddID0gdXNlU3RhdGUoMHhmZmZmZmYpO1xuICBjb25zdCBbYmFzZSwgc2V0QmFzZV0gPSB1c2VTdGF0ZSgweDApO1xuICBjb25zdCBbc3BlZWQsIHNldFNwZWVkXSA9IHVzZVN0YXRlKDIpO1xuXG4gIGNvbnN0IHVwZGF0ZUNvbG9ycyA9ICgpID0+IHtcbiAgICBzZXRIaWdoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDB4RkZGRkZGKSk7XG4gICAgc2V0TWlkKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDB4RkZGRkZGKSk7XG4gICAgc2V0TG93KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDB4RkZGRkZGKSk7XG4gICAgc2V0QmFzZShNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAweEZGRkZGRikpO1xuICAgIHNldFNwZWVkKDIwKTtcbiAgfTtcblxuICBjb25zdCB1c2VEZWZhdWx0cyA9ICgpID0+IHtcbiAgICBzZXRIaWdoKGhpZ2hDb2xvcik7XG4gICAgc2V0TWlkKG1pZENvbG9yKTtcbiAgICBzZXRMb3cobG93Q29sb3IpO1xuICAgIHNldEJhc2UoYmFzZSk7XG4gICAgc2V0U3BlZWQoMyk7XG4gIH07XG5cblxuICBjb25zdCBrZXkgPSB1c2VNZW1vKCgpID0+IGAke2hpZ2hDb2xvcn0tJHttaWRDb2xvcn0tJHtsb3dDb2xvcn0tJHtiYXNlfS0ke3NwZWVkfWAsIFtoaWdoQ29sb3IsIG1pZENvbG9yLCBsb3dDb2xvciwgYmFzZSwgc3BlZWRdKTtcblxuICByZXR1cm4gKFxuICAgIDxtYWluIGNsYXNzTmFtZT1cInAtNiBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBoLXNjcmVlbiB3LTEwMCB6LTEwIHJlbGF0aXZlXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNjYWxlLTkwIHctZnVsbCBtZDp3LTMvNyBsZzp3LTMvNCBteC1hdXRvIHAtNSB6LTEwXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmFkZS1pbi1tYWluIGJnLXdoaXRlIHNoYWRvdy0yeGwgcC0xMCByb3VuZGVkLVs0MHB4XSB6LTEwIHJlbGF0aXZlXCI+XG4gICAgICAgICAgPENhbGNhbnRhcmEgLz5cbiAgICAgICAgICA8QmlnaHQgLz5cbiAgICAgICAgICA8SW50ZXJhY3RcbiAgICAgICAgICAgIHVwZGF0ZUNvbG9ycz17dXBkYXRlQ29sb3JzfVxuICAgICAgICAgICAgdXNlRGVmYXVsdHM9e3VzZURlZmF1bHRzfVxuICAgICAgICAgICAgYXNzaXN0YW50SWQ9e2tleXMuYXNzaXN0YW50SUR9XG4gICAgICAgICAgICBhcGlLZXk9e2tleXMub3BlbktleX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgey8qIEtleSB0aGUgVmFudGFDb21wb25lbnQgdG8gZm9yY2UgcmUtcmVuZGVyIHdoZW4gcHJvcHMgY2hhbmdlICovfVxuICAgICAgPFZhbnRhQ29tcG9uZW50XG4gICAgICAgIGhpZ2hDb2xvcj17aGlnaENvbG9yfVxuICAgICAgICBtaWRDb2xvcj17bWlkQ29sb3J9XG4gICAgICAgIGxvd0NvbG9yPXtsb3dDb2xvcn1cbiAgICAgICAgYmFzZT17YmFzZX1cbiAgICAgICAgc3BlZWQ9e3NwZWVkfVxuICAgICAgLz5cbiAgICAgIDxBdWRpb1BsYXllclxuICAgICAgdm9pY2VDaG9pY2U9J3BpVEtnY0xFR21QRTRlNm1FS2xpJ1xuICAgICAgaW5wdXRUZXh0PSdcIkFydGlmaWNpYWwgSW50ZWxsaWdlbmNlIGlzIHRoZSBmcm9udGllclxuICAgICAgb2YgZGlnaXRhbCBjb2duaXphbmNlJ1xuICAgICAgb25QbGF5PXt1cGRhdGVDb2xvcnN9XG4gICAgICBvbkVuZGVkPXt1c2VEZWZhdWx0c31cbiAgICAgID48L0F1ZGlvUGxheWVyPlxuICAgIDwvbWFpbj5cbiAgKTtcbn1cblxuXG5cblxuLy8sIG1hbmlmZXN0aW5nIHRoZSBhYmlsaXR5XG4vL28vL2YgbWFjaGluZXMgdG8gZW11bGF0ZSBodW1hbiBpbnRlbGxlY3QgYW5kIHBlcmZvcm1cbi8vdGFza3MgYXV0b25vbW91c2x5LFxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VNZW1vIiwiVmFudGFDb21wb25lbnQiLCJCaWdodCIsIkludGVyYWN0IiwiQ2FsY2FudGFyYSIsImtleXMiLCJBdWRpb1BsYXllciIsIkhvbWUiLCJoaWdoQ29sb3IiLCJzZXRIaWdoIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibWlkQ29sb3IiLCJzZXRNaWQiLCJsb3dDb2xvciIsInNldExvdyIsImJhc2UiLCJzZXRCYXNlIiwic3BlZWQiLCJzZXRTcGVlZCIsInVwZGF0ZUNvbG9ycyIsInVzZURlZmF1bHRzIiwia2V5IiwibWFpbiIsImNsYXNzTmFtZSIsImRpdiIsImFzc2lzdGFudElkIiwiYXNzaXN0YW50SUQiLCJhcGlLZXkiLCJvcGVuS2V5Iiwidm9pY2VDaG9pY2UiLCJpbnB1dFRleHQiLCJvblBsYXkiLCJvbkVuZGVkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n"));

/***/ })

});