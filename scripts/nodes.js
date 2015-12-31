$(function(){

    var MBR = {Utlz:{}, Views:{}}, BgImage;

    MBR.Evts = function() {
        function t() { this.events = {}, this.EVENT = {}}
        return t.prototype.buildEvt = function(t, e) {},
        t.prototype.destroyEvt = function(t, e) {},
        t.prototype.dispatch = function(t, e) {}, t
    }(window);

    MBR.Utlz.Global = function() {
        this.getElSize = function(t, e, i, n) {
            var s = i / n,
                r = {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0
                };
            return s > elRatio ? (r.w = i, r.h = Math.round(r.w / elRatio), r.y = Math.round(-(r.h - n) / 2)) : (r.h = n, r.w = Math.round(r.h * elRatio), r.x = Math.round(-(r.w - i) / 2)), r},
        this.degToRad = function(t) { return t * Math.PI / 180 },
        this.radToDeg = function(t) { return 180 * t / Math.PI},
        this.getSupportedPropertyName = function(t) {
            for (var e = ["", "ms", "Webkit", "Moz", "O"], i = 0; i < e.length; i++) {
                var n = e[i];
                t = "" === n ? t : t.charAt(0).toUpperCase() + t.substring(1).toLowerCase();
                var s = n + t;
                if ("undefined" != typeof document.body.style[s]) return s
            }
            return null
        }, this.getObjSize = function(t) {
            var e = 0;
            for (var i in t) t.hasOwnProperty(i) && e++;
            return e
        }, this.getPixel = function(t, e, i) {
            var n = 4 * (t.width * i + e);
            return {
                r: t.data[n],
                g: t.data[n + 1],
                b: t.data[n + 2],
                a: t.data[n + 3]
            }
        }
    }(window);

    MBR.Utlz.Ease = function() {
        function t(t, e, i, n) {
            this.value = this.begin = this.end = t, this.pow = e, this.maxDuration = i, this.time = n, this.init()
        }
        return t.prototype.init = function() {
            this.begin = this.end, this.end = Math.random(), this.time = 0, this.duration = Math.sqrt(Math.abs(this.end - this.begin)) * this.maxDuration
        }, t.prototype.update = function(t) {
            void 0 === t && (t = 1);
            var e = this.time / this.duration;
            e = .5 > e ? .5 * Math.pow(2 * e, this.pow) : 1 - .5 * Math.pow(2 * (1 - e), this.pow), this.value = this.begin + e * (this.end - this.begin), this.time += t, this.time > this.duration && this.init()
        }, t
    }(window);

    MBR.View = function() {
        function t() {
            MBR.Evts.call(this), this.$ = {}, this.p = {}, this.v = {}, this.EVENT = {
                LOADED: "loaded",
                INIT: "init",
                SHOWN: "shown",
                HIDDEN: "hidden"
            }
        }
        return t.prototype = Object.create(MBR.Evts.prototype),
        t.prototype.constructor = t,
        t.prototype.init = function() {
            this.initElt(), this.bindEvents()
        },
        t.prototype.initElt = function() {},
        t.prototype.load = function(t) {
        },
        t.prototype.loaded = function(t) {
            MBR.Main.$.pageContainer[0].innerHTML = t,
            this.init(),
            this.show(),
            this.dispatch(this.EVENT.LOADED)
        },
        t.prototype.error = function() {},
        t.prototype.show = function(t) {

            TweenLite.to(MBR.Main.$.pageContainer, .8, {
                opacity: 1,
                ease: Quad.easeOut,
                onComplete: function() {
                    t || this.dispatch(this.EVENT.SHOWN), this.hideLoader(!1)
                }.bind(this)
            })

        },
        t.prototype.hide = function() {
            this.showLoader(),
            this.destroy(),
            MBR.Views.Canvas.manageLogoParticles("pageChange"),
            TweenLite.to(MBR.Main.$.pageContainer, .8, {
                opacity: 0,
                ease: Quad.easeOut,
                onComplete: function() {
                    this.dispatch(this.EVENT.HIDDEN)
                }.bind(this)
            })
        },
        t.prototype.bindEvents = function() {},
        t.prototype.unbindEvents = function() {},
        t.prototype.resize = function() {},
        t.prototype.killTweens = function() {},
        t.prototype.destroy = function() {
            this.unbindEvents(),
            this.killTweens(),
            this.$ = {}, this.v = {}
        }, t.prototype.clickChangePage = function(t) {
            t.preventDefault();
            var e = t.currentTarget.href;
            MBR.RoutesManager.goToPage(e)
        }, t
    }(window);

    MBR.Views.Canvas = function() {
        function t() {
            MBR.View.call(this),
            this.aParticlesBg = [],
            this.aParticlesLogo = [],
            this.nbParticlesBg = 0,
            this.nbParticlesLogo = 0,
            this.DENSITY = 10,
            this.AMPLITUDE_MIN = 10,
            this.AMPLITUDE_MAX = 30,
            this.APPROACH = 113,
            this.JELLY = 1e4,
            this.VISCOSITY = .03,
            this.coeffExplode = 1,
            this.coeffPos = 0,
            this.coeffAmp = 1,
            this.isLogoRebuild = !1,
            this.mouseX = null,
            this.mouseY = null
        }
        t.prototype = Object.create(MBR.View.prototype),
        t.prototype.constructor = t,
        t.prototype.initElt = function() {
            e.call(this),
            i.call(this),
            n.call(this),
            s.call(this),
            r.call(this),
            p.call(this, !0),
            setTimeout(function() {
                _.call(this, !0)
            }.bind(this), 2e3),
            TweenLite.ticker.addEventListener("tick", P, this), this.resize(!1)

        },
        t.prototype.bindEvents = function() {
            this.p.mouseMove = $.proxy(E, this), MBR.Main.$.window.on("mousemove", this.p.mouseMove)
        },
        t.prototype.resize = function(t) {
            var e = MBR.Main.windowW,
                i = MBR.Main.windowH;
            this.canvas.width = e,
            this.canvas.height = i,
            this.offscreenCanvas.width = e,
            this.offscreenCanvas.height = i,
            t && (a.call(this),l.call(this))
        },
        t.prototype.manageLogoParticles = function(t) {
            var e = null === MBR.RoutesManager.nextPage ? !0 : !1,
                i = MBR.RoutesManager.currentPage.name,
                n = e ? i : MBR.RoutesManager.nextPage.name;
            if ("init" == t && "home" != i && "clients" != i && m.call(this, t), "pageChange" == t) {
                if ("project" == n) return;
                "home" != n ? m.call(this, t) : "home" == n && _.call(this, !1)
            } else "enterLogo" == t ? ("clients" == i && MBR.Views.Clients.hideClientInfos(), "home" != i && _.call(this, !1)) : "leaveLogo" == t && ("clients" == i ? (MBR.Views.Clients.showClientInfos(), this.initClientLogo(MBR.Views.Clients.v.clientsInfos[MBR.Views.Clients.v.idLogo].img, "reset")) : "home" != i && m.call(this, t))
        },
        t.prototype.initLogo = function() {

            this.logo = new Image;

            var that = this;

            this.logo.onload = function(){
                that.logoW = that.logo.width,
                that.logoH = that.logo.height,
                c.call(that),
                f.call(that, !0)
            }

            this.logo.src = BgImage;
        }
        var e = function() {
                this.canvas = document.getElementById("canvas"), this.context = this.canvas.getContext("2d")
            },
            i = function() {
                this.offscreenCanvas = document.createElement("canvas"),
                this.offscreenContext = this.offscreenCanvas.getContext("2d")
            },
            n = function() {
                this.particleCanvas = document.createElement("canvas"),
                this.particleContext = this.particleCanvas.getContext("2d"),
                this.particleCanvas.width = 6,
                this.particleCanvas.height = 6,
                this.particleContext.beginPath(),
                this.particleContext.fillStyle = "#fff",
                this.particleContext.arc(3, 3, 3, 0, 2 * Math.PI),
                this.particleContext.fill()
            },
            s = function() {
                this.logoHomeCanvas = document.createElement("canvas"),
                this.logoHomeContext = this.logoHomeCanvas.getContext("2d"), u.call(this)
            },
            r = function() {
                this.logoClientCanvas = document.createElement("canvas"),
                this.logoClientContext = this.logoClientCanvas.getContext("2d"), d.call(this)
            },
            a = function() {
                o.call(this), p.call(this, !1)
            },
            o = function() {
                this.nbParticlesBg = 0;
                for (var t, e = 0; e < this.aParticlesBg.length; e++) t = this.aParticlesBg[e], t = null;
                this.aParticlesBg = []
            },
            l = function() {
                h.call(this), u.call(this), c.call(this), d.call(this), f.call(this, !1), g.call(this)
            },
            h = function() {
                this.nbParticlesLogo = 0;
                for (var t, e = 0; e < this.aParticlesLogo.length; e++) t = this.aParticlesLogo[e], t = null;
                this.aParticlesLogo = []
            },
            u = function() {
                this.logoHomeContext.clearRect(0, 0, this.logoHomeCanvasW, this.logoHomeCanvasW), this.logoHomeCanvasH = Math.round(70 * MBR.Main.windowH / 100), this.logoHomeCanvasW = Math.round(550 * this.logoHomeCanvasH / 667), this.logoHomeCanvas.width = this.logoHomeCanvasW, this.logoHomeCanvas.height = this.logoHomeCanvasH
            },
            c = function() {
                this.logoHomeContext.drawImage(this.logo, 0, 0, this.logoW, this.logoH, 0, 0, this.logoHomeCanvasW, this.logoHomeCanvasH)
            },
            d = function() {
                this.logoClientCanvasW = Math.round(MBR.Main.windowH - 5 * MBR.Main.windowH / 100 - 100 - 50), this.logoClientCanvas.width = this.logoClientCanvasW, this.logoClientCanvas.height = this.logoClientCanvasW
            },
            p = function(t) {
                for (var e, i = Math.round(MBR.Main.windowW * MBR.Main.windowH / 2e4), n = 0; i > n; n++) x = Math.round(Math.random() * MBR.Main.windowW), y = Math.round(Math.random() * MBR.Main.windowH), opacity = (Math.round(5 * Math.random()) + 1) / 10, radius = (Math.round(5 * Math.random()) + 1) / 2, e = new MBR.Views.Particle(t, "bg", x, y, null, null, radius, opacity), this.aParticlesBg.push(e), e.init();
                this.nbParticlesBg = this.aParticlesBg.length
            },
            f = function() {
                var t, e, i, n, s, r = Math.round((MBR.Main.windowW - this.logoHomeCanvasW) / 2),
                    a = Math.round((MBR.Main.windowH - this.logoHomeCanvasH) / 2 + 7 * MBR.Main.windowH / 100),
                    o = this.logoHomeContext.getImageData(0, 0, this.logoHomeCanvasW, this.logoHomeCanvasH);
                for (t = 0; t < this.logoHomeCanvasW; t += this.DENSITY)
                    for (e = 0; e < this.logoHomeCanvasH; e += this.DENSITY) getPixel(o, t, e).a > 0 && (n = (Math.round(5 * Math.random()) + 1) / 10, s = (Math.round(5 * Math.random()) + 1) / 2, i = new MBR.Views.Particle(!0, "logo", t, e, r, a, s, n, this.AMPLITUDE_MIN, this.AMPLITUDE_MAX, this.APPROACH, this.JELLY, this.VISCOSITY), this.aParticlesLogo.push(i), i.init());
                this.nbParticlesLogo = this.aParticlesLogo.length
            },
            g = function() {
                var t = MBR.RoutesManager.currentPage ? MBR.RoutesManager.currentPage.name : t = null;
                "clients" == t ? this.initClientLogo(MBR.Views.Clients.v.clientsInfos[MBR.Views.Clients.v.idLogo].img, "resize") : t && "home" != t && m.call(this, "resize")
            },
            _ = function(t) {
                if (this.isLogoRebuild) return !1;
                this.isLogoRebuild = !0;
                var e, i;
                t ? (e = 8, i = Quart.easeInOut) : (e = 3, i = Quart.easeOut), setTimeout(function() {
                    for (var n = 0; n < this.nbParticlesLogo; n++) this.aParticlesLogo[n].setLogo();
                    S.call(this, t, e, i), w.call(this)
                }.bind(this), 0)
            },
            m = function(t) {
                "pageChange" == t && "home" != MBR.RoutesManager.currentPage.name && "clients" != MBR.RoutesManager.currentPage.name ? function(){} : function(){}, this.isLogoRebuild = !1, setTimeout(function(t) {
                    for (var e = 0; e < this.nbParticlesLogo; e++) this.aParticlesLogo[e].setExplode();
                    "init" == t || "pageChange" == t ? S.call(this, !1, 3, Quart.easeInOut) : "resize" != t && S.call(this, !1, 3, Quart.easeOut), w.call(this)
                }.bind(this, t), 0)
            },
            v = function(t, e) {
                this.isLogoRebuild = !1;
                var i, n, s = Math.round((MBR.Main.windowW - this.logoClientCanvasW) / 2),
                    r = Math.round((MBR.Main.windowH - this.logoClientCanvasW) / 2 + 7 * MBR.Main.windowH / 100),
                    a = this.logoClientContext.getImageData(0, 0, this.logoClientCanvasW, this.logoClientCanvasW),
                    o = 0,
                    l = T.call(this, a);
                for (i = 1; i < this.logoClientCanvasW; i += l)
                    for (n = 1; n < this.logoClientCanvasW; n += l) getPixel(a, i, n).a > 0 && (ptX = i + s, ptY = n + r, this.aParticlesLogo[o].setClientLogo(ptX, ptY), o++);
                if (0 === o) this.initClientLogo(t, e);
                else {
                    for (var h = o; h < this.nbParticlesLogo; h++) this.aParticlesLogo[h].setExplode();
                    "resize" != e && S.call(this, !1, 3, Quart.easeOut), b.call(this)
                }
            },
            T = function(t) {
                for (var e, i = 0, n = 0; 20 > n; n++) {
                    for (e = n + 1, i = 0, x = 1; x < this.logoClientCanvasW; x += e)
                        for (y = 1; y < this.logoClientCanvasW; y += e) getPixel(t, x, y).a > 0 && i++;
                    if (i < this.nbParticlesLogo) break
                }
                return e
            },
            S = function(t, e, i) {
                t && setTimeout(function() {
                    this.dispatch(this.EVENT.INIT)
                }.bind(this), 5e3), TweenLite.fromTo(this, e, {
                    coeffPos: 0
                }, {
                    coeffPos: 1,
                    ease: i,
                    onComplete: function() {
                        this.isLogoRebuild = !1
                    }.bind(this)
                })
            },
            w = function() {
                TweenLite.to(this, 3, {
                    coeffAmp: 1,
                    ease: Quart.easeInOut
                })
            },
            b = function() {
                TweenLite.to(this, 3, {
                    coeffAmp: 0,
                    ease: Quart.easeInOut
                })
            },
            E = function(t) {
                this.mouseX = t.pageX, this.mouseY = t.pageY
            },
            P = function() {
                for (MBR.Main.isStatsSetted && MBR.Main.stats.begin(), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this.offscreenContext.clearRect(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height), t = 0; t < this.nbParticlesBg; t++) this.aParticlesBg[t].draw(this.coeffPos, this.coeffAmp, this.mouseX, this.mouseY);
                for (var t = 0; t < this.nbParticlesLogo; t++) this.aParticlesLogo[t].draw(this.coeffPos, this.coeffAmp, this.mouseX, this.mouseY);
                this.context.drawImage(this.offscreenCanvas, 0, 0, this.canvas.width, this.canvas.height), MBR.Main.isStatsSetted && MBR.Main.stats.end()
            };
        return new t
    }(window);

    MBR.Views.Particle = function() {
        function t(t, e, i, n, s, a, o, l, h, u, c, d, p) {
            MBR.View.call(this),
            this.isInit = t,
            this.isLogo = "logo" == e ? !0 : !1,
            this.isLogo ? (this.ORIG_X = s + i,
            this.ORIG_Y = a + n,
            this.cX = 0,
            this.cY = 0,
            this.refCx = this.cX,
            this.refCy = this.cY,
            this.destCx = this.ORIG_X,
            this.destCy = this.ORIG_Y,
            this.x = null,
            this.y = null,
            this.mouseX = null,
            this.mouseY = null,
            this.offsetX = 0,
            this.offsetY = 0,
            this.refRepCx = this.ORIG_X,
            this.refRepCy = this.ORIG_Y) : (this.x = i,
            this.y = n),
            this.RADIUS = o,
            this.DIAMETER = 2 * this.RADIUS,
            this.OPACITY = l,
            this.EASE_UPDATE_MIN = 5,
            this.EASE_UPDATE_MAX = 50,
            this.EASE_UPDATE_AMP = this.EASE_UPDATE_MAX - this.EASE_UPDATE_MIN,
            this.EASE_DURATION_LOGO = 20,
            this.EASE_DURATION_BG = 150,
            this.AMPLITUDE_MIN = h,
            this.AMPLITUDE_MAX = u,
            this.AMPLITUDE_DIFF = this.AMPLITUDE_MAX - this.AMPLITUDE_MIN,
            this.APPROACH = c,
            this.JELLY = d,
            this.VISCOSITY = p,
            this.isLogo && r.call(this)
        }
        t.prototype = Object.create(MBR.View.prototype), t.prototype.constructor = t, t.prototype.initElt = function() {
            if (this.context = MBR.Views.Canvas.offscreenContext, this.isLogo) this.easeX = new MBR.Utlz.Ease(Math.random(), 2, this.EASE_DURATION_LOGO, 0), this.easeY = new MBR.Utlz.Ease(Math.random(), 2, this.EASE_DURATION_LOGO, 0), this.easeUpdateX = Math.round(Math.random() * this.EASE_UPDATE_AMP + this.EASE_UPDATE_MIN) / 100, this.easeUpdateY = Math.round(Math.random() * this.EASE_UPDATE_AMP + this.EASE_UPDATE_MIN) / 100;
            else {
                var t = o.call(this);
                this.easeX = new MBR.Utlz.Ease(t.x, 2, this.EASE_DURATION_BG, 0), this.easeY = new MBR.Utlz.Ease(t.y, 2, this.EASE_DURATION_BG, 0), this.easeUpdateX = Math.round(Math.random() * this.EASE_UPDATE_AMP + this.EASE_UPDATE_MIN) / 100, this.easeUpdateY = Math.round(Math.random() * this.EASE_UPDATE_AMP + this.EASE_UPDATE_MIN) / 100
            }
            this.resize()
        },
        t.prototype.bindEvents = function() {},
        t.prototype.resize = function() {},
        t.prototype.draw = function(t, n, s, r) {
            e.call(this, s, r), i.call(this, t, n, s, r), this.context.globalAlpha = this.OPACITY, this.context.drawImage(MBR.Views.Canvas.particleCanvas, this.x, this.y, this.DIAMETER, this.DIAMETER)
        },
        t.prototype.setNewDest = function(t, e) {
            this.refCx = this.cX - this.offsetX, this.refCy = this.cY - this.offsetY, this.destCx = null === t ? this.ORIG_X : t, this.destCy = null === e ? this.ORIG_Y : e
        }, t.prototype.setLogo = function() {
            this.setNewDest(this.ORIG_X, this.ORIG_Y)
        }, t.prototype.setExplode = function() {
            var t = a.call(this);
            this.setNewDest(t.x, t.y)
        }, t.prototype.setClientLogo = function(t, e) {
            this.setNewDest(t, e)
        };
        var e = function(t, e) {
                this.mouseX = t, this.mouseY = e
            },
            i = function(t, e, i, r) {
                this.isLogo ? n.call(this, t, e, i, r) : s.call(this)
            },
            n = function(t, e, i, n) {
                this.easeX.update(this.easeUpdateX), this.easeY.update(this.easeUpdateY), this.offsetX += (this.refRepCx - this.cX) / this.JELLY, this.offsetY += (this.refRepCy - this.cY) / this.JELLY;
                var s = this.cX - i,
                    r = this.cY - n;
                if (Math.sqrt(s * s + r * r) <= this.APPROACH) {
                    var a = this.APPROACH / 10,
                        o = Math.atan2(r, s);
                    this.offsetX += (Math.cos(o) * this.APPROACH - s) / a, this.offsetY += (Math.sin(o) * this.APPROACH - r) / a
                }
                this.offsetX *= 1 - this.VISCOSITY, this.offsetY *= 1 - this.VISCOSITY, Math.abs(this.offsetX) < .001 && (this.offsetX = 0), Math.abs(this.offsetY) < .001 && (this.offsetY = 0), this.cX = this.refCx + (this.destCx - this.refCx) * t, this.cY = this.refCy + (this.destCy - this.refCy) * t, this.cX += this.offsetX, this.cY += this.offsetY;
                var l = this.AMPLITUDE_MIN + this.AMPLITUDE_DIFF * e;
                this.x = this.cX + this.easeX.value * l - l / 2, this.y = this.cY + this.easeY.value * l - l / 2
            },
            s = function() {
                this.easeX.update(this.easeUpdateX), this.easeY.update(this.easeUpdateY), this.x = this.easeX.value * MBR.Main.windowW, this.y = this.easeY.value * MBR.Main.windowH
            },
            r = function() {
                var t = a.call(this);
                this.cX = t.x, this.cY = t.y, this.refCx = this.cX, this.refCy = this.cY
            },
            a = function() {
                var t = Math.round(3 * Math.random()),
                    e = {
                        x: 0,
                        y: 0
                    };
                return 0 === t ? (e.x = Math.round(Math.random() * MBR.Main.windowW), e.y = -this.AMPLITUDE_MAX - 10) : 1 == t ? (e.x = MBR.Main.windowW + this.AMPLITUDE_MAX + 10, e.y = Math.round(Math.random() * MBR.Main.windowH)) : 2 == t ? (e.x = Math.round(Math.random() * MBR.Main.windowW), e.y = MBR.Main.windowH + this.AMPLITUDE_MAX + 10) : 3 == t && (e.x = -this.AMPLITUDE_MAX - 10, e.y = Math.round(Math.random() * MBR.Main.windowH)), e
            },
            o = function() {
                var t = Math.round(3 * Math.random()),
                    e = {
                        x: 0,
                        y: 0
                    };
                return this.isInit ? 0 === t ? (e.x = Math.random(), e.y = -.2) : 1 == t ? (e.x = 1.2, e.y = Math.random()) : 2 == t ? (e.x = Math.random(), e.y = 1.2) : 3 == t && (e.x = -.2, e.y = Math.random()) : (e.x = Math.random(), e.y = Math.random()), e
            };
        return t
    }(window);

    MBR.Main = function(t) {

        function e() {
            this.$ = {}, this.p = {},
            this.windowW = null, this.windowH = null, this.isStatsSetted = !1
        }

        e.prototype.onReady = function() {
            this.$.window = $(t),
            this.$.body = $(document.body),
            this.$.mainContainer = $(document.getElementById("main-container")),
            this.$.pageWrapper = $(document.getElementById("page-wrapper")),
            this.$.pageContainer = $(document.getElementById("page-container")),
            this.$.loader = $(document.getElementById("loader")),
            this.$.loaderProgress = this.$.loader.find(".loader-progress"),
            this.p.windowLoad = $.proxy(i, this),
            this.$.window.on("load", this.p.windowLoad)
        }

        e.prototype.resize = function(t) {
            h.call(this);
            var e = this.$.pageWrapper.width();
            return this.$.pageWrapper[0].style.marginLeft = -Math.round(e / 2) + e / 10 + "px", t && MBR.Views.Canvas.resize(!0), MBR.RoutesManager.isPageChange ? !1 : void(null !== MBR.RoutesManager.currentPage && MBR.RoutesManager.currentPage.resize())
        };

        var i = function() {
                this.$.window.off("load", this.p.windowLoad),
                this.p.windowLoad = null,
                this.$.mainContainer[0].className = this.$.mainContainer[0].className.replace("preload", ""),
                h.call(this),
                MBR.Views.Canvas.buildEvt(MBR.Views.Canvas.EVENT.INIT),
                MBR.Views.Canvas.init()
            };
        var h = function() {
                this.windowW = this.$.body.width(), this.windowH = this.$.body.height()
            };

        return new e
    }(window);

    $(MBR.Main.onReady.bind(MBR.Main));

    $(window).load(function(){
        BgImage = "assets/img/particle-outline.png";
        MBR.Views.Canvas.initLogo();
    });
})
