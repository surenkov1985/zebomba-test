/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 9775:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


// EXTERNAL MODULE: ../node_modules/gsap/index.js + 2 modules
var gsap = __webpack_require__(1932);
;// ./assets/game/slider.ts
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var Slider = /** @class */ (function () {
    function Slider(elem, options) {
        if (options === void 0) { options = {}; }
        this.options = {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
            speed: 500
        };
        this.trackPosition = 0;
        this.slider = typeof elem === 'string' ? document.querySelector(elem) : elem;
        this.track = this.slider.querySelector('.slider-track');
        this.slides = this.slider.querySelectorAll('.slide');
        this.options = __assign(__assign({}, this.options), options);
    }
    Slider.prototype.init = function () {
        var _this = this;
        var _a, _b;
        var viewSlides = this.options.slidesPerView;
        var sliderWidth = this.slider.getBoundingClientRect().width - (this.options.spaceBetween * (viewSlides - 1));
        var slideWidth = sliderWidth / viewSlides;
        this.slides.forEach(function (slide, index) {
            if (index < _this.slides.length - 1) {
                slide.style.marginRight = _this.options.spaceBetween + 'px';
            }
            slide.style.width = slideWidth + 'px';
        });
        (_a = this.options.navigation.prev) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            _this.slidePrev();
        });
        (_b = this.options.navigation.next) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
            _this.slideNext();
        });
    };
    Slider.prototype.slideNext = function () {
        var tl = gsap/* gsap */.os.timeline();
        var viewSlides = this.options.slidesPerView;
        var sliderWidth = this.slider.getBoundingClientRect().width - (this.options.spaceBetween * (viewSlides - 1));
        var trackWidth = this.track.getBoundingClientRect().width;
        var slideWidth = sliderWidth / viewSlides;
        var translateWidth = slideWidth + this.options.spaceBetween;
        if (Math.abs(this.trackPosition - translateWidth) > trackWidth - this.slider.getBoundingClientRect().width) {
            this.trackPosition = 0;
        }
        else {
            this.trackPosition -= translateWidth;
        }
        tl.to(this.track, { translateX: this.trackPosition, duration: this.options.speed / 1000
        });
    };
    Slider.prototype.slidePrev = function () {
        var tl = gsap/* gsap */.os.timeline();
        var viewSlides = this.options.slidesPerView;
        var sliderWidth = this.slider.getBoundingClientRect().width - (this.options.spaceBetween * (viewSlides - 1));
        var slideWidth = sliderWidth / viewSlides;
        var translateWidth = slideWidth + this.options.spaceBetween;
        if (this.trackPosition + translateWidth > 0)
            return;
        this.trackPosition += translateWidth;
        tl.to(this.track, { translateX: this.trackPosition, duration: this.options.speed / 1000
        });
    };
    return Slider;
}());


;// ./assets/game/hero.ts

var Hero = /** @class */ (function () {
    function Hero(points) {
        this.points = points;
    }
    Hero.prototype.create = function () {
        var elem = document.createElement('div');
        elem.classList.add('hero');
        var heroImg = document.createElement('img');
        heroImg.src = '/static/images/hero.png';
        elem.appendChild(heroImg);
        this.hero = elem;
        this.setPosition();
    };
    Hero.prototype.setPosition = function (position) {
        var _this = this;
        if (position === void 0) { position = null; }
        var newPosition = position ? position : this.points[0];
        if (!position) {
            this.hero.style.left = newPosition.x + 'px';
            this.hero.style.top = newPosition.y + 'px';
            this.position = newPosition;
        }
        else {
            var tl = gsap/* gsap */.os.timeline();
            this.isAnimating = true;
            tl
                .to(this.hero, {
                keyframes: {
                    "0%": { left: this.position.x + 'px', top: this.position.y + 'px' },
                    "50%": { translateY: '-120%', scale: 1.2 }, // finetune with individual eases
                    "100%": { left: newPosition.x + 'px', top: newPosition.y + 'px', translateY: '-100%', scale: 1 },
                },
            }).then(function () {
                _this.position = newPosition;
                _this.isAnimating = false;
            });
        }
    };
    Hero.prototype.jump = function () {
        var _this = this;
        if (this.isAnimating)
            return;
        var oldPosition = this.points.findIndex(function (item) { return item.x === _this.position.x && item.y === _this.position.y; });
        var newPosition = this.points[oldPosition + 1];
        this.setPosition(newPosition);
    };
    return Hero;
}());


