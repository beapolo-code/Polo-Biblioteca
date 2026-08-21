import { Bi as signal, Ci as runInInjectionContext, W as Injector, _ as untracked, ai as makeStateKey, et as NgZone, ft as TransferState, oa as ɵɵdefineInjectable, ot as PendingTasks, rt as PLATFORM_ID, sa as ɵɵdefineInjector, xr as inject, yn as effect } from "./_resource-chunk-C-Y-Fu3B.js";
import { Ba as ɵɵdefineComponent, Gt as ChangeDetectionStrategy, Ha as ɵɵdefineNgModule, Jt as Component, Ka as ɵɵdomElement, Nn as NgModule, S as ViewChild, Sn as Input, X as input, _r as afterEveryRender, at as output, fn as ElementRef, gt as viewChild, ki as setClassMetadata, ns as ɵɵqueryAdvance, po as ɵɵgetInheritedFactory, qi as ɵɵInheritDefinitionFeature, qs as ɵɵviewQuerySignal, vr as afterNextRender, xn as Injectable, zn as Output } from "./core-6q3cy1tM.js";
import { d as isPlatformServer, u as isPlatformBrowser } from "./common-BW30PdCZ.js";
//#region node_modules/ng-apexcharts/fesm2022/ng-apexcharts.mjs
/**
* Option inputs that are copied straight onto the ApexCharts config object.
*
* A reference change in any of these requires tearing the chart down and
* re-creating it. `series` is deliberately excluded: it has a cheap
* `updateSeries()` fast path, see {@link ChartComponent.autoUpdateSeries}.
*/
var _c0 = ["chart"];
var STRUCTURAL_INPUTS = [
	"annotations",
	"chart",
	"colors",
	"dataLabels",
	"stroke",
	"labels",
	"legend",
	"fill",
	"tooltip",
	"plotOptions",
	"responsive",
	"markers",
	"noData",
	"parsing",
	"xaxis",
	"yaxis",
	"forecastDataPoints",
	"grid",
	"states",
	"title",
	"subtitle",
	"theme"
];
/**
* Compare two snapshots by reference, which is the same identity check Angular
* itself used to decide whether to report an input in `SimpleChanges`.
*/
function structuralEquals(a, b) {
	return STRUCTURAL_INPUTS.every((key) => a[key] === b[key]);
}
var ChartComponent = class ChartComponent {
	constructor() {
		this.chart = input(...ngDevMode ? [void 0, { debugName: "chart" }] : 		/* istanbul ignore next */ []);
		this.annotations = input(...ngDevMode ? [void 0, { debugName: "annotations" }] : 		/* istanbul ignore next */ []);
		this.colors = input(...ngDevMode ? [void 0, { debugName: "colors" }] : 		/* istanbul ignore next */ []);
		this.dataLabels = input(...ngDevMode ? [void 0, { debugName: "dataLabels" }] : 		/* istanbul ignore next */ []);
		this.series = input(...ngDevMode ? [void 0, { debugName: "series" }] : 		/* istanbul ignore next */ []);
		this.stroke = input(...ngDevMode ? [void 0, { debugName: "stroke" }] : 		/* istanbul ignore next */ []);
		this.labels = input(...ngDevMode ? [void 0, { debugName: "labels" }] : 		/* istanbul ignore next */ []);
		this.legend = input(...ngDevMode ? [void 0, { debugName: "legend" }] : 		/* istanbul ignore next */ []);
		this.markers = input(...ngDevMode ? [void 0, { debugName: "markers" }] : 		/* istanbul ignore next */ []);
		this.noData = input(...ngDevMode ? [void 0, { debugName: "noData" }] : 		/* istanbul ignore next */ []);
		this.parsing = input(...ngDevMode ? [void 0, { debugName: "parsing" }] : 		/* istanbul ignore next */ []);
		this.fill = input(...ngDevMode ? [void 0, { debugName: "fill" }] : 		/* istanbul ignore next */ []);
		this.tooltip = input(...ngDevMode ? [void 0, { debugName: "tooltip" }] : 		/* istanbul ignore next */ []);
		this.plotOptions = input(...ngDevMode ? [void 0, { debugName: "plotOptions" }] : 		/* istanbul ignore next */ []);
		this.responsive = input(...ngDevMode ? [void 0, { debugName: "responsive" }] : 		/* istanbul ignore next */ []);
		this.xaxis = input(...ngDevMode ? [void 0, { debugName: "xaxis" }] : 		/* istanbul ignore next */ []);
		this.yaxis = input(...ngDevMode ? [void 0, { debugName: "yaxis" }] : 		/* istanbul ignore next */ []);
		this.forecastDataPoints = input(...ngDevMode ? [void 0, { debugName: "forecastDataPoints" }] : 		/* istanbul ignore next */ []);
		this.grid = input(...ngDevMode ? [void 0, { debugName: "grid" }] : 		/* istanbul ignore next */ []);
		this.states = input(...ngDevMode ? [void 0, { debugName: "states" }] : 		/* istanbul ignore next */ []);
		this.title = input(...ngDevMode ? [void 0, { debugName: "title" }] : 		/* istanbul ignore next */ []);
		this.subtitle = input(...ngDevMode ? [void 0, { debugName: "subtitle" }] : 		/* istanbul ignore next */ []);
		this.theme = input(...ngDevMode ? [void 0, { debugName: "theme" }] : 		/* istanbul ignore next */ []);
		this.autoUpdateSeries = input(true, ...ngDevMode ? [{ debugName: "autoUpdateSeries" }] : 		/* istanbul ignore next */ []);
		this.chartReady = output();
		this.chartInstance = signal(null, ...ngDevMode ? [{ debugName: "chartInstance" }] : 		/* istanbul ignore next */ []);
		this.chartElement = viewChild.required("chart", ...ngDevMode ? [{ debugName: "chartElement" }] : 		/* istanbul ignore next */ []);
		this.ngZone = inject(NgZone);
		this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
		this._destroyed = false;
		this._injector = inject(Injector);
		this.waitingForConnectedRef = null;
		/** Structural inputs as of the last completed `createElement()`. */
		this.appliedStructural = null;
		/** True while a `createElement()` pass is queued or in flight. */
		this.createScheduled = false;
		if (this.isBrowser) effect(() => {
			const structural = this.readStructuralInputs();
			const series = this.series();
			untracked(() => this.applyChanges(structural, series));
		});
	}
	ngOnDestroy() {
		this.destroy();
		this._destroyed = true;
	}
	/** Determine if the host element is connected to the document */
	get isConnected() {
		return this.chartElement()?.nativeElement.isConnected;
	}
	/** Tracked read of every structural input. Must run inside a reactive context. */
	readStructuralInputs() {
		const snapshot = {};
		for (const key of STRUCTURAL_INPUTS) snapshot[key] = this[key]();
		return snapshot;
	}
	/**
	* Route an input change to either the cheap `updateSeries()` path or a full
	* re-create, mirroring what the chart currently has applied.
	*/
	applyChanges(structural, series) {
		if (!(!!series || STRUCTURAL_INPUTS.some((key) => structural[key]))) return;
		if (this.createScheduled || this.waitingForConnectedRef) return;
		if (this.chartInstance() !== null && this.autoUpdateSeries() && this.appliedStructural !== null && structuralEquals(this.appliedStructural, structural) && !!series) {
			this.updateSeries(series, true);
			return;
		}
		this.createScheduled = true;
		afterNextRender({ read: () => this.createElement() }, { injector: this._injector });
	}
	/** @internal Extracted to allow subclasses and tests to swap the ApexCharts bundle. */
	importApexCharts() {
		return import("./apexcharts.esm-Dud5Ydxm.js");
	}
	async createElement() {
		const { default: ApexCharts } = await this.importApexCharts();
		window.ApexCharts ||= ApexCharts;
		if (this._destroyed) return;
		if (!this.isConnected) {
			this.waitForConnected();
			return;
		}
		const structural = untracked(() => this.readStructuralInputs());
		const series = untracked(this.series);
		const options = {};
		for (const key of STRUCTURAL_INPUTS) if (structural[key]) options[key] = structural[key];
		if (series) options.series = series;
		this.appliedStructural = structural;
		this.createScheduled = false;
		this.destroy();
		const chartInstance = this.ngZone.runOutsideAngular(() => new ApexCharts(this.chartElement().nativeElement, options));
		this.chartInstance.set(chartInstance);
		this.render();
		this.chartReady.emit({ chartObj: chartInstance });
	}
	render() {
		if (this.isConnected) return this.ngZone.runOutsideAngular(() => this.chartInstance()?.render());
		else this.waitForConnected();
	}
	updateOptions(options, redrawPaths, animate, updateSyncedCharts) {
		return this.ngZone.runOutsideAngular(() => this.chartInstance()?.updateOptions(options, redrawPaths, animate, updateSyncedCharts));
	}
	updateSeries(newSeries, animate) {
		return this.ngZone.runOutsideAngular(() => this.chartInstance()?.updateSeries(newSeries, animate));
	}
	appendSeries(newSeries, animate) {
		this.ngZone.runOutsideAngular(() => this.chartInstance()?.appendSeries(newSeries, animate));
	}
	appendData(newData) {
		this.ngZone.runOutsideAngular(() => this.chartInstance()?.appendData(newData));
	}
	highlightSeries(seriesName) {
		return this.ngZone.runOutsideAngular(() => this.chartInstance()?.highlightSeries(seriesName));
	}
	toggleSeries(seriesName) {
		return this.ngZone.runOutsideAngular(() => this.chartInstance()?.toggleSeries(seriesName));
	}
	showSeries(seriesName) {
		this.ngZone.runOutsideAngular(() => this.chartInstance()?.showSeries(seriesName));
	}
	hideSeries(seriesName) {
		this.ngZone.runOutsideAngular(() => this.chartInstance()?.hideSeries(seriesName));
	}
	resetSeries() {
		this.ngZone.runOutsideAngular(() => this.chartInstance()?.resetSeries());
	}
	zoomX(min, max) {
		this.ngZone.runOutsideAngular(() => this.chartInstance()?.zoomX(min, max));
	}
	toggleDataPointSelection(seriesIndex, dataPointIndex) {
		this.ngZone.runOutsideAngular(() => this.chartInstance()?.toggleDataPointSelection(seriesIndex, dataPointIndex));
	}
	destroy() {
		this.chartInstance()?.destroy();
		this.chartInstance.set(null);
	}
	setLocale(localeName) {
		this.ngZone.runOutsideAngular(() => this.chartInstance()?.setLocale(localeName));
	}
	paper() {
		this.ngZone.runOutsideAngular(() => this.chartInstance()?.paper());
	}
	addXaxisAnnotation(options, pushToMemory, context) {
		this.ngZone.runOutsideAngular(() => this.chartInstance()?.addXaxisAnnotation(options, pushToMemory, context));
	}
	addYaxisAnnotation(options, pushToMemory, context) {
		this.ngZone.runOutsideAngular(() => this.chartInstance()?.addYaxisAnnotation(options, pushToMemory, context));
	}
	addPointAnnotation(options, pushToMemory, context) {
		this.ngZone.runOutsideAngular(() => this.chartInstance()?.addPointAnnotation(options, pushToMemory, context));
	}
	removeAnnotation(id, options) {
		this.ngZone.runOutsideAngular(() => this.chartInstance()?.removeAnnotation(id, options));
	}
	clearAnnotations(options) {
		this.ngZone.runOutsideAngular(() => this.chartInstance()?.clearAnnotations(options));
	}
	dataURI(options) {
		return this.chartInstance()?.dataURI(options);
	}
	waitForConnected() {
		if (this.waitingForConnectedRef) return;
		this.waitingForConnectedRef = afterEveryRender({ read: () => {
			if (this.isConnected) {
				this.waitingForConnectedRef?.destroy();
				this.waitingForConnectedRef = null;
				this.createElement();
			}
		} }, { injector: this._injector });
	}
	/** @nocollapse */
	static {
		this.ɵfac = function ChartComponent_Factory(__ngFactoryType__) {
			return new (__ngFactoryType__ || ChartComponent)();
		};
	}
	/** @nocollapse */
	static {
		this.ɵcmp = /* @__PURE__ */ ɵɵdefineComponent({
			type: ChartComponent,
			selectors: [["apx-chart"]],
			viewQuery: function ChartComponent_Query(rf, ctx) {
				if (rf & 1) ɵɵviewQuerySignal(ctx.chartElement, _c0, 5);
				if (rf & 2) ɵɵqueryAdvance();
			},
			inputs: {
				chart: [1, "chart"],
				annotations: [1, "annotations"],
				colors: [1, "colors"],
				dataLabels: [1, "dataLabels"],
				series: [1, "series"],
				stroke: [1, "stroke"],
				labels: [1, "labels"],
				legend: [1, "legend"],
				markers: [1, "markers"],
				noData: [1, "noData"],
				parsing: [1, "parsing"],
				fill: [1, "fill"],
				tooltip: [1, "tooltip"],
				plotOptions: [1, "plotOptions"],
				responsive: [1, "responsive"],
				xaxis: [1, "xaxis"],
				yaxis: [1, "yaxis"],
				forecastDataPoints: [1, "forecastDataPoints"],
				grid: [1, "grid"],
				states: [1, "states"],
				title: [1, "title"],
				subtitle: [1, "subtitle"],
				theme: [1, "theme"],
				autoUpdateSeries: [1, "autoUpdateSeries"]
			},
			outputs: { chartReady: "chartReady" },
			decls: 2,
			vars: 0,
			consts: [["chart", ""]],
			template: function ChartComponent_Template(rf, ctx) {
				if (rf & 1) ɵɵdomElement(0, "div", null, 0);
			},
			encapsulation: 2
		});
	}
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChartComponent, [{
		type: Component,
		args: [{
			selector: "apx-chart",
			template: `<div #chart></div>`,
			changeDetection: ChangeDetectionStrategy.OnPush,
			standalone: true
		}]
	}], () => [], {
		chart: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "chart",
				required: false
			}]
		}],
		annotations: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "annotations",
				required: false
			}]
		}],
		colors: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "colors",
				required: false
			}]
		}],
		dataLabels: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "dataLabels",
				required: false
			}]
		}],
		series: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "series",
				required: false
			}]
		}],
		stroke: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "stroke",
				required: false
			}]
		}],
		labels: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "labels",
				required: false
			}]
		}],
		legend: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "legend",
				required: false
			}]
		}],
		markers: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "markers",
				required: false
			}]
		}],
		noData: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "noData",
				required: false
			}]
		}],
		parsing: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "parsing",
				required: false
			}]
		}],
		fill: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "fill",
				required: false
			}]
		}],
		tooltip: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "tooltip",
				required: false
			}]
		}],
		plotOptions: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "plotOptions",
				required: false
			}]
		}],
		responsive: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "responsive",
				required: false
			}]
		}],
		xaxis: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "xaxis",
				required: false
			}]
		}],
		yaxis: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "yaxis",
				required: false
			}]
		}],
		forecastDataPoints: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "forecastDataPoints",
				required: false
			}]
		}],
		grid: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "grid",
				required: false
			}]
		}],
		states: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "states",
				required: false
			}]
		}],
		title: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "title",
				required: false
			}]
		}],
		subtitle: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "subtitle",
				required: false
			}]
		}],
		theme: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "theme",
				required: false
			}]
		}],
		autoUpdateSeries: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "autoUpdateSeries",
				required: false
			}]
		}],
		chartReady: [{
			type: Output,
			args: ["chartReady"]
		}],
		chartElement: [{
			type: ViewChild,
			args: ["chart", { isSignal: true }]
		}]
	});
})();
/**
* Tree-shakeable variant of `<apx-chart>`.
*
* Loads `apexcharts/core` (~611 KB) instead of the full `apexcharts/client`
* bundle (~942 KB). To register chart types and features, add side-effect
* imports **before** this component is rendered, typically in `app.config.ts`
* or at the top of the component that bootstraps the charts:
*
* ```ts
* import "apexcharts/line";              // line, area, scatter, bubble
* import "apexcharts/bar";               // bar, column, rangeBar
* import "apexcharts/features/legend";   // opt-in legend
* import "apexcharts/features/toolbar";  // opt-in toolbar
* ```
*
* All inputs/outputs/methods are identical to `<apx-chart>`.
*/
var ChartCoreComponent = class ChartCoreComponent extends ChartComponent {
	importApexCharts() {
		return import("./core.esm-YLwinweo.js");
	}
	/** @nocollapse */
	static {
		this.ɵfac = /* @__PURE__ */ (() => {
			let ɵChartCoreComponent_BaseFactory;
			return function ChartCoreComponent_Factory(__ngFactoryType__) {
				return (ɵChartCoreComponent_BaseFactory || (ɵChartCoreComponent_BaseFactory = ɵɵgetInheritedFactory(ChartCoreComponent)))(__ngFactoryType__ || ChartCoreComponent);
			};
		})();
	}
	/** @nocollapse */
	static {
		this.ɵcmp = /* @__PURE__ */ ɵɵdefineComponent({
			type: ChartCoreComponent,
			selectors: [["apx-chart-core"]],
			features: [ɵɵInheritDefinitionFeature],
			decls: 2,
			vars: 0,
			consts: [["chart", ""]],
			template: function ChartCoreComponent_Template(rf, ctx) {
				if (rf & 1) ɵɵdomElement(0, "div", null, 0);
			},
			encapsulation: 2
		});
	}
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChartCoreComponent, [{
		type: Component,
		args: [{
			selector: "apx-chart-core",
			template: `<div #chart></div>`,
			changeDetection: ChangeDetectionStrategy.OnPush,
			standalone: true
		}]
	}], null, null);
})();
var ChartSSRService = class ChartSSRService {
	constructor() {
		/** Per-app-instance counter for stable TransferState keys. Resets on each server bootstrap. */
		this.instanceCounter = 0;
	}
	nextInstanceId() {
		return this.instanceCounter++;
	}
	/** @internal Extracted to allow spying in unit tests without importing actual SSR bundle. */
	importSSRModule() {
		return import("./apexcharts.ssr.esm-D8l-2DQF.js");
	}
	async renderToHTML(options, ssrOptions = {}) {
		const { default: ApexCharts } = await this.importSSRModule();
		return ApexCharts.renderToHTML(options, ssrOptions);
	}
	async renderToString(options, ssrOptions = {}) {
		const { default: ApexCharts } = await this.importSSRModule();
		return ApexCharts.renderToString(options, ssrOptions);
	}
	/** @nocollapse */
	static {
		this.ɵfac = function ChartSSRService_Factory(__ngFactoryType__) {
			return new (__ngFactoryType__ || ChartSSRService)();
		};
	}
	/** @nocollapse */
	static {
		this.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
			token: ChartSSRService,
			factory: ChartSSRService.ɵfac,
			providedIn: "root"
		});
	}
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChartSSRService, [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}], null, null);
})();
/**
* Server-side rendering component for ApexCharts.
*
* On the server: renders SVG imperatively into the host element, stores HTML in TransferState.
* On the client: ngSkipHydration tells Angular to leave the host DOM alone.
* afterNextRender then injects the HTML from TransferState into the host imperatively
* (as a fallback if ngSkipHydration stripped the content, which it does with empty templates).
* ChartHydrateComponent also uses afterNextRender so it runs after this, guaranteeing
* [data-apexcharts-hydrate] is present when Pattern B calls hydrate().
*
* @example
* <apx-chart-ssr [options]="chartOptions" [width]="500" [height]="300" />
*/
var ChartSSRComponent = class ChartSSRComponent {
	constructor() {
		this.options = input.required(...ngDevMode ? [{ debugName: "options" }] : 		/* istanbul ignore next */ []);
		this.width = input(400, ...ngDevMode ? [{ debugName: "width" }] : 		/* istanbul ignore next */ []);
		this.height = input(300, ...ngDevMode ? [{ debugName: "height" }] : 		/* istanbul ignore next */ []);
		this.chartSSRService = inject(ChartSSRService);
		this.pendingTasks = inject(PendingTasks);
		this.el = inject(ElementRef);
		this.transferState = inject(TransferState);
		this.stateKey = makeStateKey(`apx-chart-ssr-${this.chartSSRService.nextInstanceId()}`);
		this.isServer = isPlatformServer(inject(PLATFORM_ID));
		if (!this.isServer) afterNextRender(() => {
			const host = this.el.nativeElement;
			const html = this.transferState.get(this.stateKey, "");
			this.transferState.remove(this.stateKey);
			if (html) {
				const { svgOuter, config } = JSON.parse(html);
				const svgDoc = new DOMParser().parseFromString(svgOuter, "image/svg+xml");
				const svgEl = document.importNode(svgDoc.documentElement, true);
				const wrapper = document.createElement("div");
				wrapper.className = "apexcharts-ssr-wrapper";
				wrapper.setAttribute("data-apexcharts-hydrate", "");
				if (config) wrapper.setAttribute("data-apexcharts-config", config);
				wrapper.appendChild(svgEl);
				host.innerHTML = "";
				host.appendChild(wrapper);
			}
		});
	}
	async ngOnInit() {
		if (!this.isServer) return;
		const done = this.pendingTasks.add();
		const ssrOptions = {
			width: this.width(),
			height: this.height()
		};
		try {
			const [html, svgOuter] = await Promise.all([this.chartSSRService.renderToHTML(this.options(), ssrOptions), this.chartSSRService.renderToString(this.options(), ssrOptions)]);
			const config = html.match(/data-apexcharts-config="([^"]*)"/)?.[1] ?? "";
			this.transferState.set(this.stateKey, JSON.stringify({
				svgOuter,
				config
			}));
			this.el.nativeElement.innerHTML = html;
		} finally {
			done();
		}
	}
	/** @nocollapse */
	static {
		this.ɵfac = function ChartSSRComponent_Factory(__ngFactoryType__) {
			return new (__ngFactoryType__ || ChartSSRComponent)();
		};
	}
	/** @nocollapse */
	static {
		this.ɵcmp = /* @__PURE__ */ ɵɵdefineComponent({
			type: ChartSSRComponent,
			selectors: [["apx-chart-ssr"]],
			hostAttrs: ["ngSkipHydration", "true"],
			inputs: {
				options: [1, "options"],
				width: [1, "width"],
				height: [1, "height"]
			},
			decls: 0,
			vars: 0,
			template: function ChartSSRComponent_Template(rf, ctx) {},
			encapsulation: 2
		});
	}
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChartSSRComponent, [{
		type: Component,
		args: [{
			selector: "apx-chart-ssr",
			template: ``,
			standalone: true,
			host: { ngSkipHydration: "true" }
		}]
	}], () => [], {
		options: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "options",
				required: true
			}]
		}],
		width: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "width",
				required: false
			}]
		}],
		height: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "height",
				required: false
			}]
		}]
	});
})();
/**
* Client-side hydration component for ApexCharts SSR output.
*
* Must be placed immediately after `<apx-chart-ssr>` in the DOM. It finds
* the server-rendered `[data-apexcharts-hydrate]` element in the preceding
* `<apx-chart-ssr>` sibling and calls `ApexCharts.hydrate()` on it to
* attach full interactivity (animations, tooltips, zoom, etc.).
*
* Uses afterNextRender so it runs after ChartSSRComponent has injected the
* server HTML into the DOM (which also happens in afterNextRender).
*
* On the server this component does nothing.
*
* @example
* <apx-chart-ssr [options]="chartOptions" />
* <apx-chart-hydrate [clientOptions]="{ chart: { animations: { enabled: true } } }" />
*/
var ChartHydrateComponent = class ChartHydrateComponent {
	constructor() {
		this.clientOptions = input({}, ...ngDevMode ? [{ debugName: "clientOptions" }] : 		/* istanbul ignore next */ []);
		this.el = inject(ElementRef);
		this.ngZone = inject(NgZone);
		this.injector = inject(Injector);
		this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
		this.chartObj = null;
	}
	ngOnInit() {
		if (!this.isBrowser) return;
		runInInjectionContext(this.injector, () => afterNextRender(async () => {
			const ssrEl = this.el.nativeElement.parentElement?.querySelector("[data-apexcharts-hydrate]");
			if (!ssrEl) {
				console.warn("[ng-apexcharts] ChartHydrateComponent: No [data-apexcharts-hydrate] element found. Ensure <apx-chart-ssr> precedes <apx-chart-hydrate> in the same container.");
				return;
			}
			const { default: ApexCharts } = await this.importClientModule();
			try {
				this.chartObj = this.ngZone.runOutsideAngular(() => ApexCharts.hydrate(ssrEl, this.clientOptions()));
			} catch (error) {
				console.error("[ng-apexcharts] ChartHydrateComponent: Failed to hydrate chart.", error);
			}
		}));
	}
	/** @internal Extracted to allow spying in unit tests without importing actual SSR/hydrate bundle. */
	importClientModule() {
		return import("./apexcharts.ssr.esm-D8l-2DQF.js");
	}
	ngOnDestroy() {
		this.chartObj?.destroy();
		this.chartObj = null;
	}
	/** @nocollapse */
	static {
		this.ɵfac = function ChartHydrateComponent_Factory(__ngFactoryType__) {
			return new (__ngFactoryType__ || ChartHydrateComponent)();
		};
	}
	/** @nocollapse */
	static {
		this.ɵcmp = /* @__PURE__ */ ɵɵdefineComponent({
			type: ChartHydrateComponent,
			selectors: [["apx-chart-hydrate"]],
			inputs: { clientOptions: [1, "clientOptions"] },
			decls: 0,
			vars: 0,
			template: function ChartHydrateComponent_Template(rf, ctx) {},
			encapsulation: 2
		});
	}
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChartHydrateComponent, [{
		type: Component,
		args: [{
			selector: "apx-chart-hydrate",
			template: ``,
			standalone: true
		}]
	}], null, { clientOptions: [{
		type: Input,
		args: [{
			isSignal: true,
			alias: "clientOptions",
			required: false
		}]
	}] });
})();
var declarations = [
	ChartComponent,
	ChartCoreComponent,
	ChartSSRComponent,
	ChartHydrateComponent
];
var NgApexchartsModule = class NgApexchartsModule {
	/** @nocollapse */ static {
		this.ɵfac = function NgApexchartsModule_Factory(__ngFactoryType__) {
			return new (__ngFactoryType__ || NgApexchartsModule)();
		};
	}
	/** @nocollapse */
	static {
		this.ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({
			type: NgApexchartsModule,
			imports: [
				ChartComponent,
				ChartCoreComponent,
				ChartSSRComponent,
				ChartHydrateComponent
			],
			exports: [
				ChartComponent,
				ChartCoreComponent,
				ChartSSRComponent,
				ChartHydrateComponent
			]
		});
	}
	/** @nocollapse */
	static {
		this.ɵinj = /* @__PURE__ */ ɵɵdefineInjector({});
	}
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgApexchartsModule, [{
		type: NgModule,
		args: [{
			imports: [declarations],
			exports: [declarations]
		}]
	}], null, null);
})();
//#endregion
export { ChartComponent, ChartCoreComponent, ChartHydrateComponent, ChartSSRComponent, ChartSSRService, NgApexchartsModule };
