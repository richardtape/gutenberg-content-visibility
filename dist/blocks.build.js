/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***********************!*\
  !*** ./src/blocks.js ***!
  \***********************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_block_js__ = __webpack_require__(/*! ./block/block.js */ 1);\n/**\n * Gutenberg Blocks\n */\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9ibG9ja3MuanM/N2I1YiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEd1dGVuYmVyZyBCbG9ja3NcbiAqL1xuXG5pbXBvcnQgJy4vYmxvY2svYmxvY2suanMnO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Jsb2Nrcy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/*!****************************!*\
  !*** ./src/block/block.js ***!
  \****************************/
/*! exports provided: addAttribute, withInspectorControl, addSaveProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* unused harmony export addAttribute */\n/* unused harmony export withInspectorControl */\n/* unused harmony export addSaveProps */\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__editor_scss__ = __webpack_require__(/*! ./editor.scss */ 3);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__editor_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__editor_scss__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(/*! lodash */ 4);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n/**\n * Main JS for GCV.\n */\n\n//  Import CSS.\n\n\n/**\n * External dependencies\n */\n\n// import { classnames } from 'classnames';\n\n/**\n * WordPress dependencies\n */\nvar __ = wp.i18n.__;\nvar getWrapperDisplayName = wp.element.getWrapperDisplayName;\nvar addFilter = wp.hooks.addFilter;\nvar TextControl = wp.components.TextControl;\n\n/**\n * Internal dependencies\n */\n\nvar hasBlockSupport = wp.blocks.hasBlockSupport;\nvar InspectorControls = wp.blocks.InspectorControls;\n\n/**\n * Filters registered block settings, extending attributes with anchor using ID\n * of the first node.\n *\n * @param {Object} settings Original block settings.\n *\n * @return {Object} Filtered block settings.\n */\n\nfunction addAttribute(settings) {\n\n\tsettings.attributes = Object(__WEBPACK_IMPORTED_MODULE_1_lodash__[\"assign\"])(settings.attributes, {\n\t\tgcvVisibility: {\n\t\t\ttype: 'string'\n\t\t}\n\t});\n\n\treturn settings;\n}\n\n/**\n * Override the default edit UI to include a new block inspector control for\n * assigning the custom class name, if block supports custom class name.\n *\n * @param {function|Component} BlockEdit Original component.\n *\n * @return {string} Wrapped component.\n */\nfunction withInspectorControl(BlockEdit) {\n\n\tvar WrappedGCV = function WrappedGCV(props) {\n\n\t\tvar hasGCVisibility = hasBlockSupport(props.name, 'customClassName', true);\n\t\tconsole.log(hasGCVisibility);\n\t\tvar thisThing = [wp.element.createElement(BlockEdit, _extends({ key: 'block-edit-visibility' }, props)), hasGCVisibility && wp.element.createElement(\n\t\t\tInspectorControls,\n\t\t\t{ key: 'inspector-visibility' },\n\t\t\twp.element.createElement(TextControl, {\n\t\t\t\tlabel: __('Block Visibility'),\n\t\t\t\tvalue: props.attributes.gcvVisibility || '',\n\t\t\t\tonChange: function onChange(nextValue) {\n\t\t\t\t\tprops.setAttributes({\n\t\t\t\t\t\tgcvVisibility: nextValue\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t})\n\t\t)];\n\n\t\treturn thisThing;\n\t};\n\n\tWrappedGCV.displayName = getWrapperDisplayName(BlockEdit, 'gcvVisibility');\n\n\treturn WrappedGCV;\n}\n\n/**\n * Override props assigned to save component to inject anchor ID, if block\n * supports anchor. This is only applied if the block's save result is an\n * element and not a markup string.\n *\n * @param {Object} extraProps Additional props applied to save element.\n * @param {Object} blockType  Block type.\n * @param {Object} attributes Current block attributes.\n *\n * @return {Object} Filtered props applied to save element.\n */\nfunction addSaveProps(extraProps, blockType, attributes) {\n\n\textraProps.gcvVisibility = attributes.gcvVisibility;\n\t// if ( hasBlockSupport( blockType, 'customClassName', true ) && attributes.gcvVisibility ) {\n\t// extraProps.gcvVisibility = attributes.gcvVisibility;\n\t// }\n\t// extraProps.gcvVisibility = extraProps.gcvVisibility;\n\t// extraProps.gcvVisibility = classnames( extraProps.gcvVisibility, attributes.gcvVisibility );\n\treturn extraProps;\n}\n\naddFilter('blocks.registerBlockType', 'gcv/attribute', addAttribute);\naddFilter('blocks.BlockEdit', 'gcv/inspector-control', withInspectorControl, 5);\naddFilter('blocks.getSaveContent.extraProps', 'gcv/save-props', addSaveProps);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9ibG9jay9ibG9jay5qcz85MjFkIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbi8qKlxuICogTWFpbiBKUyBmb3IgR0NWLlxuICovXG5cbi8vICBJbXBvcnQgQ1NTLlxuaW1wb3J0ICcuL2VkaXRvci5zY3NzJztcblxuLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgYXNzaWduIH0gZnJvbSAnbG9kYXNoJztcbi8vIGltcG9ydCB7IGNsYXNzbmFtZXMgfSBmcm9tICdjbGFzc25hbWVzJztcblxuLyoqXG4gKiBXb3JkUHJlc3MgZGVwZW5kZW5jaWVzXG4gKi9cbnZhciBfXyA9IHdwLmkxOG4uX187XG52YXIgZ2V0V3JhcHBlckRpc3BsYXlOYW1lID0gd3AuZWxlbWVudC5nZXRXcmFwcGVyRGlzcGxheU5hbWU7XG52YXIgYWRkRmlsdGVyID0gd3AuaG9va3MuYWRkRmlsdGVyO1xudmFyIFRleHRDb250cm9sID0gd3AuY29tcG9uZW50cy5UZXh0Q29udHJvbDtcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuXG52YXIgaGFzQmxvY2tTdXBwb3J0ID0gd3AuYmxvY2tzLmhhc0Jsb2NrU3VwcG9ydDtcbnZhciBJbnNwZWN0b3JDb250cm9scyA9IHdwLmJsb2Nrcy5JbnNwZWN0b3JDb250cm9scztcblxuLyoqXG4gKiBGaWx0ZXJzIHJlZ2lzdGVyZWQgYmxvY2sgc2V0dGluZ3MsIGV4dGVuZGluZyBhdHRyaWJ1dGVzIHdpdGggYW5jaG9yIHVzaW5nIElEXG4gKiBvZiB0aGUgZmlyc3Qgbm9kZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0dGluZ3MgT3JpZ2luYWwgYmxvY2sgc2V0dGluZ3MuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBGaWx0ZXJlZCBibG9jayBzZXR0aW5ncy5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkQXR0cmlidXRlKHNldHRpbmdzKSB7XG5cblx0c2V0dGluZ3MuYXR0cmlidXRlcyA9IGFzc2lnbihzZXR0aW5ncy5hdHRyaWJ1dGVzLCB7XG5cdFx0Z2N2VmlzaWJpbGl0eToge1xuXHRcdFx0dHlwZTogJ3N0cmluZydcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBzZXR0aW5ncztcbn1cblxuLyoqXG4gKiBPdmVycmlkZSB0aGUgZGVmYXVsdCBlZGl0IFVJIHRvIGluY2x1ZGUgYSBuZXcgYmxvY2sgaW5zcGVjdG9yIGNvbnRyb2wgZm9yXG4gKiBhc3NpZ25pbmcgdGhlIGN1c3RvbSBjbGFzcyBuYW1lLCBpZiBibG9jayBzdXBwb3J0cyBjdXN0b20gY2xhc3MgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufENvbXBvbmVudH0gQmxvY2tFZGl0IE9yaWdpbmFsIGNvbXBvbmVudC5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFdyYXBwZWQgY29tcG9uZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gd2l0aEluc3BlY3RvckNvbnRyb2woQmxvY2tFZGl0KSB7XG5cblx0dmFyIFdyYXBwZWRHQ1YgPSBmdW5jdGlvbiBXcmFwcGVkR0NWKHByb3BzKSB7XG5cblx0XHR2YXIgaGFzR0NWaXNpYmlsaXR5ID0gaGFzQmxvY2tTdXBwb3J0KHByb3BzLm5hbWUsICdjdXN0b21DbGFzc05hbWUnLCB0cnVlKTtcblx0XHRjb25zb2xlLmxvZyhoYXNHQ1Zpc2liaWxpdHkpO1xuXHRcdHZhciB0aGlzVGhpbmcgPSBbd3AuZWxlbWVudC5jcmVhdGVFbGVtZW50KEJsb2NrRWRpdCwgX2V4dGVuZHMoeyBrZXk6ICdibG9jay1lZGl0LXZpc2liaWxpdHknIH0sIHByb3BzKSksIGhhc0dDVmlzaWJpbGl0eSAmJiB3cC5lbGVtZW50LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRJbnNwZWN0b3JDb250cm9scyxcblx0XHRcdHsga2V5OiAnaW5zcGVjdG9yLXZpc2liaWxpdHknIH0sXG5cdFx0XHR3cC5lbGVtZW50LmNyZWF0ZUVsZW1lbnQoVGV4dENvbnRyb2wsIHtcblx0XHRcdFx0bGFiZWw6IF9fKCdCbG9jayBWaXNpYmlsaXR5JyksXG5cdFx0XHRcdHZhbHVlOiBwcm9wcy5hdHRyaWJ1dGVzLmdjdlZpc2liaWxpdHkgfHwgJycsXG5cdFx0XHRcdG9uQ2hhbmdlOiBmdW5jdGlvbiBvbkNoYW5nZShuZXh0VmFsdWUpIHtcblx0XHRcdFx0XHRwcm9wcy5zZXRBdHRyaWJ1dGVzKHtcblx0XHRcdFx0XHRcdGdjdlZpc2liaWxpdHk6IG5leHRWYWx1ZVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdCldO1xuXG5cdFx0cmV0dXJuIHRoaXNUaGluZztcblx0fTtcblxuXHRXcmFwcGVkR0NWLmRpc3BsYXlOYW1lID0gZ2V0V3JhcHBlckRpc3BsYXlOYW1lKEJsb2NrRWRpdCwgJ2djdlZpc2liaWxpdHknKTtcblxuXHRyZXR1cm4gV3JhcHBlZEdDVjtcbn1cblxuLyoqXG4gKiBPdmVycmlkZSBwcm9wcyBhc3NpZ25lZCB0byBzYXZlIGNvbXBvbmVudCB0byBpbmplY3QgYW5jaG9yIElELCBpZiBibG9ja1xuICogc3VwcG9ydHMgYW5jaG9yLiBUaGlzIGlzIG9ubHkgYXBwbGllZCBpZiB0aGUgYmxvY2sncyBzYXZlIHJlc3VsdCBpcyBhblxuICogZWxlbWVudCBhbmQgbm90IGEgbWFya3VwIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZXh0cmFQcm9wcyBBZGRpdGlvbmFsIHByb3BzIGFwcGxpZWQgdG8gc2F2ZSBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGJsb2NrVHlwZSAgQmxvY2sgdHlwZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyaWJ1dGVzIEN1cnJlbnQgYmxvY2sgYXR0cmlidXRlcy5cbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IEZpbHRlcmVkIHByb3BzIGFwcGxpZWQgdG8gc2F2ZSBlbGVtZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkU2F2ZVByb3BzKGV4dHJhUHJvcHMsIGJsb2NrVHlwZSwgYXR0cmlidXRlcykge1xuXG5cdGV4dHJhUHJvcHMuZ2N2VmlzaWJpbGl0eSA9IGF0dHJpYnV0ZXMuZ2N2VmlzaWJpbGl0eTtcblx0Ly8gaWYgKCBoYXNCbG9ja1N1cHBvcnQoIGJsb2NrVHlwZSwgJ2N1c3RvbUNsYXNzTmFtZScsIHRydWUgKSAmJiBhdHRyaWJ1dGVzLmdjdlZpc2liaWxpdHkgKSB7XG5cdC8vIGV4dHJhUHJvcHMuZ2N2VmlzaWJpbGl0eSA9IGF0dHJpYnV0ZXMuZ2N2VmlzaWJpbGl0eTtcblx0Ly8gfVxuXHQvLyBleHRyYVByb3BzLmdjdlZpc2liaWxpdHkgPSBleHRyYVByb3BzLmdjdlZpc2liaWxpdHk7XG5cdC8vIGV4dHJhUHJvcHMuZ2N2VmlzaWJpbGl0eSA9IGNsYXNzbmFtZXMoIGV4dHJhUHJvcHMuZ2N2VmlzaWJpbGl0eSwgYXR0cmlidXRlcy5nY3ZWaXNpYmlsaXR5ICk7XG5cdHJldHVybiBleHRyYVByb3BzO1xufVxuXG5hZGRGaWx0ZXIoJ2Jsb2Nrcy5yZWdpc3RlckJsb2NrVHlwZScsICdnY3YvYXR0cmlidXRlJywgYWRkQXR0cmlidXRlKTtcbmFkZEZpbHRlcignYmxvY2tzLkJsb2NrRWRpdCcsICdnY3YvaW5zcGVjdG9yLWNvbnRyb2wnLCB3aXRoSW5zcGVjdG9yQ29udHJvbCwgNSk7XG5hZGRGaWx0ZXIoJ2Jsb2Nrcy5nZXRTYXZlQ29udGVudC5leHRyYVByb3BzJywgJ2djdi9zYXZlLXByb3BzJywgYWRkU2F2ZVByb3BzKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9ibG9jay9ibG9jay5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///1\n");

