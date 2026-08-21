//#region node_modules/temporal-polyfill/chunks/root.js
var NativeTemporal = globalThis.Temporal;
//#endregion
//#region node_modules/temporal-utils/dist/errorMessages.js
var expectedPositive = (entityName, num) => `Non-positive ${entityName}: ${num}`;
var expectedFinite = (entityName, num) => `Non-finite ${entityName}: ${num}`;
var forbiddenBigIntToNumber = (entityName) => `Cannot convert bigint to ${entityName}`;
var invalidObject = "Invalid object";
var numberOutOfRange = (entityName, val, min, max) => invalidEntity$1(entityName, val) + `; must be between ${min}-${max}`;
var invalidEntity$1 = (fieldName, val) => `Invalid ${fieldName}: ${val}`;
//#endregion
//#region node_modules/temporal-utils/dist/utils.js
var nanoInMicro$1 = 1e3;
var nanoInMilli$1 = 1e6;
var nanoInSec$1 = 1e9;
var nanoInMinute$1 = 6e10;
var nanoInHour$1 = 36e11;
function normalizeOptions(options) {
	if (options === void 0) return Object.create(null);
	return requireObjectLike(options);
}
function toFiniteNumber(arg, entityName = "number") {
	if (typeof arg === "bigint") throw new TypeError(forbiddenBigIntToNumber(entityName));
	arg = Number(arg);
	if (!Number.isFinite(arg)) throw new RangeError(expectedFinite(entityName, arg));
	return arg;
}
function toIntegerWithTrunc(arg, entityName) {
	return Math.trunc(toFiniteNumber(arg, entityName)) || 0;
}
function toPositiveIntegerWithTruncation(arg, entityName) {
	return requireNumberIsPositive(toIntegerWithTrunc(arg, entityName), entityName);
}
function requireNumberIsPositive(num, entityName = "number") {
	if (num <= 0) throw new RangeError(expectedPositive(entityName, num));
	return num;
}
function constrainToRange$1(num, min, max) {
	return Math.min(Math.max(num, min), max);
}
function isObjectLike(arg) {
	return arg !== null && (typeof arg === "object" || typeof arg === "function");
}
function requireObjectLike(arg) {
	if (!isObjectLike(arg)) throw new TypeError(invalidObject);
	return arg;
}
//#endregion
//#region node_modules/temporal-polyfill/chunks/internal.js
var invalidEntity = invalidEntity$1;
var missingField = (fieldName) => `Missing ${fieldName}`;
var invalidChoice = (fieldName, val, choiceMap) => invalidEntity$1(fieldName, val) + "; must be " + Object.keys(choiceMap).join();
var forbiddenValueOf$1 = "Cannot use valueOf";
var invalidCallingContext = "Invalid calling context";
var exoticCalendarRequired = (calendarId, remedy) => `Unknown calendar ${calendarId}; might need ${remedy}`;
var invalidTimeZone = (calendarId) => invalidEntity$1("TimeZone", calendarId);
var invalidSubstring = (substring) => `Invalid substring: ${substring}`;
var constrainToRange = constrainToRange$1;
function throwRangeError(message) {
	throw new RangeError(message);
}
function throwTypeError(message) {
	throw new TypeError(message);
}
function clampProp(props, propName, min, max, overflow) {
	return clampEntity(propName, ((props, propName) => {
		const propVal = props[propName];
		return void 0 === propVal && throwTypeError(missingField(propName)), propVal;
	})(props, propName), min, max, overflow);
}
function clampEntity(entityName, num, min, max, overflow, choices) {
	const clamped = constrainToRange(num, min, max);
	return overflow && num !== clamped && throwRangeError(((entityName, val, min, max, choices) => choices ? numberOutOfRange(entityName, choices[val], choices[min], choices[max]) : numberOutOfRange(entityName, val, min, max))(entityName, num, min, max, choices)), clamped;
}
function memoize(generator, MapClass = Map) {
	const map = new MapClass();
	return (key, ...otherArgs) => {
		if (map.has(key)) return map.get(key);
		const val = generator(key, ...otherArgs);
		return map.set(key, val), val;
	};
}
var createNameDescriptors = (name) => createPropDescriptors({ name }, 1);
var createPropDescriptors = (propVals, readonly) => mapProps((value) => ({
	value,
	configurable: 1,
	writable: !readonly
}), propVals);
var createStringTagDescriptors = (value) => ({ [Symbol.toStringTag]: {
	value,
	configurable: 1
} });
function mapProps(transformer, props) {
	const res = {};
	for (const propName in props) res[propName] = transformer(props[propName], propName);
	return res;
}
function zipPropsConst(propNames, propVal) {
	const res = {};
	for (const propName of propNames) res[propName] = propVal;
	return res;
}
function createPropGetters(propNames) {
	const getters = {};
	for (const propName of propNames) getters[propName] = (slots) => slots[propName];
	return getters;
}
function pluckProps(propNames, props, dest = Object.create(null)) {
	for (const propName of propNames) dest[propName] = props[propName];
	return dest;
}
function bindArgs(f, ...boundArgs) {
	return (...dynamicArgs) => f(...boundArgs, ...dynamicArgs);
}
function noop() {}
function capitalize(s) {
	return s[0].toUpperCase() + s.substring(1);
}
function createRegExp(meat) {
	return new RegExp(`^${meat}$`, "i");
}
function parseSubsecNano(fracStr) {
	return parseInt(fracStr.padEnd(9, "0"));
}
function parseSign(s) {
	return s && "+" !== s ? -1 : 1;
}
function parseInt0(s) {
	return void 0 === s ? 0 : parseInt(s);
}
function padNumber(digits, num) {
	return String(num).padStart(digits, "0");
}
var padNumber2 = /*@__PURE__*/ bindArgs(padNumber, 2);
function compareNumbers(a, b) {
	return Math.sign(a - b);
}
function divFloorBigInt(num, denom) {
	const whole = num / denom;
	return num % denom < 0n ? whole - 1n : whole;
}
function divModFloorBigInt(num, divisor) {
	const quotient = divFloorBigInt(num, divisor);
	return [quotient, num - quotient * divisor];
}
function divModFloor(num, divisor) {
	return [Math.floor(num / divisor), modFloor(num, divisor)];
}
function modFloor(num, divisor) {
	return (num % divisor + divisor) % divisor;
}
function divTrunc(num, divisor) {
	return Math.trunc(num / divisor) || 0;
}
function hasHalf(num) {
	return .5 === Math.abs(num % 1);
}
function normalizeEraName(era) {
	const normalized = era.normalize("NFD").toLowerCase().replace(/[^a-z0-9]/g, "");
	return "bc" === normalized || "b" === normalized ? "bce" : "ad" === normalized || "a" === normalized ? "ce" : normalized;
}
function getCalendarSlotId(calendar) {
	return calendar === void 0 ? "iso8601" : 0 === calendar ? "gregory" : calendar.id;
}
function formatMonthCode(monthCodeNumber, isLeapMonth) {
	return "M" + padNumber2(monthCodeNumber) + (isLeapMonth ? "L" : "");
}
var unitNamesAsc = /*@__PURE__*/ Object.keys({
	nanosecond: 0,
	microsecond: 1,
	millisecond: 2,
	second: 3,
	minute: 4,
	hour: 5,
	day: 6,
	week: 7,
	month: 8,
	year: 9
});
var nanoInMicro = nanoInMicro$1;
var nanoInMilli = nanoInMilli$1;
var nanoInSec = nanoInSec$1;
var nanoInMinute = nanoInMinute$1;
var nanoInHour = nanoInHour$1;
var nanoInUtcDay = 864e11;
var bigNanoInMilli = /*@__PURE__*/ BigInt(nanoInMilli);
var bigNanoInSec = /*@__PURE__*/ BigInt(nanoInSec);
var bigNanoInUtcDay = /*@__PURE__*/ BigInt(nanoInUtcDay);
var timeFieldNamesAsc = /*@__PURE__*/ unitNamesAsc.slice(0, 6);
var timeGetters$1 = /*@__PURE__*/ createPropGetters(timeFieldNamesAsc);
var calendarDateFieldNamesAsc = [
	"day",
	"month",
	"year"
];
function validateTimeFields(timeFields) {
	return constrainTimeFields(timeFields, 1), timeFields;
}
var maxValues = {
	hour: 23,
	minute: 59,
	second: 59
};
function constrainTimeFields(timeFields, overflow) {
	const constrainedFields = {};
	for (const fieldName of timeFieldNamesAsc) constrainedFields[fieldName] = clampEntity(fieldName, timeFields[fieldName], 0, maxValues[fieldName] || 999, overflow);
	return constrainedFields;
}
function timeFieldsToNano(timeFields) {
	return timeFieldsToSec(timeFields) * nanoInSec + timeFieldsToSubsecNano(timeFields);
}
function timeFieldsToSec(timeFields) {
	return 3600 * timeFields.hour + 60 * timeFields.minute + timeFields.second;
}
function timeFieldsToSubsecNano(timeFields) {
	return timeFields.millisecond * nanoInMilli + timeFields.microsecond * nanoInMicro + timeFields.nanosecond;
}
function nanoToTimeFields(timeNano) {
	const [timeMilli, nanoAfterMilli] = divModFloor(timeNano, nanoInMilli);
	const [microsecond, nanosecond] = divModFloor(nanoAfterMilli, nanoInMicro);
	return milliToTimeFields(timeMilli, microsecond, nanosecond);
}
function milliToTimeFields(timeMilli, microsecond = 0, nanosecond = 0) {
	const [hour, milliAfterHour] = divModFloor(timeMilli, 36e5);
	const [minute, milliAfterMinute] = divModFloor(milliAfterHour, 6e4);
	const [second, millisecond] = divModFloor(milliAfterMinute, 1e3);
	return {
		hour,
		minute,
		second,
		millisecond,
		microsecond,
		nanosecond
	};
}
function epochNanoToSecMod(epochNano) {
	const [epochSec, nano] = divModFloorBigInt(epochNano, bigNanoInSec);
	return [Number(epochSec), Number(nano)];
}
function isoDateTimeToEpochNano(isoDateTime) {
	return isoDateToEpochNano(isoDateTime) + BigInt(timeFieldsToNano(isoDateTime));
}
function isoDateToEpochNano(isoDate) {
	return BigInt(isoDateToEpochDays(isoDate)) * bigNanoInUtcDay;
}
function isoDateToEpochDays(isoDate) {
	return isoArgsToEpochDays(isoDate.year, isoDate.month, isoDate.day);
}
function isoArgsToEpochDays(isoYear, isoMonth = 1, isoDay = 1) {
	const monthIndex = isoMonth - 1;
	return isoYear += Math.floor(monthIndex / 12), isoMonth = modFloor(monthIndex, 12), Date.UTC(isoYear % 400 - 400, isoMonth, 0) / 864e5 + 146097 * (divTrunc(isoYear, 400) + 1) + isoDay;
}
function epochNanoToIsoDateTime(epochNano) {
	const [epochDays, nanoAfterDay] = divModFloorBigInt(epochNano, bigNanoInUtcDay);
	return {
		...epochDaysToIsoDate(Number(epochDays)),
		...nanoToTimeFields(Number(nanoAfterDay))
	};
}
function epochDaysToIsoDate(epochDays) {
	const legacyDate = /* @__PURE__ */ new Date(864e5 * modFloor(epochDays, 146097));
	return {
		year: legacyDate.getUTCFullYear() + 400 * Math.floor(epochDays / 146097),
		month: legacyDate.getUTCMonth() + 1,
		day: legacyDate.getUTCDate()
	};
}
function computeIsoMonthCodeParts(month) {
	return [month, 0];
}
function computeIsoFieldsFromParts(year, month, day) {
	return {
		year,
		month,
		day
	};
}
function computeIsoDaysInMonth(year, month) {
	switch (month) {
		case 2: return computeIsoInLeapYear(year) ? 29 : 28;
		case 4:
		case 6:
		case 9:
		case 11: return 30;
	}
	return 31;
}
function computeIsoDaysInYear(year) {
	return computeIsoInLeapYear(year) ? 366 : 365;
}
function computeIsoInLeapYear(year) {
	return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
}
function computeIsoDayOfWeek(isoDateFields) {
	return modFloor(isoArgsToEpochDays(isoDateFields.year, isoDateFields.month, isoDateFields.day) + 4, 7) || 7;
}
function computeIsoDayOfYear(isoDateFields) {
	return isoArgsToEpochDays(isoDateFields.year, isoDateFields.month, isoDateFields.day) - isoArgsToEpochDays(isoDateFields.year) + 1;
}
function computeIsoWeekFields(isoDateFields) {
	let yearOfWeek = isoDateFields.year;
	let weekOfYear = Math.floor((computeIsoDayOfYear(isoDateFields) - computeIsoDayOfWeek(isoDateFields) + 10) / 7);
	let weeksInYear = computeIsoWeeksInYear(yearOfWeek);
	return weekOfYear < 1 ? weekOfYear = weeksInYear = computeIsoWeeksInYear(--yearOfWeek) : weekOfYear > weeksInYear && (weekOfYear = 1, weeksInYear = computeIsoWeeksInYear(++yearOfWeek)), {
		weekOfYear,
		yearOfWeek,
		Be: weeksInYear
	};
}
function computeIsoWeeksInYear(year) {
	const y0DayOfWeek = computeIsoDayOfWeek({
		year,
		month: 1,
		day: 1
	});
	return 4 === y0DayOfWeek || 3 === y0DayOfWeek && computeIsoInLeapYear(year) ? 53 : 52;
}
function computeGregoryEraFields({ year }) {
	return year < 1 ? {
		era: "bce",
		eraYear: 1 - year
	} : {
		era: "ce",
		eraYear: year
	};
}
function validateIsoDateTimeFields(isoDateTime) {
	return validateIsoDateFields(isoDateTime), validateTimeFields(isoDateTime);
}
function validateIsoDateFields(isoInternals) {
	return constrainIsoDateFields(isoInternals, 1), isoInternals;
}
function constrainIsoDateFields(isoDate, overflow) {
	const { year } = isoDate;
	const month = clampProp(isoDate, "month", 1, 12, overflow);
	return {
		year,
		month,
		day: clampProp(isoDate, "day", 1, computeIsoDaysInMonth(year, month), overflow)
	};
}
function computeCalendarDateFields(calendar, isoDate) {
	return calendar ? calendar.ae(isoDate) : isoDate;
}
function computeCalendarMonthCodeParts(calendar, year, month) {
	return calendar ? calendar.L(year, month) : computeIsoMonthCodeParts(month);
}
function computeCalendarEraFields(calendar, isoDate) {
	return 0 === calendar ? computeGregoryEraFields(isoDate) : calendar && calendar.h?.(isoDate) || {};
}
function computeCalendarIsoFieldsFromParts(calendar, year, month, day) {
	return calendar ? calendar.de(year, month, day) : computeIsoFieldsFromParts(year, month, day);
}
function computeCalendarMonthsInYearForYear(calendar, year) {
	return calendar ? calendar.j(year) : 12;
}
function computeCalendarDaysInMonthForYearMonth(calendar, year, month) {
	return calendar ? calendar.o(year, month) : computeIsoDaysInMonth(year, month);
}
function computeCalendarMonthCode(calendar, isoDate) {
	const { year, month } = computeCalendarDateFields(calendar, isoDate);
	const [monthCodeNumber, isLeapMonth] = computeCalendarMonthCodeParts(calendar, year, month);
	return formatMonthCode(monthCodeNumber, isLeapMonth);
}
function computeCalendarInLeapYear(calendar, isoDate) {
	const { year } = computeCalendarDateFields(calendar, isoDate);
	return calendar ? calendar.q(year) : computeIsoInLeapYear(year);
}
function computeCalendarMonthsInYear(calendar, isoDate) {
	const { year } = computeCalendarDateFields(calendar, isoDate);
	return computeCalendarMonthsInYearForYear(calendar, year);
}
function computeCalendarDaysInMonth(calendar, isoDate) {
	const { year, month } = computeCalendarDateFields(calendar, isoDate);
	return computeCalendarDaysInMonthForYearMonth(calendar, year, month);
}
function computeCalendarDaysInYear(calendar, isoDate) {
	const { year } = computeCalendarDateFields(calendar, isoDate);
	return calendar ? calendar.i(year) : computeIsoDaysInYear(year);
}
function computeCalendarDayOfYear(calendar, isoDate) {
	if (!calendar) return computeIsoDayOfYear(isoDate);
	const { year } = computeCalendarDateFields(calendar, isoDate);
	const yearStartIsoDate = computeCalendarIsoFieldsFromParts(calendar, year, 1, 1);
	return isoDateToEpochDays(isoDate) - isoDateToEpochDays(yearStartIsoDate) + 1;
}
function computeCalendarWeekOfYear(calendar, isoDate) {
	return calendar === void 0 ? computeIsoWeekFields(isoDate).weekOfYear : void 0;
}
function computeCalendarYearOfWeek(calendar, isoDate) {
	return calendar === void 0 ? computeIsoWeekFields(isoDate).yearOfWeek : void 0;
}
var requireString = /*@__PURE__*/ bindArgs(requireType, "string");
function requireType(typeName, arg, entityName = typeName) {
	return typeof arg !== typeName && throwTypeError(invalidEntity(entityName, arg)), arg;
}
function requireNumberIsInteger(num, entityName = "number") {
	return Number.isInteger(num) || throwRangeError(((entityName, num) => `Non-integer ${entityName}: ${num}`)(entityName, num)), num || 0;
}
function toString(arg) {
	return "symbol" == typeof arg && throwTypeError("Cannot convert Symbol to string"), String(arg);
}
function toStringViaPrimitive(arg, entityName) {
	return isObjectLike(arg) ? String(arg) : requireString(arg, entityName);
}
function toStrictInteger(arg, entityName) {
	return requireNumberIsInteger(toFiniteNumber(arg, entityName), entityName);
}
var epochDisambigMap = {
	compatible: 0,
	reject: 1,
	earlier: 2,
	later: 3
};
var roundingModeFuncs = [
	Math.floor,
	(num) => hasHalf(num) ? Math.floor(num) : Math.round(num),
	Math.ceil,
	(num) => hasHalf(num) ? Math.ceil(num) : Math.round(num),
	Math.trunc,
	(num) => hasHalf(num) ? Math.trunc(num) || 0 : Math.round(num),
	(num) => num < 0 ? Math.floor(num) : Math.ceil(num),
	(num) => Math.sign(num) * Math.round(Math.abs(num)) || 0,
	(num) => hasHalf(num) ? (num = Math.trunc(num) || 0) + num % 2 : Math.round(num)
];
function coerceChoiceOption(optionName, enumNameMap, options, defaultChoice = 0) {
	const enumArg = options[optionName];
	if (void 0 === enumArg) return defaultChoice;
	const enumStr = toString(enumArg);
	const enumNum = enumNameMap[enumStr];
	return void 0 === enumNum && throwRangeError(invalidChoice(optionName, enumStr, enumNameMap)), enumNum;
}
var coerceEpochDisambig = /*@__PURE__*/ bindArgs(coerceChoiceOption, "disambiguation", epochDisambigMap);
var epochNanoMax = /*@__PURE__*/ BigInt(1e8) * bigNanoInUtcDay;
var epochNanoMin = /*@__PURE__*/ BigInt(-1e8) * bigNanoInUtcDay;
var plainDateEpochNanoMin = epochNanoMin - bigNanoInUtcDay;
function checkIsoDateTimeInBounds(isoDateTime) {
	const epochNano = isoDateToEpochNano(isoDateTime);
	return checkIsoDateEpochNanoInBounds(epochNano), epochNano !== plainDateEpochNanoMin || timeFieldsToNano(isoDateTime) || throwRangeError("Out-of-bounds date"), isoDateTime;
}
function checkIsoDateEpochNanoInBounds(epochNano, allowPlainDateLowerEdge = 1) {
	(epochNano < (allowPlainDateLowerEdge ? plainDateEpochNanoMin : epochNanoMin) || epochNano > epochNanoMax) && throwRangeError("Out-of-bounds date");
}
function checkEpochNanoInBounds(epochNano) {
	return (epochNano < epochNanoMin || epochNano > epochNanoMax) && throwRangeError("Out-of-bounds date"), epochNano;
}
function isoDateTimeAndOffsetToEpochNano(isoDateTime, offsetNano) {
	return checkEpochNanoInBounds(isoDateToEpochNano(isoDateTime) + BigInt(timeFieldsToNano(isoDateTime) - offsetNano));
}
function createEpochNanoSlots(epochNano) {
	return { epochNanoseconds: epochNano };
}
function createZonedEpochNanoSlots(epochNano, timeZone, calendar) {
	return {
		calendar,
		timeZone,
		epochNanoseconds: epochNano
	};
}
function createDateTimeSlots(isoDateTime, calendar) {
	return pluckProps(timeFieldNamesAsc, isoDateTime, createDateSlots(isoDateTime, calendar));
}
function createDateSlots(isoDate, calendar) {
	return pluckProps(calendarDateFieldNamesAsc, isoDate, { calendar });
}
function getEpochMilli(slots) {
	return epochNano = slots.epochNanoseconds, Number(divFloorBigInt(epochNano, bigNanoInMilli));
	var epochNano;
}
function getEpochNano(slots) {
	return slots.epochNanoseconds;
}
function roundToMinute(offsetNano) {
	return roundNumberToInc(offsetNano, nanoInMinute, 7);
}
function roundNumberToInc(num, roundingInc, roundingMode) {
	return roundWithMode(num / roundingInc, roundingMode) * roundingInc;
}
function roundWithMode(num, roundingMode) {
	return roundingModeFuncs[roundingMode](num);
}
var zonedEpochSlotsToIso = /*@__PURE__*/ memoize(_zonedEpochSlotsToIso, WeakMap);
function _zonedEpochSlotsToIso(slots) {
	const { epochNanoseconds, timeZone } = slots;
	const offsetNanoseconds = timeZone.B(epochNanoseconds);
	return {
		...epochNanoToIsoDateTime(epochNanoseconds + BigInt(offsetNanoseconds)),
		offsetNanoseconds
	};
}
function getSingleInstantFor(timeZone, isoDateTime, disambig = 0, possibleEpochNanos = timeZone.N(isoDateTime)) {
	if (1 === possibleEpochNanos.length) return possibleEpochNanos[0];
	if (1 === disambig && throwRangeError("Ambiguous offset"), possibleEpochNanos.length) return possibleEpochNanos[3 === disambig ? 1 : 0];
	const zonedEpochNano = isoDateTimeToEpochNano(isoDateTime);
	const gapNano = ((timeZone, zonedEpochNano) => {
		const startOffsetNano = timeZone.B(zonedEpochNano - bigNanoInUtcDay);
		return ((gapNano) => (gapNano > 864e11 && throwRangeError("Out-of-bounds TimeZone gap"), gapNano))(timeZone.B(zonedEpochNano + bigNanoInUtcDay) - startOffsetNano);
	})(timeZone, zonedEpochNano);
	const shiftedIsoDateTime = epochNanoToIsoDateTime(zonedEpochNano + BigInt(gapNano * (2 === disambig ? -1 : 1)));
	return (possibleEpochNanos = timeZone.N(shiftedIsoDateTime))[2 === disambig ? 0 : possibleEpochNanos.length - 1];
}
var offsetRegExp = /*@__PURE__*/ createRegExp("([+-])(\\d{2})(?::?(\\d{2})(?::?(\\d{2})(?:[.,](\\d{1,9}))?)?)?");
function parseOffsetNanoMaybe(s, onlyHourMinute) {
	const parts = offsetRegExp.exec(s);
	if (parts && ((s) => ((s) => {
		"T" !== s[0] && "t" !== s[0] || (s = s.slice(1));
		const fractionIndex = s.search(/[.,]/);
		const main = fractionIndex < 0 ? s : s.slice(0, fractionIndex);
		const parts = main.split(":");
		return 1 === parts.length ? /^(?:\d{2}|\d{4}|\d{6})$/i.test(main) : (2 === parts.length || 3 === parts.length) && parts.every((part) => 2 === part.length && /^\d{2}$/i.test(part));
	})(s.slice(1)))(parts[0])) return ((parts, onlyHourMinute) => {
		const firstSubMinutePart = parts[4] || parts[5];
		onlyHourMinute && firstSubMinutePart && throwRangeError(invalidSubstring(firstSubMinutePart));
		return offsetNano = (parseInt0(parts[2]) * nanoInHour + parseInt0(parts[3]) * nanoInMinute + parseInt0(parts[4]) * nanoInSec + parseSubsecNano(parts[5] || "")) * parseSign(parts[1]), Math.abs(offsetNano) >= 864e11 && throwRangeError("Out-of-bounds offset"), offsetNano;
		var offsetNano;
	})(parts, onlyHourMinute);
}
({ .../* @__PURE__ */ Object.assign({}, {
	era: toStringViaPrimitive,
	month: toPositiveIntegerWithTruncation,
	monthCode(monthCode, entityName) {
		if ("string" == typeof monthCode) return monthCode;
		if (monthCode && "object" == typeof monthCode) {
			const monthCodeToString = monthCode.toString;
			if ("function" == typeof monthCodeToString) return requireString(monthCodeToString.call(monthCode), entityName);
		}
		return requireString(monthCode, entityName);
	},
	day: toPositiveIntegerWithTruncation
}, /* @__PURE__ */ zipPropsConst(timeFieldNamesAsc, toIntegerWithTrunc)) });
var RawDateTimeFormat = Intl.DateTimeFormat;
function formatEpochMilliToPartsRecord(intlFormat, epochMilli) {
	epochMilli < -864e13 && throwRangeError("Out-of-bounds date");
	const parts = intlFormat.formatToParts(epochMilli);
	const hash = {};
	for (const part of parts) hash[part.type] = part.value;
	return hash;
}
var timeZonePeriodDaysByName = {
	"El_Aaiun": 17,
	"Tucuman": 12,
	"Tirane": 11,
	"Riga": 10,
	"Simferopol": 9,
	"Vienna": 9,
	"Tunis": 8,
	"Boa_Vista": 6,
	"Fortaleza": 6,
	"Maceio": 6,
	"Noronha": 6,
	"Recife": 6,
	"Gaza": 6,
	"Hebron": 6,
	"DeNoronha": 6
};
var minPossibleTransitionSec = -388152e4;
function formatInstantIsoAuto(instantSlots) {
	return formatIsoDateTimeFields(epochNanoToIsoDateTime(instantSlots.epochNanoseconds), void 0) + "Z";
}
function formatZonedDateTimeIsoAuto(zonedDateTimeSlots) {
	const calendar = zonedDateTimeSlots.calendar;
	const timeZone = zonedDateTimeSlots.timeZone;
	const offsetNano = timeZone.B(zonedDateTimeSlots.epochNanoseconds);
	return formatIsoDateTimeFields(epochNanoToIsoDateTime(zonedDateTimeSlots.epochNanoseconds + BigInt(offsetNano)), void 0) + formatOffsetNano(roundToMinute(offsetNano)) + formatTimeZone(timeZone.id, 0) + (calendar === void 0 ? "" : formatCalendarId(getCalendarSlotId(calendar), 0));
}
function formatDateTimeIsoAuto(isoDateTimeSlots) {
	const calendar = isoDateTimeSlots.calendar;
	return formatIsoDateTimeFields(isoDateTimeSlots, void 0) + (calendar === void 0 ? "" : formatCalendarId(getCalendarSlotId(calendar), 0));
}
function formatIsoDateTimeFields(isoDateTime, subsecDigits) {
	return formatIsoDateFields(isoDateTime) + "T" + formatTimeFields(isoDateTime, subsecDigits);
}
function formatIsoDateFields(isoDateFields) {
	return formatIsoYearMonthFields(isoDateFields) + "-" + padNumber2(isoDateFields.day);
}
function formatIsoYearMonthFields(isoDateFields) {
	const { year } = isoDateFields;
	return (year < 0 || year > 9999 ? getSignStr(year) + padNumber(6, Math.abs(year)) : padNumber(4, year)) + "-" + padNumber2(isoDateFields.month);
}
function formatTimeFields(timeFields, subsecDigits) {
	const parts = [padNumber2(timeFields.hour), padNumber2(timeFields.minute)];
	return -1 !== subsecDigits && parts.push(padNumber2(timeFields.second) + ((millisecond, microsecond, nanosecond, subsecDigits) => formatSubsecNano(millisecond * nanoInMilli + microsecond * nanoInMicro + nanosecond, subsecDigits))(timeFields.millisecond, timeFields.microsecond, timeFields.nanosecond, subsecDigits)), parts.join(":");
}
function formatOffsetNano(offsetNano, offsetDisplay = 0) {
	if (1 === offsetDisplay) return "";
	const [hour, nanoRemainder0] = divModFloor(Math.abs(offsetNano), nanoInHour);
	const [minute, nanoRemainder1] = divModFloor(nanoRemainder0, nanoInMinute);
	const [second, nanoRemainder2] = divModFloor(nanoRemainder1, nanoInSec);
	return getSignStr(offsetNano) + padNumber2(hour) + ":" + padNumber2(minute) + (second || nanoRemainder2 ? ":" + padNumber2(second) + formatSubsecNano(nanoRemainder2) : "");
}
function formatTimeZone(timeZoneId, timeZoneDisplay) {
	return 1 !== timeZoneDisplay ? "[" + (2 === timeZoneDisplay ? "!" : "") + timeZoneId + "]" : "";
}
function formatCalendarId(calendarId, isCritical) {
	return "[" + (isCritical ? "!" : "") + "u-ca=" + calendarId + "]";
}
var trailingZerosRE = /0+$/;
function formatSubsecNano(totalNano, subsecDigits) {
	let s = padNumber(9, totalNano);
	return s = void 0 === subsecDigits ? s.replace(trailingZerosRE, "") : s.slice(0, subsecDigits), s ? "." + s : "";
}
function getSignStr(num) {
	return num < 0 ? "-" : "+";
}
var icuRegExp = /^(AC|AE|AG|AR|AS|BE|BS|CA|CN|CS|CT|EA|EC|IE|IS|JS|MI|NE|NS|PL|PN|PR|PS|SS|VS)T$/;
var badCharactersRegExp = /[^\w\/:+-]+/;
function refineTimeZoneId(rawId) {
	return resolveTimeZoneId(requireString(rawId));
}
function resolveTimeZoneId(rawId) {
	return resolveTimeZoneRecord(rawId).id;
}
function resolveTimeZoneRecord(rawId) {
	const upperRawId = rawId.toUpperCase();
	const offsetRecord = ((upperRawId) => {
		const offsetNano = parseOffsetNanoMaybe(upperRawId, 1);
		if (void 0 !== offsetNano) return {
			id: formatOffsetNano(offsetNano),
			X: offsetNano,
			m: offsetNano
		};
	})(upperRawId);
	if (offsetRecord) return {
		kind: "fixed",
		...offsetRecord
	};
	return queryNamedTimeZoneRecord("UTC" === upperRawId ? "UTC" : ((rawId) => (badCharactersRegExp.test(rawId) && throwRangeError(invalidTimeZone(rawId)), icuRegExp.test(rawId) && throwRangeError("Forbidden ICU TimeZone"), rawId.toLowerCase().split("/").map((part, partI) => (part.length <= 3 || /\d/.test(part)) && !/etc|yap/.test(part) ? part.toUpperCase() : part.replace(/baja|dumont|[a-z]+/g, (a, i) => a.length <= 2 && !partI || "in" === a || "chat" === a ? a.toUpperCase() : a.length > 2 || !i ? capitalize(a).replace(/island|noronha|murdo|rivadavia|urville/, capitalize) : a)).join("/")))(rawId));
}
var queryNamedTimeZoneRecord = /*@__PURE__*/ memoize((normId) => {
	if ("UTC" === normId) return {
		kind: "utc",
		id: normId,
		m: normId
	};
	const format = queryTimeZoneIntlFormat(normId.toUpperCase());
	return {
		kind: "named",
		id: normId,
		format,
		m: format.resolvedOptions().timeZone
	};
});
var queryTimeZoneIntlFormat = /*@__PURE__*/ memoize((upperNormId) => new RawDateTimeFormat("en-u-hc-h23", {
	calendar: "iso8601",
	timeZone: upperNormId,
	era: "short",
	year: "numeric",
	month: "numeric",
	day: "numeric",
	hour: "numeric",
	minute: "numeric",
	second: "numeric"
}));
function queryTimeZone(rawTimeZoneId) {
	const record = resolveTimeZoneRecord(rawTimeZoneId);
	return queryTimeZoneRecord(record.id, record);
}
var queryTimeZoneRecord = /*@__PURE__*/ memoize((normTimeZoneId, record) => "named" === record.kind ? new IntlTimeZone(normTimeZoneId, record.m, record.format) : new FixedTimeZone(normTimeZoneId, record.m, "fixed" === record.kind ? record.X : 0));
var FixedTimeZone = class {
	constructor(id, compareKey, offsetNano) {
		this.id = id, this.m = compareKey, this.X = offsetNano;
	}
	B() {
		return this.X;
	}
	N(isoDateTime) {
		return [isoDateTimeAndOffsetToEpochNano(isoDateTime, this.X)];
	}
	O() {}
};
var IntlTimeZone = class {
	constructor(id, compareKey, format) {
		this.id = id, this.m = compareKey, this.ke = ((computeOffsetSec, periodDays) => {
			const getSample = memoize(computeOffsetSec);
			const getSplit = memoize(createSplitTuple);
			const periodSec = 86400 * periodDays;
			function getOffsetSec(epochSec) {
				const [startEpochSec, endEpochSec] = computePeriod(epochSec, periodSec);
				const clampedStartEpochSec = clampIntlSampleEpochSec(startEpochSec);
				const clampedEndEpochSec = clampIntlSampleEpochSec(endEpochSec);
				const startOffsetSec = getSample(clampedStartEpochSec);
				const endOffsetSec = getSample(clampedEndEpochSec);
				return startOffsetSec === endOffsetSec ? startOffsetSec : pinch(getSplit(clampedStartEpochSec, clampedEndEpochSec), startOffsetSec, endOffsetSec, epochSec);
			}
			function pinch(split, startOffsetSec, endOffsetSec, forEpochSec) {
				let offsetSec;
				let splitDurSec;
				for (; (void 0 === forEpochSec || void 0 === (offsetSec = forEpochSec < split[0] ? startOffsetSec : forEpochSec >= split[1] ? endOffsetSec : void 0)) && (splitDurSec = split[1] - split[0]);) {
					const middleEpochSec = split[0] + Math.floor(splitDurSec / 2);
					computeOffsetSec(middleEpochSec) === endOffsetSec ? split[1] = middleEpochSec : split[0] = middleEpochSec + 1;
				}
				return offsetSec;
			}
			return {
				xe(zonedEpochSec) {
					const wideOffsetSec0 = getOffsetSec(zonedEpochSec - 86400);
					const wideOffsetSec1 = getOffsetSec(zonedEpochSec + 86400);
					const wideUtcEpochSec0 = zonedEpochSec - wideOffsetSec0;
					const wideUtcEpochSec1 = zonedEpochSec - wideOffsetSec1;
					if (wideOffsetSec0 === wideOffsetSec1) return [wideUtcEpochSec0];
					const narrowOffsetSec0 = getOffsetSec(wideUtcEpochSec0);
					return narrowOffsetSec0 === getOffsetSec(wideUtcEpochSec1) ? [zonedEpochSec - narrowOffsetSec0] : wideOffsetSec0 > wideOffsetSec1 ? [wideUtcEpochSec0, wideUtcEpochSec1] : [];
				},
				we: getOffsetSec,
				O: function getTransition(epochSec, direction) {
					if (direction > 0 && epochSec >= 864e10) return;
					if (direction < 0) {
						if (epochSec <= minPossibleTransitionSec) return;
						const lookaheadEpochSec = getCurrentEpochSec() + 94867200;
						if (epochSec > lookaheadEpochSec) return getTransition(lookaheadEpochSec, -1);
					}
					let [startEpochSec, endEpochSec] = computePeriod(direction > 0 ? Math.max(epochSec, minPossibleTransitionSec) : epochSec, periodSec);
					const inc = periodSec * direction;
					const searchLimit = direction > 0 ? Math.max(epochSec, getCurrentEpochSec()) + 94867200 : minPossibleTransitionSec;
					const inBounds = () => direction < 0 ? endEpochSec > searchLimit : startEpochSec < searchLimit;
					for (; inBounds();) {
						const clampedStartEpochSec = clampIntlSampleEpochSec(startEpochSec);
						const clampedEndEpochSec = clampIntlSampleEpochSec(endEpochSec);
						const startOffsetSec = getSample(clampedStartEpochSec);
						const endOffsetSec = getSample(clampedEndEpochSec);
						if (startOffsetSec !== endOffsetSec) {
							const split = getSplit(clampedStartEpochSec, clampedEndEpochSec);
							pinch(split, startOffsetSec, endOffsetSec);
							const transitionEpochSec = split[0];
							if ((compareNumbers(transitionEpochSec, epochSec) || 1) === direction) return transitionEpochSec;
						}
						startEpochSec += inc, endEpochSec += inc;
					}
				}
			};
		})(((format) => (epochSec) => {
			const intlParts = formatEpochMilliToPartsRecord(format, 1e3 * epochSec);
			return 86400 * isoArgsToEpochDays(((intlParts) => {
				const relatedYear = intlParts.relatedYear;
				if (void 0 !== relatedYear) return parseInt(relatedYear);
				const year = parseInt(intlParts.year);
				return void 0 !== intlParts.era && "bce" === normalizeEraName(intlParts.era) ? 1 - year : year;
			})(intlParts), parseInt(intlParts.month), parseInt(intlParts.day)) + 3600 * parseInt(intlParts.hour) + 60 * parseInt(intlParts.minute) + parseInt(intlParts.second) - epochSec;
		})(format), ((timeZoneId) => {
			return timeZonePeriodDaysByName[timeZoneId.split("/").pop()] || 60;
		})(id));
	}
	B(epochNano) {
		return this.ke.we(((epochNano) => epochNanoToSecMod(epochNano)[0])(epochNano)) * nanoInSec;
	}
	N(isoDateTime) {
		const zonedEpochSec = 86400 * isoDateToEpochDays(isoDateTime) + timeFieldsToSec(isoDateTime);
		const subsecNano = timeFieldsToSubsecNano(isoDateTime);
		return this.ke.xe(zonedEpochSec).map((epochSec) => checkEpochNanoInBounds(BigInt(epochSec) * bigNanoInSec + BigInt(subsecNano)));
	}
	O(epochNano, direction) {
		const [epochSec, subsecNano] = epochNanoToSecMod(epochNano);
		const resEpochSec = this.ke.O(epochSec + (direction > 0 || subsecNano ? 1 : 0), direction);
		if (void 0 !== resEpochSec) return BigInt(resEpochSec) * bigNanoInSec;
	}
};
function getCurrentEpochSec() {
	return Math.floor(Date.now() / 1e3);
}
function createSplitTuple(startEpochSec, endEpochSec) {
	return [startEpochSec, endEpochSec];
}
function computePeriod(epochSec, periodSec) {
	const startEpochSec = Math.floor(epochSec / periodSec) * periodSec;
	return [startEpochSec, startEpochSec + periodSec];
}
function clampIntlSampleEpochSec(epochSec) {
	return constrainToRange(epochSec, -1e10, 864e10);
}
function timeRegExpStr(separatorIndex) {
	return `(\\d{2})(?:(:?)(\\d{2})(?:\\${separatorIndex}(\\d{2})(?:[.,](\\d{1,9}))?)?)?`;
}
"" + timeRegExpStr(8) + timeRegExpStr(15);
"" + timeRegExpStr(2) + `(([+-])${timeRegExpStr(9)})?((?:\\[(!?)([^\\]]*)\\]){0,9})`;
function instantToZonedDateTime(instantSlots, timeZone, calendar) {
	return createZonedEpochNanoSlots(instantSlots.epochNanoseconds, timeZone, calendar);
}
function plainDateTimeToZonedDateTime(plainDateTimeSlots, timeZone, options) {
	return createZonedEpochNanoSlots(checkEpochNanoInBounds(getSingleInstantFor(timeZone, plainDateTimeSlots, ((options) => coerceEpochDisambig(normalizeOptions(options)))(options))), timeZone, plainDateTimeSlots.calendar);
}
function epochMilliToInstant(epochMilli) {
	return createEpochNanoSlots(checkEpochNanoInBounds(BigInt(toStrictInteger(epochMilli)) * bigNanoInMilli));
}
({ .../* @__PURE__ */ Object.assign({}, {
	year: "numeric",
	month: "numeric",
	day: "numeric"
}, {
	hour: "numeric",
	minute: "numeric",
	second: "numeric"
}) });
//#endregion
//#region node_modules/temporal-polyfill/chunks/apiHelpers.js
var PlainYearMonthBranding = "PlainYearMonth";
var PlainMonthDayBranding = "PlainMonthDay";
var PlainDateBranding = "PlainDate";
var PlainDateTimeBranding = "PlainDateTime";
var PlainTimeBranding = "PlainTime";
var ZonedDateTimeBranding = "ZonedDateTime";
var InstantBranding = "Instant";
var DurationBranding = "Duration";
var CalendarBranding = "Calendar";
function defineTemporalClass(branding, cls, getSlots, ...getterMaps) {
	return Object.defineProperties(cls, createNameDescriptors(branding)), Object.defineProperties(cls.prototype, createStringTagDescriptors("Temporal." + branding)), Object.defineProperties(cls.prototype, mapProps((getter) => ({
		get() {
			return getter(getSlots(this));
		},
		configurable: 1
	}), Object.assign({}, ...getterMaps))), cls;
}
var attachDebugString = "noop" === noop.name ? (instance) => {
	Object.defineProperty(instance, "_str_", { value: instance.toJSON() });
} : noop;
function invalidRecordType() {
	throwTypeError(invalidCallingContext);
}
function forbiddenValueOf() {
	throwTypeError(forbiddenValueOf$1);
}
var dateFieldGetters$1 = {
	era(slots) {
		return computeCalendarEraFields(slots.calendar, slots).era;
	},
	eraYear(slots) {
		return computeCalendarEraFields(slots.calendar, slots).eraYear;
	},
	year(slots) {
		return computeCalendarDateFields(slots.calendar, slots).year;
	},
	month(slots) {
		return computeCalendarDateFields(slots.calendar, slots).month;
	},
	monthCode(slots) {
		return computeCalendarMonthCode(slots.calendar, slots);
	},
	day(slots) {
		return computeCalendarDateFields(slots.calendar, slots).day;
	}
};
var yearMonthDerivedGetters = {
	daysInMonth(slots) {
		return computeCalendarDaysInMonth(slots.calendar, slots);
	},
	daysInYear(slots) {
		return computeCalendarDaysInYear(slots.calendar, slots);
	},
	monthsInYear(slots) {
		return computeCalendarMonthsInYear(slots.calendar, slots);
	},
	inLeapYear(slots) {
		return computeCalendarInLeapYear(slots.calendar, slots);
	}
};
var dateDerivedGetters = {
	dayOfWeek(slots) {
		return computeIsoDayOfWeek(slots);
	},
	dayOfYear(slots) {
		return computeCalendarDayOfYear(slots.calendar, slots);
	},
	weekOfYear(slots) {
		return computeCalendarWeekOfYear(slots.calendar, slots);
	},
	yearOfWeek(slots) {
		return computeCalendarYearOfWeek(slots.calendar, slots);
	},
	daysInWeek() {
		return 7;
	},
	daysInMonth(slots) {
		return computeCalendarDaysInMonth(slots.calendar, slots);
	},
	daysInYear(slots) {
		return computeCalendarDaysInYear(slots.calendar, slots);
	},
	monthsInYear(slots) {
		return computeCalendarMonthsInYear(slots.calendar, slots);
	},
	inLeapYear(slots) {
		return computeCalendarInLeapYear(slots.calendar, slots);
	}
};
function createNativeGetters(shimGetters) {
	return createPropGetters(Object.keys(shimGetters));
}
var timeGetters = /*@__PURE__*/ createNativeGetters(timeGetters$1);
var dateFieldGetters = /*@__PURE__*/ createNativeGetters(dateFieldGetters$1);
createNativeGetters(yearMonthDerivedGetters), createNativeGetters(dateDerivedGetters);
`${PlainYearMonthBranding}`;
`${PlainMonthDayBranding}`;
`${PlainDateBranding}`;
var PlainDateTimeRecordBranding = `${PlainDateTimeBranding}Record`;
`${PlainTimeBranding}`;
var ZonedDateTimeRecordBranding = `${ZonedDateTimeBranding}Record`;
var InstantRecordBranding = `${InstantBranding}Record`;
`${DurationBranding}`;
`${CalendarBranding}`;
var calendarMap = /*@__PURE__*/ new WeakMap();
var instantMap = /*@__PURE__*/ new WeakMap();
var zonedDateTimeMap = /*@__PURE__*/ new WeakMap();
var plainDateTimeMap = /*@__PURE__*/ new WeakMap();
function getCalendarSlots(record) {
	return getCalendarSlotsIfPresent(record) || invalidRecordType();
}
function getCalendarSlotsIfPresent(record) {
	return calendarMap.get(record);
}
function getInstantSlots(record) {
	return getInstantSlotsIfPresent(record) || invalidRecordType();
}
function getInstantSlotsIfPresent(record) {
	return instantMap.get(record);
}
function setInstantSlots(instance, slots) {
	instantMap.set(instance, slots);
}
function getZonedDateTimeSlots(record) {
	return getZonedDateTimeSlotsIfPresent(record) || invalidRecordType();
}
function getZonedDateTimeSlotsIfPresent(record) {
	return zonedDateTimeMap.get(record);
}
function setZonedDateTimeSlots(instance, slots) {
	zonedDateTimeMap.set(instance, slots);
}
function getPlainDateTimeSlots(record) {
	return getPlainDateTimeSlotsIfPresent(record) || invalidRecordType();
}
function getPlainDateTimeSlotsIfPresent(record) {
	return plainDateTimeMap.get(record);
}
function setPlainDateTimeSlots(instance, slots) {
	plainDateTimeMap.set(instance, slots);
}
function getCalendarRecordId(record) {
	return getCalendarSlots(record).id;
}
function getCalendarRecordImplCreator(record) {
	const getImpl = getCalendarSlots(record).ue;
	return getImpl || throwRangeError(exoticCalendarRequired(getCalendarRecordId(record), "getExotic or getAny")), getImpl;
}
//#endregion
//#region node_modules/temporal-polyfill/chunks/funcApi-native.js
function refineNativeCalendarArgMaybe(calendarRecord) {
	if (void 0 !== calendarRecord) return getValidatedCalendarId(calendarRecord);
}
function getValidatedCalendarId(record) {
	return getCalendarRecordImplCreator(record), getCalendarRecordId(record);
}
var getNativePlainDateTime = getPlainDateTimeSlots;
var NativePlainDateTimeRecord = /*@__PURE__*/ defineTemporalClass(PlainDateTimeRecordBranding, class {
	get calendarId() {
		return getNativePlainDateTime(this).calendarId;
	}
	toJSON() {
		return getNativePlainDateTime(this).toJSON();
	}
	valueOf() {
		return getNativePlainDateTime(this).valueOf();
	}
}, getNativePlainDateTime, dateFieldGetters, timeGetters);
function createNativePlainDateTimeRecord(native) {
	const instance = Object.create(NativePlainDateTimeRecord.prototype);
	return setPlainDateTimeSlots(instance, native), attachDebugString(instance), instance;
}
function create$5$1(isoYear, isoMonth, isoDay, hour, minute, second, millisecond, microsecond, nanosecond, calendar) {
	return createNativePlainDateTimeRecord(new NativeTemporal.PlainDateTime(isoYear, isoMonth, isoDay, hour, minute, second, millisecond, microsecond, nanosecond, refineNativeCalendarArgMaybe(calendar)));
}
function toZonedDateTime$1$1(record, timeZoneId, options) {
	return createNativeZonedDateTimeRecord(getNativePlainDateTime(record).toZonedDateTime(timeZoneId, options));
}
var getNativeZonedDateTime = getZonedDateTimeSlots;
var NativeZonedDateTimeRecord = /*@__PURE__*/ defineTemporalClass(ZonedDateTimeRecordBranding, class {
	get calendarId() {
		return getNativeZonedDateTime(this).calendarId;
	}
	get timeZoneId() {
		return getNativeZonedDateTime(this).timeZoneId;
	}
	get epochMilliseconds() {
		return getNativeZonedDateTime(this).epochMilliseconds;
	}
	get epochNanoseconds() {
		return getNativeZonedDateTime(this).epochNanoseconds;
	}
	toJSON() {
		return getNativeZonedDateTime(this).toJSON();
	}
	valueOf() {
		return getNativeZonedDateTime(this).valueOf();
	}
}, getNativeZonedDateTime, dateFieldGetters, timeGetters);
function createNativeZonedDateTimeRecord(native) {
	const instance = Object.create(NativeZonedDateTimeRecord.prototype);
	return setZonedDateTimeSlots(instance, native), attachDebugString(instance), instance;
}
function offsetNanoseconds$2(record) {
	return getNativeZonedDateTime(record).offsetNanoseconds;
}
var getNativeInstant = getInstantSlots;
var NativeInstantRecord = /*@__PURE__*/ defineTemporalClass(InstantRecordBranding, class {
	get epochMilliseconds() {
		return getNativeInstant(this).epochMilliseconds;
	}
	get epochNanoseconds() {
		return getNativeInstant(this).epochNanoseconds;
	}
	toJSON() {
		return getNativeInstant(this).toJSON();
	}
	valueOf() {
		return getNativeInstant(this).valueOf();
	}
});
function createNativeInstantRecord(native) {
	const instance = Object.create(NativeInstantRecord.prototype);
	return setInstantSlots(instance, native), attachDebugString(instance), instance;
}
function fromEpochMilliseconds$2(epochMilliseconds) {
	return createNativeInstantRecord(NativeTemporal.Instant.fromEpochMilliseconds(epochMilliseconds));
}
function toZonedDateTimeISO$2(record, timeZoneId) {
	return createNativeZonedDateTimeRecord(getNativeInstant(record).toZonedDateTimeISO(timeZoneId));
}
//#endregion
//#region node_modules/temporal-polyfill/chunks/funcApi-shim.js
function refineShimCalendarArgMaybe(calendarRecord) {
	return void 0 === calendarRecord ? void 0 : getCalendarRecordImpl(calendarRecord);
}
function getCalendarRecordImpl(record) {
	return getCalendarRecordImplCreator(record)();
}
var getShimPlainDateTimeSlots = getPlainDateTimeSlots;
var ShimPlainDateTimeRecord = /*@__PURE__*/ defineTemporalClass(PlainDateTimeRecordBranding, class {
	get calendarId() {
		return getCalendarSlotId(getShimPlainDateTimeSlots(this).calendar);
	}
	toJSON() {
		return formatDateTimeIsoAuto(getShimPlainDateTimeSlots(this));
	}
	valueOf() {
		return forbiddenValueOf();
	}
}, getShimPlainDateTimeSlots, dateFieldGetters$1, timeGetters$1);
function createShimPlainDateTimeRecord(slots) {
	const instance = Object.create(ShimPlainDateTimeRecord.prototype);
	return setPlainDateTimeSlots(instance, slots), attachDebugString(instance), instance;
}
function create$5(isoYear, isoMonth, isoDay, hour = 0, minute = 0, second = 0, millisecond = 0, microsecond = 0, nanosecond = 0, calendar) {
	return createShimPlainDateTimeRecord(createDateTimeSlots(checkIsoDateTimeInBounds(validateIsoDateTimeFields(mapProps(toIntegerWithTrunc, {
		year: isoYear,
		month: isoMonth,
		day: isoDay,
		hour,
		minute,
		second,
		millisecond,
		microsecond,
		nanosecond
	}))), refineShimCalendarArgMaybe(calendar)));
}
function toZonedDateTime$1(record, timeZoneId, options) {
	return createShimZonedDateTimeRecord(plainDateTimeToZonedDateTime(getShimPlainDateTimeSlots(record), queryTimeZone(refineTimeZoneId(timeZoneId)), options));
}
var getShimZonedDateTimeSlots = getZonedDateTimeSlots;
var ShimZonedDateTimeRecord = /*@__PURE__*/ defineTemporalClass(ZonedDateTimeRecordBranding, class {
	get calendarId() {
		return getCalendarSlotId(getShimZonedDateTimeSlots(this).calendar);
	}
	get timeZoneId() {
		return getShimZonedDateTimeSlots(this).timeZone.id;
	}
	get epochMilliseconds() {
		return getEpochMilli(getShimZonedDateTimeSlots(this));
	}
	get epochNanoseconds() {
		return getEpochNano(getShimZonedDateTimeSlots(this));
	}
	toJSON() {
		return formatZonedDateTimeIsoAuto(getShimZonedDateTimeSlots(this));
	}
	valueOf() {
		return forbiddenValueOf();
	}
}, getShimZonedDateTimeIsoSlots, dateFieldGetters$1, timeGetters$1);
function createShimZonedDateTimeRecord(slots) {
	const instance = Object.create(ShimZonedDateTimeRecord.prototype);
	return setZonedDateTimeSlots(instance, slots), attachDebugString(instance), instance;
}
function getShimZonedDateTimeIsoSlots(record) {
	const slots = getShimZonedDateTimeSlots(record);
	return {
		...zonedEpochSlotsToIso(slots),
		calendar: slots.calendar
	};
}
function offsetNanoseconds$1(record) {
	return zonedEpochSlotsToIso(getShimZonedDateTimeSlots(record)).offsetNanoseconds;
}
nanoInHour - 1;
nanoInMinute - 1;
nanoInSec - 1;
nanoInMilli - 1;
nanoInMicro - 1;
var getShimInstantSlots = getInstantSlots;
var ShimInstantRecord = /*@__PURE__*/ defineTemporalClass(InstantRecordBranding, class {
	get epochMilliseconds() {
		return getEpochMilli(getShimInstantSlots(this));
	}
	get epochNanoseconds() {
		return getEpochNano(getShimInstantSlots(this));
	}
	toJSON() {
		return formatInstantIsoAuto(getShimInstantSlots(this));
	}
	valueOf() {
		return forbiddenValueOf();
	}
});
function createShimInstantRecord(slots) {
	const instance = Object.create(ShimInstantRecord.prototype);
	return setInstantSlots(instance, slots), attachDebugString(instance), instance;
}
function fromEpochMilliseconds$1(epochMilliseconds) {
	return createShimInstantRecord(epochMilliToInstant(epochMilliseconds));
}
function toZonedDateTimeISO$1(record, timeZoneId) {
	return createShimZonedDateTimeRecord(instantToZonedDateTime(getShimInstantSlots(record), queryTimeZone(refineTimeZoneId(timeZoneId))));
}
//#endregion
//#region node_modules/temporal-polyfill/fns/ZonedDateTime.js
var offsetNanoseconds = NativeTemporal ? offsetNanoseconds$2 : offsetNanoseconds$1;
//#endregion
//#region node_modules/temporal-polyfill/fns/PlainDateTime.js
var create = NativeTemporal ? create$5$1 : create$5;
var toZonedDateTime = NativeTemporal ? toZonedDateTime$1$1 : toZonedDateTime$1;
//#endregion
//#region node_modules/temporal-polyfill/fns/Instant.js
var fromEpochMilliseconds = NativeTemporal ? fromEpochMilliseconds$2 : fromEpochMilliseconds$1;
var toZonedDateTimeISO = NativeTemporal ? toZonedDateTimeISO$2 : toZonedDateTimeISO$1;
//#endregion
//#region node_modules/@full-ui/headless-calendar/index.js
function addWeeks(m, n) {
	let a = dateToUtcArray(m);
	a[2] += n * 7;
	return arrayToUtcDate(a);
}
function addDays(m, n) {
	let a = dateToUtcArray(m);
	a[2] += n;
	return arrayToUtcDate(a);
}
function addMs(m, n) {
	let a = dateToUtcArray(m);
	a[6] += n;
	return arrayToUtcDate(a);
}
function diffWeeks(m0, m1) {
	return diffDays(m0, m1) / 7;
}
function diffDays(m0, m1) {
	return (m1.valueOf() - m0.valueOf()) / (1e3 * 60 * 60 * 24);
}
function diffHours(m0, m1) {
	return (m1.valueOf() - m0.valueOf()) / (1e3 * 60 * 60);
}
function diffMinutes(m0, m1) {
	return (m1.valueOf() - m0.valueOf()) / (1e3 * 60);
}
function diffSeconds(m0, m1) {
	return (m1.valueOf() - m0.valueOf()) / 1e3;
}
function diffDayAndTime(m0, m1) {
	let m0day = startOfDay(m0);
	let m1day = startOfDay(m1);
	return {
		years: 0,
		months: 0,
		days: Math.round(diffDays(m0day, m1day)),
		milliseconds: m1.valueOf() - m1day.valueOf() - (m0.valueOf() - m0day.valueOf())
	};
}
function diffWholeWeeks(m0, m1) {
	let d = diffWholeDays(m0, m1);
	if (d !== null && d % 7 === 0) return d / 7;
	return null;
}
function diffWholeDays(m0, m1) {
	if (timeAsMs(m0) === timeAsMs(m1)) return Math.round(diffDays(m0, m1));
	return null;
}
function startOfDay(m) {
	return arrayToUtcDate([
		m.getUTCFullYear(),
		m.getUTCMonth(),
		m.getUTCDate()
	]);
}
function startOfHour(m) {
	return arrayToUtcDate([
		m.getUTCFullYear(),
		m.getUTCMonth(),
		m.getUTCDate(),
		m.getUTCHours()
	]);
}
function startOfMinute(m) {
	return arrayToUtcDate([
		m.getUTCFullYear(),
		m.getUTCMonth(),
		m.getUTCDate(),
		m.getUTCHours(),
		m.getUTCMinutes()
	]);
}
function startOfSecond(m) {
	return arrayToUtcDate([
		m.getUTCFullYear(),
		m.getUTCMonth(),
		m.getUTCDate(),
		m.getUTCHours(),
		m.getUTCMinutes(),
		m.getUTCSeconds()
	]);
}
function weekOfYear(marker, dow, doy) {
	let y = marker.getUTCFullYear();
	let w = weekOfGivenYear(marker, y, dow, doy);
	if (w < 1) return weekOfGivenYear(marker, y - 1, dow, doy);
	let nextW = weekOfGivenYear(marker, y + 1, dow, doy);
	if (nextW >= 1) return Math.min(w, nextW);
	return w;
}
function weekOfGivenYear(marker, year, dow, doy) {
	let firstWeekStart = arrayToUtcDate([
		year,
		0,
		1 + firstWeekOffset(year, dow, doy)
	]);
	let dayStart = startOfDay(marker);
	let days = Math.round(diffDays(firstWeekStart, dayStart));
	return Math.floor(days / 7) + 1;
}
function firstWeekOffset(year, dow, doy) {
	let fwd = 7 + dow - doy;
	return -((7 + arrayToUtcDate([
		year,
		0,
		fwd
	]).getUTCDay() - dow) % 7) + fwd - 1;
}
function dateToLocalArray(date) {
	return [
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
		date.getMilliseconds()
	];
}
function arrayToLocalDate(a) {
	return new Date(a[0], a[1] || 0, a[2] == null ? 1 : a[2], a[3] || 0, a[4] || 0, a[5] || 0);
}
function dateToUtcArray(date) {
	return [
		date.getUTCFullYear(),
		date.getUTCMonth(),
		date.getUTCDate(),
		date.getUTCHours(),
		date.getUTCMinutes(),
		date.getUTCSeconds(),
		date.getUTCMilliseconds()
	];
}
function arrayToUtcDate(a) {
	if (a.length === 1) a = a.concat([0]);
	return new Date(Date.UTC(...a));
}
function isValidDate(m) {
	return !isNaN(m.valueOf());
}
function timeAsMs(m) {
	return m.getUTCHours() * 1e3 * 60 * 60 + m.getUTCMinutes() * 1e3 * 60 + m.getUTCSeconds() * 1e3 + m.getUTCMilliseconds();
}
var calendarSystemClassMap = {};
function registerCalendarSystem(name, theClass) {
	calendarSystemClassMap[name] = theClass;
}
function createCalendarSystem(name) {
	return new calendarSystemClassMap[name]();
}
var GregorianCalendarSystem = class {
	getMarkerYear(d) {
		return d.getUTCFullYear();
	}
	getMarkerMonth(d) {
		return d.getUTCMonth();
	}
	getMarkerDay(d) {
		return d.getUTCDate();
	}
	arrayToMarker(arr) {
		return arrayToUtcDate(arr);
	}
	markerToArray(marker) {
		return dateToUtcArray(marker);
	}
};
registerCalendarSystem("gregory", GregorianCalendarSystem);
function parseRange(input, dateEnv) {
	let start = null;
	let end = null;
	if (input.start) start = dateEnv.createMarker(input.start);
	if (input.end) end = dateEnv.createMarker(input.end);
	if (!start && !end) return null;
	if (start && end && end < start) return null;
	return {
		start,
		end
	};
}
function invertRanges(ranges, constraintRange) {
	let invertedRanges = [];
	let { start } = constraintRange;
	let i;
	let dateRange;
	ranges.sort(compareRanges);
	for (i = 0; i < ranges.length; i += 1) {
		dateRange = ranges[i];
		if (dateRange.start > start) invertedRanges.push({
			start,
			end: dateRange.start
		});
		if (dateRange.end > start) start = dateRange.end;
	}
	if (start < constraintRange.end) invertedRanges.push({
		start,
		end: constraintRange.end
	});
	return invertedRanges;
}
function compareRanges(range0, range1) {
	return range0.start.valueOf() - range1.start.valueOf();
}
function intersectRanges(range0, range1) {
	let { start, end } = range0;
	let newRange = null;
	if (range1.start !== null) if (start === null) start = range1.start;
	else start = new Date(Math.max(start.valueOf(), range1.start.valueOf()));
	if (range1.end != null) if (end === null) end = range1.end;
	else end = new Date(Math.min(end.valueOf(), range1.end.valueOf()));
	if (start === null || end === null || start < end) newRange = {
		start,
		end
	};
	return newRange;
}
function rangesEqual(range0, range1) {
	return (range0.start === null ? null : range0.start.valueOf()) === (range1.start === null ? null : range1.start.valueOf()) && (range0.end === null ? null : range0.end.valueOf()) === (range1.end === null ? null : range1.end.valueOf());
}
function rangesIntersect(range0, range1) {
	return (range0.end === null || range1.start === null || range0.end > range1.start) && (range0.start === null || range1.end === null || range0.start < range1.end);
}
function rangeContainsRange(outerRange, innerRange) {
	return (outerRange.start === null || innerRange.start !== null && innerRange.start >= outerRange.start) && (outerRange.end === null || innerRange.end !== null && innerRange.end <= outerRange.end);
}
function rangeContainsMarker(range, date) {
	return (range.start === null || date >= range.start) && (range.end === null || date < range.end);
}
function constrainMarkerToRange(date, range) {
	if (range.start != null && date < range.start) return range.start;
	if (range.end != null && date >= range.end) return /* @__PURE__ */ new Date(range.end.valueOf() - 1);
	return date;
}
function expandZonedMarker(dateInfo, calendarSystem) {
	let a = calendarSystem.markerToArray(dateInfo.marker);
	return {
		marker: dateInfo.marker,
		timeZoneOffset: dateInfo.timeZoneOffset,
		array: a,
		year: a[0],
		month: a[1],
		day: a[2],
		hour: a[3],
		minute: a[4],
		second: a[5],
		millisecond: a[6]
	};
}
function createVerboseFormattingArg(start, end, context) {
	let startInfo = expandZonedMarker(start, context.calendarSystem);
	return {
		date: startInfo,
		start: startInfo,
		end: end ? expandZonedMarker(end, context.calendarSystem) : null,
		timeZone: context.timeZone,
		localeCodes: context.locale.codes
	};
}
function isInt(n) {
	return n % 1 === 0;
}
function padStart(val, len) {
	let s = String(val);
	return "000".substr(0, len - s.length) + s;
}
var INTERNAL_UNITS = [
	"years",
	"months",
	"days",
	"milliseconds"
];
var PARSE_RE = /^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/;
function createDuration(input, unit) {
	if (typeof input === "string") return parseString(input);
	if (typeof input === "object" && input) return parseObject(input);
	if (typeof input === "number") return parseObject({ [unit || "milliseconds"]: input });
	return null;
}
function parseString(s) {
	let m = PARSE_RE.exec(s);
	if (m) {
		let sign = m[1] ? -1 : 1;
		return {
			years: 0,
			months: 0,
			days: sign * (m[2] ? parseInt(m[2], 10) : 0),
			milliseconds: sign * ((m[3] ? parseInt(m[3], 10) : 0) * 60 * 60 * 1e3 + (m[4] ? parseInt(m[4], 10) : 0) * 60 * 1e3 + (m[5] ? parseInt(m[5], 10) : 0) * 1e3 + (m[6] ? parseInt(m[6], 10) : 0))
		};
	}
	return null;
}
function parseObject(obj) {
	let duration = {
		years: obj.years || obj.year || 0,
		months: obj.months || obj.month || 0,
		days: obj.days || obj.day || 0,
		milliseconds: (obj.hours || obj.hour || 0) * 60 * 60 * 1e3 + (obj.minutes || obj.minute || 0) * 60 * 1e3 + (obj.seconds || obj.second || 0) * 1e3 + (obj.milliseconds || obj.millisecond || obj.ms || 0)
	};
	let weeks = obj.weeks || obj.week;
	if (weeks) {
		duration.days += weeks * 7;
		duration.specifiedWeeks = true;
	}
	return duration;
}
function durationsEqual(d0, d1) {
	return d0.years === d1.years && d0.months === d1.months && d0.days === d1.days && d0.milliseconds === d1.milliseconds;
}
function addDurations(d0, d1) {
	return {
		years: d0.years + d1.years,
		months: d0.months + d1.months,
		days: d0.days + d1.days,
		milliseconds: d0.milliseconds + d1.milliseconds
	};
}
function subtractDurations(d1, d0) {
	return {
		years: d1.years - d0.years,
		months: d1.months - d0.months,
		days: d1.days - d0.days,
		milliseconds: d1.milliseconds - d0.milliseconds
	};
}
function multiplyDuration(d, n) {
	return {
		years: d.years * n,
		months: d.months * n,
		days: d.days * n,
		milliseconds: d.milliseconds * n
	};
}
function asRoughYears(dur) {
	return asRoughDays(dur) / 365;
}
function asRoughMonths(dur) {
	return asRoughDays(dur) / 30;
}
function asRoughDays(dur) {
	return asRoughMs(dur) / 864e5;
}
function asRoughMs(dur) {
	return dur.years * (365 * 864e5) + dur.months * (30 * 864e5) + dur.days * 864e5 + dur.milliseconds;
}
function wholeDivideDurations(numerator, denominator) {
	let res = null;
	for (let i = 0; i < INTERNAL_UNITS.length; i += 1) {
		let unit = INTERNAL_UNITS[i];
		if (denominator[unit]) {
			let localRes = numerator[unit] / denominator[unit];
			if (!isInt(localRes) || res !== null && res !== localRes) return null;
			res = localRes;
		} else if (numerator[unit]) return null;
	}
	return res;
}
function greatestDurationDenominator(dur) {
	let ms = dur.milliseconds;
	if (ms) {
		if (ms % 1e3 !== 0) return {
			unit: "millisecond",
			value: ms
		};
		if (ms % (1e3 * 60) !== 0) return {
			unit: "second",
			value: ms / 1e3
		};
		if (ms % (1e3 * 60 * 60) !== 0) return {
			unit: "minute",
			value: ms / (1e3 * 60)
		};
		if (ms) return {
			unit: "hour",
			value: ms / (1e3 * 60 * 60)
		};
	}
	if (dur.days) {
		if (dur.specifiedWeeks && dur.days % 7 === 0) return {
			unit: "week",
			value: dur.days / 7
		};
		return {
			unit: "day",
			value: dur.days
		};
	}
	if (dur.months) return {
		unit: "month",
		value: dur.months
	};
	if (dur.years) return {
		unit: "year",
		value: dur.years
	};
	return {
		unit: "millisecond",
		value: 0
	};
}
function buildIsoString(marker, timeZoneOffset, stripZeroTime = false) {
	let s = marker.toISOString();
	s = s.replace(".000", "");
	if (stripZeroTime) s = s.replace("T00:00:00Z", "");
	if (s.length > 10) {
		if (timeZoneOffset == null) s = s.replace("Z", "");
		else if (timeZoneOffset !== 0) s = s.replace("Z", formatTimeZoneOffset(timeZoneOffset, true));
	}
	return s;
}
function formatDayString(marker) {
	return marker.toISOString().replace(/T.*$/, "");
}
function formatIsoTimeString(marker) {
	return padStart(marker.getUTCHours(), 2) + ":" + padStart(marker.getUTCMinutes(), 2) + ":" + padStart(marker.getUTCSeconds(), 2);
}
function formatTimeZoneOffset(minutes, doIso = false) {
	let sign = minutes < 0 ? "-" : "+";
	let abs = Math.abs(minutes);
	let hours = Math.floor(abs / 60);
	let mins = Math.round(abs % 60);
	if (doIso) return `${sign + padStart(hours, 2)}:${padStart(mins, 2)}`;
	return `GMT${sign}${hours}${mins ? `:${padStart(mins, 2)}` : ""}`;
}
function joinDateTimeFormatParts(parts) {
	let s = "";
	for (const part of parts) s += part.value;
	return s;
}
var ISO_RE = /^\s*(\d{4})(-?(\d{2})(-?(\d{2})([T ](\d{2}):?(\d{2})(:?(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/;
function parse(str) {
	let m = ISO_RE.exec(str);
	if (m) {
		let marker = new Date(Date.UTC(Number(m[1]), m[3] ? Number(m[3]) - 1 : 0, Number(m[5] || 1), Number(m[7] || 0), Number(m[8] || 0), Number(m[10] || 0), m[12] ? Number(`0.${m[12]}`) * 1e3 : 0));
		if (isValidDate(marker)) {
			let timeZoneOffset = null;
			if (m[13]) timeZoneOffset = (m[15] === "-" ? -1 : 1) * (Number(m[16] || 0) * 60 + Number(m[18] || 0));
			return {
				marker,
				isTimeUnspecified: !m[6],
				timeZoneOffset
			};
		}
	}
	return null;
}
var DateEnv = class {
	constructor(settings) {
		this.timeZone = settings.timeZone;
		this.calendarSystem = createCalendarSystem(settings.calendarSystem);
		this.locale = settings.locale;
		this.weekDow = settings.locale.week.dow;
		this.weekDoy = settings.locale.week.doy;
		if (settings.weekNumberCalculation === "ISO") {
			this.weekDow = 1;
			this.weekDoy = 4;
		}
		if (typeof settings.firstDay === "number") this.weekDow = settings.firstDay;
		if (typeof settings.weekNumberCalculation === "function") this.weekNumberFunc = settings.weekNumberCalculation;
		this.weekTextLong = settings.weekTextLong;
		this.weekTextShort = settings.weekTextShort ?? settings.weekTextLong;
		this.cmdFormatter = settings.cmdFormatter;
	}
	createMarker(input) {
		let meta = this.createMarkerMeta(input);
		if (meta === null) return null;
		return meta.marker;
	}
	createNowMarker() {
		return this.timestampToMarker((/* @__PURE__ */ new Date()).valueOf());
	}
	createMarkerMeta(input) {
		if (typeof input === "string") return this.parse(input);
		let marker = null;
		if (typeof input === "number") marker = this.timestampToMarker(input);
		else if (input instanceof Date) {
			input = input.valueOf();
			if (!isNaN(input)) marker = this.timestampToMarker(input);
		} else if (Array.isArray(input)) marker = arrayToUtcDate(input);
		if (marker === null || !isValidDate(marker)) return null;
		return {
			marker,
			isTimeUnspecified: false
		};
	}
	parse(s) {
		let parts = parse(s);
		if (parts === null) return null;
		let { marker } = parts;
		if (parts.timeZoneOffset !== null) marker = this.timestampToMarker(marker.valueOf() - parts.timeZoneOffset * 60 * 1e3);
		return {
			marker,
			isTimeUnspecified: parts.isTimeUnspecified
		};
	}
	getYear(marker) {
		return this.calendarSystem.getMarkerYear(marker);
	}
	getMonth(marker) {
		return this.calendarSystem.getMarkerMonth(marker);
	}
	getDay(marker) {
		return this.calendarSystem.getMarkerDay(marker);
	}
	add(marker, dur) {
		let a = this.calendarSystem.markerToArray(marker);
		a[0] += dur.years;
		a[1] += dur.months;
		a[2] += dur.days;
		a[6] += dur.milliseconds;
		return this.calendarSystem.arrayToMarker(a);
	}
	subtract(marker, dur) {
		let a = this.calendarSystem.markerToArray(marker);
		a[0] -= dur.years;
		a[1] -= dur.months;
		a[2] -= dur.days;
		a[6] -= dur.milliseconds;
		return this.calendarSystem.arrayToMarker(a);
	}
	addYears(marker, n) {
		let a = this.calendarSystem.markerToArray(marker);
		a[0] += n;
		return this.calendarSystem.arrayToMarker(a);
	}
	addMonths(marker, n) {
		let a = this.calendarSystem.markerToArray(marker);
		a[1] += n;
		return this.calendarSystem.arrayToMarker(a);
	}
	diffWholeYears(m0, m1) {
		let { calendarSystem } = this;
		if (timeAsMs(m0) === timeAsMs(m1) && calendarSystem.getMarkerDay(m0) === calendarSystem.getMarkerDay(m1) && calendarSystem.getMarkerMonth(m0) === calendarSystem.getMarkerMonth(m1)) return calendarSystem.getMarkerYear(m1) - calendarSystem.getMarkerYear(m0);
		return null;
	}
	diffWholeMonths(m0, m1) {
		let { calendarSystem } = this;
		if (timeAsMs(m0) === timeAsMs(m1) && calendarSystem.getMarkerDay(m0) === calendarSystem.getMarkerDay(m1)) return calendarSystem.getMarkerMonth(m1) - calendarSystem.getMarkerMonth(m0) + (calendarSystem.getMarkerYear(m1) - calendarSystem.getMarkerYear(m0)) * 12;
		return null;
	}
	greatestWholeUnit(m0, m1) {
		let n = this.diffWholeYears(m0, m1);
		if (n !== null) return {
			unit: "year",
			value: n
		};
		n = this.diffWholeMonths(m0, m1);
		if (n !== null) return {
			unit: "month",
			value: n
		};
		n = diffWholeWeeks(m0, m1);
		if (n !== null) return {
			unit: "week",
			value: n
		};
		n = diffWholeDays(m0, m1);
		if (n !== null) return {
			unit: "day",
			value: n
		};
		n = diffHours(m0, m1);
		if (isInt(n)) return {
			unit: "hour",
			value: n
		};
		n = diffMinutes(m0, m1);
		if (isInt(n)) return {
			unit: "minute",
			value: n
		};
		n = diffSeconds(m0, m1);
		if (isInt(n)) return {
			unit: "second",
			value: n
		};
		return {
			unit: "millisecond",
			value: m1.valueOf() - m0.valueOf()
		};
	}
	countDurationsBetween(m0, m1, d) {
		let diff;
		if (d.years) {
			diff = this.diffWholeYears(m0, m1);
			if (diff !== null) return diff / asRoughYears(d);
		}
		if (d.months) {
			diff = this.diffWholeMonths(m0, m1);
			if (diff !== null) return diff / asRoughMonths(d);
		}
		if (d.days) {
			diff = diffWholeDays(m0, m1);
			if (diff !== null) return diff / asRoughDays(d);
		}
		return (m1.valueOf() - m0.valueOf()) / asRoughMs(d);
	}
	startOf(m, unit) {
		if (unit === "year") return this.startOfYear(m);
		if (unit === "month") return this.startOfMonth(m);
		if (unit === "week") return this.startOfWeek(m);
		if (unit === "day") return startOfDay(m);
		if (unit === "hour") return startOfHour(m);
		if (unit === "minute") return startOfMinute(m);
		if (unit === "second") return startOfSecond(m);
		return null;
	}
	startOfYear(m) {
		return this.calendarSystem.arrayToMarker([this.calendarSystem.getMarkerYear(m)]);
	}
	startOfMonth(m) {
		return this.calendarSystem.arrayToMarker([this.calendarSystem.getMarkerYear(m), this.calendarSystem.getMarkerMonth(m)]);
	}
	startOfWeek(m) {
		return this.calendarSystem.arrayToMarker([
			this.calendarSystem.getMarkerYear(m),
			this.calendarSystem.getMarkerMonth(m),
			m.getUTCDate() - (m.getUTCDay() - this.weekDow + 7) % 7
		]);
	}
	computeWeekNumber(marker) {
		if (this.weekNumberFunc) return this.weekNumberFunc(this.toDate(marker));
		return weekOfYear(marker, this.weekDow, this.weekDoy);
	}
	formatToParts(marker, formatter) {
		return formatter.formatToParts({
			marker,
			timeZoneOffset: this.offsetForMarker(marker)
		}, this);
	}
	formatRangeToParts(start, end, formatter, dateOptions = {}) {
		if (dateOptions.isEndExclusive) end = addMs(end, -1);
		return formatter.formatRangeToParts({
			marker: start,
			timeZoneOffset: this.offsetForMarker(start)
		}, {
			marker: end,
			timeZoneOffset: this.offsetForMarker(end)
		}, this);
	}
	formatIso(marker, extraOptions = {}) {
		let timeZoneOffset = null;
		if (!extraOptions.omitTimeZoneOffset) timeZoneOffset = this.offsetForMarker(marker);
		return buildIsoString(marker, timeZoneOffset, extraOptions.omitTime);
	}
	timestampToMarker(ms) {
		if (this.timeZone === "local") return arrayToUtcDate(dateToLocalArray(new Date(ms)));
		if (this.timeZone === "UTC") return new Date(ms);
		const zdt = toZonedDateTimeISO(fromEpochMilliseconds(ms), this.timeZone);
		return new Date(Date.UTC(zdt.year, zdt.month - 1, zdt.day, zdt.hour, zdt.minute, zdt.second, zdt.millisecond));
	}
	offsetForMarker(m) {
		if (this.timeZone === "local") return -arrayToLocalDate(dateToUtcArray(m)).getTimezoneOffset();
		if (this.timeZone === "UTC") return 0;
		return offsetNanoseconds(toZonedDateTime(create(m.getUTCFullYear(), m.getUTCMonth() + 1, m.getUTCDate(), m.getUTCHours(), m.getUTCMinutes(), m.getUTCSeconds(), m.getUTCMilliseconds()), this.timeZone)) / (1e9 * 60);
	}
	toDate(m) {
		if (this.timeZone === "local") return arrayToLocalDate(dateToUtcArray(m));
		if (this.timeZone === "UTC") return new Date(m.valueOf());
		return new Date(toZonedDateTime(create(m.getUTCFullYear(), m.getUTCMonth() + 1, m.getUTCDate(), m.getUTCHours(), m.getUTCMinutes(), m.getUTCSeconds(), m.getUTCMilliseconds()), this.timeZone).epochMilliseconds);
	}
};
var EXTENDED_SETTINGS = /* @__PURE__ */ new Set([
	"week",
	"meridiem",
	"omitZeroMinute",
	"omitCommas",
	"forceCommas",
	"omitTrailing",
	"weekdayJustify"
]);
var MERIDIEM_RE = /([ap])\.?m\.?/i;
var COMMA_RE = /,/g;
var LTR_RE = /\u200e/g;
var TRAILING_RE = /[\s.,]+$/;
var WHITESPACE_ONLY_RE = /^\s+$/;
var NativeDateFormatter = class {
	constructor(options) {
		const standardOptions = {};
		const extendedOptions = {};
		for (const name in options) if (EXTENDED_SETTINGS.has(name)) extendedOptions[name] = options[name];
		else standardOptions[name] = options[name];
		if (standardOptions.timeZoneName === "long") standardOptions.timeZoneName = "short";
		this.timeZoneOnly = Object.keys(standardOptions).length === 1 && standardOptions.timeZoneName === "short";
		this.weekOnly = Boolean(!Object.keys(standardOptions).length && extendedOptions.week);
		if (!this.timeZoneOnly) {
			if (standardOptions.timeZoneName) {
				if (!standardOptions.hour) standardOptions.hour = "2-digit";
				if (!standardOptions.minute) standardOptions.minute = "2-digit";
			}
			if (extendedOptions.omitZeroMinute && (standardOptions.second || standardOptions.fractionalSecondDigits)) delete extendedOptions.omitZeroMinute;
			standardOptions.timeZone = "UTC";
		}
		this.standardOptions = standardOptions;
		this.extendedOptions = extendedOptions;
	}
	formatToParts(date, context) {
		const { standardOptions, extendedOptions } = this;
		if (this.timeZoneOnly) return [{
			type: "timeZoneName",
			value: formatTimeZoneOffset(date.timeZoneOffset)
		}];
		if (this.weekOnly) return formatWeekNumberParts(context.computeWeekNumber(date.marker), context.weekTextLong, context.weekTextShort, context.locale, extendedOptions.week);
		const { normalFormat, zeroFormat } = this.getFormats(context);
		return postProcessParts((zeroFormat && !date.marker.getUTCMinutes() ? zeroFormat : normalFormat).formatToParts(date.marker), date, standardOptions, extendedOptions);
	}
	formatRangeToParts(start, end, context) {
		const { standardOptions, extendedOptions } = this;
		if (this.timeZoneOnly || this.weekOnly) return this.formatToParts(start, context).map((part) => {
			return {
				source: part.type === "literal" ? "shared" : "startRange",
				...part
			};
		});
		const { normalFormat, zeroFormat } = this.getFormats(context);
		return postProcessRangeParts((zeroFormat && !start.marker.getUTCMinutes() && !end.marker.getUTCMinutes() ? zeroFormat : normalFormat).formatRangeToParts(start.marker, end.marker), start, end, standardOptions, extendedOptions);
	}
	getFormats(context) {
		if (this.cachedContext !== context) {
			const { standardOptions, extendedOptions } = this;
			const { codes } = context.locale;
			const normalFormat = new Intl.DateTimeFormat(codes, standardOptions);
			let zeroFormat;
			if (extendedOptions.omitZeroMinute) {
				const zeroProps = { ...standardOptions };
				delete zeroProps.minute;
				zeroFormat = new Intl.DateTimeFormat(codes, zeroProps);
			}
			this.cachedContext = context;
			this.cachedFormats = {
				normalFormat,
				zeroFormat
			};
		}
		return this.cachedFormats;
	}
};
function processPartsLoop(parts, extendedOptions, getTzValue) {
	let anyTzInjected = false;
	let priorLiteral;
	for (const part of parts) {
		const isLiteral = part.type === "literal";
		if (isLiteral || part.type === "dayPeriod") {
			let s = part.value;
			s = s.replace(LTR_RE, "");
			if (extendedOptions.omitCommas) s = s.replace(COMMA_RE, "");
			if (!isLiteral) {
				const { meridiem } = extendedOptions;
				if (meridiem === false) s = s.replace(MERIDIEM_RE, "");
				else if (meridiem === "narrow") s = s.replace(MERIDIEM_RE, (_m0, m1) => m1.toLocaleLowerCase());
				else if (meridiem === "short") s = s.replace(MERIDIEM_RE, (_m0, m1) => `${m1.toLocaleLowerCase()}m`);
				else if (meridiem === "lowercase") s = s.replace(MERIDIEM_RE, (m0) => m0.toLocaleLowerCase());
				if (priorLiteral) priorLiteral.value = priorLiteral.value.trimEnd();
			}
			part.value = s;
		} else if (part.type === "timeZoneName") {
			const tzValue = getTzValue(part);
			if (tzValue != null) {
				part.value = tzValue;
				anyTzInjected = true;
			}
		}
		priorLiteral = isLiteral ? part : void 0;
	}
	return {
		lastLiteral: priorLiteral,
		anyTzInjected
	};
}
function postProcessParts(parts, date, standardOptions, extendedOptions) {
	const injectableTz = standardOptions.timeZoneName === "short" ? date.timeZoneOffset == null ? "UTC" : formatTimeZoneOffset(date.timeZoneOffset) : void 0;
	const { lastLiteral, anyTzInjected } = processPartsLoop(parts, extendedOptions, () => injectableTz);
	if (injectableTz && !anyTzInjected) {
		if (lastLiteral) lastLiteral.value += " ";
		else parts.push({
			type: "literal",
			value: " "
		});
		parts.push({
			type: "timeZoneName",
			value: injectableTz
		});
	}
	if (extendedOptions.weekdayJustify && parts.length === 3 && WHITESPACE_ONLY_RE.test(parts[1].value)) {
		if (parts[extendedOptions.weekdayJustify === "start" ? 2 : 0].type === "weekday") parts.reverse();
	}
	if (extendedOptions.forceCommas) {
		for (const part of parts) if (part.type === "literal" && WHITESPACE_ONLY_RE.test(part.value)) part.value = `,${part.value}`;
	}
	if (extendedOptions.omitTrailing) stripTrailingLiteral(parts);
	return parts.filter((part) => part.value);
}
function postProcessRangeParts(parts, start, end, standardOptions, extendedOptions) {
	const injectTz = standardOptions.timeZoneName === "short";
	processPartsLoop(parts, extendedOptions, (part) => {
		if (!injectTz) return void 0;
		const offset = part.source === "endRange" ? end.timeZoneOffset : start.timeZoneOffset;
		return offset == null ? "UTC" : formatTimeZoneOffset(offset);
	});
	if (extendedOptions.forceCommas) {
		for (const part of parts) if (part.type === "literal" && WHITESPACE_ONLY_RE.test(part.value)) part.value = `,${part.value}`;
	}
	if (extendedOptions.omitTrailing) stripTrailingLiteral(parts);
	return parts.filter((part) => part.value);
}
function stripTrailingLiteral(parts) {
	const lastPart = parts[parts.length - 1];
	if (lastPart?.type === "literal") {
		lastPart.value = lastPart.value.replace(TRAILING_RE, "");
		if (!lastPart.value) parts.pop();
	}
}
function formatWeekNumberParts(num, weekTextLong, weekTextShort, locale, display) {
	const parts = [];
	if (display === "long") parts.push({
		type: "literal",
		value: weekTextLong
	});
	else if (display === "short" || display === "narrow") parts.push({
		type: "literal",
		value: weekTextShort
	});
	if (display === "long" || display === "short") parts.push({
		type: "literal",
		value: " "
	});
	parts.push({
		type: "week",
		value: locale.simpleNumberFormat.format(num)
	});
	if (locale.options.direction === "rtl") parts.reverse();
	return parts;
}
var CmdDateFormatter = class {
	constructor(cmdStr) {
		this.cmdStr = cmdStr;
	}
	formatToParts(date, context) {
		const res = context.cmdFormatter(this.cmdStr, createVerboseFormattingArg(date, null, context));
		if (Array.isArray(res)) return res;
		return [{
			type: "literal",
			value: res
		}];
	}
	formatRangeToParts(start, end, context) {
		const res = context.cmdFormatter(this.cmdStr, createVerboseFormattingArg(start, end, context));
		if (Array.isArray(res)) return res.map((part) => ({
			source: "shared",
			...part
		}));
		return [{
			source: "shared",
			type: "literal",
			value: res
		}];
	}
};
var FuncDateFormatter = class {
	constructor(func) {
		this.func = func;
	}
	formatToParts(date, context) {
		return [{
			type: "literal",
			value: this.func(createVerboseFormattingArg(date, null, context))
		}];
	}
	formatRangeToParts(start, end, context) {
		return [{
			source: "shared",
			type: "literal",
			value: this.func(createVerboseFormattingArg(start, end, context))
		}];
	}
};
//#endregion
export { rangeContainsRange as A, intersectRanges as C, parse as D, multiplyDuration as E, wholeDivideDurations as F, rangesIntersect as M, startOfDay as N, parseRange as O, subtractDurations as P, greatestDurationDenominator as S, joinDateTimeFormatParts as T, diffWholeDays as _, addDays as a, formatDayString as b, addWeeks as c, buildIsoString as d, constrainMarkerToRange as f, diffWeeks as g, diffDays as h, NativeDateFormatter as i, rangesEqual as j, rangeContainsMarker as k, asRoughDays as l, diffDayAndTime as m, DateEnv as n, addDurations as o, createDuration as p, FuncDateFormatter as r, addMs as s, CmdDateFormatter as t, asRoughMs as u, diffWholeWeeks as v, invertRanges as w, formatIsoTimeString as x, durationsEqual as y };
