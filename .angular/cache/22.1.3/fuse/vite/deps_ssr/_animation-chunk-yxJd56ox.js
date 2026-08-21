import { W as InjectionToken, y as ANIMATION_MODULE_TYPE, yr as inject } from "./_resource-chunk-Bs197SVl.js";
import { n as MediaMatcher } from "./_breakpoints-observer-chunk-BIvIL4Yo.js";
//#region node_modules/@angular/material/fesm2022/_animation-chunk.mjs
var MATERIAL_ANIMATIONS = new InjectionToken("MATERIAL_ANIMATIONS");
var reducedMotion = null;
function _getAnimationsState() {
	if (inject(MATERIAL_ANIMATIONS, { optional: true })?.animationsDisabled || inject(ANIMATION_MODULE_TYPE, { optional: true }) === "NoopAnimations") return "di-disabled";
	reducedMotion ??= inject(MediaMatcher).matchMedia("(prefers-reduced-motion)").matches;
	return reducedMotion ? "reduced-motion" : "enabled";
}
function _animationsDisabled() {
	return _getAnimationsState() !== "enabled";
}
//#endregion
export { _animationsDisabled as n, _getAnimationsState as r, MATERIAL_ANIMATIONS as t };
