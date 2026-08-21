import { aa as ɵɵdefineInjector, yr as inject } from "./_resource-chunk-Bs197SVl.js";
import { Ha as ɵɵdefineNgModule, Nn as NgModule, Wa as ɵɵdefineService, Zn as Service, ki as setClassMetadata } from "./core-7astvhVk.js";
import { n as MAT_DATE_FORMATS, r as MAT_DATE_LOCALE, t as DateAdapter } from "./_date-formats-chunk-B42CRij_.js";
import { Cn as getMonth, Fn as getDate, Hn as formatISO, Jn as format, Jt as parse, Nn as getDaysInMonth, Oi as addMonths, On as getHours, Pn as getDay, Xr as isValid, Zr as isDate, di as addSeconds, hn as getYear, k as set, ki as addDays, li as addYears, q as parseISO, wn as getMinutes, xn as getSeconds } from "./date-fns-C0Rxhuql.js";
//#region node_modules/@angular/material-date-fns-adapter/fesm2022/material-date-fns-adapter.mjs
function range(length, valueFunction) {
	const valuesArray = Array(length);
	for (let i = 0; i < length; i++) valuesArray[i] = valueFunction(i);
	return valuesArray;
}
var MONTH_FORMATS = {
	long: "LLLL",
	short: "LLL",
	narrow: "LLLLL"
};
var DAY_OF_WEEK_FORMATS = {
	long: "EEEE",
	short: "EEE",
	narrow: "EEEEE"
};
var DateFnsAdapter = class DateFnsAdapter extends DateAdapter {
	constructor() {
		super();
		const matDateLocale = inject(MAT_DATE_LOCALE, { optional: true });
		this.setLocale(matDateLocale);
	}
	getYear(date) {
		return getYear(date);
	}
	getMonth(date) {
		return getMonth(date);
	}
	getDate(date) {
		return getDate(date);
	}
	getDayOfWeek(date) {
		return getDay(date);
	}
	getMonthNames(style) {
		const pattern = MONTH_FORMATS[style];
		return range(12, (i) => this.format(new Date(2017, i, 1), pattern));
	}
	getDateNames() {
		const dtf = typeof Intl !== "undefined" ? new Intl.DateTimeFormat(this.locale.code, {
			day: "numeric",
			timeZone: "utc"
		}) : null;
		return range(31, (i) => {
			if (dtf) {
				const date = /* @__PURE__ */ new Date();
				date.setUTCFullYear(2017, 0, i + 1);
				date.setUTCHours(0, 0, 0, 0);
				return dtf.format(date).replace(/[\u200e\u200f]/g, "");
			}
			return i + "";
		});
	}
	getDayOfWeekNames(style) {
		const pattern = DAY_OF_WEEK_FORMATS[style];
		return range(7, (i) => this.format(new Date(2017, 0, i + 1), pattern));
	}
	getYearName(date) {
		return this.format(date, "y");
	}
	getFirstDayOfWeek() {
		return this.locale.options?.weekStartsOn ?? 0;
	}
	getNumDaysInMonth(date) {
		return getDaysInMonth(date);
	}
	clone(date) {
		return new Date(date.getTime());
	}
	createDate(year, month, date) {
		if (typeof ngDevMode === "undefined" || ngDevMode) {
			if (month < 0 || month > 11) throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
			if (date < 1) throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
		}
		const result = /* @__PURE__ */ new Date();
		result.setFullYear(year, month, date);
		result.setHours(0, 0, 0, 0);
		if (result.getMonth() != month && (typeof ngDevMode === "undefined" || ngDevMode)) throw Error(`Invalid date "${date}" for month with index "${month}".`);
		return result;
	}
	today() {
		return /* @__PURE__ */ new Date();
	}
	parse(value, parseFormat) {
		return this._parse(value, parseFormat);
	}
	format(date, displayFormat) {
		if (!this.isValid(date)) throw Error("DateFnsAdapter: Cannot format invalid date.");
		return format(date, displayFormat, { locale: this.locale });
	}
	addCalendarYears(date, years) {
		return addYears(date, years);
	}
	addCalendarMonths(date, months) {
		return addMonths(date, months);
	}
	addCalendarDays(date, days) {
		return addDays(date, days);
	}
	toIso8601(date) {
		return formatISO(date, { representation: "date" });
	}
	deserialize(value) {
		if (typeof value === "string") {
			if (!value) return null;
			const date = parseISO(value);
			if (this.isValid(date)) return date;
		}
		return super.deserialize(value);
	}
	isDateInstance(obj) {
		return isDate(obj);
	}
	isValid(date) {
		return isValid(date);
	}
	invalid() {
		return /* @__PURE__ */ new Date(NaN);
	}
	setTime(target, hours, minutes, seconds) {
		if (typeof ngDevMode === "undefined" || ngDevMode) {
			if (hours < 0 || hours > 23) throw Error(`Invalid hours "${hours}". Hours value must be between 0 and 23.`);
			if (minutes < 0 || minutes > 59) throw Error(`Invalid minutes "${minutes}". Minutes value must be between 0 and 59.`);
			if (seconds < 0 || seconds > 59) throw Error(`Invalid seconds "${seconds}". Seconds value must be between 0 and 59.`);
		}
		return set(this.clone(target), {
			hours,
			minutes,
			seconds,
			milliseconds: 0
		});
	}
	getHours(date) {
		return getHours(date);
	}
	getMinutes(date) {
		return getMinutes(date);
	}
	getSeconds(date) {
		return getSeconds(date);
	}
	parseTime(value, parseFormat) {
		return this._parse(value, parseFormat, false);
	}
	addSeconds(date, amount) {
		return addSeconds(date, amount);
	}
	_parse(value, parseFormat, shouldTryParseIso = true) {
		if (typeof value == "string" && value.length > 0) {
			if (shouldTryParseIso) {
				const iso8601Date = parseISO(value);
				if (this.isValid(iso8601Date)) return iso8601Date;
			}
			const formats = Array.isArray(parseFormat) ? parseFormat : [parseFormat];
			if (!parseFormat.length) throw Error("Formats array must not be empty.");
			for (const currentFormat of formats) {
				const fromFormat = parse(value, currentFormat, /* @__PURE__ */ new Date(), { locale: this.locale });
				if (this.isValid(fromFormat)) return fromFormat;
			}
			return this.invalid();
		} else if (typeof value === "number") return new Date(value);
		else if (value instanceof Date) return this.clone(value);
		return null;
	}
	static ɵfac = function DateFnsAdapter_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || DateFnsAdapter)();
	};
	static ɵprov = /* @__PURE__ */ ɵɵdefineService({
		token: DateFnsAdapter,
		factory: DateFnsAdapter.ɵfac,
		autoProvided: false
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DateFnsAdapter, [{
		type: Service,
		args: [{ autoProvided: false }]
	}], () => [], null);
})();
var MAT_DATE_FNS_FORMATS = {
	parse: {
		dateInput: "P",
		timeInput: "p"
	},
	display: {
		dateInput: "P",
		timeInput: "p",
		monthYearLabel: "LLL uuuu",
		dateA11yLabel: "PP",
		monthYearA11yLabel: "LLLL uuuu",
		timeOptionLabel: "p"
	}
};
var DateFnsModule = class DateFnsModule {
	static ɵfac = function DateFnsModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || DateFnsModule)();
	};
	static ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({ type: DateFnsModule });
	static ɵinj = /* @__PURE__ */ ɵɵdefineInjector({ providers: [{
		provide: DateAdapter,
		useClass: DateFnsAdapter
	}] });
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DateFnsModule, [{
		type: NgModule,
		args: [{ providers: [{
			provide: DateAdapter,
			useClass: DateFnsAdapter
		}] }]
	}], null, null);
})();
var MatDateFnsModule = class MatDateFnsModule {
	static ɵfac = function MatDateFnsModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatDateFnsModule)();
	};
	static ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({ type: MatDateFnsModule });
	static ɵinj = /* @__PURE__ */ ɵɵdefineInjector({ providers: [provideDateFnsAdapter()] });
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDateFnsModule, [{
		type: NgModule,
		args: [{ providers: [provideDateFnsAdapter()] }]
	}], null, null);
})();
function provideDateFnsAdapter(formats = MAT_DATE_FNS_FORMATS) {
	return [{
		provide: DateAdapter,
		useClass: DateFnsAdapter
	}, {
		provide: MAT_DATE_FORMATS,
		useValue: formats
	}];
}
//#endregion
export { DateFnsAdapter, DateFnsModule, MAT_DATE_FNS_FORMATS, MatDateFnsModule, provideDateFnsAdapter };
