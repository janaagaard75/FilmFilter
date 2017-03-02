/**
 * Copyright (c) 2011-2014 Felix Gnass
 * Licensed under the MIT license
 * http://spin.js.org/
 *
 * Example:
 *  var opts = {
 *    lines: 12,            // The number of lines to draw
 *    length: 7,            // The length of each line
 *    width: 5,             // The line thickness
 *    radius: 10,           // The radius of the inner circle
 *    scale: 1.0,           // Scales overall size of the spinner
 *    corners: 1,           // Roundness (0..1)
 *    color: '#000',        // #rgb or #rrggbb
 *    opacity: 1/4,         // Opacity of the lines
 *    rotate: 0,            // Rotation offset
 *    direction: 1,         // 1: clockwise, -1: counterclockwise
 *    speed: 1,             // Rounds per second
 *    trail: 100,           // Afterglow percentage
 *    fps: 20,              // Frames per second when using setTimeout()
 *    zIndex: 2e9,          // Use a high z-index by default
 *    className: 'spinner', // CSS class to assign to the element
 *    top: '50%',           // center vertically
 *    left: '50%',          // center horizontally
 *    shadow: false,        // Whether to render a shadow
 *    hwaccel: false,       // Whether to use hardware acceleration (might be buggy)
 *    position: 'absolute'  // Element positioning
 *  };
 *  var target = document.getElementById('foo');
 *  var spinner = new Spinner(opts).spin(target);
 */

let prefixes = ["webkit", "Moz", "ms", "O"] // Vendor prefixes.
let animations: any = {} // Animation rules keyed by their name.
let useCssAnimations: any // Whether to use CSS animations or setTimeout.
let sheet: any // A stylesheet to hold the @keyframe or VML rules.

/** Utility function to create elements. If no tag name is given, a DIV is created. Optionally properties can be passed. */
function createEl(tag?: any, prop?: any) {
  const el = document.createElement(tag || "div")
  for (const n in prop) {
    el[n] = prop[n]
  }
  return el
}

/** Appends children and returns the parent. */
function ins(parent: any, ...args: Array<any> /* child1, child2, ...*/) {
  // args.length might be off by one.
  for (let i = 1, n = args.length; i < n; i++) {
    parent.appendChild(args[i])
  }

  return parent
}

/** Creates an opacity keyframe animation rule and returns its name. Since most mobile Webkits have timing issues with animation-delay, we create separate rules for each line/segment. */
function addAnimation(alpha: any, trail: any, i: any, lines: any) {
  const name = ["opacity", trail, ~~(alpha * 100), i, lines].join("-")
  const start = 0.01 + i / lines * 100
  const z = Math.max(1 - (1 - alpha) / trail * (100 - start), alpha)
  const prefix = useCssAnimations.substring(0, useCssAnimations.indexOf("Animation")).toLowerCase()
  const pre = prefix && "-" + prefix + "-" || ""

  if (!animations[name]) {
    sheet.insertRule(
      "@" + pre + "keyframes " + name + "{" +
      "0%{opacity:" + z + "}" +
      start + "%{opacity:" + alpha + "}" +
      (start + 0.01) + "%{opacity:1}" +
      (start + trail) % 100 + "%{opacity:" + alpha + "}" +
      "100%{opacity:" + z + "}" +
      "}", sheet.cssRules.length)

    animations[name] = 1
  }

  return name
}

/** Tries various vendor prefixes and returns the first supported property. */
function vendor(el: any, prop: any) {
  const s = el.style
  let pp
  let i

  prop = prop.charAt(0).toUpperCase() + prop.slice(1)
  if (s[prop] !== undefined) {
    return prop
  }

  for (i = 0; i < prefixes.length; i++) {
    pp = prefixes[i] + prop
    if (s[pp] !== undefined) {
      return pp
    }
  }
}

/** Sets multiple style properties at once. */
function css(el: any, prop: any) {
  for (const n in prop) {
    el.style[vendor(el, n) || n] = prop[n]
  }

  return el
}

/** Fills in default values. */
function merge(obj: any, ...args: Array<any>) {
  // The length of args might be off by one.
  for (let i = 1; i < args.length; i++) {
    const def = args[i]
    for (const n in def) {
      if (obj[n] === undefined) {
        obj[n] = def[n]
      }
    }
  }
  return obj
}

/** Returns the line color from the given string or array. */
function getColor(color: any, idx: any) {
  return typeof color === "string" ? color : color[idx % color.length]
}

// Built-in defaults

