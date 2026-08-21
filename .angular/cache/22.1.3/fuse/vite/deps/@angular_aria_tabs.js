import { Bi as signal, Mn as forwardRef, U as InjectionToken, c as computed, p as linkedSignal, xr as inject } from "./_resource-chunk-C-Y-Fu3B.js";
import { A as contentChild, Ki as ɵɵHostDirectivesFeature, O as booleanAttribute, Po as ɵɵlistener, Sn as Input, T as afterRenderEffect, Va as ɵɵdefineDirective, X as input, Yi as ɵɵProvidersFeature, fa as ɵɵcontentQuerySignal, fn as ElementRef, i as ContentChild, ia as ɵɵattribute, ki as setClassMetadata, ns as ɵɵqueryAdvance, nt as model, un as Directive, vr as afterNextRender, zn as Output } from "./core-6q3cy1tM.js";
import { t as _IdGenerator } from "./_id-generator-chunk-DNit0CSO.js";
import { a as ListNavigation, c as SortedCollection, d as reportViolations, f as signal$1, i as ListFocus, l as computed$1, m as ListExpansion, n as DeferredContentAware, o as KeyboardEventManager, r as ClickEventManager, t as DeferredContent, u as linkedSignal$1 } from "./_deferred-content-chunk-CviANqpb.js";
import { r as Directionality } from "./bidi-DGXAf4Fl.js";
//#region node_modules/@angular/aria/fesm2022/_tabs-chunk.mjs
var TabPattern = class {
	inputs;
	id;
	disabled;
	element = () => this.inputs.element();
	expandable = () => true;
	expanded = linkedSignal$1(() => this.inputs.tabList().selectedTab() === this);
	active = computed$1(() => this.inputs.tabList().inputs.activeItem() === this);
	selected = computed$1(() => this.inputs.tabList().selectedTab() === this);
	tabIndex = computed$1(() => this.inputs.tabList().focusBehavior.getItemTabIndex(this));
	controls = computed$1(() => this.inputs.tabPanel()?.id());
	constructor(inputs) {
		this.inputs = inputs;
		this.id = inputs.id;
		this.disabled = inputs.disabled;
	}
	open() {
		return this.inputs.tabList().open(this);
	}
};
var TabPanelPattern = class {
	inputs;
	id;
	hidden = computed$1(() => this.inputs.tab()?.expanded() === false);
	tabIndex = computed$1(() => this.hidden() ? -1 : 0);
	labelledBy = computed$1(() => this.inputs.tab()?.id());
	constructor(inputs) {
		this.inputs = inputs;
		this.id = inputs.id;
	}
};
var TabListPattern = class {
	inputs;
	focusBehavior;
	navigationBehavior;
	expansionBehavior;
	hasBeenInteracted = signal$1(false);
	activeTab;
	selectedTab;
	orientation;
	disabled;
	tabIndex = computed$1(() => this.focusBehavior.getListTabIndex());
	activeDescendant = computed$1(() => this.focusBehavior.getActiveDescendant());
	followFocus = computed$1(() => this.inputs.selectionMode() === "follow");
	prevKey = computed$1(() => {
		if (this.inputs.orientation() === "vertical") return "ArrowUp";
		return this.inputs.textDirection() === "rtl" ? "ArrowRight" : "ArrowLeft";
	});
	nextKey = computed$1(() => {
		if (this.inputs.orientation() === "vertical") return "ArrowDown";
		return this.inputs.textDirection() === "rtl" ? "ArrowLeft" : "ArrowRight";
	});
	keydown = computed$1(() => {
		return new KeyboardEventManager().on(this.prevKey, () => this._navigate(() => this.navigationBehavior.prev(), this.followFocus()), { ignoreRepeat: false }).on(this.nextKey, () => this._navigate(() => this.navigationBehavior.next(), this.followFocus()), { ignoreRepeat: false }).on("Home", () => this._navigate(() => this.navigationBehavior.first(), this.followFocus())).on("End", () => this._navigate(() => this.navigationBehavior.last(), this.followFocus())).on(" ", () => this.open()).on("Enter", () => this.open());
	});
	clickManager = computed$1(() => {
		return new ClickEventManager().on((e) => this._navigate(() => this.navigationBehavior.goto(this._getItem(e)), true));
	});
	constructor(inputs) {
		this.inputs = inputs;
		this.selectedTab = inputs.selectedTab;
		this.activeTab = inputs.activeItem;
		this.orientation = inputs.orientation;
		this.disabled = inputs.disabled;
		this.focusBehavior = new ListFocus(inputs);
		this.navigationBehavior = new ListNavigation({
			...inputs,
			focusManager: this.focusBehavior
		});
		this.expansionBehavior = new ListExpansion({
			...inputs,
			multiExpandable: () => false
		});
	}
	setDefaultState() {
		let firstItem;
		for (const item of this.inputs.items()) {
			if (!this.focusBehavior.isFocusable(item)) continue;
			if (firstItem === void 0) firstItem = item;
			if (item.selected()) {
				this.inputs.activeItem.set(item);
				return;
			}
		}
		if (firstItem !== void 0) this.inputs.activeItem.set(firstItem);
	}
	setDefaultStateEffect() {
		if (this.hasBeenInteracted()) return;
		this.setDefaultState();
	}
	onKeydown(event) {
		if (!this.disabled()) {
			this.hasBeenInteracted.set(true);
			this.keydown().handle(event);
		}
	}
	onClick(event) {
		if (!this.disabled()) {
			this.hasBeenInteracted.set(true);
			this.clickManager().handle(event);
		}
	}
	onFocusIn() {
		this.hasBeenInteracted.set(true);
	}
	open(tab) {
		tab ??= this.activeTab();
		if (tab === void 0) return false;
		const success = this.expansionBehavior.open(tab);
		if (success) this.selectedTab.set(tab);
		return success;
	}
	_navigate(op, shouldExpand = false) {
		if (op() && shouldExpand) this.open();
	}
	_getItem(e) {
		if (!e.target) return;
		const element = e.target.closest("[role=\"tab\"]");
		return this.inputs.items().find((i) => i.element() === element);
	}
};
//#endregion
//#region node_modules/@angular/aria/fesm2022/tabs.mjs
var TABS = new InjectionToken("TABS");
var TAB_LIST = new InjectionToken("TAB_LIST");
var Tabs = class Tabs {
	_elementRef = inject(ElementRef);
	element = this._elementRef.nativeElement;
	_tabList = signal(void 0, ...ngDevMode ? [{ debugName: "_tabList" }] : []);
	_collection = new SortedCollection();
	_tabPatterns = computed(() => this._tabList()?._tabPatterns(), ...ngDevMode ? [{ debugName: "_tabPatterns" }] : []);
	_tabPanelPatterns = computed(() => this._collection.orderedItems().map((tabpanel) => tabpanel._pattern), ...ngDevMode ? [{ debugName: "_tabPanelPatterns" }] : []);
	_panelMap = computed(() => {
		const map = /* @__PURE__ */ new Map();
		for (const panel of this._collection.orderedItems()) map.set(panel.value(), panel._pattern);
		return map;
	}, ...ngDevMode ? [{ debugName: "_panelMap" }] : []);
	_tabMap = computed(() => {
		const map = /* @__PURE__ */ new Map();
		const tabList = this._tabList();
		if (tabList) for (const tab of tabList._collection.orderedItems()) map.set(tab.value(), tab._pattern);
		return map;
	}, ...ngDevMode ? [{ debugName: "_tabMap" }] : []);
	constructor() {
		afterNextRender(() => {
			this._collection.startObserving(this.element);
		});
	}
	ngOnDestroy() {
		this._collection.stopObserving();
	}
	_register(child) {
		this._tabList.set(child);
	}
	_unregister() {
		this._tabList.set(void 0);
	}
	static ɵfac = function Tabs_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || Tabs)();
	};
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: Tabs,
		selectors: [[
			"",
			"ngTabs",
			""
		]],
		exportAs: ["ngTabs"],
		features: [ɵɵProvidersFeature([{
			provide: TABS,
			useExisting: Tabs
		}])]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tabs, [{
		type: Directive,
		args: [{
			selector: "[ngTabs]",
			exportAs: "ngTabs",
			providers: [{
				provide: TABS,
				useExisting: Tabs
			}]
		}]
	}], () => [], null);
})();
var TabList = class TabList {
	_elementRef = inject(ElementRef);
	element = this._elementRef.nativeElement;
	_tabsParent = inject(TABS);
	_collection = new SortedCollection();
	_tabPatterns = computed(() => this._collection.orderedItems().map((tab) => tab._pattern), ...ngDevMode ? [{ debugName: "_tabPatterns" }] : []);
	orientation = input("horizontal", ...ngDevMode ? [{ debugName: "orientation" }] : []);
	textDirection = inject(Directionality).valueSignal;
	wrap = input(true, {
		...ngDevMode ? { debugName: "wrap" } : {},
		transform: booleanAttribute
	});
	softDisabled = input(true, {
		...ngDevMode ? { debugName: "softDisabled" } : {},
		transform: booleanAttribute
	});
	focusMode = input("roving", ...ngDevMode ? [{ debugName: "focusMode" }] : []);
	selectionMode = input("follow", ...ngDevMode ? [{ debugName: "selectionMode" }] : []);
	selectedTab = model(...ngDevMode ? [void 0, { debugName: "selectedTab" }] : []);
	_selectedTabPattern = linkedSignal(() => {
		return this.findTab(this.selectedTab())?._pattern;
	}, ...ngDevMode ? [{ debugName: "_selectedTabPattern" }] : []);
	disabled = input(false, {
		...ngDevMode ? { debugName: "disabled" } : {},
		transform: booleanAttribute
	});
	_pattern = new TabListPattern({
		...this,
		element: () => this._elementRef.nativeElement,
		activeItem: signal(void 0),
		items: this._tabPatterns,
		selectedTab: this._selectedTabPattern
	});
	constructor() {
		afterNextRender(() => {
			this._collection.startObserving(this.element);
		});
		afterRenderEffect(() => {
			this._pattern.setDefaultStateEffect();
		});
		afterRenderEffect({ write: () => {
			const pattern = this._selectedTabPattern();
			const tab = this._collection.orderedItems().find((tab) => tab._pattern == pattern);
			this.selectedTab.set(tab?.value());
		} });
		if (typeof ngDevMode === "undefined" || ngDevMode) afterRenderEffect({ read: () => {
			const violations = [];
			const values = this._collection.orderedItems().map((t) => t.value());
			const duplicates = values.filter((item, index) => values.indexOf(item) !== index);
			if (duplicates.length > 0) violations.push(`Duplicate value '${duplicates[0]}' detected inside ngTabList.`);
			reportViolations(violations, this.element);
		} });
	}
	ngOnInit() {
		this._tabsParent._register(this);
	}
	ngOnDestroy() {
		this._tabsParent._unregister();
		this._collection.stopObserving();
	}
	open(value) {
		return this._pattern.open(this.findTab(value)?._pattern);
	}
	findTab(value) {
		return value ? this._collection.orderedItems().find((tab) => tab.value() === value) : void 0;
	}
	static ɵfac = function TabList_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || TabList)();
	};
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: TabList,
		selectors: [[
			"",
			"ngTabList",
			""
		]],
		hostAttrs: ["role", "tablist"],
		hostVars: 4,
		hostBindings: function TabList_HostBindings(rf, ctx) {
			if (rf & 1) ɵɵlistener("keydown", function TabList_keydown_HostBindingHandler($event) {
				return ctx._pattern.onKeydown($event);
			})("click", function TabList_click_HostBindingHandler($event) {
				return ctx._pattern.onClick($event);
			})("focusin", function TabList_focusin_HostBindingHandler() {
				return ctx._pattern.onFocusIn();
			});
			if (rf & 2) ɵɵattribute("tabindex", ctx._pattern.tabIndex())("aria-disabled", ctx._pattern.disabled())("aria-orientation", ctx._pattern.orientation())("aria-activedescendant", ctx._pattern.activeDescendant());
		},
		inputs: {
			orientation: [1, "orientation"],
			wrap: [1, "wrap"],
			softDisabled: [1, "softDisabled"],
			focusMode: [1, "focusMode"],
			selectionMode: [1, "selectionMode"],
			selectedTab: [1, "selectedTab"],
			disabled: [1, "disabled"]
		},
		outputs: { selectedTab: "selectedTabChange" },
		exportAs: ["ngTabList"],
		features: [ɵɵProvidersFeature([{
			provide: TAB_LIST,
			useExisting: TabList
		}])]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabList, [{
		type: Directive,
		args: [{
			selector: "[ngTabList]",
			exportAs: "ngTabList",
			host: {
				"role": "tablist",
				"[attr.tabindex]": "_pattern.tabIndex()",
				"[attr.aria-disabled]": "_pattern.disabled()",
				"[attr.aria-orientation]": "_pattern.orientation()",
				"[attr.aria-activedescendant]": "_pattern.activeDescendant()",
				"(keydown)": "_pattern.onKeydown($event)",
				"(click)": "_pattern.onClick($event)",
				"(focusin)": "_pattern.onFocusIn()"
			},
			providers: [{
				provide: TAB_LIST,
				useExisting: TabList
			}]
		}]
	}], () => [], {
		orientation: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "orientation",
				required: false
			}]
		}],
		wrap: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "wrap",
				required: false
			}]
		}],
		softDisabled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "softDisabled",
				required: false
			}]
		}],
		focusMode: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "focusMode",
				required: false
			}]
		}],
		selectionMode: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "selectionMode",
				required: false
			}]
		}],
		selectedTab: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "selectedTab",
				required: false
			}]
		}, {
			type: Output,
			args: ["selectedTabChange"]
		}],
		disabled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "disabled",
				required: false
			}]
		}]
	});
})();
var Tab = class Tab {
	_elementRef = inject(ElementRef);
	element = this._elementRef.nativeElement;
	_tabList = inject(TAB_LIST);
	id = input(inject(_IdGenerator).getId("ng-tab-", true), ...ngDevMode ? [{ debugName: "id" }] : []);
	_tabpanelPattern = computed(() => {
		return this._tabList._tabsParent._panelMap().get(this.value());
	}, ...ngDevMode ? [{ debugName: "_tabpanelPattern" }] : []);
	disabled = input(false, {
		...ngDevMode ? { debugName: "disabled" } : {},
		transform: booleanAttribute
	});
	value = input.required(...ngDevMode ? [{ debugName: "value" }] : []);
	active = computed(() => this._pattern.active(), ...ngDevMode ? [{ debugName: "active" }] : []);
	selected = computed(() => this._pattern.selected(), ...ngDevMode ? [{ debugName: "selected" }] : []);
	_pattern = new TabPattern({
		...this,
		element: () => this.element,
		tabList: () => this._tabList._pattern,
		tabPanel: this._tabpanelPattern
	});
	open() {
		this._pattern.open();
	}
	constructor() {
		if (this.element.tagName === "BUTTON" && !this.element.hasAttribute("type")) this.element.setAttribute("type", "button");
		if (typeof ngDevMode === "undefined" || ngDevMode) afterRenderEffect({ read: () => {
			const violations = [];
			if (this._tabList && this._tabList._tabsParent) {
				if (!this._tabList._tabsParent._panelMap().has(this.value())) violations.push(`ngTab with value '${this.value()}' does not have a corresponding ngTabPanel.`);
			}
			reportViolations(violations, this.element);
		} });
	}
	ngOnInit() {
		this._tabList._collection.register(this);
	}
	ngOnDestroy() {
		this._tabList._collection.unregister(this);
	}
	static ɵfac = function Tab_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || Tab)();
	};
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: Tab,
		selectors: [[
			"",
			"ngTab",
			""
		]],
		hostAttrs: ["role", "tab"],
		hostVars: 6,
		hostBindings: function Tab_HostBindings(rf, ctx) {
			if (rf & 2) ɵɵattribute("data-active", ctx.active())("id", ctx._pattern.id())("tabindex", ctx._pattern.tabIndex())("aria-selected", ctx.selected())("aria-disabled", ctx._pattern.disabled())("aria-controls", ctx._pattern.controls());
		},
		inputs: {
			id: [1, "id"],
			disabled: [1, "disabled"],
			value: [1, "value"]
		},
		exportAs: ["ngTab"]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tab, [{
		type: Directive,
		args: [{
			selector: "[ngTab]",
			exportAs: "ngTab",
			host: {
				"role": "tab",
				"[attr.data-active]": "active()",
				"[attr.id]": "_pattern.id()",
				"[attr.tabindex]": "_pattern.tabIndex()",
				"[attr.aria-selected]": "selected()",
				"[attr.aria-disabled]": "_pattern.disabled()",
				"[attr.aria-controls]": "_pattern.controls()"
			}
		}]
	}], () => [], {
		id: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "id",
				required: false
			}]
		}],
		disabled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "disabled",
				required: false
			}]
		}],
		value: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "value",
				required: true
			}]
		}]
	});
})();
var TabContent = class TabContent {
	static ɵfac = function TabContent_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || TabContent)();
	};
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: TabContent,
		selectors: [[
			"ng-template",
			"ngTabContent",
			""
		]],
		exportAs: ["ngTabContent"],
		features: [ɵɵHostDirectivesFeature([DeferredContent])]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabContent, [{
		type: Directive,
		args: [{
			selector: "ng-template[ngTabContent]",
			exportAs: "ngTabContent",
			hostDirectives: [DeferredContent]
		}]
	}], null, null);
})();
var TabPanel = class TabPanel {
	_elementRef = inject(ElementRef);
	element = this._elementRef.nativeElement;
	_deferredContentAware = inject(DeferredContentAware);
	_tabs = inject(TABS);
	id = input(inject(_IdGenerator).getId("ng-tabpanel-", true), ...ngDevMode ? [{ debugName: "id" }] : []);
	_tabPattern = computed(() => {
		return this._tabs._tabMap().get(this.value());
	}, ...ngDevMode ? [{ debugName: "_tabPattern" }] : []);
	value = input.required(...ngDevMode ? [{ debugName: "value" }] : []);
	visible = computed(() => !this._pattern.hidden(), ...ngDevMode ? [{ debugName: "visible" }] : []);
	_pattern = new TabPanelPattern({
		...this,
		tab: this._tabPattern
	});
	_tabContent = contentChild(TabContent, ...ngDevMode ? [{ debugName: "_tabContent" }] : []);
	constructor() {
		afterRenderEffect({ write: () => {
			this._deferredContentAware.contentVisible.set(this.visible());
		} });
		if (typeof ngDevMode === "undefined" || ngDevMode) afterRenderEffect({ read: () => {
			const violations = [];
			if (!this._tabContent()) violations.push("ngTabPanel must have an ngTabContent structural directive to render.");
			if (!this._tabs._tabMap().has(this.value())) violations.push(`ngTabPanel with value '${this.value()}' does not have a corresponding ngTab.`);
			reportViolations(violations, this.element);
		} });
	}
	ngOnInit() {
		this._tabs._collection.register(this);
	}
	ngOnDestroy() {
		this._tabs._collection.unregister(this);
	}
	static ɵfac = function TabPanel_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || TabPanel)();
	};
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: TabPanel,
		selectors: [[
			"",
			"ngTabPanel",
			""
		]],
		contentQueries: function TabPanel_ContentQueries(rf, ctx, dirIndex) {
			if (rf & 1) ɵɵcontentQuerySignal(dirIndex, ctx._tabContent, TabContent, 5);
			if (rf & 2) ɵɵqueryAdvance();
		},
		hostAttrs: ["role", "tabpanel"],
		hostVars: 4,
		hostBindings: function TabPanel_HostBindings(rf, ctx) {
			if (rf & 2) ɵɵattribute("id", ctx._pattern.id())("tabindex", ctx._pattern.tabIndex())("inert", !ctx.visible() ? true : null)("aria-labelledby", ctx._pattern.labelledBy());
		},
		inputs: {
			id: [1, "id"],
			value: [1, "value"]
		},
		exportAs: ["ngTabPanel"],
		features: [ɵɵHostDirectivesFeature([{
			directive: DeferredContentAware,
			inputs: ["preserveContent", "preserveContent"]
		}])]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabPanel, [{
		type: Directive,
		args: [{
			selector: "[ngTabPanel]",
			exportAs: "ngTabPanel",
			host: {
				"role": "tabpanel",
				"[attr.id]": "_pattern.id()",
				"[attr.tabindex]": "_pattern.tabIndex()",
				"[attr.inert]": "!visible() ? true : null",
				"[attr.aria-labelledby]": "_pattern.labelledBy()"
			},
			hostDirectives: [{
				directive: DeferredContentAware,
				inputs: ["preserveContent"]
			}]
		}]
	}], () => [], {
		id: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "id",
				required: false
			}]
		}],
		value: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "value",
				required: true
			}]
		}],
		_tabContent: [{
			type: ContentChild,
			args: [forwardRef(() => TabContent), { isSignal: true }]
		}]
	});
})();
//#endregion
export { Tab, TabContent, TabList, TabPanel, Tabs, DeferredContent as ɵɵDeferredContent, DeferredContentAware as ɵɵDeferredContentAware };
