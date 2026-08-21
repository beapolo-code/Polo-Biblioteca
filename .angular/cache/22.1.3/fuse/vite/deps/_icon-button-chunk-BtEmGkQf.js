import { U as InjectionToken, et as NgZone, xr as inject } from "./_resource-chunk-C-Y-Fu3B.js";
import { Ba as ɵɵdefineComponent, Jt as Component, Ka as ɵɵdomElement, O as booleanAttribute, Sn as Input, Uo as ɵɵprojection, Va as ɵɵdefineDirective, Wn as Renderer2, Wo as ɵɵprojectionDef, X as input, Xa as ɵɵdomElementEnd, Xi as ɵɵadvance, Za as ɵɵdomElementStart, aa as ɵɵclassMap, ca as ɵɵconditional, fn as ElementRef, ia as ɵɵattribute, ki as setClassMetadata, oa as ɵɵclassProp, pr as ViewEncapsulation, qi as ɵɵInheritDefinitionFeature, rt as numberAttribute, ua as ɵɵconditionalCreate, un as Directive } from "./core-6q3cy1tM.js";
import { M as FocusMonitor } from "./a11y-BYGjGAmT.js";
import { t as _CdkPrivateStyleLoader } from "./_style-loader-chunk-BBV-YoQ1.js";
import { n as _animationsDisabled } from "./_animation-chunk-B9gYO1iN.js";
import { t as _StructuralStylesLoader } from "./_structural-styles-chunk-C6ogbapj.js";
import { t as MatRippleLoader } from "./_ripple-loader-chunk-CXcZ3p_i.js";
//#region node_modules/@angular/material/fesm2022/_icon-button-chunk.mjs
var _c0 = ["*", [[
	"",
	"progressIndicator",
	""
]]];
var _c1 = ["*", "[progressIndicator]"];
function MatIconButton_Conditional_2_Template(rf, ctx) {
	if (rf & 1) {
		ɵɵdomElementStart(0, "div", 1);
		ɵɵprojection(1, 1);
		ɵɵdomElementEnd();
	}
}
var MAT_BUTTON_CONFIG = new InjectionToken("MAT_BUTTON_CONFIG");
function transformTabIndex(value) {
	return value == null ? void 0 : numberAttribute(value);
}
var MatButtonBase = class MatButtonBase {
	_elementRef = inject(ElementRef);
	_ngZone = inject(NgZone);
	_animationsDisabled = _animationsDisabled();
	_config = inject(MAT_BUTTON_CONFIG, { optional: true });
	_focusMonitor = inject(FocusMonitor);
	_cleanupClick;
	_renderer = inject(Renderer2);
	_rippleLoader = inject(MatRippleLoader);
	_isAnchor;
	_isFab = false;
	color;
	get disableRipple() {
		return this._disableRipple;
	}
	set disableRipple(value) {
		this._disableRipple = value;
		this._updateRippleDisabled();
	}
	_disableRipple = false;
	get disabled() {
		return this._disabled;
	}
	set disabled(value) {
		this._disabled = value;
		this._updateRippleDisabled();
	}
	_disabled = false;
	ariaDisabled;
	disabledInteractive;
	tabIndex;
	set _tabindex(value) {
		this.tabIndex = value;
	}
	showProgress = input(false, {
		...ngDevMode ? { debugName: "showProgress" } : {},
		transform: booleanAttribute
	});
	constructor() {
		inject(_CdkPrivateStyleLoader).load(_StructuralStylesLoader);
		const element = this._elementRef.nativeElement;
		this._isAnchor = element.tagName === "A";
		this.disabledInteractive = this._config?.disabledInteractive ?? false;
		this.color = this._config?.color ?? null;
		this._rippleLoader?.configureRipple(element, { className: "mat-mdc-button-ripple" });
	}
	ngAfterViewInit() {
		this._focusMonitor.monitor(this._elementRef, true);
		if (this._isAnchor) this._setupAsAnchor();
	}
	ngOnDestroy() {
		this._cleanupClick?.();
		this._focusMonitor.stopMonitoring(this._elementRef);
		this._rippleLoader?.destroyRipple(this._elementRef.nativeElement);
	}
	focus(origin = "program", options) {
		if (origin) this._focusMonitor.focusVia(this._elementRef.nativeElement, origin, options);
		else this._elementRef.nativeElement.focus(options);
	}
	_getAriaDisabled() {
		if (this.ariaDisabled != null) return this.ariaDisabled;
		if (this._isAnchor) return this.disabled || null;
		return this.disabled && this.disabledInteractive ? true : null;
	}
	_getDisabledAttribute() {
		return this.disabledInteractive || !this.disabled ? null : true;
	}
	_updateRippleDisabled() {
		this._rippleLoader?.setDisabled(this._elementRef.nativeElement, this.disableRipple || this.disabled);
	}
	_getTabIndex() {
		if (this._isAnchor) return this.disabled && !this.disabledInteractive ? -1 : this.tabIndex;
		return this.tabIndex;
	}
	_setupAsAnchor() {
		this._cleanupClick = this._ngZone.runOutsideAngular(() => this._renderer.listen(this._elementRef.nativeElement, "click", (event) => {
			if (this.disabled) {
				event.preventDefault();
				event.stopImmediatePropagation();
			}
		}));
	}
	static ɵfac = function MatButtonBase_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatButtonBase)();
	};
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: MatButtonBase,
		hostAttrs: [1, "mat-mdc-button-base"],
		hostVars: 15,
		hostBindings: function MatButtonBase_HostBindings(rf, ctx) {
			if (rf & 2) {
				ɵɵattribute("disabled", ctx._getDisabledAttribute())("aria-disabled", ctx._getAriaDisabled())("tabindex", ctx._getTabIndex());
				ɵɵclassMap(ctx.color ? "mat-" + ctx.color : "");
				ɵɵclassProp("mat-mdc-button-progress-indicator-shown", ctx.showProgress())("mat-mdc-button-disabled", ctx.disabled)("mat-mdc-button-disabled-interactive", ctx.disabledInteractive)("mat-unthemed", !ctx.color)("_mat-animation-noopable", ctx._animationsDisabled);
			}
		},
		inputs: {
			color: "color",
			disableRipple: [
				2,
				"disableRipple",
				"disableRipple",
				booleanAttribute
			],
			disabled: [
				2,
				"disabled",
				"disabled",
				booleanAttribute
			],
			ariaDisabled: [
				2,
				"aria-disabled",
				"ariaDisabled",
				booleanAttribute
			],
			disabledInteractive: [
				2,
				"disabledInteractive",
				"disabledInteractive",
				booleanAttribute
			],
			tabIndex: [
				2,
				"tabIndex",
				"tabIndex",
				transformTabIndex
			],
			_tabindex: [
				2,
				"tabindex",
				"_tabindex",
				transformTabIndex
			],
			showProgress: [1, "showProgress"]
		}
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatButtonBase, [{
		type: Directive,
		args: [{ host: {
			"class": "mat-mdc-button-base",
			"[class]": "color ? \"mat-\" + color : \"\"",
			"[class.mat-mdc-button-progress-indicator-shown]": "showProgress()",
			"[attr.disabled]": "_getDisabledAttribute()",
			"[attr.aria-disabled]": "_getAriaDisabled()",
			"[attr.tabindex]": "_getTabIndex()",
			"[class.mat-mdc-button-disabled]": "disabled",
			"[class.mat-mdc-button-disabled-interactive]": "disabledInteractive",
			"[class.mat-unthemed]": "!color",
			"[class._mat-animation-noopable]": "_animationsDisabled"
		} }]
	}], () => [], {
		color: [{ type: Input }],
		disableRipple: [{
			type: Input,
			args: [{ transform: booleanAttribute }]
		}],
		disabled: [{
			type: Input,
			args: [{ transform: booleanAttribute }]
		}],
		ariaDisabled: [{
			type: Input,
			args: [{
				transform: booleanAttribute,
				alias: "aria-disabled"
			}]
		}],
		disabledInteractive: [{
			type: Input,
			args: [{ transform: booleanAttribute }]
		}],
		tabIndex: [{
			type: Input,
			args: [{ transform: transformTabIndex }]
		}],
		_tabindex: [{
			type: Input,
			args: [{
				alias: "tabindex",
				transform: transformTabIndex
			}]
		}],
		showProgress: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showProgress",
				required: false
			}]
		}]
	});
})();
var MatIconButton = class MatIconButton extends MatButtonBase {
	constructor() {
		super();
		this._rippleLoader.configureRipple(this._elementRef.nativeElement, { centered: true });
	}
	static ɵfac = function MatIconButton_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatIconButton)();
	};
	static ɵcmp = /* @__PURE__ */ ɵɵdefineComponent({
		type: MatIconButton,
		selectors: [
			[
				"button",
				"mat-icon-button",
				""
			],
			[
				"a",
				"mat-icon-button",
				""
			],
			[
				"button",
				"matIconButton",
				""
			],
			[
				"a",
				"matIconButton",
				""
			]
		],
		hostAttrs: [
			1,
			"mdc-icon-button",
			"mat-mdc-icon-button"
		],
		exportAs: ["matButton", "matAnchor"],
		features: [ɵɵInheritDefinitionFeature],
		ngContentSelectors: _c1,
		decls: 5,
		vars: 1,
		consts: [
			[
				1,
				"mat-mdc-button-persistent-ripple",
				"mdc-icon-button__ripple"
			],
			[1, "mat-mdc-button-progress-indicator-container"],
			[1, "mat-focus-indicator"],
			[1, "mat-mdc-button-touch-target"]
		],
		template: function MatIconButton_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵprojectionDef(_c0);
				ɵɵdomElement(0, "span", 0);
				ɵɵprojection(1);
				ɵɵconditionalCreate(2, MatIconButton_Conditional_2_Template, 2, 0, "div", 1);
				ɵɵdomElement(3, "span", 2)(4, "span", 3);
			}
			if (rf & 2) {
				ɵɵadvance(2);
				ɵɵconditional(ctx.showProgress() ? 2 : -1);
			}
		},
		styles: [".mat-mdc-icon-button {\n  -webkit-user-select: none;\n  user-select: none;\n  display: inline-block;\n  position: relative;\n  box-sizing: border-box;\n  border: none;\n  outline: none;\n  background-color: transparent;\n  fill: currentColor;\n  text-decoration: none;\n  cursor: pointer;\n  z-index: 0;\n  overflow: visible;\n  border-radius: var(--%NS%mat-icon-button-container-shape, var(--%NS%mat-sys-corner-full, 50%));\n  flex-shrink: 0;\n  text-align: center;\n  width: var(--%NS%mat-icon-button-state-layer-size, 40px);\n  height: var(--%NS%mat-icon-button-state-layer-size, 40px);\n  padding: calc(calc(var(--%NS%mat-icon-button-state-layer-size, 40px) - var(--%NS%mat-icon-button-icon-size, 24px)) / 2);\n  font-size: var(--%NS%mat-icon-button-icon-size, 24px);\n  color: var(--%NS%mat-icon-button-icon-color, var(--%NS%mat-sys-on-surface-variant));\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-icon-button .mat-mdc-button-ripple,\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-icon-button .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  content: \"\";\n  opacity: 0;\n}\n.mat-mdc-icon-button .mdc-button__label,\n.mat-mdc-icon-button .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-icon-button .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  border-radius: inherit;\n}\n.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {\n  content: \"\";\n  border-radius: inherit;\n}\n.mat-mdc-icon-button .mat-ripple-element {\n  background-color: var(--%NS%mat-icon-button-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface-variant) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-icon-button-state-layer-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-icon-button-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-icon-button-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-icon-button-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-icon-button-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-icon-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-icon-button-touch-target-size, 48px);\n  display: var(--%NS%mat-icon-button-touch-target-display, block);\n  left: 50%;\n  width: var(--%NS%mat-icon-button-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-icon-button._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-icon-button img,\n.mat-mdc-icon-button svg {\n  width: var(--%NS%mat-icon-button-icon-size, 24px);\n  height: var(--%NS%mat-icon-button-icon-size, 24px);\n  vertical-align: baseline;\n}\n.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__determinate-circle-graphic {\n  width: inherit;\n  height: inherit;\n}\n.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__indeterminate-circle-graphic {\n  height: 100%;\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {\n  border-radius: var(--%NS%mat-icon-button-container-shape, var(--%NS%mat-sys-corner-full, 50%));\n}\n.mat-mdc-icon-button[hidden] {\n  display: none;\n}\n.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {\n  background: transparent;\n  opacity: 1;\n}\n\n.mat-mdc-button-progress-indicator-container {\n  position: absolute;\n  inset-inline-start: 0;\n  inset-block-start: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n\n.mat-mdc-button-progress-indicator-shown mat-icon {\n  visibility: hidden;\n}\n", "@media (forced-colors: active) {\n  .mat-mdc-button:not(.mdc-button--outlined),\n  .mat-mdc-unelevated-button:not(.mdc-button--outlined),\n  .mat-mdc-raised-button:not(.mdc-button--outlined),\n  .mat-mdc-outlined-button:not(.mdc-button--outlined),\n  .mat-mdc-button-base.mat-tonal-button,\n  .mat-mdc-icon-button.mat-mdc-icon-button,\n  .mat-mdc-outlined-button .mdc-button__ripple {\n    outline: solid 1px;\n  }\n}\n"],
		encapsulation: 2
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatIconButton, [{
		type: Component,
		args: [{
			selector: `button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]`,
			host: { "class": "mdc-icon-button mat-mdc-icon-button" },
			exportAs: "matButton, matAnchor",
			encapsulation: ViewEncapsulation.None,
			template: "<span class=\"mat-mdc-button-persistent-ripple mdc-icon-button__ripple\"></span>\n\n<ng-content></ng-content>\n\n@if (showProgress()) {\n  <div class=\"mat-mdc-button-progress-indicator-container\">\n    <ng-content select=\"[progressIndicator]\" />\n  </div>\n}\n\n<!--\n  The indicator can't be directly on the button, because MDC uses ::before for high contrast\n  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.\n-->\n<span class=\"mat-focus-indicator\"></span>\n\n<span class=\"mat-mdc-button-touch-target\"></span>\n",
			styles: [".mat-mdc-icon-button {\n  -webkit-user-select: none;\n  user-select: none;\n  display: inline-block;\n  position: relative;\n  box-sizing: border-box;\n  border: none;\n  outline: none;\n  background-color: transparent;\n  fill: currentColor;\n  text-decoration: none;\n  cursor: pointer;\n  z-index: 0;\n  overflow: visible;\n  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));\n  flex-shrink: 0;\n  text-align: center;\n  width: var(--mat-icon-button-state-layer-size, 40px);\n  height: var(--mat-icon-button-state-layer-size, 40px);\n  padding: calc(calc(var(--mat-icon-button-state-layer-size, 40px) - var(--mat-icon-button-icon-size, 24px)) / 2);\n  font-size: var(--mat-icon-button-icon-size, 24px);\n  color: var(--mat-icon-button-icon-color, var(--mat-sys-on-surface-variant));\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-icon-button .mat-mdc-button-ripple,\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-icon-button .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  content: \"\";\n  opacity: 0;\n}\n.mat-mdc-icon-button .mdc-button__label,\n.mat-mdc-icon-button .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-icon-button .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  border-radius: inherit;\n}\n.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {\n  content: \"\";\n  border-radius: inherit;\n}\n.mat-mdc-icon-button .mat-ripple-element {\n  background-color: var(--mat-icon-button-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface-variant) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-icon-button-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-icon-button-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-icon-button-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-icon-button-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-icon-button-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-icon-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-icon-button-touch-target-size, 48px);\n  display: var(--mat-icon-button-touch-target-display, block);\n  left: 50%;\n  width: var(--mat-icon-button-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-icon-button._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-icon-button img,\n.mat-mdc-icon-button svg {\n  width: var(--mat-icon-button-icon-size, 24px);\n  height: var(--mat-icon-button-icon-size, 24px);\n  vertical-align: baseline;\n}\n.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__determinate-circle-graphic {\n  width: inherit;\n  height: inherit;\n}\n.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__indeterminate-circle-graphic {\n  height: 100%;\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {\n  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));\n}\n.mat-mdc-icon-button[hidden] {\n  display: none;\n}\n.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {\n  background: transparent;\n  opacity: 1;\n}\n\n.mat-mdc-button-progress-indicator-container {\n  position: absolute;\n  inset-inline-start: 0;\n  inset-block-start: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n\n.mat-mdc-button-progress-indicator-shown mat-icon {\n  visibility: hidden;\n}\n", "@media (forced-colors: active) {\n  .mat-mdc-button:not(.mdc-button--outlined),\n  .mat-mdc-unelevated-button:not(.mdc-button--outlined),\n  .mat-mdc-raised-button:not(.mdc-button--outlined),\n  .mat-mdc-outlined-button:not(.mdc-button--outlined),\n  .mat-mdc-button-base.mat-tonal-button,\n  .mat-mdc-icon-button.mat-mdc-icon-button,\n  .mat-mdc-outlined-button .mdc-button__ripple {\n    outline: solid 1px;\n  }\n}\n"]
		}]
	}], () => [], null);
})();
var MatIconAnchor = MatIconButton;
//#endregion
export { MatIconButton as i, MatButtonBase as n, MatIconAnchor as r, MAT_BUTTON_CONFIG as t };
