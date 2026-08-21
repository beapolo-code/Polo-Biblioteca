import { aa as ɵɵdefineInjector, v as require_operators } from "./_resource-chunk-Bs197SVl.js";
import { Ha as ɵɵdefineNgModule, Nn as NgModule, ki as setClassMetadata } from "./core-7astvhVk.js";
import { g as A11yModule } from "./a11y-2dXFx_gi.js";
import { t as BidiModule } from "./bidi-DpXnHqmA.js";
import { i as CdkScrollableModule } from "./scrolling-CdrI-2b0.js";
import { _ as OverlayModule } from "./overlay-C5l9NVxv.js";
import "./platform-CJtxtLVu.js";
import { a as TOOLTIP_PANEL_CLASS, i as SCROLL_THROTTLE_MS, n as MAT_TOOLTIP_SCROLL_STRATEGY, o as TooltipComponent, r as MatTooltip, s as getMatTooltipInvalidPositionError, t as MAT_TOOLTIP_DEFAULT_OPTIONS } from "./_tooltip-chunk-Bn9dRo8p.js";
require_operators();
var MatTooltipModule = class MatTooltipModule {
	static ɵfac = function MatTooltipModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatTooltipModule)();
	};
	static ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({
		type: MatTooltipModule,
		imports: [
			A11yModule,
			OverlayModule,
			MatTooltip,
			TooltipComponent
		],
		exports: [
			MatTooltip,
			TooltipComponent,
			BidiModule,
			CdkScrollableModule
		]
	});
	static ɵinj = /* @__PURE__ */ ɵɵdefineInjector({ imports: [
		A11yModule,
		OverlayModule,
		BidiModule,
		CdkScrollableModule
	] });
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTooltipModule, [{
		type: NgModule,
		args: [{
			imports: [
				A11yModule,
				OverlayModule,
				MatTooltip,
				TooltipComponent
			],
			exports: [
				MatTooltip,
				TooltipComponent,
				BidiModule,
				CdkScrollableModule
			]
		}]
	}], null, null);
})();
//#endregion
export { MAT_TOOLTIP_DEFAULT_OPTIONS, MAT_TOOLTIP_SCROLL_STRATEGY, MatTooltip, MatTooltipModule, SCROLL_THROTTLE_MS, TOOLTIP_PANEL_CLASS, TooltipComponent, getMatTooltipInvalidPositionError };
