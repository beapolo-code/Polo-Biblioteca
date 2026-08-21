import * as i0 from '@angular/core';
import { inject, Service, NgModule } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { getYear, getMonth, getDate, getDay, getDaysInMonth, format, addYears, addMonths, addDays, formatISO, parseISO, isDate, isValid, set, getHours, getMinutes, getSeconds, addSeconds, parse } from 'date-fns';

function range(length, valueFunction) {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}
const MONTH_FORMATS = {
  long: 'LLLL',
  short: 'LLL',
  narrow: 'LLLLL'
};
const DAY_OF_WEEK_FORMATS = {
  long: 'EEEE',
  short: 'EEE',
  narrow: 'EEEEE'
};
class DateFnsAdapter extends DateAdapter {
  constructor() {
    super();
    const matDateLocale = inject(MAT_DATE_LOCALE, {
      optional: true
    });
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
    return range(12, i => this.format(new Date(2017, i, 1), pattern));
  }
  getDateNames() {
    const dtf = typeof Intl !== 'undefined' ? new Intl.DateTimeFormat(this.locale.code, {
      day: 'numeric',
      timeZone: 'utc'
    }) : null;
    return range(31, i => {
      if (dtf) {
        const date = new Date();
        date.setUTCFullYear(2017, 0, i + 1);
        date.setUTCHours(0, 0, 0, 0);
        return dtf.format(date).replace(/[\u200e\u200f]/g, '');
      }
      return i + '';
    });
  }
  getDayOfWeekNames(style) {
    const pattern = DAY_OF_WEEK_FORMATS[style];
    return range(7, i => this.format(new Date(2017, 0, i + 1), pattern));
  }
  getYearName(date) {
    return this.format(date, 'y');
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
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      if (month < 0 || month > 11) {
        throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
      }
      if (date < 1) {
        throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
      }
    }
    const result = new Date();
    result.setFullYear(year, month, date);
    result.setHours(0, 0, 0, 0);
    if (result.getMonth() != month && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }
    return result;
  }
  today() {
    return new Date();
  }
  parse(value, parseFormat) {
    return this._parse(value, parseFormat);
  }
  format(date, displayFormat) {
    if (!this.isValid(date)) {
      throw Error('DateFnsAdapter: Cannot format invalid date.');
    }
    return format(date, displayFormat, {
      locale: this.locale
    });
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
    return formatISO(date, {
      representation: 'date'
    });
  }
  deserialize(value) {
    if (typeof value === 'string') {
      if (!value) {
        return null;
      }
      const date = parseISO(value);
      if (this.isValid(date)) {
        return date;
      }
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
    return new Date(NaN);
  }
  setTime(target, hours, minutes, seconds) {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      if (hours < 0 || hours > 23) {
        throw Error(`Invalid hours "${hours}". Hours value must be between 0 and 23.`);
      }
      if (minutes < 0 || minutes > 59) {
        throw Error(`Invalid minutes "${minutes}". Minutes value must be between 0 and 59.`);
      }
      if (seconds < 0 || seconds > 59) {
        throw Error(`Invalid seconds "${seconds}". Seconds value must be between 0 and 59.`);
      }
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
    if (typeof value == 'string' && value.length > 0) {
      if (shouldTryParseIso) {
        const iso8601Date = parseISO(value);
        if (this.isValid(iso8601Date)) {
          return iso8601Date;
        }
      }
      const formats = Array.isArray(parseFormat) ? parseFormat : [parseFormat];
      if (!parseFormat.length) {
        throw Error('Formats array must not be empty.');
      }
      for (const currentFormat of formats) {
        const fromFormat = parse(value, currentFormat, new Date(), {
          locale: this.locale
        });
        if (this.isValid(fromFormat)) {
          return fromFormat;
        }
      }
      return this.invalid();
    } else if (typeof value === 'number') {
      return new Date(value);
    } else if (value instanceof Date) {
      return this.clone(value);
    }
    return null;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: DateFnsAdapter,
    deps: [],
    target: i0.ɵɵFactoryTarget.Service
  });
  static ɵprov = i0.ɵɵngDeclareService({
    minVersion: "22.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: DateFnsAdapter,
    autoProvided: false
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: DateFnsAdapter,
  decorators: [{
    type: Service,
    args: [{
      autoProvided: false
    }]
  }],
  ctorParameters: () => []
});

const MAT_DATE_FNS_FORMATS = {
  parse: {
    dateInput: 'P',
    timeInput: 'p'
  },
  display: {
    dateInput: 'P',
    timeInput: 'p',
    monthYearLabel: 'LLL uuuu',
    dateA11yLabel: 'PP',
    monthYearA11yLabel: 'LLLL uuuu',
    timeOptionLabel: 'p'
  }
};

class DateFnsModule {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: DateFnsModule,
    deps: [],
    target: i0.ɵɵFactoryTarget.NgModule
  });
  static ɵmod = i0.ɵɵngDeclareNgModule({
    minVersion: "14.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: DateFnsModule
  });
  static ɵinj = i0.ɵɵngDeclareInjector({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: DateFnsModule,
    providers: [{
      provide: DateAdapter,
      useClass: DateFnsAdapter
    }]
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: DateFnsModule,
  decorators: [{
    type: NgModule,
    args: [{
      providers: [{
        provide: DateAdapter,
        useClass: DateFnsAdapter
      }]
    }]
  }]
});
class MatDateFnsModule {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: MatDateFnsModule,
    deps: [],
    target: i0.ɵɵFactoryTarget.NgModule
  });
  static ɵmod = i0.ɵɵngDeclareNgModule({
    minVersion: "14.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: MatDateFnsModule
  });
  static ɵinj = i0.ɵɵngDeclareInjector({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: MatDateFnsModule,
    providers: [provideDateFnsAdapter()]
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: MatDateFnsModule,
  decorators: [{
    type: NgModule,
    args: [{
      providers: [provideDateFnsAdapter()]
    }]
  }]
});
function provideDateFnsAdapter(formats = MAT_DATE_FNS_FORMATS) {
  return [{
    provide: DateAdapter,
    useClass: DateFnsAdapter
  }, {
    provide: MAT_DATE_FORMATS,
    useValue: formats
  }];
}

export { DateFnsAdapter, DateFnsModule, MAT_DATE_FNS_FORMATS, MatDateFnsModule, provideDateFnsAdapter };
//# sourceMappingURL=material-date-fns-adapter.mjs.map
