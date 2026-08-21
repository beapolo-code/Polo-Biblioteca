import { Ri as signal, _ as untracked, c as computed, yr as inject } from "./_resource-chunk-Bs197SVl.js";
import { $a as ɵɵdomProperty, Ki as ɵɵHostDirectivesFeature, O as booleanAttribute, Po as ɵɵlistener, Sn as Input, T as afterRenderEffect, Va as ɵɵdefineDirective, X as input, fn as ElementRef, ia as ɵɵattribute, ki as setClassMetadata, nt as model, qi as ɵɵInheritDefinitionFeature, rt as numberAttribute, un as Directive, vr as afterNextRender, zn as Output } from "./core-7astvhVk.js";
import { t as _IdGenerator } from "./_id-generator-chunk-CegWFmGw.js";
import { a as ListNavigation, c as SortedCollection, d as reportViolations, f as signal$1, i as ListFocus, l as computed$1, m as ListExpansion, n as DeferredContentAware, o as KeyboardEventManager, p as sortDirectives, r as ClickEventManager, s as Modifier, t as DeferredContent } from "./_deferred-content-chunk-DXF7rS4N.js";
import { r as Directionality } from "./bidi-DpXnHqmA.js";
//#region node_modules/@angular/aria/fesm2022/_list-typeahead-chunk.mjs
var ListSelection = class {
	inputs;
	rangeStartIndex = signal$1(0);
	rangeEndIndex = signal$1(0);
	selectedItems = computed$1(() => this.inputs.items().filter((item) => this.inputs.value().includes(item.value())));
	constructor(inputs) {
		this.inputs = inputs;
	}
	select(item, opts = { anchor: true }) {
		item = item ?? this.inputs.focusManager.inputs.activeItem();
		if (!item || item.disabled() || !item.selectable() || !this.inputs.focusManager.isFocusable(item) || this.inputs.value().includes(item.value())) return;
		if (!this.inputs.multi()) this.deselectAll();
		const index = this.inputs.items().findIndex((i) => i === item);
		if (opts.anchor) this.beginRangeSelection(index);
		this.inputs.value.update((values) => values.concat(item.value()));
	}
	deselect(item) {
		item = item ?? this.inputs.focusManager.inputs.activeItem();
		if (item && !item.disabled() && item.selectable()) this.inputs.value.update((values) => values.filter((value) => value !== item.value()));
	}
	toggle(item) {
		item = item ?? this.inputs.focusManager.inputs.activeItem();
		if (item) this.inputs.value().includes(item.value()) ? this.deselect(item) : this.select(item);
	}
	toggleOne() {
		const item = this.inputs.focusManager.inputs.activeItem();
		if (item) this.inputs.value().includes(item.value()) ? this.deselect() : this.selectOne();
	}
	selectAll() {
		if (!this.inputs.multi()) return;
		for (const item of this.inputs.items()) this.select(item, { anchor: false });
		this.beginRangeSelection();
	}
	deselectAll() {
		for (const value of this.inputs.value()) {
			const item = this.inputs.items().find((i) => i.value() === value);
			item ? this.deselect(item) : this.inputs.value.update((values) => values.filter((v) => v !== value));
		}
	}
	toggleAll() {
		this.inputs.items().filter((i) => !i.disabled() && i.selectable() && this.inputs.focusManager.isFocusable(i)).map((i) => i.value()).every((i) => this.inputs.value().includes(i)) ? this.deselectAll() : this.selectAll();
	}
	selectOne() {
		const item = this.inputs.focusManager.inputs.activeItem();
		if (item && (item.disabled() || !item.selectable())) return;
		this.deselectAll();
		if (this.inputs.value().length > 0 && !this.inputs.multi()) return;
		this.select();
	}
	selectRange(opts = { anchor: true }) {
		if (this.inputs.focusManager.prevActiveIndex() === this.rangeStartIndex() && opts.anchor) this.beginRangeSelection(this.inputs.focusManager.prevActiveIndex());
		const itemsInRange = this._getItemsFromIndex(this.rangeStartIndex());
		const itemsOutOfRange = this._getItemsFromIndex(this.rangeEndIndex()).filter((i) => !itemsInRange.includes(i));
		for (const item of itemsOutOfRange) this.deselect(item);
		for (const item of itemsInRange) this.select(item, { anchor: false });
		if (itemsInRange.length) {
			const item = itemsInRange.pop();
			const index = this.inputs.items().findIndex((i) => i === item);
			this.rangeEndIndex.set(index);
		}
	}
	beginRangeSelection(index = this.inputs.focusManager.activeIndex()) {
		this.rangeStartIndex.set(index);
		this.rangeEndIndex.set(index);
	}
	_getItemsFromIndex(index) {
		if (index === -1) return [];
		const upper = Math.max(this.inputs.focusManager.activeIndex(), index);
		const lower = Math.min(this.inputs.focusManager.activeIndex(), index);
		const items = [];
		for (let i = lower; i <= upper; i++) items.push(this.inputs.items()[i]);
		if (this.inputs.focusManager.activeIndex() < index) return items.reverse();
		return items;
	}
};
var ListTypeahead = class {
	inputs;
	timeout;
	focusManager;
	isTyping = computed$1(() => this._query().length > 0);
	_query = signal$1("");
	_startIndex = signal$1(void 0);
	constructor(inputs) {
		this.inputs = inputs;
		this.focusManager = inputs.focusManager;
	}
	search(char) {
		if (char.length !== 1) return false;
		if (!this.isTyping() && char === " ") return false;
		if (this._startIndex() === void 0) this._startIndex.set(this.focusManager.activeIndex());
		clearTimeout(this.timeout);
		this._query.update((q) => q + char.toLowerCase());
		const item = this._getItem();
		if (item) this.focusManager.focus(item);
		this.timeout = setTimeout(() => {
			this._query.set("");
			this._startIndex.set(void 0);
		}, this.inputs.typeaheadDelay());
		return true;
	}
	_getItem() {
		const items = this.focusManager.inputs.items();
		const itemCount = items.length;
		const startIndex = this._startIndex();
		for (let i = 0; i < itemCount; i++) {
			const item = items[(startIndex + 1 + i) % itemCount];
			if (this.focusManager.isFocusable(item) && item.searchTerm().toLowerCase().startsWith(this._query())) return item;
		}
	}
};
//#endregion
//#region node_modules/@angular/aria/fesm2022/_tree-chunk.mjs
var TreeListFocus = class extends ListFocus {
	isFocusable(item) {
		return super.isFocusable(item) && item.visible();
	}
};
var Tree$1 = class {
	inputs;
	navigationBehavior;
	selectionBehavior;
	typeaheadBehavior;
	focusBehavior;
	expansionBehavior;
	disabled = computed$1(() => this.focusBehavior.isListDisabled());
	activeDescendant = computed$1(() => this.focusBehavior.getActiveDescendant());
	tabIndex = computed$1(() => this.focusBehavior.getListTabIndex());
	activeIndex = computed$1(() => this.focusBehavior.activeIndex());
	_anchorIndex = signal$1(0);
	_wrap = signal$1(true);
	constructor(inputs) {
		this.inputs = inputs;
		this.focusBehavior = new TreeListFocus(inputs);
		this.selectionBehavior = new ListSelection({
			...inputs,
			focusManager: this.focusBehavior
		});
		this.typeaheadBehavior = new ListTypeahead({
			...inputs,
			focusManager: this.focusBehavior
		});
		this.expansionBehavior = new ListExpansion(inputs);
		this.navigationBehavior = new ListNavigation({
			...inputs,
			focusManager: this.focusBehavior,
			wrap: computed$1(() => this._wrap() && this.inputs.wrap())
		});
	}
	getItemTabindex(item) {
		return this.focusBehavior.getItemTabIndex(item);
	}
	first(opts) {
		this._navigate(opts, () => this.navigationBehavior.first(opts));
	}
	last(opts) {
		this._navigate(opts, () => this.navigationBehavior.last(opts));
	}
	next(opts) {
		this._navigate(opts, () => this.navigationBehavior.next(opts));
	}
	prev(opts) {
		this._navigate(opts, () => this.navigationBehavior.prev(opts));
	}
	firstChild(opts) {
		this._navigate(opts, () => {
			const items = this.inputs.activeItem()?.children?.() ?? [];
			return this.navigationBehavior.first({
				items,
				...opts
			});
		});
	}
	lastChild(opts) {
		this._navigate(opts, () => {
			const items = this.inputs.activeItem()?.children?.() ?? [];
			return this.navigationBehavior.last({
				items,
				...opts
			});
		});
	}
	nextSibling(opts) {
		this._navigate(opts, () => {
			const items = this.inputs.activeItem()?.parent?.()?.children?.() ?? [];
			return this.navigationBehavior.next({
				items,
				...opts
			});
		});
	}
	prevSibling(opts) {
		this._navigate(opts, () => {
			const items = this.inputs.activeItem()?.parent?.()?.children?.() ?? [];
			return this.navigationBehavior.prev({
				items,
				...opts
			});
		});
	}
	parent(opts) {
		this._navigate(opts, () => this.navigationBehavior.goto(this.inputs.activeItem()?.parent?.(), opts));
	}
	goto(item, opts) {
		this._navigate(opts, () => this.navigationBehavior.goto(item, opts));
	}
	unfocus() {
		this.inputs.activeItem.set(void 0);
	}
	anchor(index) {
		this._anchorIndex.set(index);
	}
	search(char, opts) {
		this._navigate(opts, () => this.typeaheadBehavior.search(char));
	}
	isTyping() {
		return this.typeaheadBehavior.isTyping();
	}
	select(item) {
		this.selectionBehavior.select(item);
	}
	selectOne() {
		this.selectionBehavior.selectOne();
	}
	deselect(item) {
		this.selectionBehavior.deselect(item);
	}
	deselectAll() {
		this.selectionBehavior.deselectAll();
	}
	toggle(item) {
		this.selectionBehavior.toggle(item);
	}
	toggleOne() {
		this.selectionBehavior.toggleOne();
	}
	toggleAll() {
		this.selectionBehavior.toggleAll();
	}
	toggleExpansion(item) {
		item ??= this.inputs.activeItem();
		if (!item || !this.isFocusable(item)) return;
		if (this.isExpandable(item)) this.expansionBehavior.toggle(item);
	}
	expand(item) {
		if (this.isExpandable(item)) this.expansionBehavior.open(item);
	}
	collapse(item) {
		this.expansionBehavior.close(item);
	}
	expandSiblings(item) {
		item ??= this.inputs.activeItem();
		if (!item) return;
		const parent = item.parent?.();
		(parent ? parent.children?.() : this.inputs.items().filter((i) => !i.parent?.()))?.forEach((s) => this.expand(s));
	}
	expandAll() {
		this.expansionBehavior.openAll();
	}
	collapseAll() {
		this.expansionBehavior.closeAll();
	}
	isFocusable(item) {
		return this.focusBehavior.isFocusable(item);
	}
	isExpandable(item) {
		return this.expansionBehavior.isExpandable(item);
	}
	updateSelection(opts = { anchor: true }) {
		if (opts.toggle) this.selectionBehavior.toggle();
		if (opts.select) this.selectionBehavior.select();
		if (opts.selectOne) this.selectionBehavior.selectOne();
		if (opts.selectRange) this.selectionBehavior.selectRange();
		if (!opts.anchor) this.anchor(this.selectionBehavior.rangeStartIndex());
	}
	_navigate(opts = {}, operation) {
		if (opts?.selectRange) {
			this._wrap.set(false);
			this.selectionBehavior.rangeStartIndex.set(this._anchorIndex());
		}
		if (operation()) this.updateSelection(opts);
		this._wrap.set(true);
	}
};
var TreeItemPattern = class TreeItemPattern {
	inputs;
	id = () => this.inputs.id();
	value = () => this.inputs.value();
	element = () => this.inputs.element();
	disabled = () => this.inputs.disabled();
	searchTerm = () => this.inputs.searchTerm();
	tree = () => this.inputs.tree();
	parent = computed$1(() => {
		const parent = this.inputs.parent();
		return parent instanceof TreeItemPattern ? parent : void 0;
	});
	children = () => this.inputs.children() ?? [];
	index = computed$1(() => this.tree().inputs.items().indexOf(this));
	expandable = () => this.inputs.hasChildren();
	selectable = () => this.inputs.selectable();
	expanded;
	level = computed$1(() => this.inputs.parent().level() + 1);
	visible = computed$1(() => this.inputs.parent().expanded() && this.inputs.parent().visible());
	setsize = computed$1(() => this.inputs.parent().children().length);
	posinset = computed$1(() => this.inputs.parent().children().indexOf(this) + 1);
	active = computed$1(() => this.tree().activeItem() === this);
	tabIndex = computed$1(() => this.tree().treeBehavior.getItemTabindex(this));
	selected = computed$1(() => {
		if (this.tree().nav()) return;
		if (!this.selectable()) return;
		return this.tree().value().includes(this.value());
	});
	current = computed$1(() => {
		if (!this.tree().nav()) return;
		if (!this.selectable()) return;
		return this.tree().value().includes(this.value()) ? this.tree().currentType() : void 0;
	});
	constructor(inputs) {
		this.inputs = inputs;
		this.expanded = inputs.expanded;
	}
};
var TreePattern = class {
	inputs;
	treeBehavior;
	hasBeenInteracted = signal$1(false);
	level = () => 0;
	expanded = () => true;
	visible = () => true;
	tabIndex = computed$1(() => this.treeBehavior.tabIndex());
	activeDescendant = computed$1(() => this.treeBehavior.activeDescendant());
	children = computed$1(() => this.inputs.items().filter((item) => item.level() === this.level() + 1));
	followFocus = computed$1(() => this.inputs.selectionMode() === "follow");
	isRtl = computed$1(() => this.textDirection() === "rtl");
	prevKey = computed$1(() => {
		if (this.inputs.orientation() === "vertical") return "ArrowUp";
		return this.isRtl() ? "ArrowRight" : "ArrowLeft";
	});
	nextKey = computed$1(() => {
		if (this.inputs.orientation() === "vertical") return "ArrowDown";
		return this.isRtl() ? "ArrowLeft" : "ArrowRight";
	});
	collapseKey = computed$1(() => {
		if (this.inputs.orientation() === "horizontal") return "ArrowUp";
		return this.isRtl() ? "ArrowRight" : "ArrowLeft";
	});
	expandKey = computed$1(() => {
		if (this.inputs.orientation() === "horizontal") return "ArrowDown";
		return this.isRtl() ? "ArrowLeft" : "ArrowRight";
	});
	dynamicSpaceKey = computed$1(() => this.treeBehavior.isTyping() ? "" : " ");
	typeaheadRegexp = /^.$/;
	keydown = computed$1(() => {
		const manager = new KeyboardEventManager();
		const tree = this.treeBehavior;
		manager.on(this.prevKey, () => tree.prev({ selectOne: this.followFocus() }), { ignoreRepeat: false }).on(this.nextKey, () => tree.next({ selectOne: this.followFocus() }), { ignoreRepeat: false }).on("Home", () => tree.first({ selectOne: this.followFocus() })).on("End", () => tree.last({ selectOne: this.followFocus() })).on(this.typeaheadRegexp, (e) => tree.search(e.key, { selectOne: this.followFocus() })).on(Modifier.Shift, "*", () => tree.expandSiblings()).on(this.expandKey, () => this._expandOrFirstChild({ selectOne: this.followFocus() })).on(this.collapseKey, () => this._collapseOrParent({ selectOne: this.followFocus() }));
		if (this.inputs.multi()) manager.on(Modifier.Any, "Shift", () => tree.anchor(this.treeBehavior.activeIndex())).on(Modifier.Shift, this.prevKey, () => tree.prev({ selectRange: true }), { ignoreRepeat: false }).on(Modifier.Shift, this.nextKey, () => tree.next({ selectRange: true }), { ignoreRepeat: false }).on([Modifier.Ctrl | Modifier.Shift, Modifier.Meta | Modifier.Shift], "Home", () => tree.first({
			selectRange: true,
			anchor: false
		})).on([Modifier.Ctrl | Modifier.Shift, Modifier.Meta | Modifier.Shift], "End", () => tree.last({
			selectRange: true,
			anchor: false
		})).on(Modifier.Shift, "Enter", () => tree.updateSelection({
			selectRange: true,
			anchor: false
		})).on(Modifier.Shift, this.dynamicSpaceKey, () => tree.updateSelection({
			selectRange: true,
			anchor: false
		}));
		if (!this.followFocus() && this.inputs.multi()) manager.on(this.dynamicSpaceKey, () => tree.toggle()).on("Enter", () => tree.toggle(), { preventDefault: !this.nav() }).on([Modifier.Ctrl, Modifier.Meta], "A", () => tree.toggleAll());
		if (!this.followFocus() && !this.inputs.multi()) {
			manager.on(this.dynamicSpaceKey, () => tree.selectOne());
			manager.on("Enter", () => tree.selectOne(), { preventDefault: !this.nav() });
		}
		if (this.inputs.multi() && this.followFocus()) manager.on([Modifier.Ctrl, Modifier.Meta], this.prevKey, () => tree.prev(), { ignoreRepeat: false }).on([Modifier.Ctrl, Modifier.Meta], this.nextKey, () => tree.next(), { ignoreRepeat: false }).on([Modifier.Ctrl, Modifier.Meta], this.expandKey, () => this._expandOrFirstChild()).on([Modifier.Ctrl, Modifier.Meta], this.collapseKey, () => this._collapseOrParent()).on([Modifier.Ctrl, Modifier.Meta], " ", () => tree.toggle()).on([Modifier.Ctrl, Modifier.Meta], "Enter", () => tree.toggle()).on([Modifier.Ctrl, Modifier.Meta], "Home", () => tree.first()).on([Modifier.Ctrl, Modifier.Meta], "End", () => tree.last()).on([Modifier.Ctrl, Modifier.Meta], "A", () => {
			tree.toggleAll();
			tree.select();
		});
		return manager;
	});
	clickManager = computed$1(() => {
		const manager = new ClickEventManager();
		if (this.multi()) manager.on(Modifier.Shift, (e) => this.goto(e, { selectRange: true }));
		if (!this.multi()) return manager.on((e) => this.goto(e, { selectOne: true }));
		if (this.multi() && this.followFocus()) return manager.on((e) => this.goto(e, { selectOne: true })).on(Modifier.Ctrl, (e) => this.goto(e, { toggle: true }));
		if (this.multi() && !this.followFocus()) return manager.on((e) => this.goto(e, { toggle: true }));
		return manager;
	});
	id = () => this.inputs.id();
	element = () => this.inputs.element();
	nav = () => this.inputs.nav();
	currentType = () => this.inputs.currentType();
	items = () => this.inputs.items();
	focusMode = () => this.inputs.focusMode();
	disabled = () => this.inputs.disabled();
	activeItem;
	softDisabled = () => this.inputs.softDisabled();
	wrap = () => this.inputs.wrap();
	orientation = () => this.inputs.orientation();
	textDirection = () => this.inputs.textDirection();
	multi = computed$1(() => this.nav() ? false : this.inputs.multi());
	selectionMode = () => this.inputs.selectionMode();
	typeaheadDelay = () => this.inputs.typeaheadDelay();
	value;
	constructor(inputs) {
		this.inputs = inputs;
		this.activeItem = inputs.activeItem;
		this.value = inputs.value;
		this.treeBehavior = new Tree$1({
			...inputs,
			multi: this.multi,
			multiExpandable: () => true
		});
	}
	validate() {
		const violations = [];
		if (!this.inputs.multi() && this.inputs.value().length > 1) violations.push(`A single-select tree should not have multiple selected options. Selected options: ${this.inputs.value().join(", ")}`);
		const values = this.inputs.items().map((t) => t.value());
		const duplicates = values.filter((val, idx) => values.indexOf(val) !== idx);
		if (duplicates.length > 0) violations.push(`Duplicate tree item value '${duplicates[0]}' detected inside ngTree.`);
		return violations;
	}
	setDefaultState() {
		let firstItem;
		for (const item of this.inputs.items()) {
			if (!item.visible()) continue;
			if (!this.treeBehavior.isFocusable(item)) continue;
			if (firstItem === void 0) firstItem = item;
			if (item.selected()) {
				this.activeItem.set(item);
				return;
			}
		}
		if (firstItem !== void 0) this.activeItem.set(firstItem);
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
	goto(e, opts) {
		const item = this._getItem(e);
		if (!item) return;
		this.treeBehavior.goto(item, opts);
		this.treeBehavior.toggleExpansion(item);
	}
	_expandOrFirstChild(opts) {
		const item = this.treeBehavior.inputs.activeItem();
		if (item && this.treeBehavior.isExpandable(item) && !item.expanded()) this.treeBehavior.expand(item);
		else this.treeBehavior.firstChild(opts);
	}
	_collapseOrParent(opts) {
		const item = this.treeBehavior.inputs.activeItem();
		if (item && this.treeBehavior.isExpandable(item) && item.expanded()) this.treeBehavior.collapse(item);
		else this.treeBehavior.parent(opts);
	}
	_getItem(event) {
		if (!event.target) return;
		const element = event.target.closest("[role=\"treeitem\"]");
		return this.inputs.items().find((i) => i.element() === element);
	}
};
//#endregion
//#region node_modules/@angular/aria/fesm2022/_transforms-chunk.mjs
function tabIndexTransform(v) {
	return v === void 0 ? void 0 : numberAttribute(v);
}
//#endregion
//#region node_modules/@angular/aria/fesm2022/tree.mjs
var Tree = class Tree {
	_elementRef = inject(ElementRef);
	element = this._elementRef.nativeElement;
	_collection = new SortedCollection();
	id = input(inject(_IdGenerator).getId("ng-tree-", true), ...ngDevMode ? [{ debugName: "id" }] : []);
	orientation = input("vertical", ...ngDevMode ? [{ debugName: "orientation" }] : []);
	multi = input(false, {
		...ngDevMode ? { debugName: "multi" } : {},
		transform: booleanAttribute
	});
	disabled = input(false, {
		...ngDevMode ? { debugName: "disabled" } : {},
		transform: booleanAttribute
	});
	selectionMode = input("explicit", ...ngDevMode ? [{ debugName: "selectionMode" }] : []);
	focusMode = input("roving", ...ngDevMode ? [{ debugName: "focusMode" }] : []);
	wrap = input(true, {
		...ngDevMode ? { debugName: "wrap" } : {},
		transform: booleanAttribute
	});
	softDisabled = input(true, {
		...ngDevMode ? { debugName: "softDisabled" } : {},
		transform: booleanAttribute
	});
	typeaheadDelay = input(500, ...ngDevMode ? [{ debugName: "typeaheadDelay" }] : []);
	tabIndex = input(void 0, {
		...ngDevMode ? { debugName: "tabIndex" } : {},
		alias: "tabindex",
		transform: tabIndexTransform
	});
	value = model([], ...ngDevMode ? [{ debugName: "value" }] : []);
	textDirection = inject(Directionality).valueSignal;
	nav = input(false, {
		...ngDevMode ? { debugName: "nav" } : {},
		transform: booleanAttribute
	});
	currentType = input("page", ...ngDevMode ? [{ debugName: "currentType" }] : []);
	_pattern;
	activeDescendant;
	constructor() {
		const inputs = {
			...this,
			id: this.id,
			items: computed(() => this._collection.orderedItems().map((item) => item._pattern)),
			activeItem: signal(void 0),
			element: () => this.element
		};
		this._pattern = new TreePattern(inputs);
		this.activeDescendant = computed(() => this._pattern.activeDescendant(), ...ngDevMode ? [{ debugName: "activeDescendant" }] : []);
		afterNextRender(() => {
			this._collection.startObserving(this.element);
		});
		if (typeof ngDevMode === "undefined" || ngDevMode) afterRenderEffect({ read: () => {
			reportViolations(this._pattern.validate(), this.element);
		} });
		afterRenderEffect({ write: () => this._pattern.setDefaultStateEffect() });
		afterRenderEffect({ write: () => {
			const items = inputs.items();
			const activeItem = untracked(() => inputs.activeItem());
			if (activeItem && !items.some((i) => i === activeItem)) {
				this._pattern.treeBehavior.unfocus();
				this._pattern.setDefaultState();
			}
		} });
	}
	ngOnDestroy() {
		this._collection.stopObserving();
	}
	scrollActiveItemIntoView(options = { block: "nearest" }) {
		this._pattern.inputs.activeItem()?.element()?.scrollIntoView(options);
	}
	static ɵfac = function Tree_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || Tree)();
	};
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: Tree,
		selectors: [[
			"",
			"ngTree",
			""
		]],
		hostAttrs: ["role", "tree"],
		hostVars: 6,
		hostBindings: function Tree_HostBindings(rf, ctx) {
			if (rf & 1) ɵɵlistener("keydown", function Tree_keydown_HostBindingHandler($event) {
				return ctx._pattern.onKeydown($event);
			})("click", function Tree_click_HostBindingHandler($event) {
				return ctx._pattern.onClick($event);
			})("focusin", function Tree_focusin_HostBindingHandler() {
				return ctx._pattern.onFocusIn();
			});
			if (rf & 2) {
				ɵɵdomProperty("tabIndex", ctx.tabIndex() !== void 0 ? ctx.tabIndex() : ctx._pattern.tabIndex());
				ɵɵattribute("id", ctx.id())("aria-orientation", ctx._pattern.orientation())("aria-multiselectable", ctx._pattern.multi())("aria-disabled", ctx._pattern.disabled())("aria-activedescendant", ctx._pattern.activeDescendant());
			}
		},
		inputs: {
			id: [1, "id"],
			orientation: [1, "orientation"],
			multi: [1, "multi"],
			disabled: [1, "disabled"],
			selectionMode: [1, "selectionMode"],
			focusMode: [1, "focusMode"],
			wrap: [1, "wrap"],
			softDisabled: [1, "softDisabled"],
			typeaheadDelay: [1, "typeaheadDelay"],
			tabIndex: [
				1,
				"tabindex",
				"tabIndex"
			],
			value: [1, "value"],
			nav: [1, "nav"],
			currentType: [1, "currentType"]
		},
		outputs: { value: "valueChange" },
		exportAs: ["ngTree"]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tree, [{
		type: Directive,
		args: [{
			selector: "[ngTree]",
			exportAs: "ngTree",
			host: {
				"role": "tree",
				"[attr.id]": "id()",
				"[attr.aria-orientation]": "_pattern.orientation()",
				"[attr.aria-multiselectable]": "_pattern.multi()",
				"[attr.aria-disabled]": "_pattern.disabled()",
				"[attr.aria-activedescendant]": "_pattern.activeDescendant()",
				"[tabindex]": "tabIndex() !== undefined ? tabIndex() : _pattern.tabIndex()",
				"(keydown)": "_pattern.onKeydown($event)",
				"(click)": "_pattern.onClick($event)",
				"(focusin)": "_pattern.onFocusIn()"
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
		orientation: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "orientation",
				required: false
			}]
		}],
		multi: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "multi",
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
		selectionMode: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "selectionMode",
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
		typeaheadDelay: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "typeaheadDelay",
				required: false
			}]
		}],
		tabIndex: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "tabindex",
				required: false
			}]
		}],
		value: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "value",
				required: false
			}]
		}, {
			type: Output,
			args: ["valueChange"]
		}],
		nav: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "nav",
				required: false
			}]
		}],
		currentType: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "currentType",
				required: false
			}]
		}]
	});
})();
var TreeItemGroup = class TreeItemGroup {
	_elementRef = inject(ElementRef);
	element = this._elementRef.nativeElement;
	_deferredContent = inject(DeferredContent);
	_unorderedItems = signal(/* @__PURE__ */ new Set(), ...ngDevMode ? [{ debugName: "_unorderedItems" }] : []);
	_childPatterns = computed(() => [...this._unorderedItems()].sort(sortDirectives).map((c) => c._pattern), ...ngDevMode ? [{ debugName: "_childPatterns" }] : []);
	ownedBy = input.required(...ngDevMode ? [{ debugName: "ownedBy" }] : []);
	ngOnInit() {
		this._deferredContent.deferredContentAware.set(this.ownedBy());
		this.ownedBy()._register(this);
	}
	ngOnDestroy() {
		this.ownedBy()._unregister();
	}
	_register(child) {
		this._unorderedItems().add(child);
		this._unorderedItems.set(new Set(this._unorderedItems()));
	}
	_unregister(child) {
		this._unorderedItems().delete(child);
		this._unorderedItems.set(new Set(this._unorderedItems()));
	}
	static ɵfac = function TreeItemGroup_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || TreeItemGroup)();
	};
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: TreeItemGroup,
		selectors: [[
			"ng-template",
			"ngTreeItemGroup",
			""
		]],
		inputs: { ownedBy: [1, "ownedBy"] },
		exportAs: ["ngTreeItemGroup"],
		features: [ɵɵHostDirectivesFeature([DeferredContent])]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TreeItemGroup, [{
		type: Directive,
		args: [{
			selector: "ng-template[ngTreeItemGroup]",
			exportAs: "ngTreeItemGroup",
			hostDirectives: [DeferredContent]
		}]
	}], null, { ownedBy: [{
		type: Input,
		args: [{
			isSignal: true,
			alias: "ownedBy",
			required: true
		}]
	}] });
})();
var TreeItem = class TreeItem extends DeferredContentAware {
	_elementRef = inject(ElementRef);
	element = this._elementRef.nativeElement;
	_group = signal(void 0, ...ngDevMode ? [{ debugName: "_group" }] : []);
	id = input(inject(_IdGenerator).getId("ng-tree-item-", true), ...ngDevMode ? [{ debugName: "id" }] : []);
	value = input.required(...ngDevMode ? [{ debugName: "value" }] : []);
	parent = input.required(...ngDevMode ? [{ debugName: "parent" }] : []);
	disabled = input(false, {
		...ngDevMode ? { debugName: "disabled" } : {},
		transform: booleanAttribute
	});
	selectable = input(true, ...ngDevMode ? [{ debugName: "selectable" }] : []);
	expanded = model(false, ...ngDevMode ? [{ debugName: "expanded" }] : []);
	label = input(...ngDevMode ? [void 0, { debugName: "label" }] : []);
	searchTerm = computed(() => this.label() ?? this.element.textContent, ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
	tree = computed(() => {
		if (this.parent() instanceof Tree) return this.parent();
		return this.parent().ownedBy().tree();
	}, ...ngDevMode ? [{ debugName: "tree" }] : []);
	active = computed(() => this._pattern.active(), ...ngDevMode ? [{ debugName: "active" }] : []);
	level = computed(() => this._pattern.level(), ...ngDevMode ? [{ debugName: "level" }] : []);
	selected = computed(() => this._pattern.selected(), ...ngDevMode ? [{ debugName: "selected" }] : []);
	visible = computed(() => this._pattern.visible(), ...ngDevMode ? [{ debugName: "visible" }] : []);
	_expanded = computed(() => this._pattern.expandable() ? this._pattern.expanded() : void 0, ...ngDevMode ? [{ debugName: "_expanded" }] : []);
	_pattern;
	constructor() {
		super();
		afterRenderEffect({ write: () => {
			this.contentVisible.set(this._pattern.expanded());
		} });
	}
	ngOnInit() {
		if (this.parent() instanceof TreeItemGroup) this.parent()._register(this);
		this.tree()._collection.register(this);
		const treePattern = computed(() => this.tree()._pattern, ...ngDevMode ? [{ debugName: "treePattern" }] : []);
		const parentPattern = computed(() => {
			if (this.parent() instanceof Tree) return treePattern();
			return this.parent().ownedBy()._pattern;
		}, ...ngDevMode ? [{ debugName: "parentPattern" }] : []);
		this._pattern = new TreeItemPattern({
			...this,
			tree: treePattern,
			parent: parentPattern,
			children: computed(() => this._group()?._childPatterns()),
			hasChildren: computed(() => !!this._group()),
			element: () => this.element,
			searchTerm: () => this.searchTerm() ?? ""
		});
	}
	ngOnDestroy() {
		if (this.parent() instanceof TreeItemGroup) this.parent()._unregister(this);
		this.tree()._collection.unregister(this);
	}
	_register(group) {
		this._group.set(group);
	}
	_unregister() {
		this._group.set(void 0);
	}
	static ɵfac = function TreeItem_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || TreeItem)();
	};
	static ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
		type: TreeItem,
		selectors: [[
			"",
			"ngTreeItem",
			""
		]],
		hostAttrs: ["role", "treeitem"],
		hostVars: 10,
		hostBindings: function TreeItem_HostBindings(rf, ctx) {
			if (rf & 2) {
				ɵɵdomProperty("id", ctx._pattern.id());
				ɵɵattribute("data-active", ctx.active())("aria-expanded", ctx._expanded())("aria-selected", ctx.selected())("aria-current", ctx._pattern.current())("aria-disabled", ctx._pattern.disabled())("aria-level", ctx.level())("aria-setsize", ctx._pattern.setsize())("aria-posinset", ctx._pattern.posinset())("tabindex", ctx._pattern.tabIndex());
			}
		},
		inputs: {
			id: [1, "id"],
			value: [1, "value"],
			parent: [1, "parent"],
			disabled: [1, "disabled"],
			selectable: [1, "selectable"],
			expanded: [1, "expanded"],
			label: [1, "label"]
		},
		outputs: { expanded: "expandedChange" },
		exportAs: ["ngTreeItem"],
		features: [ɵɵInheritDefinitionFeature]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TreeItem, [{
		type: Directive,
		args: [{
			selector: "[ngTreeItem]",
			exportAs: "ngTreeItem",
			host: {
				"[attr.data-active]": "active()",
				"role": "treeitem",
				"[id]": "_pattern.id()",
				"[attr.aria-expanded]": "_expanded()",
				"[attr.aria-selected]": "selected()",
				"[attr.aria-current]": "_pattern.current()",
				"[attr.aria-disabled]": "_pattern.disabled()",
				"[attr.aria-level]": "level()",
				"[attr.aria-setsize]": "_pattern.setsize()",
				"[attr.aria-posinset]": "_pattern.posinset()",
				"[attr.tabindex]": "_pattern.tabIndex()"
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
		value: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "value",
				required: true
			}]
		}],
		parent: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "parent",
				required: true
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
		selectable: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "selectable",
				required: false
			}]
		}],
		expanded: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "expanded",
				required: false
			}]
		}, {
			type: Output,
			args: ["expandedChange"]
		}],
		label: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "label",
				required: false
			}]
		}]
	});
})();
//#endregion
export { Tree, TreeItem, TreeItemGroup, DeferredContent as ɵɵDeferredContent };
