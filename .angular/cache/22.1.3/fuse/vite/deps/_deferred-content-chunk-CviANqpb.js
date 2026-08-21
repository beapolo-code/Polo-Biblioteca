import { Bi as signal$1, Oa as createComputed, Sa as SIGNAL, _a as createLinkedSignal, c as computed$1, ka as createSignal, va as linkedSignalSetFn, xr as inject, ya as linkedSignalUpdateFn } from "./_resource-chunk-C-Y-Fu3B.js";
import { Sn as Input, T as afterRenderEffect, Va as ɵɵdefineDirective, fr as ViewContainerRef, ir as TemplateRef, ki as setClassMetadata, nt as model, un as Directive, zn as Output } from "./core-6q3cy1tM.js";
//#region node_modules/@angular/aria/fesm2022/_expansion-chunk.mjs
var ListExpansion = class {
	inputs;
	constructor(inputs) {
		this.inputs = inputs;
	}
	open(item) {
		if (!this.isExpandable(item)) return false;
		if (item.expanded()) return false;
		if (!this.inputs.multiExpandable()) this.closeAll();
		item.expanded.set(true);
		return true;
	}
	close(item) {
		if (!this.isExpandable(item)) return false;
		item.expanded.set(false);
		return true;
	}
	toggle(item) {
		return item.expanded() ? this.close(item) : this.open(item);
	}
	openAll() {
		if (this.inputs.multiExpandable()) for (const item of this.inputs.items()) this.open(item);
	}
	closeAll() {
		for (const item of this.inputs.items()) this.close(item);
	}
	isExpandable(item) {
		return !this.inputs.disabled() && !item.disabled() && item.expandable();
	}
};
//#endregion
//#region node_modules/@angular/aria/fesm2022/_violations-chunk.mjs
var Modifier;
(function(Modifier) {
	Modifier[Modifier["None"] = 0] = "None";
	Modifier[Modifier["Ctrl"] = 1] = "Ctrl";
	Modifier[Modifier["Shift"] = 2] = "Shift";
	Modifier[Modifier["Alt"] = 4] = "Alt";
	Modifier[Modifier["Meta"] = 8] = "Meta";
	Modifier["Any"] = "Any";
})(Modifier || (Modifier = {}));
var EventManager = class {
	configs = [];
	handle(event) {
		for (const config of this.configs) if (config.matcher(event)) {
			config.handler(event);
			if (config.preventDefault) event.preventDefault();
			if (config.stopPropagation) event.stopPropagation();
		}
	}
};
function getModifiers(event) {
	return (+event.ctrlKey && Modifier.Ctrl) | (+event.shiftKey && Modifier.Shift) | (+event.altKey && Modifier.Alt) | (+event.metaKey && Modifier.Meta);
}
function hasModifiers(event, modifiers) {
	const eventModifiers = getModifiers(event);
	const modifiersList = Array.isArray(modifiers) ? modifiers : [modifiers];
	if (modifiersList.includes(Modifier.Any)) return true;
	return modifiersList.some((modifiers) => eventModifiers === modifiers);
}
var KeyboardEventManager = class extends EventManager {
	options = {
		ignoreRepeat: true,
		preventDefault: true,
		stopPropagation: true
	};
	on(...args) {
		const { modifiers, key, handler, options } = this._normalizeInputs(...args);
		this.configs.push({
			handler,
			matcher: (event) => this._isMatch(event, key, modifiers, options),
			...this.options,
			...options
		});
		return this;
	}
	_normalizeInputs(...args) {
		const withModifiers = Array.isArray(args[0]) || Modifier.hasOwnProperty(args[0]);
		const modifiers = withModifiers ? args[0] : Modifier.None;
		return {
			key: withModifiers ? args[1] : args[0],
			handler: withModifiers ? args[2] : args[1],
			modifiers,
			options: (withModifiers ? args[3] : args[2]) ?? {}
		};
	}
	_isMatch(event, key, modifiers, options) {
		if (event.key == null || !hasModifiers(event, modifiers)) return false;
		if (event.repeat && options?.ignoreRepeat !== false) return false;
		if (key instanceof RegExp) return key.test(event.key);
		return (typeof key === "string" ? key : key()).toLowerCase() === event.key.toLowerCase();
	}
};
function computed(computation) {
	const computed = createComputed(computation);
	computed[SIGNAL].debugName = "";
	return computed;
}
function signal(initialValue) {
	const [get, set, update] = createSignal(initialValue);
	get[SIGNAL].debugName = "";
	return Object.assign(get, {
		set,
		update,
		asReadonly: () => get
	});
}
function linkedSignal(sourceFn) {
	const getter = createLinkedSignal(sourceFn, (s) => s);
	getter[SIGNAL].debugName = "";
	return Object.assign(getter, {
		set: (v) => linkedSignalSetFn(getter[SIGNAL], v),
		update: (updater) => linkedSignalUpdateFn(getter[SIGNAL], updater),
		asReadonly: () => getter
	});
}
function sortDirectives(a, b) {
	return (a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_PRECEDING) > 0 ? 1 : -1;
}
var SortedCollection = class {
	_items = signal$1(/* @__PURE__ */ new Set());
	_version = signal$1(0);
	_observer;
	orderedItems = computed$1(() => {
		this._version();
		return Array.from(this._items()).sort(sortDirectives);
	});
	register(item) {
		this._items.update((set) => {
			const newSet = new Set(set);
			newSet.add(item);
			return newSet;
		});
	}
	unregister(item) {
		this._items.update((set) => {
			const newSet = new Set(set);
			newSet.delete(item);
			return newSet;
		});
	}
	startObserving(element) {
		if (this._observer) this._observer.disconnect();
		this._observer = new MutationObserver((mutations) => {
			if (mutations.some((m) => m.addedNodes.length || m.removedNodes.length)) this._version.update((v) => v + 1);
		});
		this._observer.observe(element, {
			childList: true,
			subtree: true
		});
	}
	stopObserving() {
		this._observer?.disconnect();
		this._observer = void 0;
	}
};
function reportViolations(violations, element) {
	if (violations.length) {
		console.warn("Violations found on element: %o:", element);
		violations.forEach((violation) => {
			console.warn(violation);
		});
	}
}
//#endregion
//#region node_modules/@angular/aria/fesm2022/_list-navigation-chunk.mjs
var ListFocus = class {
	inputs;
	prevActiveItem = signal(void 0);
	prevActiveIndex = computed(() => {
		return this.prevActiveItem() ? this.inputs.items().indexOf(this.prevActiveItem()) : -1;
	});
	activeIndex = computed(() => {
		return this.inputs.activeItem() ? this.inputs.items().indexOf(this.inputs.activeItem()) : -1;
	});
	constructor(inputs) {
		this.inputs = inputs;
	}
	isListDisabled() {
		return this.inputs.disabled() || this.inputs.items().every((i) => i.disabled());
	}
	getActiveDescendant() {
		if (this.isListDisabled()) return;
		if (this.inputs.focusMode() === "roving") return;
		return this.inputs.activeItem()?.id() ?? void 0;
	}
	getListTabIndex() {
		if (this.isListDisabled()) return 0;
		return this.inputs.focusMode() === "activedescendant" ? 0 : -1;
	}
	getItemTabIndex(item) {
		if (this.isListDisabled()) return -1;
		if (this.inputs.focusMode() === "activedescendant") return -1;
		return this.inputs.activeItem() === item ? 0 : -1;
	}
	focus(item, opts) {
		if (this.isListDisabled() || !this.isFocusable(item)) return false;
		this.prevActiveItem.set(this.inputs.activeItem());
		this.inputs.activeItem.set(item);
		if (opts?.focusElement || opts?.focusElement === void 0) {
			if (this.inputs.focusMode() === "roving") item.element()?.focus();
		}
		return true;
	}
	isFocusable(item) {
		return !item.disabled() || this.inputs.softDisabled();
	}
};
var ListNavigation = class {
	inputs;
	constructor(inputs) {
		this.inputs = inputs;
	}
	goto(item, opts) {
		return item ? this.inputs.focusManager.focus(item, opts) : false;
	}
	next(opts) {
		return this._advance(1, opts);
	}
	peekNext(opts) {
		return this._peek(1, opts);
	}
	prev(opts) {
		return this._advance(-1, opts);
	}
	peekPrev(opts) {
		return this._peek(-1, opts);
	}
	first(opts) {
		const item = this.peekFirst(opts);
		return item ? this.goto(item, opts) : false;
	}
	last(opts) {
		const item = this.peekLast(opts);
		return item ? this.goto(item, opts) : false;
	}
	peekFirst(opts) {
		return (opts?.items ?? this.inputs.items()).find((i) => this.inputs.focusManager.isFocusable(i));
	}
	peekLast(opts) {
		const items = opts?.items ?? this.inputs.items();
		for (let i = items.length - 1; i >= 0; i--) if (this.inputs.focusManager.isFocusable(items[i])) return items[i];
	}
	_advance(delta, opts) {
		const item = this._peek(delta, opts);
		return item ? this.goto(item, opts) : false;
	}
	_peek(delta, opts) {
		const items = opts?.items ?? this.inputs.items();
		const itemCount = items.length;
		const activeItem = this.inputs.focusManager.inputs.activeItem();
		const startIndex = opts?.items && activeItem ? items.indexOf(activeItem) : this.inputs.focusManager.activeIndex();
		const step = (i) => this.inputs.wrap() ? (i + delta + itemCount) % itemCount : i + delta;
		for (let i = step(startIndex); i !== startIndex && i < itemCount && i >= 0; i = step(i)) if (this.inputs.focusManager.isFocusable(items[i])) return items[i];
	}
};
//#endregion
//#region node_modules/@angular/aria/fesm2022/_click-event-manager-chunk.mjs
function isFakeClick(event) {
	return event.detail === 0 || !event.pointerType;
}
function isProgrammaticClick(event) {
	return !event.isTrusted;
}
var ClickEventManager = class extends EventManager {
	options = {
		preventDefault: false,
		stopPropagation: false
	};
	on(...args) {
		const { handler, modifiers } = this._normalizeInputs(...args);
		this.configs.push({
			handler,
			matcher: (event) => this._isMatch(event, modifiers),
			...this.options
		});
		return this;
	}
	_normalizeInputs(...args) {
		if (args.length === 2) return {
			modifiers: args[0],
			handler: args[1]
		};
		return {
			modifiers: Modifier.None,
			handler: args[0]
		};
	}
	_isMatch(event, modifiers) {
		return (isProgrammaticClick(event) || !isFakeClick(event)) && hasModifiers(event, modifiers);
	}
};
//#endregion
//#region node_modules/@angular/aria/fesm2022/_deferred-content-chunk.mjs
var DeferredContentAware = class DeferredContentAware {
	contentVisible = signal$1(false, ...ngDevMode ? [{ debugName: "contentVisible" }] : []);
	preserveContent = model(false, ...ngDevMode ? [{ debugName: "preserveContent" }] : []);
	static ɵfac = function DeferredContentAware_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || DeferredContentAware)();
	};
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: DeferredContentAware,
		inputs: { preserveContent: [1, "preserveContent"] },
		outputs: { preserveContent: "preserveContentChange" }
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DeferredContentAware, [{ type: Directive }], null, { preserveContent: [{
		type: Input,
		args: [{
			isSignal: true,
			alias: "preserveContent",
			required: false
		}]
	}, {
		type: Output,
		args: ["preserveContentChange"]
	}] });
})();
var DeferredContent = class DeferredContent {
	_deferredContentAware = inject(DeferredContentAware, { optional: true });
	_templateRef = inject(TemplateRef);
	_viewContainerRef = inject(ViewContainerRef);
	_currentViewRef = null;
	_isRendered = false;
	deferredContentAware = signal$1(this._deferredContentAware, ...ngDevMode ? [{ debugName: "deferredContentAware" }] : []);
	constructor() {
		afterRenderEffect({ write: () => {
			if (this.deferredContentAware()?.contentVisible()) {
				if (!this._isRendered) {
					this._destroyContent();
					this._currentViewRef = this._viewContainerRef.createEmbeddedView(this._templateRef);
					this._isRendered = true;
				}
			} else if (!this.deferredContentAware()?.preserveContent()) {
				this._destroyContent();
				this._isRendered = false;
			}
		} });
	}
	ngOnDestroy() {
		this._destroyContent();
	}
	_destroyContent() {
		const ref = this._currentViewRef;
		if (ref && !ref.destroyed) {
			ref.destroy();
			this._currentViewRef = null;
		}
	}
	static ɵfac = function DeferredContent_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || DeferredContent)();
	};
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({ type: DeferredContent });
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DeferredContent, [{ type: Directive }], () => [], null);
})();
//#endregion
export { ListNavigation as a, SortedCollection as c, reportViolations as d, signal as f, ListFocus as i, computed as l, ListExpansion as m, DeferredContentAware as n, KeyboardEventManager as o, sortDirectives as p, ClickEventManager as r, Modifier as s, DeferredContent as t, linkedSignal as u };
