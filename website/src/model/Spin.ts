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
class Spin {
  private prefixes = ["webkit", "Moz", "ms", "O"] // Vendor prefixes
  private animations: any = {} // Animation rules keyed by their name
  private useCssAnimations: any // Whether to use CSS animations or setTimeout
  private sheet: any // A stylesheet to hold the @keyframe or VML rules

  /** Utility function to create elements. If no tag name is given, a DIV is created. Optionally properties can be passed. */
  private createEl(tag: any, props: any) {
    const el = document.createElement(tag || "div")

    for (const n in props) {
      if (props.hasOwnProperty(n)) {
        el[n] = props[n]
      }
    }

    return el
  }

  /** Appends children and returns the parent. */
  private ins(parent: any, ...children: Array<any>) {
    for (const child of children) {
      parent.appendChild(child)
    }

    return parent
  }

  /** Creates an opacity keyframe animation rule and returns its name. Since most mobile Webkits have timing issues with animation-delay, we create separate rules for each line/segment. */
  private addAnimation(alpha: any, trail: any, i: number, lines: number) {
    const name = ["opacity", trail, ~~(alpha * 100), i, lines].join("-")
    const start = 0.01 + i / lines * 100
    const z = Math.max(1 - (1 - alpha) / trail * (100 - start), alpha)
    const prefix = this.useCssAnimations.substring(0, this.useCssAnimations.indexOf("Animation")).toLowerCase()
    const pre = prefix && "-" + prefix + "-" || ""

    if (!this.animations[name]) {
      this.sheet.insertRule(
        "@" + pre + "keyframes " + name + "{" +
        "0%{opacity:" + z + "}" +
        start + "%{opacity:" + alpha + "}" +
        (start + 0.01) + "%{opacity:1}" +
        (start + trail) % 100 + "%{opacity:" + alpha + "}" +
        "100%{opacity:" + z + "}" +
        "}", this.sheet.cssRules.length)

      this.animations[name] = 1
    }

    return name
  }

  /** Tries various vendor prefixes and returns the first supported property. */
  private vendor(el: any, prop: any) {
    const s = el.style
    let pp
    let i

    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    if (s[prop] !== undefined) {
      return prop
    }

    for (i = 0; i < this.prefixes.length; i++) {
      pp = this.prefixes[i] + prop
      if (s[pp] !== undefined) {
        return pp
      }
    }
  }

  /** Sets multiple style properties at once. */
  private css(el: any, props: any) {
    for (const n in props) {
      if (props.hasOwnProperty(n)) {
        el.style[this.vendor(el, n) || n] = props[n]
      }
    }

    return el
  }

  /** Fills in default values. */
  private merge(...args: Array<any>) {
    return Object.assign({}, args)
  }

  /** Returns the line color from the given string or array. */
  private getColor(color: any, idx: number) {
    return typeof color === "string" ? color : color[idx % color.length]
  }

  // Built-in defaults

