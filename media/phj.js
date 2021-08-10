(function (r, f) {
	typeof exports == "object" && typeof module != "undefined"
		? (module.exports = f(require("highlight.js"), require("painter-kernel")))
		: typeof define == "function" && define.amd
		? define(["highlight.js", "painter-kernel"], f)
		: ((r = typeof globalThis != "undefined" ? globalThis : r || self).phl = f(
				r.hljs,
				r.painter
		  ));
})(this, function (r, f) {
	"use strict";
	function m(o) {
		return o && typeof o == "object" && "default" in o ? o : { default: o };
	}
	var _ = m(r);
	return function (o, y, d, k, j) {
		let s = [],
			u = {
				default: { color: "#c9d1d9" },
				comment: { color: "#c9d1d9" },
				doctag: { color: "#ff7b72" },
				built_in: { color: "#ee3300ef" },
				keyword: { color: "#ff7b72" },
				"template-tag": { color: "#ff7b72" },
				"template-variable": { color: "#ff7b72" },
				type: { color: "#ff7b72" },
				string: { color: "#afa5b4" },
				attr: { color: "#ff7b72" },
				number: { color: "#afe5bb" },
				params: { color: "#aff5b4" },
				"variable.language": { color: "#ff7b72" },
				subst: { color: "Purple" },
				title: { color: "#d2a8ff" },
				"title.class": { color: "#df88df" },
				"title.class.inherited": { color: "#dda8ff" },
				"title.function": { color: "#d2a8ff" },
				deletion: { color: "#ffdcd7", backgroundColor: "#67060c" },
				addition: { color: "#aff5b4", backgroundColor: "#033a16" },
				strong: { color: "#c9d1d9", fontWeight: "bold" },
				emphasis: { color: "#c9d1d9", fontStyle: "italic" },
				sign: { color: "#2f2f2fee" },
			},
			t = _.default.highlight(k, { language: j })._emitter.stack[0].children;
		const g = new Map(Object.entries(u)),
			h = RegExp(/\n/g),
			b = RegExp(/([^\s])/g);
		let p = 0,
			n = 0,
			a = 0,
			i = [];
		for (let e = 0; e < t.length; e++)
			if (typeof t[e] == "string")
				if (t[e].match(h) && t[e].match(b)) {
					let l = t[e],
						c = t[e].match(b);
					for (; c.length; )
						l.slice(0, l.indexOf(c[0])) && i.push(l.slice(0, l.indexOf(c[0]))),
							i.push(l.slice(l.indexOf(c[0]), l.indexOf(c[0]) + 1)),
							(l = l.slice(l.indexOf(c[0]) + 1)),
							c.shift();
					i.push(l);
				} else i.push(t[e]);
			else if (t[e].kind === "comment") i.push(t[e]);
			else if (t[e].children.length > 1) {
				let l = t[e].children;
				for (let c of l) i.push(c);
			} else i.push(t[e]);
		t = i;
		for (let e = 0; e < t.length; e++) {
			let l = {
				id: "hl0_" + e,
				text: "",
				type: "text",
				css: {
					top: "calc(hl0_" + (e - 1) + ".top)",
					left: "calc(hl0_" + (e - 1) + ".right)",
					color: u.default.color,
					fontSize: "16px",
				},
			};
			if (typeof t[e] == "object") {
				let c;
				if (
					(t[e].children.length
						? ((l.text = t[e].children.join("")),
						  (l.css.left = "calc(hl0_" + (e - 1) + ".right + 1px)"),
						  (c = g.get(t[e].kind)))
						: ((l.text = t[e].children),
						  (l.css.left = "calc(hl0_" + (e - 1) + ".right - 5px)"),
						  (c = g.get(t[e].kind))),
					a &&
						((l.css.left = "calc(hl0_" + (e - 1) + ".right - 8px)"), (a = 0)),
					t[e].children.length && t[e].children[0].match(/\/\*\*/g))
				) {
					if (t[e].children[0].match(/\*\//g)) n++;
					else
						for (let x of t[e].children) x.match(h) && (n += x.match(h).length);
					n--;
				}
				l.css.color = c ? c.color : g.get("default");
			} else
				typeof t[e] == "string" &&
					((l.text = t[e]),
					(l.css.color = g.get("sign").color),
					(l.css.left = "calc(hl0_" + (e - 1) + ".right + 2px)"),
					a &&
						((l.css.left = "calc(hl0_" + (e - 1) + ".right - 8px)"), (a = 0)),
					t[e].match(h) && !t[e].match(/\`/g)
						? (p = t[e].match(h).length)
						: t[e] === " "
						? (l.css.left = "calc(hl0_" + (e - 1) + ".right - 4px)")
						: t[e].match(/\(/) &&
						  ((l.css.left = "calc(hl0_" + (e - 1) + ".right + 4px)"),
						  (a = 1)));
			p &&
				((l.css.top = "calc(hl0_" + (e - 1) + ".top +" + 20 * (p + n) + " px)"),
				(l.css.left = "0"),
				t[e].match(h) && t[e].slice(2) && (l.css.left = "calc(hl0_0.right)"),
				(p = 0),
				(n = 0)),
				s.push(l);
		}
		(s[0].css.top = "5px"),
			(s[1].css.left = "calc(hl0_0.right*2)"),
			(s[0].css.left = "0"),
			(o.width = f.toPx(d.width)),
			(o.height = f.toPx(d.height)),
			(d.views = s),
			new f.Pen(y, d).paint(() => {});
	};
});
