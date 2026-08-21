import { S as CSP_NONCE, tt as NgZone, v as require_operators, yr as inject } from "./_resource-chunk-Bs197SVl.js";
import { Wa as ɵɵdefineService, Zn as Service, ki as setClassMetadata } from "./core-7astvhVk.js";
import { t as require_cjs } from "./rxjs.js";
import { t as Platform } from "./_platform-chunk-DETPA5Z7.js";
import { t as coerceArray } from "./_array-chunk-DGMD2bQG.js";
//#region node_modules/@angular/cdk/fesm2022/_breakpoints-observer-chunk.mjs
var import_cjs = require_cjs();
var import_operators = require_operators();
var mediaQueriesForWebkitCompatibility = /* @__PURE__ */ new Set();
var mediaQueryStyleNode;
var MediaMatcher = class MediaMatcher {
	_platform = inject(Platform);
	_nonce = inject(CSP_NONCE, { optional: true });
	_matchMedia;
	constructor() {
		this._matchMedia = this._platform.isBrowser && window.matchMedia ? window.matchMedia.bind(window) : noopMatchMedia;
	}
	matchMedia(query) {
		if (this._platform.WEBKIT || this._platform.BLINK) createEmptyStyleRule(query, this._nonce);
		return this._matchMedia(query);
	}
	static ɵfac = function MediaMatcher_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MediaMatcher)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: MediaMatcher,
		factory: MediaMatcher.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MediaMatcher, [{ type: Service }], () => [], null);
})();
function createEmptyStyleRule(query, nonce) {
	if (mediaQueriesForWebkitCompatibility.has(query)) return;
	try {
		if (!mediaQueryStyleNode) {
			mediaQueryStyleNode = document.createElement("style");
			if (nonce) mediaQueryStyleNode.setAttribute("nonce", nonce);
			mediaQueryStyleNode.setAttribute("type", "text/css");
			document.head.appendChild(mediaQueryStyleNode);
		}
		if (mediaQueryStyleNode.sheet) {
			mediaQueryStyleNode.sheet.insertRule(`@media ${query.replace(/[{}]/g, "")} {body{ }}`, 0);
			mediaQueriesForWebkitCompatibility.add(query);
		}
	} catch (e) {
		console.error(e);
	}
}
function noopMatchMedia(query) {
	return {
		matches: query === "all" || query === "",
		media: query,
		addListener: () => {},
		removeListener: () => {}
	};
}
var BreakpointObserver = class BreakpointObserver {
	_mediaMatcher = inject(MediaMatcher);
	_zone = inject(NgZone);
	_queries = /* @__PURE__ */ new Map();
	_destroySubject = new import_cjs.Subject();
	ngOnDestroy() {
		this._destroySubject.next();
		this._destroySubject.complete();
	}
	isMatched(value) {
		return splitQueries(coerceArray(value)).some((mediaQuery) => this._registerQuery(mediaQuery).mql.matches);
	}
	observe(value) {
		let stateObservable = (0, import_cjs.combineLatest)(splitQueries(coerceArray(value)).map((query) => this._registerQuery(query).observable));
		stateObservable = (0, import_cjs.concat)(stateObservable.pipe((0, import_operators.take)(1)), stateObservable.pipe((0, import_operators.skip)(1), (0, import_operators.debounceTime)(0)));
		return stateObservable.pipe((0, import_operators.map)((breakpointStates) => {
			const response = {
				matches: false,
				breakpoints: {}
			};
			breakpointStates.forEach(({ matches, query }) => {
				response.matches = response.matches || matches;
				response.breakpoints[query] = matches;
			});
			return response;
		}));
	}
	_registerQuery(query) {
		if (this._queries.has(query)) return this._queries.get(query);
		const mql = this._mediaMatcher.matchMedia(query);
		const output = {
			observable: new import_cjs.Observable((observer) => {
				const handler = (e) => this._zone.run(() => observer.next(e));
				mql.addListener(handler);
				return () => {
					mql.removeListener(handler);
				};
			}).pipe((0, import_operators.startWith)(mql), (0, import_operators.map)(({ matches }) => ({
				query,
				matches
			})), (0, import_operators.takeUntil)(this._destroySubject)),
			mql
		};
		this._queries.set(query, output);
		return output;
	}
	static ɵfac = function BreakpointObserver_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || BreakpointObserver)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: BreakpointObserver,
		factory: BreakpointObserver.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BreakpointObserver, [{ type: Service }], null, null);
})();
function splitQueries(queries) {
	return queries.map((query) => query.split(",")).reduce((a1, a2) => a1.concat(a2)).map((query) => query.trim());
}
//#endregion
export { MediaMatcher as n, BreakpointObserver as t };