  private defaults = {
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
  constructor(o: any) {
    let opts = this.merge(o || {}, Spinner.defaults, defaults)
  }

  // Global defaults that override the built-ins:
  // Spinner.defaults = {};

  /** Adds the spinner to the given target element. If this instance is already spinning, it is automatically removed from its previous target b calling stop() internally. */
  public spin(target: any) {
    this.stop()

    let self = this
    let o = self.opts
    let el = self.el = this.createEl(null, { className: o.className })

    this.css(el, {
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

    if (!this.useCssAnimations) {
      // No CSS animation support, use setTimeout() instead
      let i = 0
      const start = (o.lines - 1) * (1 - o.direction) / 2
      let alpha
      const fps = o.fps
      const f = fps / o.speed
      const ostep = (1 - o.opacity) / (f * o.trail / 100)
      const astep = f / o.lines;

      (function anim() {
        i++;
        for (let j = 0; j < o.lines; j++) {
          alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)

          self.opacity(el, j * o.direction + start, alpha, o)
        }
        self.timeout = self.el && setTimeout(anim, ~~(1000 / fps))
      })()
    }
    return self
  }

  /** Stops and removes the Spinner. */
  public stop() {
    const el = this.el
    if (el) {
      clearTimeout(this.timeout)
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      }
      this.el = undefined
    }
    return this
  }

  /**
   * Internal method that draws the individual lines. Will be overwritten
   * in VML fallback mode below.
   */
  /*public lines(el: any, o: any) {
    let i = 0
    const start = (o.lines - 1) * (1 - o.direction) / 2
    let seg

    function fill(color: string, shadow: string) {
      return this.css(this.createEl(), {
        background: color,
        borderRadius: (o.corners * o.scale * o.width >> 1) + "px",
        boxShadow: shadow,
        height: o.scale * o.width + "px",
        position: "absolute",
        transform: "rotate(" + ~~(360/o.lines*i + o.rotate) + "deg) translate(" + o.scale * o.radius + "px" + ",0)",
        transformOrigin: "left",
        width: o.scale * (o.length + o.width) + "px"
      })
    }

    for (; i < o.lines; i++) {
      seg = this.css(this.createEl(), {
        animation: this.useCssAnimations && this.addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + " " + 1 / o.speed + "s linear infinite",
        opacity: o.opacity,
        position: "absolute",
        top: 1 + ~(o.scale * o.width / 2) + "px",
        transform: o.hwaccel ? "translate3d(0,0,0)" : ""
      })

      if (o.shadow) {
        this.ins(seg, this.css(fill("#000", "0 0 4px #000"), { top: "2px" }))
      }
      this.ins(el, this.ins(seg, fill(this.getColor(o.color, i), "0 0 1px rgba(0,0,0,.1)")))
    }
    return el
  }*/

  /** Internal method that adjusts the opacity of a single line. Will be overwritten in VML fallback mode below. */
  public opacity(el: any, i: number, val: any) {
    if (i < el.childNodes.length) {
      el.childNodes[i].style.opacity = val
    }
  }

  /* Utility function to create a VML tag */
  private vml(tag: string, attr: any) {
    return this.createEl("<" + tag + " xmlns=\"urn:schemas-microsoft.com:vml\" class=\"spin-vml\">", attr)
  }

  private initVML() {
    // No CSS transforms but VML support, add a CSS rule for VML elements:
    this.sheet.addRule(".spin-vml", "behavior:url(#default#VML)")
  }

  private seg(i: number, dx: any, filter: any) {
    this.ins(
      g,
      this.ins(
        css(grp(), { rotation: 360 / o.lines * i + "deg", left: ~~dx }),
        this.ins(
          css(
            vml("roundrect", { arcsize: o.corners }),
            {
              width: r,
              height: o.scale * o.width,
              left: o.scale * o.radius,
              top: -o.scale * o.width >> 1,
              filter: filter
            }
          ),
          vml("fill", { color: this.getColor(o.color, i), opacity: o.opacity }),
          vml("stroke", { opacity: 0 }) // transparent stroke to fix color bleeding upon opacity change
        )
      )
    )
  }

  private lines(el: any, o: any) {
    const r = o.scale * (o.length + o.width)
    const s = o.scale * 2 * r

    const grp = () => {
      return this.css(
        this.vml("group", {
          coordsize: s + " " + s,
          coordorigin: -r + " " + -r
        }),
        { width: s, height: s }
      )
    }

    const margin = -(o.width + o.length) * o.scale * 2 + "px"
    const g = this.css(grp(), { position: "absolute", top: margin, left: margin })
    let i

    if (o.shadow)
      for (i = 1; i <= o.lines; i++) {
        this.seg(i, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)")
      }

    for (i = 1; i <= o.lines; i++) {
      this.seg(i)
    }
    return this.ins(el, g)
    };
  }

  public opacity(el: any, i: number, val: any, o: any) {
    let c = el.firstChild
    o = o.shadow && o.lines || 0
    if (c && i + o < c.childNodes.length) {
      c = c.childNodes[i + o] c = c && c.firstChild c = c && c.firstChild
      if (c) c.opacity = val
    }
  }

  initialize() {
    if (typeof document !== "undefined") {
      this.sheet = (() => {
        const el = this.createEl("style", { type : "text/css" })
        this.ins(document.getElementsByTagName("head")[0], el)
        return el.sheet || el.styleSheet
      }());

      const probe = this.css(this.createEl("group"), { behavior: "url(#default#VML)" })

      if (!this.vendor(probe, "transform") && probe.adj) {
        this.initVML()
      }
      else {
        this.useCssAnimations = this.vendor(probe, "animation")
      }
    }
  }
}