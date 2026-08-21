import { sa as ɵɵdefineInjector } from "./_resource-chunk-C-Y-Fu3B.js";
import { Ha as ɵɵdefineNgModule, Nn as NgModule, ki as setClassMetadata } from "./core-6q3cy1tM.js";
import { g as A11yModule } from "./a11y-BYGjGAmT.js";
import { t as BidiModule } from "./bidi-DGXAf4Fl.js";
import { i as CdkScrollableModule } from "./scrolling-DnPVSn-1.js";
import { _ as OverlayModule } from "./overlay-FPQ-HiBT.js";
import "./portal-BitIpHHV.js";
import "./platform-pIv6KcdS.js";
import { a as TOOLTIP_PANEL_CLASS, i as SCROLL_THROTTLE_MS, n as MAT_TOOLTIP_SCROLL_STRATEGY, o as TooltipComponent, r as MatTooltip, s as getMatTooltipInvalidPositionError, t as MAT_TOOLTIP_DEFAULT_OPTIONS } from "./_tooltip-chunk-Dr6zdv43.js";
//#region node_modules/@angular/material/fesm2022/tooltip.mjs
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