/***/ }),
/* 2 */,
/* 3 */
/*!*******************************!*\
  !*** ./src/block/editor.scss ***!
  \*******************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9ibG9jay9lZGl0b3Iuc2Nzcz80OWQyIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmxvY2svZWRpdG9yLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///3\n");

/***/ }),
/* 4 */
/*!***************************************!*\
  !*** ./node_modules/lodash/lodash.js ***!
  \***************************************/
/*! dynamic exports provided */
/*! exports used: assign */
/***/ (function(module, exports, __webpack_require__) {


/***/ }),
/* 5 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("var g;\r\n\r\n// This works in non-strict mode\r\ng = (function() {\r\n\treturn this;\r\n})();\r\n\r\ntry {\r\n\t// This works if eval is allowed (see CSP)\r\n\tg = g || Function(\"return this\")() || (1,eval)(\"this\");\r\n} catch(e) {\r\n\t// This works if the window reference is available\r\n\tif(typeof window === \"object\")\r\n\t\tg = window;\r\n}\r\n\r\n// g can still be undefined, but nothing to do about it...\r\n// We return undefined, instead of nothing here, so it's\r\n// easier to handle this case. if(!global) { ...}\r\n\r\nmodule.exports = g;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanM/MzY5OCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///5\n");

/***/ }),
/* 6 */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\r\n\tif(!module.webpackPolyfill) {\r\n\t\tmodule.deprecate = function() {};\r\n\t\tmodule.paths = [];\r\n\t\t// module.parent = undefined by default\r\n\t\tif(!module.children) module.children = [];\r\n\t\tObject.defineProperty(module, \"loaded\", {\r\n\t\t\tenumerable: true,\r\n\t\t\tget: function() {\r\n\t\t\t\treturn module.l;\r\n\t\t\t}\r\n\t\t});\r\n\t\tObject.defineProperty(module, \"id\", {\r\n\t\t\tenumerable: true,\r\n\t\t\tget: function() {\r\n\t\t\t\treturn module.i;\r\n\t\t\t}\r\n\t\t});\r\n\t\tmodule.webpackPolyfill = 1;\r\n\t}\r\n\treturn module;\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanM/YzNjMiJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRpZighbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///6\n");

/***/ })
/******/ ]);