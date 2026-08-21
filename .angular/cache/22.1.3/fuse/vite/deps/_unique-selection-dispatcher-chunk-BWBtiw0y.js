import { Wa as ɵɵdefineService, Zn as Service, ki as setClassMetadata } from "./core-6q3cy1tM.js";
//#region node_modules/@angular/cdk/fesm2022/_unique-selection-dispatcher-chunk.mjs
var UniqueSelectionDispatcher = class UniqueSelectionDispatcher {
	_listeners = [];
	notify(id, name) {
		for (let listener of this._listeners) listener(id, name);
	}
	listen(listener) {
		this._listeners.push(listener);
		return () => {
			this._listeners = this._listeners.filter((registered) => {
				return listener !== registered;
			});
		};
	}
	ngOnDestroy() {
		this._listeners = [];
	}
	static ɵfac = function UniqueSelectionDispatcher_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || UniqueSelectionDispatcher)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: UniqueSelectionDispatcher,
		factory: UniqueSelectionDispatcher.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UniqueSelectionDispatcher, [{ type: Service }], null, null);
})();
//#endregion
export { UniqueSelectionDispatcher as t };
