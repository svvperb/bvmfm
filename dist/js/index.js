! function(e, t) {
    "use strict";
    var n = function() {
        function n(e) {
            if (!("classList" in document.documentElement)) return !1;
            if (!U && null !== G) {
                if (Z = S(Z, e), T = G.querySelector(".ap-toggle-btn"), H = G.querySelector(".ap-prev-btn"), A = G.querySelector(".ap-next-btn"), P = G.querySelector(".ap-repeat-btn"), z = G.querySelector(".ap-volume-btn"), I = G.querySelector(".ap-playlist-btn"), B = G.querySelector(".ap-time--current"), C = G.querySelector(".ap-time--duration"), V = G.querySelector(".ap-title"), O = G.querySelector(".ap-bar"), x = G.querySelector(".ap-preload-bar"), j = G.querySelector(".ap-volume-bar"), Y = Z.playList, T.addEventListener("click", v, !1), z.addEventListener("click", p, !1), P.addEventListener("click", m, !1), O.parentNode.parentNode.addEventListener("mousedown", g, !1), O.parentNode.parentNode.addEventListener("mousemove", N, !1), document.documentElement.addEventListener("mouseup", w, !1), j.parentNode.parentNode.addEventListener("mousedown", E, !1), j.parentNode.parentNode.addEventListener("mousemove", b), document.documentElement.addEventListener("mouseup", w, !1), H.addEventListener("click", l, !1), A.addEventListener("click", c, !1), U = !0, i(), I.addEventListener("click", f, !1), X = new Audio, X.volume = Z.volume, d()) return void u();
                X.src = Y[F].file, X.preload = "auto", V.innerHTML = Y[F].title, j.style.height = 100 * X.volume + "%", D = j.css("height"), X.addEventListener("error", a, !1), X.addEventListener("timeupdate", h, !1), X.addEventListener("ended", L, !1), Z.autoPlay && (X.play(), T.classList.add("playing"), W[F].classList.add("pl-current"))
            }
        }

        function i() {
            var e = [],
                t = '<li data-track="{count}"><div class="pl-number"><div class="pl-count"><svg fill="#000000" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg></div><div class="pl-playing"><div class="eq"><div class="eq-bar"></div><div class="eq-bar"></div><div class="eq-bar"></div></div></div></div><div class="pl-title">BEVSTMODE RADIO</div></li>';
            Y.forEach(function(n, i) {
                e.push(t.replace("{count}", i).replace("{title}", n.title))
            }), R = k("div", {
                className: "pl-container hide",
                id: "pl",
                innerHTML: d() ? '<div class="pl-empty">PlayList is empty</div>' : '<ul class="pl-list">' + e.join("") + "</ul>"
            }), G.parentNode.insertBefore(R, G.nextSibling), W = R.querySelectorAll("li"), R.addEventListener("click", r, !1)
        }

        function r(e) {
            if (e.preventDefault(), "pl-title" === e.target.className) {
                var t = parseInt(e.target.parentNode.getAttribute("data-track"), 10);
                F = t, s(), o()
            } else
                for (var n = e.target; n.className !== R.className;) {
                    if ("pl-remove" === n.className) {
                        var i = parseInt(n.parentNode.getAttribute("data-track"), 10);
                        return Y.splice(i, 1), n.parentNode.parentNode.removeChild(n.parentNode), W = R.querySelectorAll("li"), [].forEach.call(W, function(e, t) {
                            e.setAttribute("data-track", t)
                        }), X.paused ? d() ? u() : (X.src = Y[F].file, document.title = V.innerHTML = Y[F].title, O.style.width = 0) : i === F && s(), void(F > i && F--)
                    }
                    n = n.parentNode
                }
        }

        function o() {
            if (X.paused) return void W[F].classList.remove("pl-current");
            for (var e = F, t = 0, n = W.length; n > t; t++) W[t].classList.remove("pl-current");
            W[e].classList.add("pl-current")
        }

        function a() {
            !d() && c()
        }

        function s() {
            return F = F > Y.length - 1 ? 0 : F, 0 > F && (F = Y.length - 1), d() ? void u() : (X.src = Y[F].file, X.preload = "auto", document.title = V.innerHTML = Y[F].title, X.play(), M(Y[F].title, {
                icon: Y[F].icon,
                body: "Now playing",
                tag: "music-player"
            }), T.classList.add("playing"), void o())
        }

        function l() {
            F -= 1, s()
        }

        function c() {
            F += 1, s()
        }

        function d() {
            return 0 === Y.length
        }

        function u() {
            X.pause(), X.src = "", V.innerHTML = "Empty Playlist", B.innerHTML = "--", C.innerHTML = "--", O.style.width = 0, x.style.width = 0, T.classList.remove("playing"), R.innerHTML = '<div class="pl-empty">Playlist Is Empty</div>'
        }

        function v() {
            d() || (X.paused ? (X.play(), M(Y[F].title, {
                icon: Y[F].icon,
                body: "Now playing"
            }), this.classList.add("playing")) : (X.pause(), this.classList.remove("playing")), o())
        }

        function p() {
            X.muted ? (0 === parseInt(D, 10) ? (j.style.height = "100%", X.volume = 1) : j.style.height = D, X.muted = !1, this.classList.remove("muted")) : (X.muted = !0, j.style.height = 0, this.classList.add("muted"))
        }

        function m() {
            var e = this.classList;
            e.contains("ap-active") ? (J = !1, e.remove("ap-active")) : (J = !0, e.add("ap-active"))
        }

        function f() {
            this.classList.toggle("ap-active"), R.classList.toggle("hide")
        }

        function h() {
            if (0 !== X.readyState) {
                var e = Math.round(X.currentTime * (100 / X.duration));
                O.style.width = e + "%";
                var t = Math.floor(X.currentTime / 60),
                    n = Math.floor(X.currentTime - 60 * t),
                    i = Math.floor(X.duration / 60),
                    r = Math.floor(X.duration - 60 * i);
                10 > n && (n = "0" + n), 10 > r && (r = "0" + r), B.innerHTML = t + ":" + n, C.innerHTML = i + ":" + r;
                var o = X.buffered;
                if (o.length) {
                    var a = Math.round(100 * o.end(0) / X.duration);
                    x.style.width = a + "%"
                }
            }
        }

        function L() {
            if (F === Y.length - 1) {
                if (!J) return X.pause(), o(), void T.classList.remove("playing");
                F = 0, s()
            } else F = F === Y.length - 1 ? 0 : F + 1, s()
        }

        function y(t, n, i) {
            var r;
            if ("horizontal" === i) return r = Math.round(100 * (t.clientX - n.offset().left + e.pageXOffset) / n.parentNode.offsetWidth), n.style.width = r + "%", r;
            var o = n.offset().top + n.offsetHeight - e.pageYOffset;
            return r = Math.round(o - t.clientY), r > 100 && (r = 100), 0 > r && (r = 0), j.style.height = r + "%", r
        }

        function g(e) {
            Q = 3 === e.which ? !0 : !1, K = !0, N(e)
        }

        function E(e) {
            Q = 3 === e.which ? !0 : !1, K = !0, b(e)
        }

        function N(e) {
            if (K && Q === !1 && 0 !== X.readyState) {
                var t = y(e, O, "horizontal");
                X.currentTime = X.duration * (t / 100)
            }
        }

        function w() {
            K = !1
        }

        function b(e) {
            if (D = j.css("height"), K && Q === !1) {
                var t = y(e, j.parentNode, "vertical") / 100;
                0 >= t ? (X.volume = 0, z.classList.add("muted")) : (X.muted && (X.muted = !1), X.volume = t, z.classList.remove("muted"))
            }
        }

        function M(n, i) {
            Z.notification && e.Notification !== t && e.Notification.requestPermission(function(e) {
                if ("granted" === e) {
                    var t = new Notification(n.substr(0, 110), i);
                    t.onshow = function() {
                        setTimeout(function() {
                            t.close()
                        }, 5e3)
                    }
                }
            })
        }

        function q() {
            U && (T.removeEventListener("click", v, !1), z.removeEventListener("click", p, !1), P.removeEventListener("click", m, !1), I.removeEventListener("click", f, !1), O.parentNode.parentNode.removeEventListener("mousedown", g, !1), O.parentNode.parentNode.removeEventListener("mousemove", N, !1), document.documentElement.removeEventListener("mouseup", w, !1), j.parentNode.parentNode.removeEventListener("mousedown", E, !1), j.parentNode.parentNode.removeEventListener("mousemove", b), document.documentElement.removeEventListener("mouseup", w, !1), H.removeEventListener("click", l, !1), A.removeEventListener("click", c, !1), X.removeEventListener("error", a, !1), X.removeEventListener("timeupdate", h, !1), X.removeEventListener("ended", L, !1), G.parentNode.removeChild(G), R.removeEventListener("click", r, !1), R.parentNode.removeChild(R), X.pause(), U = !1)
        }

        function S(e, t) {
            for (var n in t) e.hasOwnProperty(n) && (e[n] = t[n]);
            return e
        }

        function k(e, n) {
            var i = document.createElement(e);
            if (n)
                for (var r in n) i[r] !== t && (i[r] = n[r]);
            return i
        }
        var T, H, A, I, P, z, O, x, B, C, V, X, Y, j, D, R, W, G = document.getElementById("ap"),
            F = 0,
            J = !1,
            K = !1,
            Q = !1,
            U = !1,
            Z = {
                volume: 1, //0.5 Volume Property
                autoPlay: !0,
                notification: !1,
                playList: []
            };
        return Element.prototype.offset = function() {
            var t = this.getBoundingClientRect(),
                n = e.pageXOffset || document.documentElement.scrollLeft,
                i = e.pageYOffset || document.documentElement.scrollTop;
            return {
                top: t.top + i,
                left: t.left + n
            }
        }, Element.prototype.css = function(e) {
            if ("string" == typeof e) return getComputedStyle(this, "")[e];
            if ("object" == typeof e)
                for (var n in e) this.style[n] !== t && (this.style[n] = e[n])
        }, {
            init: n,
            destroy: q
        }
    }();
    e.AP = n
}(window);
var iconImage = "#";
AP.init({
    playList: [{
        icon: iconImage,
        title: "",
        file: "http://159.203.61.103:8000/;stream.mp3"
    }]
});

$.SHOUTcast({
    host: "159.203.61.103",
    port: 8000,
    interval: 1e3,
    stats: function() {
        $("#nowplaying").text(this.get("songtitle"))
    }
}).startStats()