;// ./assets/game/script.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var Game = /** @class */ (function () {
    function Game(points) {
        this.points = points;
        this.hero = new Hero(points);
    }
    Game.prototype.start = function () {
        var _this = this;
        this.renderMap();
        var slider = document.querySelector('.friends__slider_wrapper');
        this.friends = new Slider(slider, {
            slidesPerView: 8,
            spaceBetween: 8,
            navigation: {
                prev: slider.closest('.friends__slider').querySelector('.prev_btn'),
                next: slider.closest('.friends__slider').querySelector('.next_btn')
            },
            speed: 500
        }).init();
        this.parseRating();
        document.addEventListener('click', function (e) {
            var tl = gsap/* gsap */.os.timeline();
            if (e.target.closest('.rating_btn')) {
                tl.to('.popup', {
                    opacity: 1, visibility: 'visible'
                })
                    .to('#rating', {
                    y: 0
                }, '<');
            }
            if (e.target.closest('.btn_close')) {
                tl
                    .to('#rating', {
                    y: '-100px'
                })
                    .to('.popup', {
                    opacity: 0, delay: .1
                }, '<')
                    .to('.popup', {
                    visibility: 'hidden'
                });
            }
            if (e.target.closest('.play_btn')) {
                _this.hero.jump();
            }
        });
    };
    Game.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch('./static/data/data.json', {
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.parseRating = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, rating, friends, ratingList;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getUsers()];
                    case 1:
                        _a = _b.sent(), rating = _a.rating, friends = _a.friends;
                        ratingList = document.querySelector('.rating__list');
                        rating.sort(function (a, b) { return +b.points - +a.points; });
                        rating.forEach(function (item, index) {
                            var ratingItem = document.createElement('div');
                            ratingItem.classList.add('rating__item');
                            if (friends.findIndex(function (el) { return el.id === item.id; }) !== -1) {
                                ratingItem.classList.add('is_friend');
                            }
                            var ratingNum = document.createElement('div');
                            ratingNum.classList.add('rating__item_num');
                            ratingNum.textContent = (index + 1).toString();
                            var ratingPlayer = document.createElement('div');
                            ratingPlayer.classList.add('rating__item_player');
                            var ratingPlayerIcon = document.createElement('div');
                            ratingPlayerIcon.classList.add('icon');
                            var icon = document.createElement('img');
                            icon.src = item.img;
                            var ratingPlayerName = document.createElement('span');
                            ratingPlayerName.textContent = "".concat(item.name, " ").concat(item.lastName);
                            ratingPlayer.appendChild(ratingPlayerIcon);
                            ratingPlayer.appendChild(ratingPlayerName);
                            var ratingExperience = document.createElement('div');
                            ratingExperience.classList.add('rating__item_experience');
                            ratingExperience.textContent = item.points;
                            ratingItem.appendChild(ratingNum);
                            ratingItem.appendChild(ratingPlayer);
                            ratingItem.appendChild(ratingExperience);
                            ratingList.appendChild(ratingItem);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.renderMap = function () {
        var _this = this;
        var app = document.getElementById('wrapper');
        var mapBg = document.createElement('div');
        mapBg.classList.add('game__bg');
        var pointsContainer = document.createElement('div');
        pointsContainer.classList.add('points');
        this.points.forEach(function (item, index) {
            var point = document.createElement('div');
            point.classList.add('point');
            if (item.isStartPoint) {
                point.classList.add('start');
            }
            else if (item.isStartEtap) {
                point.classList.add('startEtap');
            }
            else if (index === _this.points.length - 1) {
                point.classList.add('finish');
            }
            point.style.left = "".concat(item.x, "px");
            point.style.top = "".concat(item.y, "px");
            pointsContainer.appendChild(point);
        });
        mapBg.appendChild(pointsContainer);
        app.appendChild(mapBg);
        this.hero.create();
        app.appendChild(this.hero.hero);
    };
    return Game;
}());


;// ./assets/model/points.ts
var points = [
    {
        isStartPoint: true,
        isStartEtap: false,
        x: 445,
        y: 503
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 350,
        y: 475
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 275,
        y: 519
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 190,
        y: 538
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 110,
        y: 508
    },
    {
        isStartPoint: false,
        isStartEtap: true,
        x: 123,
        y: 444
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 142,
        y: 387
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 214,
        y: 350
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 175,
        y: 280
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 139,
        y: 228
    },
    {
        isStartPoint: false,
        isStartEtap: true,
        x: 201,
        y: 197
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 255,
        y: 245
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 298,
        y: 205
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 331,
        y: 157
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 373,
        y: 109
    },
    {
        isStartPoint: false,
        isStartEtap: true,
        x: 420,
        y: 40
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 504,
        y: 78
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 461,
        y: 150
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 485,
        y: 224
    },
    {
        isStartPoint: false,
        isStartEtap: true,
        x: 456,
        y: 301
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 385,
        y: 347
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 375,
        y: 410
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 453,
        y: 428
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 524,
        y: 468
    },
    {
        isStartPoint: false,
        isStartEtap: true,
        x: 622,
        y: 500
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 715,
        y: 523
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 812,
        y: 471
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 884,
        y: 422
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 949,
        y: 384
    },
    {
        isStartPoint: false,
        isStartEtap: true,
        x: 959,
        y: 314
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 902,
        y: 287
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 841,
        y: 326
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 783,
        y: 361
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 720,
        y: 351
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 725,
        y: 297
    },
    {
        isStartPoint: false,
        isStartEtap: true,
        x: 796,
        y: 257
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 804,
        y: 189
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 750,
        y: 178
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 680,
        y: 215
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 624,
        y: 256
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 580,
        y: 305
    },
    {
        isStartPoint: false,
        isStartEtap: true,
        x: 522,
        y: 287
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 506,
        y: 230
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 544,
        y: 175
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 590,
        y: 141
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 614,
        y: 83
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 646,
        y: 30
    },
    {
        isStartPoint: false,
        isStartEtap: true,
        x: 698,
        y: 58
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 672,
        y: 137
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 751,
        y: 83
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 819,
        y: 137
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 865,
        y: 106
    },
    {
        isStartPoint: false,
        isStartEtap: false,
        x: 884,
        y: 171
    }
];

;// ./index.ts



var game = new Game(points);
game.start();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			57: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, [60], function() { return __webpack_require__(1001); })
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [60], function() { return __webpack_require__(9775); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;