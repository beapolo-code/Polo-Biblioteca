import { C as intersectRanges, N as startOfDay, T as joinDateTimeFormatParts, a as addDays, h as diffDays, i as NativeDateFormatter, j as rangesEqual, k as rangeContainsMarker, m as diffDayAndTime, p as createDuration, r as FuncDateFormatter, s as addMs, t as CmdDateFormatter, u as asRoughMs, w as invertRanges, y as durationsEqual } from "./headless-calendar-CCBEW-nM.js";
import { n as joinClassNames } from "./69261bb4-BJPZADnq.js";
//#region node_modules/fullcalendar/chunks/4a45af02.js
var classNames = {
	"popoverZ": "fc-dp",
	"isolate": "fc-6T",
	"borderBoxRoot": "fc-BO",
	"notAllowed": "fc-la",
	"noScrollbars": "fc-mM",
	"noShrink": "fc-yf",
	"calendarScreenRoot": "fc-wS",
	"safeTiles": "fc-mP",
	"calendarPrintRoot": "fc-OB",
	"cursorPointer": "fc-hH",
	"cursorResizeT": "fc-wi",
	"cursorResizeB": "fc-My",
	"cursorResizeS": "fc-N8",
	"cursorResizeE": "fc-Yv",
	"cursorColResizer": "fc-DR",
	"hit": "fc-Lp",
	"hitX": "fc-YZ",
	"hitY": "fc-RU",
	"hitXSkinny": "fc-4P",
	"selectNone": "fc-6M",
	"invisible": "fc-Sy",
	"borderNone": "fc-QX",
	"borderOnlyT": "fc-3t",
	"borderOnlyB": "fc-fo",
	"borderOnlyS": "fc-wk",
	"borderOnlyE": "fc-fx",
	"borderlessX": "fc-8R",
	"borderlessY": "fc-5a",
	"fakeBorderS": "fc-hM",
	"flexRow": "fc-ei",
	"flexCol": "fc-Xt",
	"grow": "fc-QU",
	"liquid": "fc-J6",
	"minHeight0": "fc-w9",
	"liquidX": "fc-q3",
	"printRoot": "fc-32",
	"printHeader": "fc-IH",
	"noPadding": "fc-Kk",
	"noMargin": "fc-5M",
	"noMarginY": "fc-G8",
	"noMarginX": "fc-tR",
	"whiteSpaceNoWrap": "fc-8y",
	"whiteSpacePre": "fc-gR",
	"overflowAnchorNone": "fc-eu",
	"crop": "fc-75",
	"cropNowrap": "fc-CJ",
	"rel": "fc-xp",
	"abs": "fc-So",
	"start0": "fc-Q8",
	"fill": "fc-TJ",
	"fillTop": "fc-X3",
	"fillX": "fc-O5",
	"fillY": "fc-WS",
	"fillStart": "fc-Ld",
	"sticky": "fc-l5",
	"stickyT": "fc-dl",
	"stickyS": "fc-oh",
	"tableHeaderSticky": "fc-3f",
	"contentBox": "fc-wx",
	"offscreen": "fc-pJ",
	"alignCenter": "fc-xM",
	"alignStart": "fc-RJ",
	"alignEnd": "fc-x9",
	"footerScrollbarSticky": "fc-10",
	"footerScrollbar": "fc-rg",
	"breakInsideAvoid": "fc-sv",
	"printSiblingRow": "fc-Ph",
	"z0": "fc-6d",
	"z1": "fc-y0",
	"focusZ2": "fc-5y",
	"internalTimelineSlot": "fc-RK",
	"internalEvent": "fc-vB",
	"internalEventMirror": "fc-nH",
	"internalEventDraggable": "fc-Be",
	"internalEventSelected": "fc-w3",
	"internalEventResizable": "fc-Kf",
	"internalEventResizer": "fc-ve",
	"internalEventResizerStart": "fc-Er",
	"internalEventResizerEnd": "fc-ll",
	"internalBgEvent": "fc-BR",
	"internalMoreLink": "fc-GZ",
	"internalNavLink": "fc-Z9",
	"internalPopover": "fc-VO",
	"internalView": "fc-rF",
	"internalScroller": "fc-zT"
};
//#endregion
//#region node_modules/fullcalendar/chunks/2add5508.js
function createFormatter(input) {
	if (typeof input === "object" && input) return new NativeDateFormatter(input);
	if (typeof input === "string") return new CmdDateFormatter(input);
	if (typeof input === "function") return new FuncDateFormatter(input);
	return null;
}
function warn(...args) {
	console.warn("FullCalendar:", ...args);
}
var warnedClassNameOptions = {};
function refineClassName(input, optionName) {
	if (!input || typeof input === "string") return input;
	warnInvalidClassName(optionName);
	return "";
}
function refineClassNameGenerator(input, optionName) {
	if (typeof input === "function") return (renderProps) => refineClassName(input(renderProps), optionName);
	return refineClassName(input, optionName);
}
function warnInvalidClassName(optionName) {
	if (!warnedClassNameOptions[optionName]) {
		warn(`Invalid option \`${optionName}\`: expected a className string or a falsy value.`);
		warnedClassNameOptions[optionName] = true;
	}
}
function preventDefault(ev) {
	ev.preventDefault();
}
function buildDelegationHandler(selector, handler) {
	return (ev) => {
		let matchedChild = ev.target.closest(selector);
		if (matchedChild) handler.call(matchedChild, ev, matchedChild);
	};
}
function listenBySelector(container, eventType, selector, handler) {
	let attachedHandler = buildDelegationHandler(selector, handler);
	container.addEventListener(eventType, attachedHandler);
	return () => {
		container.removeEventListener(eventType, attachedHandler);
	};
}
function listenToHoverBySelector(container, selector, onMouseEnter, onMouseLeave) {
	let currentMatchedChild;
	return listenBySelector(container, "mouseover", selector, (mouseOverEv, matchedChild) => {
		if (matchedChild !== currentMatchedChild) {
			currentMatchedChild = matchedChild;
			onMouseEnter(mouseOverEv, matchedChild);
			let realOnMouseLeave = (mouseLeaveEv) => {
				currentMatchedChild = null;
				onMouseLeave(mouseLeaveEv, matchedChild);
				matchedChild.removeEventListener("mouseleave", realOnMouseLeave);
			};
			matchedChild.addEventListener("mouseleave", realOnMouseLeave);
		}
	});
}
var transitionEventNames = [
	"webkitTransitionEnd",
	"otransitionend",
	"oTransitionEnd",
	"msTransitionEnd",
	"transitionend"
];
function whenTransitionDone(el, callback) {
	let realCallback = (ev) => {
		callback(ev);
		transitionEventNames.forEach((eventName) => {
			el.removeEventListener(eventName, realCallback);
		});
	};
	transitionEventNames.forEach((eventName) => {
		el.addEventListener(eventName, realCallback);
	});
}
function createAriaClickAttrs(handler) {
	return {
		onClick: handler,
		...createAriaKeyboardAttrs(handler)
	};
}
function createAriaKeyboardAttrs(handler) {
	return {
		tabIndex: 0,
		onKeyDown(ev) {
			if (ev.key === "Enter" || ev.key === " ") {
				handler(ev);
				ev.preventDefault();
			}
		}
	};
}
var guidNumber = 0;
function guid() {
	guidNumber += 1;
	return String(guidNumber);
}
function disableCursor() {
	document.body.classList.add(classNames.notAllowed);
}
function enableCursor() {
	document.body.classList.remove(classNames.notAllowed);
}
function preventSelection(el) {
	el.style.userSelect = "none";
	el.style.webkitUserSelect = "none";
	el.addEventListener("selectstart", preventDefault);
}
function allowSelection(el) {
	el.style.userSelect = "";
	el.style.webkitUserSelect = "";
	el.removeEventListener("selectstart", preventDefault);
}
function preventContextMenu(el) {
	el.addEventListener("contextmenu", preventDefault);
}
function allowContextMenu(el) {
	el.removeEventListener("contextmenu", preventDefault);
}
function parseFieldSpecs(input) {
	let specs = [];
	let tokens = [];
	let i;
	let token;
	if (typeof input === "string") tokens = input.split(/\s*,\s*/);
	else if (typeof input === "function") tokens = [input];
	else if (Array.isArray(input)) tokens = input;
	for (i = 0; i < tokens.length; i += 1) {
		token = tokens[i];
		if (typeof token === "string") specs.push(token.charAt(0) === "-" ? {
			field: token.substring(1),
			order: -1
		} : {
			field: token,
			order: 1
		});
		else if (typeof token === "function") specs.push({ func: token });
	}
	return specs;
}
function compareByFieldSpecs(obj0, obj1, fieldSpecs) {
	let i;
	let cmp;
	for (i = 0; i < fieldSpecs.length; i += 1) {
		cmp = compareByFieldSpec(obj0, obj1, fieldSpecs[i]);
		if (cmp) return cmp;
	}
	return 0;
}
function compareByFieldSpec(obj0, obj1, fieldSpec) {
	if (fieldSpec.func) return fieldSpec.func(obj0, obj1);
	return flexibleCompare(obj0[fieldSpec.field], obj1[fieldSpec.field]) * (fieldSpec.order || 1);
}
function flexibleCompare(a, b) {
	if (!a && !b) return 0;
	if (b == null) return -1;
	if (a == null) return 1;
	if (typeof a === "string" || typeof b === "string") return String(a).localeCompare(String(b));
	return a - b;
}
function formatWithOrdinals(formatter, args, fallbackText) {
	if (typeof formatter === "function") return formatter(...args);
	if (typeof formatter === "string") return args.reduce((str, arg, index) => str.replace("$" + index, arg || ""), formatter);
	return fallbackText;
}
function compareNumbers(a, b) {
	return a - b;
}
function valuesIdentical(a, b) {
	return a === b;
}
function computeViewBorderless(options) {
	const borderless = options.borderless;
	return {
		borderlessX: Boolean(options.borderlessX ?? borderless),
		borderlessTop: Boolean(options.borderlessTop ?? borderless),
		borderlessBottom: Boolean(options.borderlessBottom ?? borderless)
	};
}
var { hasOwnProperty } = Object.prototype;
function filterHash(hash, func) {
	let filtered = {};
	for (let key in hash) if (func(hash[key], key)) filtered[key] = hash[key];
	return filtered;
}
function mapHash(hash, func) {
	let newHash = {};
	for (let key in hash) newHash[key] = func(hash[key], key);
	return newHash;
}
function hashValuesToArray(obj) {
	let a = [];
	for (let key in obj) a.push(obj[key]);
	return a;
}
function arrayToHash(a) {
	let hash = {};
	for (let item of a) hash[item] = true;
	return hash;
}
function isMaybePropsEqualDepth1(props0, props1) {
	if (typeof props0 === "object" && props0 && typeof props1 === "object" && props1) return isPropsEqualWithFunc(props0, props1, isPropsEqualShallow);
	return props0 === props1;
}
function isPropsEqualWithFunc(props0, props1, valuesEqual) {
	if (props0 === props1) return true;
	for (let key in props0) if (hasOwnProperty.call(props0, key)) {
		if (!(key in props1)) return false;
	}
	for (let key in props1) if (hasOwnProperty.call(props1, key)) {
		if (!(key in props0) || !valuesEqual(props0[key], props1[key], key)) return false;
	}
	return true;
}
function isMaybePropsEqualShallow(props0, props1) {
	if (typeof props0 === "object" && typeof props1 === "object" && props0 && props1) return isPropsEqualShallow(props0, props1);
	return props0 === props1;
}
function isPropsEqualShallow(props0, props1) {
	return isPropsEqualWithFunc(props0, props1, valuesIdentical);
}
function isPropsEqualWithMap(props0, props1, equalityFuncMap) {
	return isPropsEqualWithFunc(props0, props1, (val0, val1, key) => {
		const equalityFunc = equalityFuncMap[key];
		return equalityFunc ? equalityFunc(val0, val1) : val0 === val1;
	});
}
function getUnequalProps(props0, props1) {
	let keys = [];
	for (let key in props0) if (hasOwnProperty.call(props0, key)) {
		if (!(key in props1)) keys.push(key);
	}
	for (let key in props1) if (hasOwnProperty.call(props1, key)) {
		if (props0[key] !== props1[key]) keys.push(key);
	}
	return keys;
}
function mergeMaybePropsDepth1(props0, props1) {
	if (!props0) return props1;
	return mergePropsWithFunc(props0, props1, mergePropsShallow);
}
function mergePropsWithFunc(props0, props1, mergeValues) {
	const dest = {};
	for (let key in props0) if (hasOwnProperty.call(props0, key)) {
		if (!(key in props1)) dest[key] = props0[key];
	}
	for (let key in props1) if (hasOwnProperty.call(props1, key)) if (!(key in props0)) dest[key] = props1[key];
	else dest[key] = mergeValues(props0[key], props1[key]);
	return dest;
}
function mergePropsShallow(props0, props1) {
	return Object.assign({}, props0, props1);
}
function isMaybeArraysEqual(array0, array1) {
	if (Array.isArray(array0) && Array.isArray(array1)) return isArraysEqual(array0, array1);
	return array0 === array1;
}
function isArraysEqual(array0, array1, itemsEqual = valuesIdentical) {
	if (array0 === array1) return true;
	let len = array0.length;
	let i;
	if (len !== array1.length) return false;
	for (i = 0; i < len; i += 1) if (!itemsEqual(array0[i], array1[i])) return false;
	return true;
}
var BASE_OPTION_REFINERS = {
	navLinkDayClick: identity,
	navLinkWeekClick: identity,
	duration: createDuration,
	buttons: identity,
	toolbarElements: identity,
	prevText: String,
	nextText: String,
	prevYearText: String,
	nextYearText: String,
	todayText: String,
	yearText: String,
	monthText: String,
	weekTextLong: String,
	weekTextShort: String,
	dayText: String,
	listText: identity,
	todayHint: identity,
	prevHint: identity,
	nextHint: identity,
	buttonDisplay: identity,
	buttonGroupClass: refineClassNameGenerator,
	buttonClass: refineClassNameGenerator,
	defaultAllDayEventDuration: createDuration,
	defaultTimedEventDuration: createDuration,
	nextDayThreshold: createDuration,
	scrollTime: createDuration,
	scrollTimeReset: Boolean,
	slotMinTime: createDuration,
	slotMaxTime: createDuration,
	popoverFormat: createFormatter,
	slotDuration: createDuration,
	snapDuration: createDuration,
	headerToolbar: identity,
	footerToolbar: identity,
	forceEventDuration: Boolean,
	dayLaneClass: refineClassNameGenerator,
	dayLaneInnerClass: refineClassNameGenerator,
	dayLaneDidMount: identity,
	dayLaneWillUnmount: identity,
	initialView: String,
	aspectRatio: Number,
	weekends: Boolean,
	weekNumberCalculation: identity,
	weekNumbers: Boolean,
	weekNumberHeaderClass: refineClassNameGenerator,
	weekNumberHeaderInnerClass: refineClassNameGenerator,
	weekNumberHeaderContent: identity,
	weekNumberHeaderDidMount: identity,
	weekNumberHeaderWillUnmount: identity,
	inlineWeekNumberClass: refineClassNameGenerator,
	inlineWeekNumberContent: identity,
	inlineWeekNumberDidMount: identity,
	inlineWeekNumberWillUnmount: identity,
	editable: Boolean,
	controller: identity,
	nowIndicator: Boolean,
	nowIndicatorSnap: identity,
	nowIndicatorHeaderClass: refineClassNameGenerator,
	nowIndicatorHeaderContent: identity,
	nowIndicatorHeaderDidMount: identity,
	nowIndicatorHeaderWillUnmount: identity,
	nowIndicatorDotClass: refineClassName,
	nowIndicatorLineClass: refineClassNameGenerator,
	nowIndicatorLineContent: identity,
	nowIndicatorLineDidMount: identity,
	nowIndicatorLineWillUnmount: identity,
	showNonCurrentDates: Boolean,
	lazyFetching: Boolean,
	startParam: String,
	endParam: String,
	timeZoneParam: String,
	timeZone: String,
	locales: identity,
	locale: identity,
	dragRevertDuration: Number,
	dragScroll: Boolean,
	allDayMaintainDuration: Boolean,
	unselectAuto: Boolean,
	dropAccept: identity,
	eventOrder: parseFieldSpecs,
	eventOrderStrict: Boolean,
	eventSlicing: Boolean,
	eventPrintLayout: String,
	longPressDelay: Number,
	eventDragMinDistance: Number,
	expandRows: Boolean,
	height: identity,
	contentHeight: identity,
	direction: String,
	colorScheme: String,
	weekNumberFormat: createFormatter,
	eventResizableFromStart: Boolean,
	displayEventTime: Boolean,
	displayEventEnd: Boolean,
	progressiveEventRendering: Boolean,
	businessHours: identity,
	initialDate: identity,
	now: identity,
	eventDataTransform: identity,
	tableHeaderSticky: identity,
	footerScrollbarSticky: identity,
	defaultAllDay: Boolean,
	eventSourceFailure: identity,
	eventSourceSuccess: identity,
	eventDisplay: String,
	eventStartEditable: Boolean,
	eventDurationEditable: Boolean,
	eventOverlap: identity,
	eventConstraint: identity,
	eventAllow: identity,
	eventColor: String,
	eventContrastColor: String,
	eventDidMount: identity,
	eventWillUnmount: identity,
	eventContent: identity,
	eventClass: refineClassNameGenerator,
	eventInnerClass: refineClassNameGenerator,
	eventTimeClass: refineClassNameGenerator,
	eventTitleClass: refineClassNameGenerator,
	eventBeforeClass: refineClassNameGenerator,
	eventAfterClass: refineClassNameGenerator,
	listItemEventClass: refineClassNameGenerator,
	listItemEventInnerClass: refineClassNameGenerator,
	listItemEventTimeClass: refineClassNameGenerator,
	listItemEventTitleClass: refineClassNameGenerator,
	listItemEventBeforeClass: refineClassNameGenerator,
	listItemEventAfterClass: refineClassNameGenerator,
	blockEventClass: refineClassNameGenerator,
	blockEventInnerClass: refineClassNameGenerator,
	blockEventTimeClass: refineClassNameGenerator,
	blockEventTitleClass: refineClassNameGenerator,
	blockEventBeforeClass: refineClassNameGenerator,
	blockEventAfterClass: refineClassNameGenerator,
	rowEventClass: refineClassNameGenerator,
	rowEventInnerClass: refineClassNameGenerator,
	rowEventTimeClass: refineClassNameGenerator,
	rowEventTitleClass: refineClassNameGenerator,
	rowEventTitleSticky: Boolean,
	rowEventBeforeClass: refineClassNameGenerator,
	rowEventBeforeContent: identity,
	rowEventAfterClass: refineClassNameGenerator,
	rowEventAfterContent: identity,
	columnEventClass: refineClassNameGenerator,
	columnEventInnerClass: refineClassNameGenerator,
	columnEventTimeClass: refineClassNameGenerator,
	columnEventTitleClass: refineClassNameGenerator,
	columnEventTitleSticky: Boolean,
	columnEventBeforeClass: refineClassNameGenerator,
	columnEventAfterClass: refineClassNameGenerator,
	backgroundEventClass: refineClassNameGenerator,
	backgroundEventDidMount: identity,
	backgroundEventWillUnmount: identity,
	backgroundEventContent: identity,
	backgroundEventInnerClass: refineClassNameGenerator,
	backgroundEventTitleClass: refineClassNameGenerator,
	backgroundEventColor: String,
	selectConstraint: identity,
	selectOverlap: identity,
	selectAllow: identity,
	droppable: Boolean,
	unselectCancel: String,
	slotHeaderFormat: identity,
	slotLaneClass: refineClassNameGenerator,
	slotLaneDidMount: identity,
	slotLaneWillUnmount: identity,
	slotHeaderClass: refineClassNameGenerator,
	slotHeaderInnerClass: refineClassNameGenerator,
	slotHeaderContent: identity,
	slotHeaderDidMount: identity,
	slotHeaderWillUnmount: identity,
	slotHeaderAlign: identity,
	slotHeaderSticky: identity,
	slotHeaderRowClass: refineClassName,
	slotHeaderDividerClass: refineClassNameGenerator,
	dayMaxEvents: identity,
	dayMaxEventRows: identity,
	dayMinWidth: Number,
	slotHeaderInterval: createDuration,
	dayHeaderClass: refineClassNameGenerator,
	dayHeaderInnerClass: refineClassNameGenerator,
	dayHeaderContent: identity,
	dayHeaderDidMount: identity,
	dayHeaderWillUnmount: identity,
	dayHeaderAlign: identity,
	_dayHeaderSticky: identity,
	dayHeaderRowClass: refineClassName,
	dayHeaderDividerClass: refineClassNameGenerator,
	dayRowClass: refineClassName,
	dayCellDidMount: identity,
	dayCellWillUnmount: identity,
	dayCellClass: refineClassNameGenerator,
	dayCellInnerClass: refineClassNameGenerator,
	dayCellTopContent: identity,
	dayCellTopClass: refineClassNameGenerator,
	dayCellTopInnerClass: refineClassNameGenerator,
	dayCellBottomClass: refineClassNameGenerator,
	allDaySlot: Boolean,
	allDayText: String,
	allDayHeaderClass: refineClassNameGenerator,
	allDayHeaderInnerClass: refineClassNameGenerator,
	allDayHeaderContent: identity,
	allDayHeaderDidMount: identity,
	allDayHeaderWillUnmount: identity,
	timedText: String,
	slotMinWidth: Number,
	slotMinHeight: Number,
	navLinks: Boolean,
	eventTimeFormat: createFormatter,
	rerenderDelay: Number,
	moreLinkText: identity,
	moreLinkHint: identity,
	selectMinDistance: Number,
	selectable: Boolean,
	selectLongPressDelay: Number,
	eventLongPressDelay: Number,
	selectMirror: Boolean,
	eventMaxStack: Number,
	eventMinHeight: Number,
	eventMinWidth: Number,
	eventShortHeight: Number,
	slotEventOverlap: Boolean,
	firstDay: Number,
	dayCount: Number,
	dateAlignment: String,
	dateIncrement: createDuration,
	hiddenDays: identity,
	fixedWeekCount: Boolean,
	validRange: identity,
	visibleRange: identity,
	titleFormat: identity,
	eventInteractive: Boolean,
	noEventsText: String,
	viewHint: identity,
	viewChangeHint: String,
	navLinkHint: identity,
	closeHint: String,
	eventsHint: String,
	headingLevel: Number,
	moreLinkClick: identity,
	moreLinkContent: identity,
	moreLinkDidMount: identity,
	moreLinkWillUnmount: identity,
	moreLinkClass: refineClassNameGenerator,
	moreLinkInnerClass: refineClassNameGenerator,
	rowMoreLinkClass: refineClassNameGenerator,
	rowMoreLinkInnerClass: refineClassNameGenerator,
	columnMoreLinkClass: refineClassNameGenerator,
	columnMoreLinkInnerClass: refineClassNameGenerator,
	navLinkClass: refineClassName,
	monthStartFormat: createFormatter,
	dayCellFormat: createFormatter,
	handleCustomRendering: identity,
	customRenderingMetaMap: identity,
	popoverClass: refineClassName,
	popoverCloseClass: refineClassName,
	popoverCloseContent: identity,
	dayNarrowWidth: Number,
	borderless: Boolean,
	borderlessX: Boolean,
	borderlessTop: Boolean,
	borderlessBottom: Boolean,
	fillerClass: refineClassNameGenerator,
	headerToolbarClass: refineClassNameGenerator,
	footerToolbarClass: refineClassNameGenerator,
	toolbarClass: refineClassNameGenerator,
	toolbarSectionClass: refineClassNameGenerator,
	toolbarTitleClass: refineClassName,
	tableClass: refineClassNameGenerator,
	tableHeaderClass: refineClassNameGenerator,
	tableBodyClass: refineClassNameGenerator,
	nonBusinessHoursClass: refineClassName,
	highlightClass: refineClassName,
	dayHeaders: Boolean,
	dayHeaderFormat: createFormatter,
	allDayDividerClass: refineClassName,
	listDaysClass: refineClassName,
	listDayClass: refineClassNameGenerator,
	listDayFormat: createFalsableFormatter,
	listDayAltFormat: createFalsableFormatter,
	listDayHeaderDidMount: identity,
	listDayHeaderWillUnmount: identity,
	listDayHeaderClass: refineClassNameGenerator,
	listDayHeaderInnerClass: refineClassNameGenerator,
	listDayHeaderContent: identity,
	listDayBodyClass: refineClassNameGenerator,
	noEventsClass: refineClassNameGenerator,
	noEventsInnerClass: refineClassNameGenerator,
	noEventsContent: identity,
	noEventsDidMount: identity,
	noEventsWillUnmount: identity,
	multiMonthMaxColumns: Number,
	singleMonthMinWidth: Number,
	singleMonthTitleFormat: createFormatter,
	singleMonthDidMount: identity,
	singleMonthWillUnmount: identity,
	singleMonthClass: refineClassNameGenerator,
	singleMonthHeaderClass: refineClassNameGenerator,
	singleMonthHeaderInnerClass: refineClassNameGenerator
};
var BASE_OPTION_DEFAULTS = {
	buttonDisplay: "auto",
	eventDisplay: "auto",
	defaultTimedEventDuration: "01:00:00",
	defaultAllDayEventDuration: { day: 1 },
	forceEventDuration: false,
	nextDayThreshold: "00:00:00",
	initialView: "",
	aspectRatio: 1.35,
	weekends: true,
	weekNumbers: false,
	weekNumberCalculation: "local",
	editable: false,
	nowIndicator: false,
	scrollTime: "06:00:00",
	scrollTimeReset: true,
	slotMinTime: "00:00:00",
	slotMaxTime: "24:00:00",
	showNonCurrentDates: true,
	lazyFetching: true,
	startParam: "start",
	endParam: "end",
	timeZoneParam: "timeZone",
	timeZone: "local",
	locales: [],
	locale: "",
	dragRevertDuration: 500,
	dragScroll: true,
	allDayMaintainDuration: false,
	unselectAuto: true,
	dropAccept: "*",
	eventOrder: "start,-duration,allDay,title",
	eventPrintLayout: "auto",
	popoverFormat: {
		month: "long",
		day: "numeric",
		year: "numeric"
	},
	longPressDelay: 1e3,
	eventDragMinDistance: 5,
	expandRows: false,
	navLinks: false,
	selectable: false,
	eventMinHeight: 15,
	eventMinWidth: 30,
	eventShortHeight: 30,
	monthStartFormat: {
		month: "long",
		day: "numeric"
	},
	dayCellFormat: {
		day: "numeric",
		omitTrailing: true
	},
	headingLevel: 2,
	outerBorder: true,
	dayNarrowWidth: 80,
	eventOverlap: true,
	slotHeaderAlign: "start",
	slotHeaderSticky: true,
	dayHeaderAlign: "start",
	_dayHeaderSticky: true,
	rowEventTitleSticky: true,
	columnEventTitleSticky: true,
	nowIndicatorSnap: "auto",
	dayHeaders: true
};
var CALENDAR_LISTENER_REFINERS = {
	datesSet: identity,
	eventsSet: identity,
	eventAdd: identity,
	eventChange: identity,
	eventRemove: identity,
	eventClick: identity,
	eventMouseEnter: identity,
	eventMouseLeave: identity,
	select: identity,
	unselect: identity,
	loading: identity,
	_unmount: identity,
	_beforeprint: identity,
	_afterprint: identity,
	_noDateSelect: identity,
	_noEventDrop: identity,
	_noEventResize: identity,
	_timeScrollRequest: identity,
	dateClick: identity,
	eventDragStart: identity,
	eventDragStop: identity,
	eventDrop: identity,
	eventResizeStart: identity,
	eventResizeStop: identity,
	eventResize: identity,
	drop: identity,
	eventReceive: identity,
	eventLeave: identity
};
var CALENDAR_ONLY_OPTION_REFINERS = {
	class: refineClassNameGenerator,
	className: refineClassNameGenerator,
	viewClass: refineClassNameGenerator,
	viewDidMount: identity,
	viewWillUnmount: identity,
	views: identity,
	plugins: identity,
	initialEvents: identity,
	events: identity,
	eventSources: identity
};
var VIEW_ONLY_OPTION_REFINERS = {
	type: String,
	component: identity,
	class: refineClassNameGenerator,
	className: refineClassNameGenerator,
	content: identity,
	didMount: identity,
	willUnmount: identity,
	buttonTextKey: String,
	dateProfileGeneratorClass: identity,
	usesMinMaxTime: Boolean,
	disallowAmbigTitle: Boolean
};
var COMPLEX_OPTION_COMPARATORS = {
	dateIncrement: isMaybePropsEqualShallow,
	headerToolbar: isMaybePropsEqualShallow,
	footerToolbar: isMaybePropsEqualShallow,
	buttons: isMaybePropsEqualDepth1,
	plugins: isMaybeArraysEqual,
	events: isMaybeArraysEqual,
	eventSources: isMaybeArraysEqual,
	["resources"]: isMaybeArraysEqual
};
function refineProps(input, refiners) {
	let refined = {};
	let extra = {};
	for (let propName in refiners) if (propName in input) refined[propName] = refiners[propName](input[propName], propName);
	for (let propName in input) if (!(propName in refiners)) extra[propName] = input[propName];
	return {
		refined,
		extra
	};
}
function identity(raw) {
	return raw;
}
function createFalsableFormatter(input) {
	return input === false ? null : createFormatter(input);
}
function computeAlignedDayRange(timedRange) {
	let dayCnt = Math.floor(diffDays(timedRange.start, timedRange.end)) || 1;
	let start = startOfDay(timedRange.start);
	return {
		start,
		end: addDays(start, dayCnt)
	};
}
function computeVisibleDayRange(timedRange, nextDayThreshold = createDuration(0)) {
	let startDay = null;
	let endDay = null;
	if (timedRange.end) {
		endDay = startOfDay(timedRange.end);
		let endTimeMS = timedRange.end.valueOf() - endDay.valueOf();
		if (endTimeMS && endTimeMS >= asRoughMs(nextDayThreshold)) endDay = addDays(endDay, 1);
	}
	if (timedRange.start) {
		startDay = startOfDay(timedRange.start);
		if (endDay && endDay <= startDay) endDay = addDays(startDay, 1);
	}
	return {
		start: startDay,
		end: endDay
	};
}
function diffDates(date0, date1, dateEnv, largeUnit) {
	if (largeUnit === "year") return createDuration(dateEnv.diffWholeYears(date0, date1), "year");
	if (largeUnit === "month") return createDuration(dateEnv.diffWholeMonths(date0, date1), "month");
	return diffDayAndTime(date0, date1);
}
function createEventInstance(defId, range) {
	return {
		instanceId: guid(),
		defId,
		range
	};
}
function parseRecurring(refined, defaultAllDay, dateEnv, recurringTypes) {
	for (let i = 0; i < recurringTypes.length; i += 1) {
		let parsed = recurringTypes[i].parse(refined, dateEnv);
		if (parsed) {
			let { allDay } = refined;
			if (allDay == null) {
				allDay = defaultAllDay;
				if (allDay == null) {
					allDay = parsed.allDayGuess;
					if (allDay == null) allDay = false;
				}
			}
			return {
				allDay,
				duration: parsed.duration,
				typeData: parsed.typeData,
				typeId: i
			};
		}
	}
	return null;
}
function expandRecurring(eventStore, framingRange, context) {
	let { dateEnv, pluginHooks, options } = context;
	let { defs, instances } = eventStore;
	instances = filterHash(instances, (instance) => !defs[instance.defId].recurringDef);
	for (let defId in defs) {
		let def = defs[defId];
		if (def.recurringDef) {
			let { duration } = def.recurringDef;
			if (!duration) duration = def.allDay ? options.defaultAllDayEventDuration : options.defaultTimedEventDuration;
			let starts = expandRecurringRanges(def, duration, framingRange, dateEnv, pluginHooks.recurringTypes);
			for (let start of starts) {
				let instance = createEventInstance(defId, {
					start,
					end: dateEnv.add(start, duration)
				});
				instances[instance.instanceId] = instance;
			}
		}
	}
	return {
		defs,
		instances
	};
}
function expandRecurringRanges(eventDef, duration, framingRange, dateEnv, recurringTypes) {
	let markers = recurringTypes[eventDef.recurringDef.typeId].expand(eventDef.recurringDef.typeData, {
		start: dateEnv.subtract(framingRange.start, duration),
		end: framingRange.end
	}, dateEnv);
	if (eventDef.allDay) markers = markers.map(startOfDay);
	return markers;
}
function parseEvents(rawEvents, eventSource, context, allowOpenRange, defIdMap, instanceIdMap) {
	let eventStore = createEmptyEventStore();
	let eventRefiners = buildEventRefiners(context);
	for (let rawEvent of rawEvents) {
		let tuple = parseEvent(rawEvent, eventSource, context, allowOpenRange, eventRefiners, defIdMap, instanceIdMap);
		if (tuple) eventTupleToStore(tuple, eventStore);
	}
	return eventStore;
}
function eventTupleToStore(tuple, eventStore = createEmptyEventStore()) {
	eventStore.defs[tuple.def.defId] = tuple.def;
	if (tuple.instance) eventStore.instances[tuple.instance.instanceId] = tuple.instance;
	return eventStore;
}
function getRelevantEvents(eventStore, instanceId) {
	let instance = eventStore.instances[instanceId];
	if (instance) {
		let def = eventStore.defs[instance.defId];
		let newStore = filterEventStoreDefs(eventStore, (lookDef) => isEventDefsGrouped(def, lookDef));
		newStore.defs[def.defId] = def;
		newStore.instances[instance.instanceId] = instance;
		return newStore;
	}
	return createEmptyEventStore();
}
function isEventDefsGrouped(def0, def1) {
	return Boolean(def0.groupId && def0.groupId === def1.groupId);
}
function createEmptyEventStore() {
	return {
		defs: {},
		instances: {}
	};
}
function mergeEventStores(store0, store1) {
	return {
		defs: {
			...store0.defs,
			...store1.defs
		},
		instances: {
			...store0.instances,
			...store1.instances
		}
	};
}
function filterEventStoreDefs(eventStore, filterFunc) {
	let defs = filterHash(eventStore.defs, filterFunc);
	return {
		defs,
		instances: filterHash(eventStore.instances, (instance) => defs[instance.defId])
	};
}
function excludeSubEventStore(master, sub) {
	let { defs, instances } = master;
	let filteredDefs = {};
	let filteredInstances = {};
	for (let defId in defs) if (!sub.defs[defId]) filteredDefs[defId] = defs[defId];
	for (let instanceId in instances) if (!sub.instances[instanceId] && filteredDefs[instances[instanceId].defId]) filteredInstances[instanceId] = instances[instanceId];
	return {
		defs: filteredDefs,
		instances: filteredInstances
	};
}
function normalizeConstraint(input, context) {
	if (Array.isArray(input)) return parseEvents(input, null, context, true);
	if (typeof input === "object" && input) return parseEvents([input], null, context, true);
	if (input != null) return String(input);
	return null;
}
var EVENT_UI_REFINERS = {
	display: String,
	editable: Boolean,
	startEditable: Boolean,
	durationEditable: Boolean,
	constraint: identity,
	overlap: identity,
	allow: identity,
	class: refineClassName,
	className: refineClassName,
	color: String,
	contrastColor: String
};
var EMPTY_EVENT_UI = {
	display: null,
	startEditable: null,
	durationEditable: null,
	constraints: [],
	overlap: null,
	allows: [],
	color: "",
	contrastColor: "",
	className: ""
};
function createEventUi(refined, context) {
	let constraint = normalizeConstraint(refined.constraint, context);
	return {
		display: refined.display || null,
		startEditable: refined.startEditable != null ? refined.startEditable : refined.editable,
		durationEditable: refined.durationEditable != null ? refined.durationEditable : refined.editable,
		constraints: constraint != null ? [constraint] : [],
		overlap: refined.overlap != null ? refined.overlap : null,
		allows: refined.allow != null ? [refined.allow] : [],
		color: refined.color || "",
		contrastColor: refined.contrastColor || "",
		className: (refined.class ?? refined.className) || ""
	};
}
function combineEventUis(uis) {
	return uis.reduce(combineTwoEventUis, EMPTY_EVENT_UI);
}
function combineTwoEventUis(item0, item1) {
	return {
		display: item1.display != null ? item1.display : item0.display,
		startEditable: item1.startEditable != null ? item1.startEditable : item0.startEditable,
		durationEditable: item1.durationEditable != null ? item1.durationEditable : item0.durationEditable,
		constraints: item0.constraints.concat(item1.constraints),
		overlap: typeof item1.overlap === "boolean" ? item1.overlap : item0.overlap,
		allows: item0.allows.concat(item1.allows),
		color: item1.color || item0.color,
		contrastColor: item1.contrastColor || item0.contrastColor,
		className: joinClassNames(item0.className, item1.className)
	};
}
var EVENT_NON_DATE_REFINERS = {
	id: String,
	groupId: String,
	title: String,
	url: String,
	interactive: Boolean
};
var EVENT_DATE_REFINERS = {
	start: identity,
	end: identity,
	date: identity,
	allDay: Boolean
};
var EVENT_REFINERS = {
	...EVENT_NON_DATE_REFINERS,
	...EVENT_DATE_REFINERS,
	extendedProps: identity
};
function parseEvent(raw, eventSource, context, allowOpenRange, refiners = buildEventRefiners(context), defIdMap, instanceIdMap) {
	let { refined, extra } = refineEventDef(raw, context, refiners);
	let defaultAllDay = computeIsDefaultAllDay(eventSource, context);
	let recurringRes = parseRecurring(refined, defaultAllDay, context.dateEnv, context.pluginHooks.recurringTypes);
	if (recurringRes) {
		let def = parseEventDef(refined, extra, eventSource ? eventSource.sourceId : "", recurringRes.allDay, Boolean(recurringRes.duration), context, defIdMap);
		def.recurringDef = {
			typeId: recurringRes.typeId,
			typeData: recurringRes.typeData,
			duration: recurringRes.duration
		};
		return {
			def,
			instance: null
		};
	}
	let singleRes = parseSingle(refined, defaultAllDay, context, allowOpenRange);
	if (singleRes) {
		let def = parseEventDef(refined, extra, eventSource ? eventSource.sourceId : "", singleRes.allDay, singleRes.hasEnd, context, defIdMap);
		let instance = createEventInstance(def.defId, singleRes.range);
		if (instanceIdMap && def.publicId && instanceIdMap[def.publicId]) instance.instanceId = instanceIdMap[def.publicId];
		return {
			def,
			instance
		};
	}
	return null;
}
function refineEventDef(raw, context, refiners = buildEventRefiners(context)) {
	return refineProps(raw, refiners);
}
function buildEventRefiners(context) {
	return {
		...EVENT_UI_REFINERS,
		...EVENT_REFINERS,
		...context.pluginHooks.eventRefiners
	};
}
function parseEventDef(refined, extra, sourceId, allDay, hasEnd, context, defIdMap) {
	let def = {
		title: refined.title || "",
		groupId: refined.groupId || "",
		publicId: refined.id || "",
		url: refined.url || "",
		recurringDef: null,
		defId: (defIdMap && refined.id ? defIdMap[refined.id] : "") || guid(),
		sourceId,
		allDay,
		hasEnd,
		interactive: refined.interactive,
		ui: createEventUi(refined, context),
		extendedProps: {
			...refined.extendedProps || {},
			...extra
		}
	};
	for (let memberAdder of context.pluginHooks.eventDefMemberAdders) Object.assign(def, memberAdder(refined));
	Object.freeze(def.ui.className);
	Object.freeze(def.extendedProps);
	return def;
}
function parseSingle(refined, defaultAllDay, context, allowOpenRange) {
	let { allDay } = refined;
	let startMeta;
	let startMarker = null;
	let hasEnd = false;
	let endMeta;
	let endMarker = null;
	let startInput = refined.start != null ? refined.start : refined.date;
	startMeta = context.dateEnv.createMarkerMeta(startInput);
	if (startMeta) startMarker = startMeta.marker;
	else if (!allowOpenRange) return null;
	if (refined.end != null) endMeta = context.dateEnv.createMarkerMeta(refined.end);
	if (allDay == null) if (defaultAllDay != null) allDay = defaultAllDay;
	else allDay = (!startMeta || startMeta.isTimeUnspecified) && (!endMeta || endMeta.isTimeUnspecified);
	if (allDay && startMarker) startMarker = startOfDay(startMarker);
	if (endMeta) {
		endMarker = endMeta.marker;
		if (allDay) endMarker = startOfDay(endMarker);
		if (startMarker && endMarker <= startMarker) endMarker = null;
	}
	if (endMarker) hasEnd = true;
	else if (!allowOpenRange) {
		hasEnd = context.options.forceEventDuration || false;
		endMarker = context.dateEnv.add(startMarker, allDay ? context.options.defaultAllDayEventDuration : context.options.defaultTimedEventDuration);
	}
	return {
		allDay,
		hasEnd,
		range: {
			start: startMarker,
			end: endMarker
		}
	};
}
function computeIsDefaultAllDay(eventSource, context) {
	let res = null;
	if (eventSource) res = eventSource.defaultAllDay;
	if (res == null) res = context.options.defaultAllDay;
	return res;
}
var STANDARD_PROPS = {
	start: identity,
	end: identity,
	allDay: Boolean
};
function parseDateSpan(raw, dateEnv, defaultDuration) {
	let span = parseOpenDateSpan(raw, dateEnv);
	let { range } = span;
	if (!range.start) return null;
	if (!range.end) {
		if (defaultDuration == null) return null;
		range.end = dateEnv.add(range.start, defaultDuration);
	}
	return span;
}
function parseOpenDateSpan(raw, dateEnv) {
	let { refined: standardProps, extra } = refineProps(raw, STANDARD_PROPS);
	let startMeta = standardProps.start ? dateEnv.createMarkerMeta(standardProps.start) : null;
	let endMeta = standardProps.end ? dateEnv.createMarkerMeta(standardProps.end) : null;
	let { allDay } = standardProps;
	if (allDay == null) allDay = startMeta && startMeta.isTimeUnspecified && (!endMeta || endMeta.isTimeUnspecified);
	return {
		range: {
			start: startMeta ? startMeta.marker : null,
			end: endMeta ? endMeta.marker : null
		},
		allDay,
		...extra
	};
}
function isDateSpansEqual(span0, span1) {
	return rangesEqual(span0.range, span1.range) && span0.allDay === span1.allDay && isSpanPropsEqual(span0, span1);
}
function isSpanPropsEqual(span0, span1) {
	for (let propName in span1) if (propName !== "range" && propName !== "allDay") {
		if (span0[propName] !== span1[propName]) return false;
	}
	for (let propName in span0) if (!(propName in span1)) return false;
	return true;
}
function buildDateSpanApi(span, dateEnv) {
	return {
		...buildRangeApi(span.range, dateEnv, span.allDay),
		allDay: span.allDay
	};
}
function buildRangeApiWithTimeZone(range, dateEnv, omitTime) {
	return {
		...buildRangeApi(range, dateEnv, omitTime),
		timeZone: dateEnv.timeZone
	};
}
function buildRangeApi(range, dateEnv, omitTime) {
	return {
		start: dateEnv.toDate(range.start),
		end: dateEnv.toDate(range.end),
		startStr: dateEnv.formatIso(range.start, { omitTime }),
		endStr: dateEnv.formatIso(range.end, { omitTime })
	};
}
function fabricateEventRange(dateSpan, eventUiBases, context) {
	let res = refineEventDef({ editable: false }, context);
	let def = parseEventDef(res.refined, res.extra, "", dateSpan.allDay, true, context);
	return {
		def,
		ui: compileEventUi(def, eventUiBases),
		instance: createEventInstance(def.defId, dateSpan.range),
		range: dateSpan.range,
		isStart: true,
		isEnd: true
	};
}
function triggerDateSelect(selection, pev, context) {
	context.emitter.trigger("select", {
		...buildDateSpanApiWithContext(selection, context),
		jsEvent: pev ? pev.origEvent : null,
		view: context.viewApi || context.calendarApi.view
	});
}
function triggerDateUnselect(pev, context) {
	context.emitter.trigger("unselect", {
		jsEvent: pev ? pev.origEvent : null,
		view: context.viewApi || context.calendarApi.view
	});
}
function buildDateSpanApiWithContext(dateSpan, context) {
	let props = {};
	for (let transform of context.pluginHooks.dateSpanTransforms) Object.assign(props, transform(dateSpan, context));
	Object.assign(props, buildDateSpanApi(dateSpan, context.dateEnv));
	return props;
}
function getDefaultEventEnd(allDay, marker, context) {
	let { dateEnv, options } = context;
	let end = marker;
	if (allDay) {
		end = startOfDay(end);
		end = dateEnv.add(end, options.defaultAllDayEventDuration);
	} else end = dateEnv.add(end, options.defaultTimedEventDuration);
	return end;
}
function applyMutationToEventStore(eventStore, eventConfigBase, mutation, context) {
	let eventConfigs = compileEventUis(eventStore.defs, eventConfigBase);
	let dest = createEmptyEventStore();
	for (let defId in eventStore.defs) {
		let def = eventStore.defs[defId];
		dest.defs[defId] = applyMutationToEventDef(def, eventConfigs[defId], mutation, context);
	}
	for (let instanceId in eventStore.instances) {
		let instance = eventStore.instances[instanceId];
		let def = dest.defs[instance.defId];
		dest.instances[instanceId] = applyMutationToEventInstance(instance, def, eventConfigs[instance.defId], mutation, context);
	}
	return dest;
}
function applyMutationToEventDef(eventDef, eventConfig, mutation, context) {
	let standardProps = mutation.standardProps || {};
	if (standardProps.hasEnd == null && eventConfig.durationEditable && (mutation.startDelta || mutation.endDelta)) standardProps.hasEnd = true;
	let copy = {
		...eventDef,
		...standardProps,
		ui: {
			...eventDef.ui,
			...standardProps.ui
		}
	};
	if (mutation.extendedProps) copy.extendedProps = {
		...copy.extendedProps,
		...mutation.extendedProps
	};
	for (let applier of context.pluginHooks.eventDefMutationAppliers) applier(copy, mutation, context);
	if (!copy.hasEnd && context.options.forceEventDuration) copy.hasEnd = true;
	return copy;
}
function applyMutationToEventInstance(eventInstance, eventDef, eventConfig, mutation, context) {
	let { dateEnv } = context;
	let forceAllDay = mutation.standardProps && mutation.standardProps.allDay === true;
	let clearEnd = mutation.standardProps && mutation.standardProps.hasEnd === false;
	let copy = { ...eventInstance };
	if (forceAllDay) copy.range = computeAlignedDayRange(copy.range);
	if (mutation.datesDelta && eventConfig.startEditable) copy.range = {
		start: dateEnv.add(copy.range.start, mutation.datesDelta),
		end: dateEnv.add(copy.range.end, mutation.datesDelta)
	};
	if (mutation.startDelta && eventConfig.durationEditable) copy.range = {
		start: dateEnv.add(copy.range.start, mutation.startDelta),
		end: copy.range.end
	};
	if (mutation.endDelta && eventConfig.durationEditable) copy.range = {
		start: copy.range.start,
		end: dateEnv.add(copy.range.end, mutation.endDelta)
	};
	if (clearEnd) copy.range = {
		start: copy.range.start,
		end: getDefaultEventEnd(eventDef.allDay, copy.range.start, context)
	};
	if (eventDef.allDay) copy.range = {
		start: startOfDay(copy.range.start),
		end: startOfDay(copy.range.end)
	};
	if (copy.range.end < copy.range.start) copy.range.end = getDefaultEventEnd(eventDef.allDay, copy.range.start, context);
	return copy;
}
var EventSourceImpl = class {
	constructor(context, internalEventSource) {
		this.context = context;
		this.internalEventSource = internalEventSource;
	}
	remove() {
		this.context.dispatch({
			type: "REMOVE_EVENT_SOURCE",
			sourceId: this.internalEventSource.sourceId
		});
	}
	refetch() {
		this.context.dispatch({
			type: "FETCH_EVENT_SOURCES",
			sourceIds: [this.internalEventSource.sourceId],
			isRefetch: true
		});
	}
	get id() {
		return this.internalEventSource.publicId;
	}
	get url() {
		return this.internalEventSource.meta.url;
	}
	get format() {
		return this.internalEventSource.meta.format;
	}
};
var EventImpl = class EventImpl {
	constructor(context, def, instance) {
		this._context = context;
		this._def = def;
		this._instance = instance || null;
	}
	setProp(name, val) {
		if (name in EVENT_DATE_REFINERS) warn(`Cannot set date-related event property \`${name}\`. Use a method instead.`);
		else if (name === "id") {
			val = EVENT_NON_DATE_REFINERS[name](val);
			this.mutate({ standardProps: { publicId: val } });
		} else if (name in EVENT_NON_DATE_REFINERS) {
			val = EVENT_NON_DATE_REFINERS[name](val);
			this.mutate({ standardProps: { [name]: val } });
		} else if (name in EVENT_UI_REFINERS) {
			let ui = EVENT_UI_REFINERS[name](val);
			if (name === "editable") ui = {
				startEditable: val,
				durationEditable: val
			};
			else ui = { [name]: val };
			this.mutate({ standardProps: { ui } });
		} else warn(`Cannot set event property \`${name}\`. Use setExtendedProp instead.`);
	}
	setExtendedProp(name, val) {
		this.mutate({ extendedProps: { [name]: val } });
	}
	setStart(startInput, options = {}) {
		let { dateEnv } = this._context;
		let start = dateEnv.createMarker(startInput);
		if (start && this._instance) {
			let instanceRange = this._instance.range;
			let startDelta = diffDates(instanceRange.start, start, dateEnv, options.granularity);
			if (options.maintainDuration) this.mutate({ datesDelta: startDelta });
			else this.mutate({ startDelta });
		}
	}
	setEnd(endInput, options = {}) {
		let { dateEnv } = this._context;
		let end;
		if (endInput != null) {
			end = dateEnv.createMarker(endInput);
			if (!end) return;
		}
		if (this._instance) if (end) {
			let endDelta = diffDates(this._instance.range.end, end, dateEnv, options.granularity);
			this.mutate({ endDelta });
		} else this.mutate({ standardProps: { hasEnd: false } });
	}
	setDates(startInput, endInput, options = {}) {
		let { dateEnv } = this._context;
		let standardProps = { allDay: options.allDay };
		let start = dateEnv.createMarker(startInput);
		let end;
		if (!start) return;
		if (endInput != null) {
			end = dateEnv.createMarker(endInput);
			if (!end) return;
		}
		if (this._instance) {
			let instanceRange = this._instance.range;
			if (options.allDay === true) instanceRange = computeAlignedDayRange(instanceRange);
			let startDelta = diffDates(instanceRange.start, start, dateEnv, options.granularity);
			if (end) {
				let endDelta = diffDates(instanceRange.end, end, dateEnv, options.granularity);
				if (durationsEqual(startDelta, endDelta)) this.mutate({
					datesDelta: startDelta,
					standardProps
				});
				else this.mutate({
					startDelta,
					endDelta,
					standardProps
				});
			} else {
				standardProps.hasEnd = false;
				this.mutate({
					datesDelta: startDelta,
					standardProps
				});
			}
		}
	}
	moveStart(deltaInput) {
		let delta = createDuration(deltaInput);
		if (delta) this.mutate({ startDelta: delta });
	}
	moveEnd(deltaInput) {
		let delta = createDuration(deltaInput);
		if (delta) this.mutate({ endDelta: delta });
	}
	moveDates(deltaInput) {
		let delta = createDuration(deltaInput);
		if (delta) this.mutate({ datesDelta: delta });
	}
	setAllDay(allDay, options = {}) {
		let standardProps = { allDay };
		let { maintainDuration } = options;
		if (maintainDuration == null) maintainDuration = this._context.options.allDayMaintainDuration;
		if (this._def.allDay !== allDay) standardProps.hasEnd = maintainDuration;
		this.mutate({ standardProps });
	}
	formatRange(formatInput) {
		let { dateEnv } = this._context;
		let instance = this._instance;
		let formatter = createFormatter(formatInput);
		if (this._def.hasEnd) return joinDateTimeFormatParts(dateEnv.formatRangeToParts(instance.range.start, instance.range.end, formatter));
		return joinDateTimeFormatParts(dateEnv.formatToParts(instance.range.start, formatter));
	}
	mutate(mutation) {
		let instance = this._instance;
		if (instance) {
			let def = this._def;
			let context = this._context;
			let { eventStore } = context.getCurrentData();
			let relevantEvents = getRelevantEvents(eventStore, instance.instanceId);
			relevantEvents = applyMutationToEventStore(relevantEvents, { "": {
				display: "",
				startEditable: true,
				durationEditable: true,
				constraints: [],
				overlap: null,
				allows: [],
				color: "",
				contrastColor: "",
				className: ""
			} }, mutation, context);
			let oldEvent = new EventImpl(context, def, instance);
			this._def = relevantEvents.defs[def.defId];
			this._instance = relevantEvents.instances[instance.instanceId];
			context.dispatch({
				type: "MERGE_EVENTS",
				eventStore: relevantEvents
			});
			context.emitter.trigger("eventChange", {
				oldEvent,
				event: this,
				relatedEvents: buildEventApis(relevantEvents, context, instance),
				revert() {
					context.dispatch({
						type: "RESET_EVENTS",
						eventStore
					});
				}
			});
		}
	}
	remove() {
		let context = this._context;
		let asStore = eventApiToStore(this);
		context.dispatch({
			type: "REMOVE_EVENTS",
			eventStore: asStore
		});
		context.emitter.trigger("eventRemove", {
			event: this,
			relatedEvents: [],
			revert() {
				context.dispatch({
					type: "MERGE_EVENTS",
					eventStore: asStore
				});
			}
		});
	}
	get source() {
		let { sourceId } = this._def;
		if (sourceId) return new EventSourceImpl(this._context, this._context.getCurrentData().eventSources[sourceId]);
		return null;
	}
	get start() {
		return this._instance ? this._context.dateEnv.toDate(this._instance.range.start) : null;
	}
	get end() {
		return this._instance && this._def.hasEnd ? this._context.dateEnv.toDate(this._instance.range.end) : null;
	}
	get startStr() {
		let instance = this._instance;
		if (instance) return this._context.dateEnv.formatIso(instance.range.start, { omitTime: this._def.allDay });
		return "";
	}
	get endStr() {
		let instance = this._instance;
		if (instance && this._def.hasEnd) return this._context.dateEnv.formatIso(instance.range.end, { omitTime: this._def.allDay });
		return "";
	}
	get id() {
		return this._def.publicId;
	}
	get groupId() {
		return this._def.groupId;
	}
	get allDay() {
		return this._def.allDay;
	}
	get title() {
		return this._def.title;
	}
	get url() {
		return this._def.url;
	}
	get display() {
		return this._def.ui.display || "auto";
	}
	get startEditable() {
		return this._def.ui.startEditable;
	}
	get durationEditable() {
		return this._def.ui.durationEditable;
	}
	get constraint() {
		return this._def.ui.constraints[0] || null;
	}
	get overlap() {
		return this._def.ui.overlap;
	}
	get allow() {
		return this._def.ui.allows[0] || null;
	}
	get color() {
		return this._def.ui.color;
	}
	get contrastColor() {
		return this._def.ui.contrastColor;
	}
	get className() {
		return this._def.ui.className;
	}
	get extendedProps() {
		return this._def.extendedProps;
	}
	toPlainObject(settings = {}) {
		let def = this._def;
		let { ui } = def;
		let { startStr, endStr } = this;
		let res = { allDay: def.allDay };
		if (def.title) res.title = def.title;
		if (startStr) res.start = startStr;
		if (endStr) res.end = endStr;
		if (def.publicId) res.id = def.publicId;
		if (def.groupId) res.groupId = def.groupId;
		if (def.url) res.url = def.url;
		if (ui.display && ui.display !== "auto") res.display = ui.display;
		if (ui.color) res.color = ui.color;
		if (ui.contrastColor) res.contrastColor = ui.contrastColor;
		if (ui.className) res.className = ui.className;
		if (Object.keys(def.extendedProps).length) if (settings.collapseExtendedProps) Object.assign(res, def.extendedProps);
		else res.extendedProps = def.extendedProps;
		return res;
	}
	toJSON() {
		return this.toPlainObject();
	}
};
function eventApiToStore(eventApi) {
	let def = eventApi._def;
	let instance = eventApi._instance;
	return {
		defs: { [def.defId]: def },
		instances: instance ? { [instance.instanceId]: instance } : {}
	};
}
function buildEventApis(eventStore, context, excludeInstance) {
	let { defs, instances } = eventStore;
	let eventApis = [];
	let excludeInstanceId = excludeInstance ? excludeInstance.instanceId : "";
	for (let id in instances) {
		let instance = instances[id];
		let def = defs[instance.defId];
		if (instance.instanceId !== excludeInstanceId) eventApis.push(new EventImpl(context, def, instance));
	}
	return eventApis;
}
function getEventKey(seg) {
	return seg.eventRange.instance.instanceId;
}
function sliceEventStore(eventStore, eventUiBases, framingRange, nextDayThreshold) {
	let inverseBgByGroupId = {};
	let inverseBgByDefId = {};
	let defByGroupId = {};
	let bgRanges = [];
	let fgRanges = [];
	let eventUis = compileEventUis(eventStore.defs, eventUiBases);
	for (let defId in eventStore.defs) {
		let def = eventStore.defs[defId];
		if (eventUis[def.defId].display === "inverse-background") if (def.groupId) {
			inverseBgByGroupId[def.groupId] = [];
			if (!defByGroupId[def.groupId]) defByGroupId[def.groupId] = def;
		} else inverseBgByDefId[defId] = [];
	}
	for (let instanceId in eventStore.instances) {
		let instance = eventStore.instances[instanceId];
		let def = eventStore.defs[instance.defId];
		let ui = eventUis[def.defId];
		let origRange = instance.range;
		let normalRange = !def.allDay && nextDayThreshold ? computeVisibleDayRange(origRange, nextDayThreshold) : origRange;
		let slicedRange = intersectRanges(normalRange, framingRange);
		if (slicedRange) {
			if (ui.display === "inverse-background") if (def.groupId) inverseBgByGroupId[def.groupId].push(slicedRange);
			else inverseBgByDefId[instance.defId].push(slicedRange);
			else if (ui.display !== "none") (ui.display === "background" ? bgRanges : fgRanges).push({
				def,
				ui,
				instance,
				range: slicedRange,
				isStart: normalRange.start && normalRange.start.valueOf() === slicedRange.start.valueOf(),
				isEnd: normalRange.end && normalRange.end.valueOf() === slicedRange.end.valueOf()
			});
		}
	}
	for (let groupId in inverseBgByGroupId) {
		let ranges = inverseBgByGroupId[groupId];
		let invertedRanges = invertRanges(ranges, framingRange);
		for (let invertedRange of invertedRanges) {
			let def = defByGroupId[groupId];
			let ui = eventUis[def.defId];
			bgRanges.push({
				def,
				ui,
				instance: null,
				range: invertedRange,
				isStart: false,
				isEnd: false
			});
		}
	}
	for (let defId in inverseBgByDefId) {
		let ranges = inverseBgByDefId[defId];
		let invertedRanges = invertRanges(ranges, framingRange);
		for (let invertedRange of invertedRanges) bgRanges.push({
			def: eventStore.defs[defId],
			ui: eventUis[defId],
			instance: null,
			range: invertedRange,
			isStart: false,
			isEnd: false
		});
	}
	return {
		bg: bgRanges,
		fg: fgRanges
	};
}
function hasBgRendering(def) {
	return def.ui.display === "background" || def.ui.display === "inverse-background";
}
function setElEventRange(el, eventRange) {
	el.fcEventRange = eventRange;
}
function getElEventRange(el) {
	return el.fcEventRange || el.parentNode.fcEventRange || null;
}
function compileEventUis(eventDefs, eventUiBases) {
	return mapHash(eventDefs, (eventDef) => compileEventUi(eventDef, eventUiBases));
}
function compileEventUi(eventDef, eventUiBases) {
	const uis = [];
	const fallbackBase = eventUiBases[""];
	const defBase = eventUiBases[eventDef.defId];
	if (fallbackBase) uis.push(fallbackBase);
	if (defBase) uis.push(defBase);
	uis.push(eventDef.ui);
	return combineEventUis(uis);
}
function sortEventSegs(segs, eventOrderSpecs) {
	let objs = segs.map(buildSegCompareObj);
	objs.sort((obj0, obj1) => compareByFieldSpecs(obj0, obj1, eventOrderSpecs));
	return objs.map((c) => c._seg);
}
function buildSegCompareObj(seg) {
	let { eventRange } = seg;
	let eventDef = eventRange.def;
	let range = eventRange.instance ? eventRange.instance.range : eventRange.range;
	let start = range.start ? range.start.valueOf() : 0;
	let end = range.end ? range.end.valueOf() : 0;
	return {
		...eventDef.extendedProps,
		...eventDef,
		id: eventDef.publicId,
		start,
		end,
		duration: end - start,
		allDay: Number(eventDef.allDay),
		_seg: seg
	};
}
function computeEventRangeDraggable(eventRange, context) {
	let { pluginHooks } = context;
	let transformers = pluginHooks.isDraggableTransformers;
	let { def, ui } = eventRange;
	let val = ui.startEditable;
	for (let transformer of transformers) val = transformer(val, def, ui, context);
	return val;
}
function buildEventRangeTimeText(timeFormat, eventRange, slicedStart, slicedEnd, isStart, isEnd, context, defaultDisplayEventTime = true, defaultDisplayEventEnd = true) {
	const { dateEnv, options } = context;
	const { def } = eventRange;
	let { displayEventTime, displayEventEnd } = options;
	if (displayEventTime == null) displayEventTime = defaultDisplayEventTime !== false;
	if (displayEventEnd == null) displayEventEnd = defaultDisplayEventEnd !== false;
	const startDate = !isStart && slicedStart && startOfDay(slicedStart).valueOf() !== startOfDay(eventRange.instance.range.start).valueOf() ? slicedStart : eventRange.instance.range.start;
	const endDate = !isEnd && slicedEnd && startOfDay(addMs(slicedEnd, -1)).valueOf() !== startOfDay(addMs(eventRange.instance.range.end, -1)).valueOf() ? slicedEnd : eventRange.instance.range.end;
	if (displayEventTime && !def.allDay) {
		if (displayEventEnd && (isStart || isEnd) && def.hasEnd) {
			const rangeParts = dateEnv.formatRangeToParts(startDate, endDate, timeFormat);
			const multiDaySeparator = detectMultiDayTimes(rangeParts);
			if (multiDaySeparator != null) return joinDateTimeFormatParts(dateEnv.formatToParts(startDate, timeFormat)) + multiDaySeparator + joinDateTimeFormatParts(dateEnv.formatToParts(endDate, timeFormat));
			return joinDateTimeFormatParts(rangeParts);
		}
		if (isStart) return joinDateTimeFormatParts(dateEnv.formatToParts(startDate, timeFormat));
	}
	return "";
}
var dateUnits = /* @__PURE__ */ new Set([
	"year",
	"month",
	"day"
]);
function detectMultiDayTimes(parts) {
	let sharedPart;
	let hasDatePart = false;
	for (const part of parts) {
		if (part.source === "shared") sharedPart = part;
		if (dateUnits.has(part.type)) hasDatePart = true;
	}
	return hasDatePart ? sharedPart.value : void 0;
}
function getEventRangeMeta(eventRange, todayRange, nowDate) {
	let segRange = eventRange.range;
	return {
		isPast: segRange.end <= (nowDate || todayRange.start),
		isFuture: segRange.start >= (nowDate || todayRange.end),
		isToday: todayRange && rangeContainsMarker(todayRange, segRange.start)
	};
}
function buildEventRangeKey(eventRange) {
	return eventRange.instance ? eventRange.instance.instanceId : `${eventRange.def.defId}:${eventRange.range.start.toISOString()}`;
}
function getEventTagAndAttrs(eventRange, context) {
	let { def, instance } = eventRange;
	let { url } = def;
	if (url) return [
		"a",
		{ href: url },
		true
	];
	let { emitter, options } = context;
	let { eventInteractive } = options;
	if (eventInteractive == null) {
		eventInteractive = def.interactive;
		if (eventInteractive == null) eventInteractive = Boolean(emitter.hasHandlers("eventClick"));
	}
	let attrs;
	if (eventInteractive) {
		attrs = createAriaKeyboardAttrs((ev) => {
			emitter.trigger("eventClick", {
				el: ev.target,
				event: new EventImpl(context, def, instance),
				jsEvent: ev,
				view: context.viewApi
			});
		});
		attrs = {
			role: "button",
			...attrs
		};
	}
	return [
		"div",
		attrs,
		eventInteractive
	];
}
//#endregion
//#region node_modules/fullcalendar/chunks/56f74c4a.js
var Emitter = class {
	constructor() {
		this.handlers = {};
		this.thisContext = null;
	}
	setThisContext(thisContext) {
		this.thisContext = thisContext;
	}
	setOptions(options) {
		this.options = options;
	}
	on(type, handler) {
		addToHash(this.handlers, type, handler);
	}
	off(type, handler) {
		removeFromHash(this.handlers, type, handler);
	}
	trigger(type, ...args) {
		let attachedHandlers = this.handlers[type] || [];
		let optionHandler = this.options && this.options[type];
		let handlers = [].concat(optionHandler || [], attachedHandlers);
		for (let handler of handlers) handler.apply(this.thisContext, args);
	}
	hasHandlers(type) {
		return Boolean(this.handlers[type] && this.handlers[type].length || this.options && this.options[type]);
	}
};
function addToHash(hash, type, handler) {
	(hash[type] || (hash[type] = [])).push(handler);
}
function removeFromHash(hash, type, handler) {
	if (handler) {
		if (hash[type]) hash[type] = hash[type].filter((func) => func !== handler);
	} else delete hash[type];
}
function getAppendableRoot(el) {
	const root = el.getRootNode();
	if (root instanceof Document) return root.body || root.documentElement;
	return root;
}
function computeElIsRtl(el) {
	return getComputedStyle(el).direction === "rtl";
}
var PIXEL_PROP_RE = /(top|left|right|bottom|width|height)$/i;
function applyStyle(el, props) {
	for (let propName in props) applyStyleProp(el, propName, props[propName]);
}
function applyStyleProp(el, name, val) {
	if (val == null) el.style[name] = "";
	else if (typeof val === "number" && PIXEL_PROP_RE.test(name)) el.style[name] = `${val}px`;
	else el.style[name] = val;
}
function getEventTargetViaRoot(ev) {
	return ev.composedPath?.()[0] ?? ev.target;
}
//#endregion
export { getUnequalProps as $, computeVisibleDayRange as A, eventTupleToStore as B, buildEventRangeTimeText as C, sliceEventStore as Ct, compileEventUis as D, warn as Dt, compareNumbers as E, triggerDateUnselect as Et, createFormatter as F, filterHash as G, expandRecurring as H, diffDates as I, getElEventRange as J, formatWithOrdinals as K, disableCursor as L, createEmptyEventStore as M, createEventInstance as N, computeEventRangeDraggable as O, whenTransitionDone as Ot, createEventUi as P, getRelevantEvents as Q, enableCursor as R, buildEventRangeKey as S, setElEventRange as St, combineEventUis as T, triggerDateSelect as Tt, fabricateEventRange as U, excludeSubEventStore as V, filterEventStoreDefs as W, getEventRangeMeta as X, getEventKey as Y, getEventTagAndAttrs as Z, allowSelection as _, preventContextMenu as _t, getAppendableRoot as a, isDateSpansEqual as at, buildDateSpanApiWithContext as b, refineEventDef as bt, BASE_OPTION_REFINERS as c, listenBySelector as ct, COMPLEX_OPTION_COMPARATORS as d, mergeEventStores as dt, guid as et, EVENT_UI_REFINERS as f, mergeMaybePropsDepth1 as ft, allowContextMenu as g, parseEvents as gt, VIEW_ONLY_OPTION_REFINERS as h, parseEventDef as ht, computeElIsRtl as i, isArraysEqual as it, createAriaClickAttrs as j, computeViewBorderless as k, classNames as kt, CALENDAR_LISTENER_REFINERS as l, listenToHoverBySelector as lt, EventSourceImpl as m, parseEvent as mt, applyStyle as n, hashValuesToArray as nt, getEventTargetViaRoot as o, isPropsEqualShallow as ot, EventImpl as p, parseDateSpan as pt, getDefaultEventEnd as q, applyStyleProp as r, identity as rt, BASE_OPTION_DEFAULTS as s, isPropsEqualWithMap as st, Emitter as t, hasBgRendering as tt, CALENDAR_ONLY_OPTION_REFINERS as u, mapHash as ut, applyMutationToEventStore as v, preventSelection as vt, buildRangeApiWithTimeZone as w, sortEventSegs as wt, buildEventApis as x, refineProps as xt, arrayToHash as y, refineClassName as yt, eventApiToStore as z };
