import { C as intersectRanges, M as rangesIntersect, N as startOfDay, O as parseRange, S as greatestDurationDenominator, T as joinDateTimeFormatParts, _ as diffWholeDays, a as addDays, f as constrainMarkerToRange, k as rangeContainsMarker, l as asRoughDays, p as createDuration, u as asRoughMs, v as diffWholeWeeks } from "./headless-calendar-CCBEW-nM.js";
import { $ as getUnequalProps, A as computeVisibleDayRange, C as buildEventRangeTimeText, F as createFormatter, K as formatWithOrdinals, O as computeEventRangeDraggable, St as setElEventRange, Z as getEventTagAndAttrs, et as guid, ft as mergeMaybePropsDepth1, i as computeElIsRtl, it as isArraysEqual, j as createAriaClickAttrs, k as computeViewBorderless, kt as classNames, ot as isPropsEqualShallow, p as EventImpl, st as isPropsEqualWithMap, t as Emitter, yt as refineClassName } from "./56f74c4a-DBqKIEos.js";
import { n as joinClassNames } from "./69261bb4-BJPZADnq.js";
import { a as R, c as k$1, l as l$1, n as C, o as S, r as F, s as X$1, t as u$1 } from "./jsxRuntime.module-CjEaW79o.js";
//#region node_modules/fullcalendar/chunks/f0fa24ec.js
var classNamesRe = /(^c|C)lass(Name)?$/;
var contentRe = /Content$/;
var lifecycleRe = /(DidMount|WillUnmount)$/;
var handlerRe = /^on[A-Z]/;
var customMergeFuncs = { buttons: mergeMaybePropsDepth1 };
function mergeViewOptionsMap(...hashes) {
	const merged = {};
	for (const hash of hashes) for (const viewName in hash) {
		const viewOptions = hash[viewName];
		if (!merged[viewName]) merged[viewName] = viewOptions;
		else merged[viewName] = mergeCalendarOptions(merged[viewName], viewOptions);
	}
	return merged;
}
function mergeCalendarOptions(...optionSets) {
	let dest = {};
	for (const options of optionSets) for (let name in options) if (name in dest) {
		const mergeFunc = customMergeFuncs[name] || (classNamesRe.test(name) ? joinFuncishClassNames : contentRe.test(name) ? mergeContentInjectors : lifecycleRe.test(name) ? mergeLifecycleCallbacks : void 0);
		dest[name] = mergeFunc ? mergeFunc(dest[name], options[name], name) : options[name];
	} else dest[name] = options[name];
	return dest;
}
function joinFuncishClassNames(input0, input1, optionName) {
	const isFunc0 = typeof input0 === "function";
	const isFunc1 = typeof input1 === "function";
	if (isFunc0 || isFunc1) {
		const combinedFunc = (info) => {
			return joinClassNames(refineClassName(isFunc0 ? input0(info) : input0, optionName), refineClassName(isFunc1 ? input1(info) : input1, optionName));
		};
		combinedFunc.parts = [input0, input1];
		return combinedFunc;
	}
	return joinClassNames(refineClassName(input0, optionName), refineClassName(input1, optionName));
}
function mergeContentInjectors(contentGenerator0, contentGenerator1) {
	if (typeof contentGenerator1 === "function") {
		const combinedFunc = (renderProps) => {
			const res = contentGenerator1(renderProps);
			if (res === true) {
				if (typeof contentGenerator0 === "function") return contentGenerator0(renderProps);
				return contentGenerator0;
			}
			return res;
		};
		combinedFunc.parts = [contentGenerator0, contentGenerator1];
		return combinedFunc;
	}
	if (contentGenerator1 != null) return contentGenerator1;
	return contentGenerator0;
}
function mergeLifecycleCallbacks(fn0, fn1) {
	if (fn0 && fn1) {
		const combinedFunc = (...args) => {
			fn0(...args);
			fn1(...args);
		};
		combinedFunc.parts = [fn0, fn1];
		return combinedFunc;
	}
	return fn0 || fn1;
}
function isNonHandlerPropsEqual(obj0, obj1) {
	const keys = getUnequalProps(obj0, obj1);
	for (let key of keys) if (!handlerRe.test(key)) return false;
	return true;
}
function isMergedPropsEqual(val0, val1) {
	const parts0 = val0 && val0.parts;
	const parts1 = val1 && val1.parts;
	if (parts0 && parts1) {
		const count0 = parts0.length;
		if (count0 !== parts1.length) return false;
		for (let i = 0; i < count0; i++) if (!(parts0[i] === parts1[i] || isMergedPropsEqual(parts0[i], parts1[i]))) return false;
		return true;
	}
	return false;
}
var r;
var u;
var i;
var f = [];
var c = l$1;
var e = c.__b;
var a = c.__r;
var v = c.diffed;
var l = c.__c;
var m = c.unmount;
var p = c.__;
function j$1() {
	for (var n; n = f.shift();) {
		var t = n.__H;
		if (n.__P && t) try {
			t.__h.some(z), t.__h.some(B$1), t.__h = [];
		} catch (r) {
			t.__h = [], c.__e(r, n.__v);
		}
	}
}
c.__b = function(n) {
	r = null, e && e(n);
}, c.__ = function(n, t) {
	n && t.__k && t.__k.__m && (n.__m = t.__k.__m), p && p(n, t);
}, c.__r = function(n) {
	a && a(n);
	var i = (r = n.__c).__H;
	i && (u === r ? (i.__h = [], r.__h = [], i.__.some(function(n) {
		n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
	})) : (i.__h.some(z), i.__h.some(B$1), i.__h = [])), u = r;
}, c.diffed = function(n) {
	v && v(n);
	var t = n.__c;
	t && t.__H && (t.__H.__h.length && (1 !== f.push(t) && i === c.requestAnimationFrame || ((i = c.requestAnimationFrame) || w)(j$1)), t.__H.__.some(function(n) {
		n.u && (n.__H = n.u, n.u = void 0);
	})), u = r = null;
}, c.__c = function(n, t) {
	t.some(function(n) {
		try {
			n.__h.some(z), n.__h = n.__h.filter(function(n) {
				return !n.__ || B$1(n);
			});
		} catch (r) {
			t.some(function(n) {
				n.__h && (n.__h = []);
			}), t = [], c.__e(r, n.__v);
		}
	}), l && l(n, t);
}, c.unmount = function(n) {
	m && m(n);
	var t, r = n.__c;
	r && r.__H && (r.__H.__.some(function(n) {
		try {
			z(n);
		} catch (n) {
			t = n;
		}
	}), r.__H = void 0, t && c.__e(t, r.__v));
};
var k = "function" == typeof requestAnimationFrame;
function w(n) {
	var t, r = function() {
		clearTimeout(u), k && cancelAnimationFrame(t), setTimeout(n);
	}, u = setTimeout(r, 35);
	k && (t = requestAnimationFrame(r));
}
function z(n) {
	var t = r, u = n.__c;
	"function" == typeof u && (n.__c = void 0, u()), r = t;
}
function B$1(n) {
	var t = r;
	n.__c = n.__(), r = t;
}
//#endregion
//#region node_modules/preact/compat/dist/compat.module.js
function g(n, t) {
	for (var e in t) n[e] = t[e];
	return n;
}
function E(n, t) {
	for (var e in n) if ("__source" !== e && !(e in t)) return !0;
	for (var r in t) if ("__source" !== r && n[r] !== t[r]) return !0;
	return !1;
}
function M(n, t) {
	this.props = n, this.context = t;
}
(M.prototype = new C()).isPureReactComponent = !0, M.prototype.shouldComponentUpdate = function(n, t) {
	return E(this.props, n) || E(this.state, t);
};
var T = l$1.__b;
l$1.__b = function(n) {
	n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), T && T(n);
};
"undefined" != typeof Symbol && Symbol.for;
var O = l$1.__e;
l$1.__e = function(n, t, e, r) {
	if (n.then) {
		for (var u, o = t; o = o.__;) if ((u = o.__c) && u.__c) return t.__e ?? (t.__e = e.__e, t.__k = e.__k || []), u.__c(n, t);
	}
	O(n, t, e, r);
};
var U = l$1.unmount;
function V(n, t, e) {
	return n && (n.__c && n.__c.__H && (n.__c.__H.__.forEach(function(n) {
		"function" == typeof n.__c && n.__c();
	}), n.__c.__H = null), null != (n = g({}, n)).__c && (n.__c.__P === e && (n.__c.__P = t), n.__c.__e = !0, n.__c = null), n.__k = n.__k && n.__k.map(function(n) {
		return V(n, t, e);
	})), n;
}
function W(n, t, e) {
	return n && e && (n.__v = null, n.__k = n.__k && n.__k.map(function(n) {
		return W(n, t, e);
	}), n.__c && n.__c.__P === t && (n.__e && e.appendChild(n.__e), n.__c.__e = !0, n.__c.__P = e)), n;
}
function P() {
	this.__u = 0, this.o = null, this.__b = null;
}
function j(n) {
	var t = n.__ && n.__.__c;
	return t && t.__a && t.__a(n);
}
function B() {
	this.i = null, this.l = null;
}
l$1.unmount = function(n) {
	var t = n.__c;
	t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & n.__u && (n.type = null), U && U(n);
}, (P.prototype = new C()).__c = function(n, t) {
	var e = t.__c, r = this;
	r.o ??= [], r.o.push(e);
	var u = j(r.__v), o = !1, i = function() {
		o || r.__z || (o = !0, e.__R = null, u ? u(f) : f());
	};
	e.__R = i;
	var l = e.__P;
	e.__P = null;
	var f = function() {
		if (!--r.__u) {
			if (r.state.__a) {
				var n = r.state.__a;
				r.__v.__k[0] = W(n, n.__c.__P, n.__c.__O);
			}
			var t;
			for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = l, t.forceUpdate();
		}
	};
	r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), n.then(i, i);
}, P.prototype.componentWillUnmount = function() {
	this.o = [];
}, P.prototype.render = function(n, e) {
	if (this.__b) {
		if (this.__v.__k) {
			var r = document.createElement("div"), o = this.__v.__k[0].__c;
			this.__v.__k[0] = V(this.__b, r, o.__O = o.__P);
		}
		this.__b = null;
	}
	var i = e.__a && k$1(S, null, n.fallback);
	return i && (i.__u &= -33), [k$1(S, null, e.__a ? null : n.children), i];
};
var H = function(n, t, e) {
	if (++e[1] === e[0] && n.l.delete(t), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.l.size)) for (e = n.i; e;) {
		for (; e.length > 3;) e.pop()();
		if (e[1] < e[0]) break;
		n.i = e = e[2];
	}
};
function Z(n) {
	return this.getChildContext = function() {
		return n.context;
	}, n.children;
}
function Y(n) {
	var e = this, r = n.h;
	if (e.componentWillUnmount = function() {
		R(null, e.v), e.v = null, e.h = null;
	}, e.h && e.h !== r && e.componentWillUnmount(), !e.v) {
		for (var u = e.__v; null !== u && !u.__m && null !== u.__;) u = u.__;
		e.h = r, e.v = {
			nodeType: 1,
			parentNode: r,
			childNodes: [],
			__k: { __m: u.__m },
			contains: function() {
				return !0;
			},
			namespaceURI: r.namespaceURI,
			insertBefore: function(n, t) {
				this.childNodes.push(n), e.h.insertBefore(n, t);
			},
			removeChild: function(n) {
				this.childNodes.splice(this.childNodes.indexOf(n) >>> 1, 1), e.h.removeChild(n);
			}
		};
	}
	R(k$1(Z, { context: e.context }, n.__v), e.v);
}
function $(n, e) {
	var r = k$1(Y, {
		__v: n,
		h: e
	});
	return r.containerInfo = e, r;
}
(B.prototype = new C()).__a = function(n) {
	var t = this, e = j(t.__v), r = t.l.get(n);
	return r[0]++, function(u) {
		var o = function() {
			t.props.revealOrder ? (r.push(u), H(t, n, r)) : u();
		};
		e ? e(o) : o();
	};
}, B.prototype.render = function(n) {
	this.i = null, this.l = /* @__PURE__ */ new Map();
	var t = F(n.children);
	n.revealOrder && "b" === n.revealOrder[0] && t.reverse();
	for (var e = t.length; e--;) this.l.set(t[e], this.i = [
		1,
		0,
		this.i
	]);
	return n.children;
}, B.prototype.componentDidUpdate = B.prototype.componentDidMount = function() {
	var n = this;
	this.l.forEach(function(t, e) {
		H(n, e, t);
	});
};
var q = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
var G = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
var J = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
var K = /[A-Z0-9]/g;
var Q = "undefined" != typeof document;
var X = function(n) {
	return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n);
};
function nn(n, t, e) {
	return t.__k ?? (t.textContent = ""), R(n, t), "function" == typeof e && e(), n ? n.__c : null;
}
C.prototype.isReactComponent = !0, [
	"componentWillMount",
	"componentWillReceiveProps",
	"componentWillUpdate"
].forEach(function(t) {
	Object.defineProperty(C.prototype, t, {
		configurable: !0,
		get: function() {
			return this["UNSAFE_" + t];
		},
		set: function(n) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				value: n
			});
		}
	});
});
var en = l$1.event;
l$1.event = function(n) {
	return en && (n = en(n)), n.persist = function() {}, n.isPropagationStopped = function() {
		return this.cancelBubble;
	}, n.isDefaultPrevented = function() {
		return this.defaultPrevented;
	}, n.nativeEvent = n;
};
var un = {
	configurable: !0,
	get: function() {
		return this.class;
	}
};
var on = l$1.vnode;
l$1.vnode = function(n) {
	"string" == typeof n.type && function(n) {
		var t = n.props, e = n.type, u = {}, o = -1 == e.indexOf("-");
		for (var i in t) {
			var l = t[i];
			if (!("value" === i && "defaultValue" in t && null == l || Q && "children" === i && "noscript" === e || "class" === i || "className" === i)) {
				var f = i.toLowerCase();
				"defaultValue" === i && "value" in t && null == t.value ? i = "value" : "download" === i && !0 === l ? l = "" : "translate" === f && "no" === l ? l = !1 : "o" === f[0] && "n" === f[1] ? "ondoubleclick" === f ? i = "ondblclick" : "onchange" !== f || "input" !== e && "textarea" !== e || X(t.type) ? "onfocus" === f ? i = "onfocusin" : "onblur" === f ? i = "onfocusout" : J.test(i) && (i = f) : f = i = "oninput" : o && G.test(i) ? i = i.replace(K, "-$&").toLowerCase() : null === l && (l = void 0), "oninput" === f && u[i = f] && (i = "oninputCapture"), u[i] = l;
			}
		}
		"select" == e && (u.multiple && Array.isArray(u.value) && (u.value = F(t.children).forEach(function(n) {
			n.props.selected = -1 != u.value.indexOf(n.props.value);
		})), null != u.defaultValue && (u.value = F(t.children).forEach(function(n) {
			n.props.selected = u.multiple ? -1 != u.defaultValue.indexOf(n.props.value) : u.defaultValue == n.props.value;
		}))), t.class && !t.className ? (u.class = t.class, Object.defineProperty(u, "className", un)) : t.className && (u.class = u.className = t.className), n.props = u;
	}(n), n.$$typeof = q, on && on(n);
};
var ln = l$1.__r;
l$1.__r = function(n) {
	ln && ln(n), n.__c;
};
var fn = l$1.diffed;
l$1.diffed = function(n) {
	fn && fn(n);
	var t = n.props, e = n.__e;
	null != e && "textarea" === n.type && "value" in t && t.value !== e.value && (e.value = null == t.value ? "" : t.value);
};
function hn(n) {
	return !!n && n.$$typeof === q;
}
function pn(n) {
	return !!n.__k && (R(null, n), !0);
}
var bn = function(n, t) {
	var r, u = l$1.debounceRendering;
	l$1.debounceRendering = function(n) {
		r = n;
	};
	try {
		var o = n(t);
		return r && r(), o;
	} finally {
		l$1.debounceRendering = u;
	}
};
//#endregion
//#region node_modules/fullcalendar/chunks/66c53e04.js
function memoize(workerFunc, resEquality, teardownFunc) {
	let currentArgs;
	let currentRes;
	return function(...newArgs) {
		if (!currentArgs) currentRes = workerFunc.apply(this, newArgs);
		else if (!isArraysEqual(currentArgs, newArgs)) {
			if (teardownFunc) teardownFunc(currentRes);
			let res = workerFunc.apply(this, newArgs);
			if (!resEquality || !resEquality(res, currentRes)) currentRes = res;
		}
		currentArgs = newArgs;
		return currentRes;
	};
}
function memoizeObjArg(workerFunc, resEquality, teardownFunc) {
	let currentArg;
	let currentRes;
	return (newArg) => {
		if (!currentArg) currentRes = workerFunc.call(this, newArg);
		else if (!isPropsEqualShallow(currentArg, newArg)) {
			if (teardownFunc) teardownFunc(currentRes);
			let res = workerFunc.call(this, newArg);
			if (!resEquality || !resEquality(res, currentRes)) currentRes = res;
		}
		currentArg = newArg;
		return currentRes;
	};
}
var ViewContextType = X$1({});
function buildViewContext(viewSpec, viewApi, viewOptions, dateProfileGenerator, dateEnv, nowManager, pluginHooks, dispatch, getCurrentData, emitter, calendarApi, baseId, registerInteractiveComponent, unregisterInteractiveComponent) {
	return {
		dateEnv,
		nowManager,
		options: viewOptions,
		pluginHooks,
		emitter,
		dispatch,
		getCurrentData,
		calendarApi,
		viewSpec,
		viewApi,
		dateProfileGenerator,
		baseId,
		registerInteractiveComponent,
		unregisterInteractiveComponent
	};
}
var PureComponent = class extends C {
	shouldComponentUpdate(nextProps, nextState) {
		return !isPropsEqualWithMap(this.props, nextProps, this.propEquality) || !isPropsEqualWithMap(this.state, nextState, this.stateEquality);
	}
};
PureComponent.addPropsEquality = addPropsEquality;
PureComponent.addStateEquality = addStateEquality;
PureComponent.contextType = ViewContextType;
PureComponent.prototype.propEquality = {};
PureComponent.prototype.stateEquality = {};
var BaseComponent = class extends PureComponent {};
BaseComponent.contextType = ViewContextType;
function addPropsEquality(propEquality) {
	let hash = Object.create(this.prototype.propEquality);
	Object.assign(hash, propEquality);
	this.prototype.propEquality = hash;
}
function addStateEquality(stateEquality) {
	let hash = Object.create(this.prototype.stateEquality);
	Object.assign(hash, stateEquality);
	this.prototype.stateEquality = hash;
}
function setRef(ref, current) {
	if (typeof ref === "function") ref(current);
	else if (ref) ref.current = current;
}
var ContentInjector = class extends BaseComponent {
	constructor() {
		super(...arguments);
		this.id = guid();
		this.queuedDomNodes = [];
		this.currentDomNodes = [];
		this.handleEl = (el) => {
			this.el = el;
			if (this.props.elRef) setRef(this.props.elRef, el);
		};
	}
	render() {
		const { props, context } = this;
		const { options } = context;
		const { customGenerator, defaultGenerator, renderProps } = props;
		const attrs = buildElAttrs(props, "", this.handleEl);
		let useDefault = false;
		let innerContent;
		let queuedDomNodes = [];
		let currentGeneratorMeta;
		if (customGenerator != null) {
			const customGeneratorRes = typeof customGenerator === "function" ? customGenerator(renderProps) : customGenerator;
			if (customGeneratorRes === true) useDefault = true;
			else {
				const isObject = customGeneratorRes && typeof customGeneratorRes === "object";
				if (isObject && "html" in customGeneratorRes) attrs.dangerouslySetInnerHTML = { __html: customGeneratorRes.html };
				else if (isObject && "domNodes" in customGeneratorRes) queuedDomNodes = Array.prototype.slice.call(customGeneratorRes.domNodes);
				else if (isObject ? hn(customGeneratorRes) : typeof customGeneratorRes !== "function") innerContent = customGeneratorRes;
				else currentGeneratorMeta = customGeneratorRes;
			}
		} else useDefault = !hasCustomRenderingHandler(props.generatorName, options);
		if (useDefault && defaultGenerator) innerContent = defaultGenerator(renderProps);
		this.queuedDomNodes = queuedDomNodes;
		this.currentGeneratorMeta = currentGeneratorMeta;
		return k$1(props.tag, attrs, innerContent);
	}
	componentDidMount() {
		this.applyQueueudDomNodes();
		this.triggerCustomRendering(true);
	}
	componentDidUpdate() {
		this.applyQueueudDomNodes();
		this.triggerCustomRendering(true);
	}
	componentWillUnmount() {
		this.triggerCustomRendering(false);
	}
	triggerCustomRendering(isActive) {
		const { props, context } = this;
		const { handleCustomRendering, customRenderingMetaMap } = context.options;
		if (handleCustomRendering) {
			const generatorMeta = this.currentGeneratorMeta ?? customRenderingMetaMap?.[props.generatorName];
			if (generatorMeta) handleCustomRendering({
				id: this.id,
				isActive,
				containerEl: this.el,
				generatorMeta,
				renderProps: props.renderProps
			});
		}
	}
	applyQueueudDomNodes() {
		const { queuedDomNodes, currentDomNodes } = this;
		const { el } = this;
		if (!isArraysEqual(queuedDomNodes, currentDomNodes)) {
			for (const domNode of currentDomNodes) domNode.remove();
			for (let newNode of queuedDomNodes) el.appendChild(newNode);
			this.currentDomNodes = queuedDomNodes;
		}
	}
};
ContentInjector.addPropsEquality({
	renderProps: isPropsEqualShallow,
	attrs: isNonHandlerPropsEqual,
	style: isPropsEqualShallow
});
function hasCustomRenderingHandler(generatorName, options) {
	return Boolean(options.handleCustomRendering && generatorName && options.customRenderingMetaMap?.[generatorName]);
}
function buildElAttrs(props, className, elRef) {
	const attrs = {
		...props.attrs,
		ref: elRef
	};
	if (props.className || className) attrs.className = joinClassNames(className, props.className, attrs.className);
	if (props.style) attrs.style = props.style;
	return attrs;
}
var RenderId = X$1(0);
var ContentContainer = class extends C {
	constructor() {
		super(...arguments);
		this.InnerContent = InnerContentInjector.bind(void 0, this);
		this.handleEl = (el) => {
			this.el = el;
			if (this.props.elRef) {
				setRef(this.props.elRef, el);
				if (el && this.didMountMisfire) this.componentDidMount();
			}
		};
	}
	render() {
		const { props } = this;
		const generatedClassName = generateClassName(props.classNameGenerator, props.renderProps);
		if (props.children) {
			const attrs = buildElAttrs(props, generatedClassName, this.handleEl);
			const children = props.children(this.InnerContent, props.renderProps, attrs);
			if (props.tag) return k$1(props.tag, attrs, children);
			else return children;
		} else return k$1(ContentInjector, {
			...props,
			elRef: this.handleEl,
			tag: props.tag || "div",
			className: joinClassNames(props.className, generatedClassName),
			renderId: this.context
		});
	}
	componentDidMount() {
		if (this.el) this.props.didMount?.({
			...this.props.renderProps,
			el: this.el
		});
		else this.didMountMisfire = true;
	}
	componentWillUnmount() {
		this.props.willUnmount?.({
			...this.props.renderProps,
			el: this.el
		});
	}
};
ContentContainer.contextType = RenderId;
function InnerContentInjector(containerComponent, props) {
	const parentProps = containerComponent.props;
	return k$1(ContentInjector, {
		renderProps: parentProps.renderProps,
		generatorName: parentProps.generatorName,
		customGenerator: parentProps.customGenerator,
		defaultGenerator: parentProps.defaultGenerator,
		renderId: containerComponent.context,
		...props
	});
}
function generateClassName(classNameGenerator, renderProps) {
	return (typeof classNameGenerator === "function" ? classNameGenerator(renderProps) : classNameGenerator) || "";
}
function renderText(renderProps) {
	return renderProps.text;
}
function getIsHeightAuto(options) {
	return options.height === "auto" || options.contentHeight === "auto";
}
function getTableHeaderSticky(options) {
	let { tableHeaderSticky } = options;
	if (tableHeaderSticky == null || tableHeaderSticky === "auto") tableHeaderSticky = getIsHeightAuto(options);
	return tableHeaderSticky;
}
function getFooterScrollbarSticky(options) {
	const isHeightAuto = getIsHeightAuto(options);
	let { footerScrollbarSticky } = options;
	if (footerScrollbarSticky == null || footerScrollbarSticky === "auto") footerScrollbarSticky = isHeightAuto;
	return Boolean(footerScrollbarSticky) && isHeightAuto;
}
function getScrollerSyncerClass(pluginHooks) {
	const ScrollerSyncer = pluginHooks.scrollerSyncerClass;
	if (!ScrollerSyncer) throw new RangeError("Must import @fullcalendar/scrollgrid");
	return ScrollerSyncer;
}
var NowTimerRunner = class {
	constructor(handleChange) {
		this.handleChange = handleChange;
		this.isMounted = false;
		this.handleRefresh = () => {
			let timing = this.computeTiming();
			if (timing.nowDate.valueOf() !== this.nowDate.valueOf()) {
				this.nowDate = timing.nowDate;
				this.todayRange = timing.todayRange;
				this.handleChange();
			}
			this.clearTimeout();
			this.setTimeout(timing.waitMs);
		};
		this.handleVisibilityChange = () => {
			if (!document.hidden) this.handleRefresh();
		};
	}
	update(input) {
		if (!this.isMounted) {
			this.isMounted = true;
			this.unit = input.unit;
			this.unitValue = input.unitValue;
			this.nowIndicatorSnap = input.nowIndicatorSnap;
			this.nowManager = input.nowManager;
			this.dateEnv = input.dateEnv;
			const timing = this.computeTiming();
			this.nowDate = timing.nowDate;
			this.todayRange = timing.todayRange;
			this.setTimeout();
			this.nowManager.addResetListener(this.handleRefresh);
			if (typeof document !== "undefined") document.addEventListener("visibilitychange", this.handleVisibilityChange);
		} else if (input.unit !== this.unit || input.unitValue !== this.unitValue || input.nowIndicatorSnap !== this.nowIndicatorSnap || input.nowManager !== this.nowManager || input.dateEnv !== this.dateEnv) {
			this.unit = input.unit;
			this.unitValue = input.unitValue;
			this.nowIndicatorSnap = input.nowIndicatorSnap;
			this.nowManager = input.nowManager;
			this.dateEnv = input.dateEnv;
			this.clearTimeout();
			this.setTimeout();
		}
		return {
			nowDate: this.nowDate,
			todayRange: this.todayRange
		};
	}
	destroy() {
		if (this.isMounted) {
			this.isMounted = false;
			this.clearTimeout();
			this.nowManager.removeResetListener(this.handleRefresh);
			if (typeof document !== "undefined") document.removeEventListener("visibilitychange", this.handleVisibilityChange);
		}
	}
	computeTiming() {
		let unroundedNow = this.nowManager.getDateMarker();
		let { unit, unitValue, nowIndicatorSnap, dateEnv } = this;
		if (nowIndicatorSnap === "auto") nowIndicatorSnap = /year|month|week|day/.test(unit) || (unitValue || 1) === 1;
		let nowDate;
		let waitMs;
		if (nowIndicatorSnap) {
			nowDate = dateEnv.startOf(unroundedNow, unit);
			waitMs = dateEnv.add(nowDate, createDuration(1, unit)).valueOf() - unroundedNow.valueOf();
		} else {
			nowDate = unroundedNow;
			waitMs = 1e3 * 60;
		}
		waitMs = Math.min(1e3 * 60 * 60 * 24, waitMs);
		return {
			nowDate,
			todayRange: buildDayRange(nowDate),
			waitMs
		};
	}
	setTimeout(waitMs = this.computeTiming().waitMs) {
		this.timeoutId = setTimeout(() => {
			const timing = this.computeTiming();
			this.nowDate = timing.nowDate;
			this.todayRange = timing.todayRange;
			this.handleChange();
			this.setTimeout(timing.waitMs);
		}, waitMs);
	}
	clearTimeout() {
		if (this.timeoutId) clearTimeout(this.timeoutId);
	}
};
function buildDayRange(date) {
	let start = startOfDay(date);
	return {
		start,
		end: addDays(start, 1)
	};
}
var NowTimer = class extends C {
	constructor(props, context) {
		super(props, context);
		this.handleChange = () => {
			this.forceUpdate();
		};
		this.runner = new NowTimerRunner(this.handleChange);
	}
	render() {
		const { props, context } = this;
		const { nowDate, todayRange } = this.runner.update({
			nowManager: context.nowManager,
			unit: props.unit,
			unitValue: props.unitValue,
			nowIndicatorSnap: context.options.nowIndicatorSnap,
			dateEnv: context.dateEnv
		});
		return props.children(nowDate, todayRange);
	}
	componentWillUnmount() {
		this.runner.destroy();
	}
};
NowTimer.contextType = ViewContextType;
var FULL_DATE_FORMAT = createFormatter({
	year: "numeric",
	month: "long",
	day: "numeric"
});
var WEEK_FORMAT = createFormatter({ week: "long" });
var WEEKDAY_ONLY_FORMAT = createFormatter({ weekday: "long" });
function findWeekdayText(parts) {
	for (const part of parts) if (part.type === "weekday") return part.value;
	return "";
}
function findDayNumberText(parts) {
	for (const part of parts) if (part.type === "day") return part.value;
	return "";
}
function findMonthText(parts) {
	for (const part of parts) if (part.type === "month") return part.value;
	return "";
}
function buildDateStr(context, dateMarker, viewType = "day") {
	return joinDateTimeFormatParts(context.dateEnv.formatToParts(dateMarker, viewType === "week" ? WEEK_FORMAT : FULL_DATE_FORMAT));
}
function buildNavLinkAttrs(context, dateMarker, viewType = "day", dateStr = buildDateStr(context, dateMarker, viewType), isTabbable = true) {
	const { dateEnv, options, calendarApi } = context;
	const zonedDate = dateEnv.toDate(dateMarker);
	const handleInteraction = (ev) => {
		let customAction = viewType === "day" ? options.navLinkDayClick : viewType === "week" ? options.navLinkWeekClick : null;
		if (typeof customAction === "function") customAction.call(calendarApi, dateEnv.toDate(dateMarker), ev);
		else {
			if (typeof customAction === "string") viewType = customAction;
			calendarApi.zoomTo(dateMarker, viewType);
		}
	};
	return {
		"role": "link",
		"aria-label": formatWithOrdinals(options.navLinkHint, [dateStr, zonedDate], dateStr),
		"className": joinClassNames(options.navLinkClass, classNames.cursorPointer, classNames.internalNavLink),
		...isTabbable ? createAriaClickAttrs(handleInteraction) : { onClick: handleInteraction }
	};
}
function getDateMeta(dateMarker, dateEnv, dateProfile, todayRange, nowDate) {
	const isDisabled = Boolean(dateProfile && (!dateProfile.activeRange || !rangeContainsMarker(dateProfile.activeRange, dateMarker)));
	return {
		date: dateEnv.toDate(dateMarker),
		dow: dateMarker.getUTCDay(),
		isDisabled,
		isOther: !isDisabled && Boolean(dateProfile && !rangeContainsMarker(dateProfile.currentRange, dateMarker)),
		isToday: !isDisabled && Boolean(todayRange && rangeContainsMarker(todayRange, dateMarker)),
		isPast: !isDisabled && Boolean(nowDate ? dateMarker < nowDate : todayRange ? dateMarker < todayRange.start : false),
		isFuture: !isDisabled && Boolean(nowDate ? dateMarker > nowDate : todayRange ? dateMarker >= todayRange.end : false)
	};
}
function isDimsEqual(v0, v1) {
	return v0 != null && (v0 === v1 || Math.abs(v0 - v1) < .01);
}
var nativeBorderBoxEnabled = true;
var configMap = /* @__PURE__ */ new Map();
var afterSizeCallbacks = /* @__PURE__ */ new Set();
var isHandling = false;
var isStalling = false;
function afterSize(callback) {
	afterSizeCallbacks.add(callback);
	if (!isHandling && !isStalling) {
		isStalling = true;
		requestAnimationFrame(() => {
			isStalling = false;
			flushAfterSize();
		});
	}
}
function flushAfterSize() {
	for (const flushedCallback of afterSizeCallbacks.values()) {
		flushedCallback();
		afterSizeCallbacks.delete(flushedCallback);
	}
}
var globalResizeObserver = typeof ResizeObserver !== "undefined" && new ResizeObserver((entries) => {
	isHandling = true;
	for (let entry of entries) {
		const el = entry.target;
		const config = configMap.get(el);
		let width;
		let height;
		if (entry.borderBoxSize && nativeBorderBoxEnabled) {
			const borderBoxSize = entry.borderBoxSize[0] || entry.borderBoxSize;
			width = borderBoxSize.inlineSize;
			height = borderBoxSize.blockSize;
		} else ({width, height} = el.getBoundingClientRect());
		let shouldFire = false;
		if (!isDimsEqual(config.width, width)) {
			config.width = width;
			shouldFire = config.watchWidth;
		}
		if (!isDimsEqual(config.height, height)) {
			config.height = height;
			shouldFire || (shouldFire = config.watchHeight);
		}
		if (shouldFire) config.callback(width, height);
	}
	bn(() => {
		flushAfterSize();
		isHandling = false;
	});
});
function watchSize(el, callback, watchWidth = true, watchHeight = true) {
	configMap.set(el, {
		callback,
		watchWidth,
		watchHeight
	});
	if (globalResizeObserver) globalResizeObserver.observe(el, { box: "border-box" });
	return () => {
		configMap.delete(el);
		if (globalResizeObserver) globalResizeObserver.unobserve(el);
	};
}
function watchWidth(el, callback) {
	return watchSize(el, callback, true);
}
function watchHeight(el, callback) {
	return watchSize(el, (_width, height) => callback(height), false, true);
}
var ViewContainer = class extends BaseComponent {
	constructor() {
		super(...arguments);
		this.refineRenderProps = memoizeObjArg(refineRenderProps);
	}
	render() {
		const { props, context } = this;
		const { options, viewSpec } = context;
		const renderProps = this.refineRenderProps({
			...computeViewBorderless(options),
			options: {
				headerToolbar: options.headerToolbar,
				footerToolbar: options.footerToolbar
			},
			isHeightAuto: getIsHeightAuto(options),
			viewApi: context.viewApi
		});
		return u$1(ContentContainer, {
			elRef: props.elRef,
			tag: props.tag || "div",
			attrs: props.attrs,
			style: props.style,
			className: joinClassNames(props.className, generateClassName(options.viewClass, renderProps), generateClassName(viewSpec.optionDefaults.class, renderProps), generateClassName(viewSpec.optionDefaults.className, renderProps), generateClassName(viewSpec.optionOverrides.class, renderProps), generateClassName(viewSpec.optionOverrides.className, renderProps)),
			renderProps,
			generatorName: void 0,
			didMount: options.didMount || options.viewDidMount,
			willUnmount: options.willUnmount || options.viewWillUnmount,
			children: () => props.children
		});
	}
};
function refineRenderProps(raw) {
	return {
		view: raw.viewApi,
		borderlessX: raw.borderlessX,
		borderlessTop: raw.borderlessTop,
		borderlessBottom: raw.borderlessBottom,
		options: raw.options,
		isHeightAuto: raw.isHeightAuto
	};
}
var DateComponent = class extends BaseComponent {
	constructor() {
		super(...arguments);
		this.uid = guid();
	}
	prepareHits() {}
	queryHit(isRtl, positionLeft, positionTop, elWidth, elHeight) {
		return null;
	}
	isValidSegDownEl(el) {
		return !this.props.eventDrag && !this.props.eventResize && !el.closest(`.${classNames.internalEventMirror}`);
	}
	isValidDateDownEl(el) {
		return !el.closest(`.${classNames.internalEvent}:not(.${classNames.internalBgEvent})`) && !el.closest(`.${classNames.internalMoreLink}`) && !el.closest(`.${classNames.internalNavLink}`) && !el.closest(`.${classNames.internalPopover}`);
	}
};
var DelayedRunner = class {
	constructor(drainedOption) {
		this.drainedOption = drainedOption;
		this.isRunning = false;
		this.isDirty = false;
		this.pauseDepths = {};
		this.timeoutId = 0;
	}
	request(delay) {
		this.isDirty = true;
		if (!this.isPaused()) {
			this.clearTimeout();
			if (delay == null) this.tryDrain();
			else this.timeoutId = setTimeout(this.tryDrain.bind(this), delay);
		}
	}
	pause(scope = "") {
		let { pauseDepths } = this;
		pauseDepths[scope] = (pauseDepths[scope] || 0) + 1;
		this.clearTimeout();
	}
	resume(scope = "", force) {
		let { pauseDepths } = this;
		if (scope in pauseDepths) {
			if (force) delete pauseDepths[scope];
			else {
				pauseDepths[scope] -= 1;
				if (pauseDepths[scope] <= 0) delete pauseDepths[scope];
			}
			this.tryDrain();
		}
	}
	isPaused() {
		return Object.keys(this.pauseDepths).length;
	}
	tryDrain() {
		if (!this.isRunning && !this.isPaused()) {
			this.isRunning = true;
			while (this.isDirty) {
				this.isDirty = false;
				this.drained();
			}
			this.isRunning = false;
		}
	}
	clear() {
		this.clearTimeout();
		this.isDirty = false;
		this.pauseDepths = {};
	}
	clearTimeout() {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
			this.timeoutId = 0;
		}
	}
	drained() {
		if (this.drainedOption) this.drainedOption();
	}
};
var ScrollListener = class {
	constructor(el) {
		this.el = el;
		this.emitter = new Emitter();
		this.isScroll = false;
		this.isScrollRecent = false;
		this.isWheelRecent = false;
		this.isMouseDown = false;
		this.isTouchDown = false;
		this.isMouse = false;
		this.isTouch = false;
		this.isWheel = false;
		this.handleScroll = () => {
			this.isScrollRecent = true;
			if (this.isMouseDown) this.isMouse = true;
			if (this.isTouchDown) this.isTouch = true;
			if (this.isWheelRecent) this.isWheel = true;
			this.startScroll();
			this.emitter.trigger("scroll", this.getIsDevice());
			this.scrollWaiter.request(500);
		};
		this.handleScrollWait = () => {
			this.isScrollRecent = false;
			if (!this.isTouchDown) this.endScroll();
		};
		this.handleWheel = () => {
			this.isWheelRecent = true;
			this.wheelWaiter.request(500);
		};
		this.handleWheelWait = () => {
			this.isWheelRecent = false;
		};
		this.handleMouseDown = () => {
			this.isMouseDown = true;
		};
		this.handleMouseUp = () => {
			this.isMouseDown = false;
		};
		this.handleTouchStart = () => {
			this.isTouchDown = true;
		};
		this.handleTouchEnd = () => {
			this.isTouchDown = false;
			if (!this.isScrollRecent) this.endScroll();
		};
		this.wheelWaiter = new DelayedRunner(this.handleWheelWait);
		this.scrollWaiter = new DelayedRunner(this.handleScrollWait);
		el.addEventListener("scroll", this.handleScroll, { passive: true });
		el.addEventListener("wheel", this.handleWheel, { passive: true });
		el.addEventListener("mousedown", this.handleMouseDown);
		el.addEventListener("mouseup", this.handleMouseUp);
		el.addEventListener("touchstart", this.handleTouchStart, { passive: true });
		el.addEventListener("touchend", this.handleTouchEnd);
	}
	destroy() {
		let { el } = this;
		el.removeEventListener("scroll", this.handleScroll, { passive: true });
		el.removeEventListener("wheel", this.handleWheel, { passive: true });
		el.removeEventListener("mousedown", this.handleMouseDown);
		el.removeEventListener("mouseup", this.handleMouseUp);
		el.removeEventListener("touchstart", this.handleTouchStart, { passive: true });
		el.removeEventListener("touchend", this.handleTouchEnd);
	}
	startScroll() {
		if (!this.isScroll) {
			this.isScroll = true;
			this.emitter.trigger("scrollStart", this.getIsDevice());
		}
	}
	endScroll() {
		if (this.isScroll) {
			this.scrollWaiter.clear();
			this.wheelWaiter.clear();
			this.isScroll = false;
			this.isWheelRecent = false;
			this.emitter.trigger("scrollEnd", this.getIsDevice());
			this.isMouse = false;
			this.isTouch = false;
			this.isWheel = false;
		}
	}
	getIsDevice() {
		return this.isWheel || this.isMouse || this.isTouch;
	}
};
var Scroller = class extends DateComponent {
	constructor() {
		super(...arguments);
		this.handleEl = (el) => {
			if (this.el) {
				this.el = null;
				this._isUnmounting = true;
				this.listener.destroy();
			}
			if (el) {
				this.el = el;
				this._isUnmounting = false;
				this.listener = new ScrollListener(el);
			}
		};
		this.handleHRuler = (el) => {
			if (this.disconnectHRuler) {
				this.disconnectHRuler();
				this.disconnectHRuler = void 0;
				if (this.clientWidth !== void 0) {
					this.clientWidth = void 0;
					setRef(this.props.clientWidthRef, null);
				}
			}
			if (el) this.disconnectHRuler = watchWidth(el, (clientWidth) => {
				if (this._isUnmounting) return;
				if (clientWidth !== this.clientWidth) {
					this.clientWidth = clientWidth;
					setRef(this.props.clientWidthRef, clientWidth);
				}
			});
		};
		this.handleVRuler = (el) => {
			if (this.disconnectVRuler) {
				this.disconnectVRuler();
				this.disconnectVRuler = void 0;
				if (this.clientHeight !== void 0) {
					this.clientHeight = void 0;
					setRef(this.props.clientHeightRef, null);
				}
			}
			if (el) this.disconnectVRuler = watchHeight(el, (clientHeight) => {
				if (this._isUnmounting) return;
				if (clientHeight !== this.clientHeight) {
					this.clientHeight = clientHeight;
					setRef(this.props.clientHeightRef, clientHeight);
				}
				const bottomScrollbarWidth = Math.round(this.el.getBoundingClientRect().height - clientHeight);
				if (bottomScrollbarWidth !== this.bottomScrollbarWidth) {
					this.bottomScrollbarWidth = bottomScrollbarWidth;
					setRef(this.props.bottomScrollbarWidthRef, bottomScrollbarWidth);
				}
			});
		};
	}
	render() {
		const { props } = this;
		const fallbackOverflow = props.horizontal || props.vertical ? "hidden" : "";
		return u$1("div", {
			ref: this.handleEl,
			className: joinClassNames(props.className, classNames.noPadding, classNames.rel, props.hideScrollbars && classNames.noScrollbars, classNames.internalScroller),
			style: {
				...props.style,
				overflowX: props.horizontal ? "auto" : fallbackOverflow,
				overflowY: props.vertical ? "auto" : fallbackOverflow
			},
			children: [
				props.children,
				Boolean(props.clientWidthRef) && u$1("div", {
					ref: this.handleHRuler,
					className: classNames.fillTop
				}),
				Boolean(props.clientHeightRef || props.bottomScrollbarWidthRef) && u$1("div", {
					ref: this.handleVRuler,
					className: classNames.fillStart
				})
			]
		});
	}
	endScroll() {
		this.listener.endScroll();
	}
	get x() {
		const { el } = this;
		return el ? getNormalizedScrollX(el) : 0;
	}
	get y() {
		const { el } = this;
		return el ? el.scrollTop : 0;
	}
	scrollTo({ x, y }) {
		const { el } = this;
		if (el) {
			if (y != null) el.scrollTop = y;
			if (x != null) setNormalizedScrollX(el, x);
		}
	}
	addScrollStartListener(handler) {
		this.listener.emitter.on("scrollStart", handler);
	}
	removeScrollStartListener(handler) {
		this.listener.emitter.off("scrollStart", handler);
	}
	addScrollEndListener(handler) {
		this.listener.emitter.on("scrollEnd", handler);
	}
	removeScrollEndListener(handler) {
		this.listener.emitter.off("scrollEnd", handler);
	}
};
function getNormalizedScrollX(el) {
	const { scrollLeft } = el;
	return computeElIsRtl(el) ? getNormalizedRtlScrollX(scrollLeft, el) : scrollLeft;
}
function setNormalizedScrollX(el, x) {
	el.scrollLeft = computeElIsRtl(el) ? getNormalizedRtlScrollLeft(x, el) : x;
}
function getNormalizedRtlScrollX(scrollLeft, el) {
	switch (getRtlScrollerSystem()) {
		case "positive": return el.scrollWidth - el.clientWidth - scrollLeft;
		case "negative": return -scrollLeft;
	}
	return scrollLeft;
}
function getNormalizedRtlScrollLeft(x, el) {
	switch (getRtlScrollerSystem()) {
		case "positive": return el.scrollWidth - el.clientWidth - x;
		case "negative": return -x;
	}
	return x;
}
var _rtlScrollerSystem;
function getRtlScrollerSystem() {
	return _rtlScrollerSystem || (_rtlScrollerSystem = detectRtlScrollerSystem());
}
function detectRtlScrollerSystem() {
	let el = document.createElement("div");
	el.style.position = "absolute";
	el.style.top = "-1000px";
	el.style.width = "100px";
	el.style.height = "100px";
	el.style.overflow = "scroll";
	el.style.direction = "rtl";
	let innerEl = document.createElement("div");
	innerEl.style.width = "200px";
	innerEl.style.height = "200px";
	el.appendChild(innerEl);
	document.body.appendChild(el);
	let system;
	if (el.scrollLeft > 0) system = "positive";
	else {
		el.scrollLeft = 50;
		if (el.scrollLeft > 0) system = "reverse";
		else system = "negative";
	}
	el.remove();
	return system;
}
var StandardEvent = class extends BaseComponent {
	constructor() {
		super(...arguments);
		this.buildPublicEvent = memoize((context, eventDef, eventInstance) => new EventImpl(context, eventDef, eventInstance));
		this.handleEl = (el) => {
			this.el = el;
			setRef(this.props.elRef, el);
			if (el) setElEventRange(el, this.props.eventRange);
		};
	}
	render() {
		const { props, context } = this;
		const { options } = context;
		const { eventRange } = props;
		const eventUi = eventRange.ui;
		const timeFormat = options.eventTimeFormat || props.defaultTimeFormat;
		const timeText = props.forcedTimeText ?? buildEventRangeTimeText(timeFormat, eventRange, props.slicedStart, props.slicedEnd, props.isStart, props.isEnd, context, props.defaultDisplayEventTime, props.defaultDisplayEventEnd);
		const [tag, attrs, isInteractive] = getEventTagAndAttrs(eventRange, context);
		const eventApi = this.buildPublicEvent(context, eventRange.def, eventRange.instance);
		const isDraggable = !props.disableDragging && computeEventRangeDraggable(eventRange, context);
		const isBlock = /row|column/.test(props.display);
		const subcontentRenderProps = {
			event: eventApi,
			isNarrow: props.isNarrow || false,
			isShort: props.isShort || false,
			timeText
		};
		const renderProps = {
			event: eventApi,
			view: context.viewApi,
			timeText,
			color: eventUi.color || options.eventColor,
			contrastColor: eventUi.contrastColor || options.eventContrastColor,
			isDraggable,
			isStartResizable: !props.disableResizing && props.isStart && eventUi.durationEditable && options.eventResizableFromStart,
			isEndResizable: !props.disableResizing && props.isEnd && eventUi.durationEditable,
			isMirror: props.isMirror,
			isStart: Boolean(props.isStart),
			isEnd: Boolean(props.isEnd),
			isFirst: Boolean(props.isFirst),
			isLast: Boolean(props.isLast),
			isPast: Boolean(props.isPast),
			isFuture: Boolean(props.isFuture),
			isToday: Boolean(props.isToday),
			isSelected: Boolean(props.isSelected),
			isDragging: Boolean(props.isDragging),
			isResizing: Boolean(props.isResizing),
			isInteractive,
			isNarrow: props.isNarrow || false,
			isShort: props.isShort || false,
			level: props.level || 0,
			timeClass: joinClassNames(generateClassName(options.eventTimeClass, subcontentRenderProps), isBlock && generateClassName(options.blockEventTimeClass, subcontentRenderProps), props.display === "row" && generateClassName(options.rowEventTimeClass, subcontentRenderProps), props.display === "column" && generateClassName(options.columnEventTimeClass, subcontentRenderProps), props.display === "list-item" && generateClassName(options.listItemEventTimeClass, subcontentRenderProps)),
			titleClass: joinClassNames(generateClassName(options.eventTitleClass, subcontentRenderProps), isBlock && generateClassName(options.blockEventTitleClass, subcontentRenderProps), props.display === "row" && generateClassName(options.rowEventTitleClass, subcontentRenderProps), props.display === "column" && generateClassName(options.columnEventTitleClass, subcontentRenderProps), props.display === "list-item" && generateClassName(options.listItemEventTitleClass, subcontentRenderProps), props.display === "row" && options.rowEventTitleSticky && classNames.stickyS, props.display === "column" && options.columnEventTitleSticky && classNames.stickyT),
			options: { eventOverlap: Boolean(options.eventOverlap) }
		};
		const outerClassName = joinClassNames(isBlock && generateClassName(options.blockEventClass, renderProps), props.display === "row" && generateClassName(options.rowEventClass, renderProps), props.display === "column" && generateClassName(options.columnEventClass, renderProps), props.display === "list-item" && generateClassName(options.listItemEventClass, renderProps), eventUi.className, props.className, props.display === "column" ? classNames.flexCol : classNames.flexRow, (eventRange.def.url || isDraggable) && classNames.cursorPointer, classNames.internalEvent, props.isMirror && classNames.internalEventMirror, isDraggable && classNames.internalEventDraggable, renderProps.isSelected && classNames.internalEventSelected, (renderProps.isStartResizable || renderProps.isEndResizable) && classNames.internalEventResizable);
		const beforeClassName = joinClassNames(generateClassName(options.eventBeforeClass, renderProps), isBlock && generateClassName(options.blockEventBeforeClass, renderProps), props.display === "row" && generateClassName(options.rowEventBeforeClass, renderProps), props.display === "column" && generateClassName(options.columnEventBeforeClass, renderProps), props.display === "list-item" && generateClassName(options.listItemEventBeforeClass, renderProps));
		const afterClassName = joinClassNames(generateClassName(options.eventAfterClass, renderProps), isBlock && generateClassName(options.blockEventAfterClass, renderProps), props.display === "row" && generateClassName(options.rowEventAfterClass, renderProps), props.display === "column" && generateClassName(options.columnEventAfterClass, renderProps), props.display === "list-item" && generateClassName(options.listItemEventAfterClass, renderProps));
		const innerClassName = joinClassNames(generateClassName(options.eventInnerClass, renderProps), isBlock && generateClassName(options.blockEventInnerClass, renderProps), props.display === "row" && generateClassName(options.rowEventInnerClass, renderProps), props.display === "column" && generateClassName(options.columnEventInnerClass, renderProps), props.display === "list-item" && generateClassName(options.listItemEventInnerClass, renderProps), !props.disableLiquid && classNames.liquid);
		const beforeContent = props.display === "row" && options.rowEventBeforeContent;
		const afterContent = props.display === "row" && options.rowEventAfterContent;
		return u$1(ContentContainer, {
			tag,
			attrs: {
				...props.attrs,
				...attrs,
				dir: props.isDragging && options.direction === "rtl" ? "rtl" : void 0
			},
			className: outerClassName,
			style: {
				"--fc-event-color": renderProps.color,
				"--fc-event-contrast-color": renderProps.contrastColor
			},
			elRef: this.handleEl,
			renderProps,
			generatorName: "eventContent",
			customGenerator: options.eventContent,
			defaultGenerator: renderInnerContent,
			classNameGenerator: options.eventClass,
			didMount: options.eventDidMount,
			willUnmount: options.eventWillUnmount,
			children: (InnerContent) => u$1(S, { children: [
				Boolean(renderProps.isSelected && isBlock) && u$1("div", { className: props.display === "column" ? classNames.hitX : classNames.hitY }),
				(beforeClassName || beforeContent) && u$1("div", {
					className: joinClassNames(beforeClassName, !props.disableZindexes && classNames.z1, renderProps.isStartResizable && joinClassNames(props.display === "column" ? classNames.cursorResizeT : classNames.cursorResizeS, classNames.internalEventResizer, classNames.internalEventResizerStart)),
					children: [beforeContent && u$1(ContentContainer, {
						tag: "div",
						style: { display: "contents" },
						attrs: { "aria-hidden": true },
						renderProps,
						generatorName: void 0,
						customGenerator: beforeContent
					}), Boolean(renderProps.isStartResizable && renderProps.isSelected) && u$1("div", { className: classNames.hit })]
				}),
				u$1(InnerContent, {
					tag: "div",
					className: joinClassNames(innerClassName, !props.disableZindexes && classNames.z0)
				}),
				(afterClassName || afterContent) && u$1("div", {
					className: joinClassNames(afterClassName, !props.disableZindexes && classNames.z1, renderProps.isEndResizable && joinClassNames(props.display === "column" ? classNames.cursorResizeB : classNames.cursorResizeE, classNames.internalEventResizer, classNames.internalEventResizerEnd)),
					children: [afterContent && u$1(ContentContainer, {
						tag: "div",
						style: { display: "contents" },
						attrs: { "aria-hidden": true },
						renderProps,
						generatorName: void 0,
						customGenerator: afterContent
					}), Boolean(renderProps.isEndResizable && renderProps.isSelected) && u$1("div", { className: classNames.hit })]
				})
			] })
		});
	}
	componentDidUpdate(prevProps) {
		if (this.el && this.props.eventRange !== prevProps.eventRange) setElEventRange(this.el, this.props.eventRange);
	}
};
StandardEvent.addPropsEquality({ seg: isPropsEqualShallow });
function renderInnerContent(innerProps) {
	return u$1(S, { children: [innerProps.timeText && u$1("div", {
		className: innerProps.timeClass,
		children: innerProps.timeText
	}), u$1("div", {
		className: innerProps.titleClass,
		children: innerProps.event.title || u$1(S, { children: "\xA0" })
	})] });
}
//#endregion
//#region node_modules/fullcalendar/chunks/ad0c00be.js
var DateProfileGenerator = class {
	constructor(props) {
		this.props = props;
		this.initHiddenDays();
	}
	buildPrev(currentDateProfile, currentDate, nowDate, forceToValid) {
		let { dateEnv } = this.props;
		let prevDate = dateEnv.subtract(dateEnv.startOf(currentDate, currentDateProfile.currentRangeUnit), currentDateProfile.dateIncrement);
		return this.build(prevDate, nowDate, -1, forceToValid);
	}
	buildNext(currentDateProfile, currentDate, nowDate, forceToValid) {
		let { dateEnv } = this.props;
		let nextDate = dateEnv.add(dateEnv.startOf(currentDate, currentDateProfile.currentRangeUnit), currentDateProfile.dateIncrement);
		return this.build(nextDate, nowDate, 1, forceToValid);
	}
	build(currentDate, nowDate, direction, forceToValid = true) {
		let { props } = this;
		let validRange;
		let currentInfo;
		let isRangeAllDay;
		let renderRange;
		let activeRange;
		let isValid;
		validRange = this.buildValidRange(nowDate);
		validRange = this.trimHiddenDays(validRange);
		if (forceToValid) currentDate = constrainMarkerToRange(currentDate, validRange);
		currentInfo = this.buildCurrentRangeInfo(currentDate, direction);
		isRangeAllDay = /^(year|month|week|day)$/.test(currentInfo.unit);
		renderRange = this.buildRenderRange(this.trimHiddenDays(currentInfo.range), currentInfo.unit, isRangeAllDay);
		renderRange = this.trimHiddenDays(renderRange);
		activeRange = renderRange;
		if (!props.showNonCurrentDates) activeRange = intersectRanges(activeRange, currentInfo.range);
		activeRange = this.adjustActiveRange(activeRange);
		activeRange = intersectRanges(activeRange, validRange);
		isValid = rangesIntersect(currentInfo.range, validRange);
		if (!rangeContainsMarker(renderRange, currentDate)) currentDate = renderRange.start;
		return {
			currentDate,
			validRange,
			currentRange: currentInfo.range,
			currentRangeUnit: currentInfo.unit,
			isRangeAllDay,
			activeRange,
			renderRange,
			slotMinTime: props.slotMinTime,
			slotMaxTime: props.slotMaxTime,
			isValid,
			dateIncrement: this.buildDateIncrement(currentInfo.duration)
		};
	}
	buildValidRange(nowDate) {
		let input = this.props.validRangeInput;
		let simpleInput = typeof input === "function" ? input.call(this.props.calendarApi, this.props.dateEnv.toDate(nowDate)) : input;
		return this.refineRange(simpleInput) || {
			start: null,
			end: null
		};
	}
	buildCurrentRangeInfo(date, direction) {
		let { props } = this;
		let duration = null;
		let unit = null;
		let range = null;
		let dayCount;
		if (props.duration) {
			duration = props.duration;
			unit = props.durationUnit;
			range = this.buildRangeFromDuration(date, direction, duration, unit);
		} else if (dayCount = this.props.dayCount) {
			unit = "day";
			range = this.buildRangeFromDayCount(date, direction, dayCount);
		} else if (range = this.buildCustomVisibleRange(date)) unit = props.dateEnv.greatestWholeUnit(range.start, range.end).unit;
		else {
			duration = this.getFallbackDuration();
			unit = greatestDurationDenominator(duration).unit;
			range = this.buildRangeFromDuration(date, direction, duration, unit);
		}
		return {
			duration,
			unit,
			range
		};
	}
	getFallbackDuration() {
		return createDuration({ day: 1 });
	}
	adjustActiveRange(range) {
		let { dateEnv, usesMinMaxTime, slotMinTime, slotMaxTime } = this.props;
		let { start, end } = range;
		if (usesMinMaxTime) {
			if (asRoughDays(slotMinTime) < 0) {
				start = startOfDay(start);
				start = dateEnv.add(start, slotMinTime);
			}
			if (asRoughDays(slotMaxTime) > 1) {
				end = startOfDay(end);
				end = addDays(end, -1);
				end = dateEnv.add(end, slotMaxTime);
			}
		}
		return {
			start,
			end
		};
	}
	buildRangeFromDuration(date, direction, duration, unit) {
		let { dateEnv, dateAlignment } = this.props;
		let start;
		let end;
		let res;
		if (!dateAlignment) {
			let { dateIncrement } = this.props;
			if (dateIncrement) if (asRoughMs(dateIncrement) < asRoughMs(duration)) dateAlignment = greatestDurationDenominator(dateIncrement).unit;
			else dateAlignment = unit;
			else dateAlignment = unit;
		}
		if (asRoughDays(duration) <= 1) {
			if (this.isHiddenDay(start)) {
				start = this.skipHiddenDays(start, direction);
				start = startOfDay(start);
			}
		}
		function computeRes() {
			start = dateEnv.startOf(date, dateAlignment);
			end = dateEnv.add(start, duration);
			res = {
				start,
				end
			};
		}
		computeRes();
		if (!this.trimHiddenDays(res)) {
			date = this.skipHiddenDays(date, direction);
			computeRes();
		}
		return res;
	}
	buildRangeFromDayCount(date, direction, dayCount) {
		let { dateEnv, dateAlignment } = this.props;
		let runningCount = 0;
		let start = date;
		let end;
		if (dateAlignment) start = dateEnv.startOf(start, dateAlignment);
		start = startOfDay(start);
		start = this.skipHiddenDays(start, direction);
		end = start;
		do {
			end = addDays(end, 1);
			if (!this.isHiddenDay(end)) runningCount += 1;
		} while (runningCount < dayCount);
		return {
			start,
			end
		};
	}
	buildCustomVisibleRange(date) {
		let { props } = this;
		let input = props.visibleRangeInput;
		let simpleInput = typeof input === "function" ? input.call(props.calendarApi, props.dateEnv.toDate(date)) : input;
		let range = this.refineRange(simpleInput);
		if (range && (range.start == null || range.end == null)) return null;
		return range;
	}
	buildRenderRange(currentRange, currentRangeUnit, isRangeAllDay) {
		return currentRange;
	}
	buildDateIncrement(fallback) {
		let { dateIncrement } = this.props;
		let customAlignment;
		if (dateIncrement) return dateIncrement;
		if (customAlignment = this.props.dateAlignment) return createDuration(1, customAlignment);
		if (fallback) return fallback;
		return createDuration({ days: 1 });
	}
	refineRange(rangeInput) {
		if (rangeInput) {
			let range = parseRange(rangeInput, this.props.dateEnv);
			if (range) range = computeVisibleDayRange(range);
			return range;
		}
		return null;
	}
	initHiddenDays() {
		let hiddenDays = this.props.hiddenDays || [];
		let isHiddenDayHash = [];
		let dayCnt = 0;
		let i;
		if (this.props.weekends === false) hiddenDays.push(0, 6);
		for (i = 0; i < 7; i += 1) if (!(isHiddenDayHash[i] = hiddenDays.indexOf(i) !== -1)) dayCnt += 1;
		if (!dayCnt) throw new Error("invalid hiddenDays");
		this.isHiddenDayHash = isHiddenDayHash;
	}
	trimHiddenDays(range) {
		let { start, end } = range;
		if (start) start = this.skipHiddenDays(start);
		if (end) end = this.skipHiddenDays(end, -1, true);
		if (start == null || end == null || start < end) return {
			start,
			end
		};
		return null;
	}
	isHiddenDay(day) {
		if (day instanceof Date) day = day.getUTCDay();
		return this.isHiddenDayHash[day];
	}
	skipHiddenDays(date, inc = 1, isExclusive = false) {
		while (this.isHiddenDayHash[(date.getUTCDay() + (isExclusive ? inc : 0) + 7) % 7]) date = addDays(date, inc);
		return date;
	}
};
function computeMajorUnit(dateProfile, dateEnv) {
	const { currentRange } = dateProfile;
	if (dateProfile.currentRangeUnit === "year") if (dateEnv.diffWholeYears(currentRange.start, currentRange.end) > 1) return "year";
	else return "month";
	else if (dateProfile.currentRangeUnit === "month") {
		if (dateEnv.diffWholeMonths(currentRange.start, currentRange.end) > 1) return "month";
	} else if (dateProfile.currentRangeUnit === "week") {
		if (diffWholeWeeks(currentRange.start, currentRange.end) > 1) return "week";
	} else if (dateProfile.currentRangeUnit === "day") {
		if (diffWholeDays(currentRange.start, currentRange.end) > 1) return "day";
	}
}
function isMajorUnit(dateMarker, majorUnit, dateEnv) {
	if (dateMarker.valueOf() === startOfDay(dateMarker).valueOf()) {
		if (majorUnit === "year") return !dateEnv.getMonth(dateMarker) && dateEnv.getDay(dateMarker) === 1;
		else if (majorUnit === "month") return dateEnv.getDay(dateMarker) === 1;
		else if (majorUnit === "week") return dateMarker.getUTCDay() === dateEnv.weekDow;
		else if (majorUnit === "day") return true;
	}
	return false;
}
//#endregion
export { isDimsEqual as A, nn as B, findWeekdayText as C, getIsHeightAuto as D, getFooterScrollbarSticky as E, watchHeight as F, isMergedPropsEqual as H, watchSize as I, watchWidth as L, memoizeObjArg as M, renderText as N, getScrollerSyncerClass as O, setRef as P, $ as R, findMonthText as S, getDateMeta as T, mergeCalendarOptions as U, pn as V, mergeViewOptionsMap as W, afterSize as _, ContentContainer as a, buildViewContext as b, NowTimer as c, RenderId as d, Scroller as f, WEEKDAY_ONLY_FORMAT as g, ViewContextType as h, BaseComponent as i, memoize as j, getTableHeaderSticky as k, NowTimerRunner as l, ViewContainer as m, computeMajorUnit as n, DateComponent as o, StandardEvent as p, isMajorUnit as r, DelayedRunner as s, DateProfileGenerator as t, PureComponent as u, buildDateStr as v, generateClassName as w, findDayNumberText as x, buildNavLinkAttrs as y, bn as z };
