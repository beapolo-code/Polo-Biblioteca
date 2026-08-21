import { aa as ɵɵdefineInjector, v as require_operators } from "./_resource-chunk-Bs197SVl.js";
import { Ha as ɵɵdefineNgModule, Nn as NgModule, ki as setClassMetadata } from "./core-7astvhVk.js";
import { k as ObserversModule } from "./a11y-2dXFx_gi.js";
import { t as BidiModule } from "./bidi-DpXnHqmA.js";
import "./platform-CJtxtLVu.js";
import "./observers-private-DK_CCqui.js";
import { a as MAT_SUFFIX, c as MatFormFieldControl, d as MatPrefix, f as MatSuffix, h as getMatFormFieldPlaceholderConflictError, i as MAT_PREFIX, l as MatHint, m as getMatFormFieldMissingControlError, n as MAT_FORM_FIELD, o as MatError, p as getMatFormFieldDuplicatedHintError, r as MAT_FORM_FIELD_DEFAULT_OPTIONS, s as MatFormField, t as MAT_ERROR, u as MatLabel } from "./_form-field-chunk-BdH_Exe6.js";
require_operators();
var MatFormFieldModule = class MatFormFieldModule {
	static ɵfac = function MatFormFieldModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatFormFieldModule)();
	};
	static ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({
		type: MatFormFieldModule,
		imports: [
			ObserversModule,
			MatFormField,
			MatLabel,
			MatError,
			MatHint,
			MatPrefix,
			MatSuffix
		],
		exports: [
			MatFormField,
			MatLabel,
			MatHint,
			MatError,
			MatPrefix,
			MatSuffix,
			BidiModule
		]
	});
	static ɵinj = /* @__PURE__ */ ɵɵdefineInjector({ imports: [
		ObserversModule,
		MatFormField,
		BidiModule
	] });
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldModule, [{
		type: NgModule,
		args: [{
			imports: [
				ObserversModule,
				MatFormField,
				MatLabel,
				MatError,
				MatHint,
				MatPrefix,
				MatSuffix
			],
			exports: [
				MatFormField,
				MatLabel,
				MatHint,
				MatError,
				MatPrefix,
				MatSuffix,
				BidiModule
			]
		}]
	}], null, null);
})();
//#endregion
export { MAT_ERROR, MAT_FORM_FIELD, MAT_FORM_FIELD_DEFAULT_OPTIONS, MAT_PREFIX, MAT_SUFFIX, MatError, MatFormField, MatFormFieldControl, MatFormFieldModule, MatHint, MatLabel, MatPrefix, MatSuffix, getMatFormFieldDuplicatedHintError, getMatFormFieldMissingControlError, getMatFormFieldPlaceholderConflictError };
