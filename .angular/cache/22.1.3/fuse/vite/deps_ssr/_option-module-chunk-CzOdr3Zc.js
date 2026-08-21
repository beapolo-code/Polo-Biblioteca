import { aa as ɵɵdefineInjector } from "./_resource-chunk-Bs197SVl.js";
import { Ha as ɵɵdefineNgModule, Nn as NgModule, ki as setClassMetadata } from "./core-7astvhVk.js";
import { t as BidiModule } from "./bidi-DpXnHqmA.js";
import { i as MatOption, r as MatOptgroup } from "./_option-chunk-CmpgZUJH.js";
import { t as MatRippleModule } from "./_ripple-module-chunk-Dm39qw5_.js";
import { t as MatPseudoCheckboxModule } from "./_pseudo-checkbox-module-chunk-DwOP-BDJ.js";
//#region node_modules/@angular/material/fesm2022/_option-module-chunk.mjs
var MatOptionModule = class MatOptionModule {
	static ɵfac = function MatOptionModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatOptionModule)();
	};
	static ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({
		type: MatOptionModule,
		imports: [
			MatRippleModule,
			MatPseudoCheckboxModule,
			MatOption,
			MatOptgroup
		],
		exports: [
			MatOption,
			MatOptgroup,
			BidiModule
		]
	});
	static ɵinj = /* @__PURE__ */ ɵɵdefineInjector({ imports: [
		MatRippleModule,
		MatPseudoCheckboxModule,
		MatOption,
		BidiModule
	] });
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatOptionModule, [{
		type: NgModule,
		args: [{
			imports: [
				MatRippleModule,
				MatPseudoCheckboxModule,
				MatOption,
				MatOptgroup
			],
			exports: [
				MatOption,
				MatOptgroup,
				BidiModule
			]
		}]
	}], null, null);
})();
//#endregion
export { MatOptionModule as t };