let defaults = {
  className: "spinner", // CSS class to assign to the element
  color: "#000",        // #rgb or #rrggbb
  corners: 1,           // Roundness (0..1)
  direction: 1,         // 1: clockwise, -1: counterclockwise
  fps: 20,              // Frames per second when using setTimeout()
  hwaccel: false,       // Whether to use hardware acceleration
  left: "50%",          // center horizontally
  length: 7,            // The length of each line
  lines: 12,            // The number of lines to draw
  opacity: 1 / 4,       // Opacity of the lines
  position: "absolute", // Element positioning
  radius: 10,           // The radius of the inner circle
  rotate: 0,            // Rotation offset
  scale: 1.0,           // Scales overall size of the spinner
  shadow: false,        // Whether to render a shadow
  speed: 1,             // Rounds per second
  top: "50%",           // center vertically
  trail: 100,           // Afterglow percentage
  width: 5,             // The line thickness
  zIndex: 2e9           // Use a high z-index by default
}

/** The constructor */
export class Spinner {
  constructor(o: any) {
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }

  static defaults: any = {}

  opts: any
}

merge(Spinner.prototype, {
  /** Adds the spinner to the given target element. If this instance is already spinning, it is automatically removed from its previous target b calling stop() internally. */
  spin: function(target: any) {
    this.stop()

    const self = this
    const o = self.opts
    const el = self.el = createEl(null, { className: o.className })

    css(el, {
      left: o.left,
      position: o.position,
      top: o.top,
      width: 0,
      zIndex: o.zIndex
    })

    if (target) {
      target.insertBefore(el, target.firstChild || null)
    }

    el.setAttribute("role", "progressbar")
    self.lines(el, self.opts)

    if (!useCssAnimations) {
      // No CSS animation support, use setTimeout() instead
      let i = 0
      const start = (o.lines - 1) * (1 - o.direction) / 2
      let alpha
      const fps = o.fps
      const f = fps / o.speed
      const ostep = (1 - o.opacity) / (f * o.trail / 100)
      const astep = f / o.lines;

      (function anim() {
        i++
        for (let j = 0; j < o.lines; j++) {
          alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)

          self.opacity(el, j * o.direction + start, alpha, o)
        }
        self.timeout = self.el && setTimeout(anim, ~~(1000 / fps))
      })()
    }
    return self
  },

  /** Stops and removes the Spinner. */
  stop: function() {
    const el = this.el
    if (el) {
      clearTimeout(this.timeout)
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      }
      this.el = undefined
    }
    return this
  },

  /** Internal method that draws the individual lines. Will be overwritten in VML fallback mode below. */
  lines: function(el: any, o: any) {
    let i = 0
    const start = (o.lines - 1) * (1 - o.direction) / 2
    let seg

    function fill(color: any, shadow: any) {
      return css(createEl(), {
        background: color,
        borderRadius: (o.corners * o.scale * o.width >> 1) + "px",
        boxShadow: shadow,
        height: o.scale * o.width + "px",
        position: "absolute",
        transform: "rotate(" + ~~(360 / o.lines * i + o.rotate) + "deg) translate(" + o.scale * o.radius + "px" + ",0)",
        transformOrigin: "left",
        width: o.scale * (o.length + o.width) + "px"
      })
    }

    for (; i < o.lines; i++) {
      seg = css(createEl(), {
        animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + " " + 1 / o.speed + "s linear infinite",
        opacity: o.opacity,
        position: "absolute",
        top: 1 + ~(o.scale * o.width / 2) + "px",
        transform: o.hwaccel ? "translate3d(0,0,0)" : ""
      })

      if (o.shadow) {
        ins(seg, css(fill("#000", "0 0 4px #000"), { top: "2px" }))
      }
      ins(el, ins(seg, fill(getColor(o.color, i), "0 0 1px rgba(0,0,0,.1)")))
    }
    return el
  },

  /** Internal method that adjusts the opacity of a single line. Will be overwritten in VML fallback mode below. */
  opacity: function(el: any, i: any, val: any) {
    if (i < el.childNodes.length) {
      el.childNodes[i].style.opacity = val
    }
  }
})

if (typeof document !== "undefined") {
  sheet = (function() {
    const el = createEl("style", { type: "text/css" })
    ins(document.getElementsByTagName("head")[0], el)
    return el.sheet || el.styleSheet
  }())

  const probe = css(createEl("group"), { behavior: "url(#default#VML)" })

  useCssAnimations = vendor(probe, "animation")
}
