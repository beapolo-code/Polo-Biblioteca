import { sa as ɵɵdefineInjector } from "./_resource-chunk-C-Y-Fu3B.js";
import { Ha as ɵɵdefineNgModule, Nn as NgModule, ki as setClassMetadata } from "./core-6q3cy1tM.js";
import { n as MediaMatcher, t as BreakpointObserver } from "./_breakpoints-observer-chunk-DqBDpENE.js";
//#region node_modules/@angular/cdk/fesm2022/layout.mjs
var LayoutModule = class LayoutModule {
	static ɵfac = function LayoutModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || LayoutModule)();
	};
	static ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({ type: LayoutModule });
	static ɵinj = /* @__PURE__ */ ɵɵdefineInjector({});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutModule, [{
		type: NgModule,
		args: [{}]
	}], null, null);
})();
var Breakpoints = {
	XSmall: "(max-width: 599.98px)",
	Small: "(min-width: 600px) and (max-width: 959.98px)",
	Medium: "(min-width: 960px) and (max-width: 1279.98px)",
	Large: "(min-width: 1280px) and (max-width: 1919.98px)",
	XLarge: "(min-width: 1920px)",
	Handset: "(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)",
	Tablet: "(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",
	Web: "(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)",
	HandsetPortrait: "(max-width: 599.98px) and (orientation: portrait)",
	TabletPortrait: "(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)",
	WebPortrait: "(min-width: 840px) and (orientation: portrait)",
	HandsetLandscape: "(max-width: 959.98px) and (orientation: landscape)",
	TabletLandscape: "(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)",
	WebLandscape: "(min-width: 1280px) and (orientation: landscape)"
};
//#endregion
export { BreakpointObserver, Breakpoints, LayoutModule, MediaMatcher };
