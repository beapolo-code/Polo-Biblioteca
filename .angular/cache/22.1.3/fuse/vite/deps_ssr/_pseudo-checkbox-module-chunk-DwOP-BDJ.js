import { aa as ɵɵdefineInjector } from "./_resource-chunk-Bs197SVl.js";
import { Ha as ɵɵdefineNgModule, Nn as NgModule, ki as setClassMetadata } from "./core-7astvhVk.js";
import { t as BidiModule } from "./bidi-DpXnHqmA.js";
import { t as MatPseudoCheckbox } from "./_pseudo-checkbox-chunk-Dwg6ofOX.js";
//#region node_modules/@angular/material/fesm2022/_pseudo-checkbox-module-chunk.mjs
var MatPseudoCheckboxModule = class MatPseudoCheckboxModule {
	static ɵfac = function MatPseudoCheckboxModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatPseudoCheckboxModule)();
	};
	static ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({
		type: MatPseudoCheckboxModule,
		imports: [MatPseudoCheckbox],
		exports: [MatPseudoCheckbox, BidiModule]
	});
	static ɵinj = /* @__PURE__ */ ɵɵdefineInjector({ imports: [BidiModule] });
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPseudoCheckboxModule, [{
		type: NgModule,
		args: [{
			imports: [MatPseudoCheckbox],
			exports: [MatPseudoCheckbox, BidiModule]
		}]
	}], null, null);
})();
//#endregion
export { MatPseudoCheckboxModule as t };
