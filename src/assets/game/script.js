import "../styles/style.scss";
import {gsap} from'gsap'

export class Game {

	friends
	constructor(hero, points){
		this.points = points
		this.hero = hero
		this.position = 0
		this.jumpButton = document.querySelector('.play_btn')
	}
	start(){
		this.renderMap()
		this.setHeroPosition()

		this.jumpButton.addEventListener('click', ()=>{
			const oldPosition = this.position

			this.jump(oldPosition + 1)
		})
		const slider = document.querySelector('.friends__slider_wrapper')
		this.friends = new Slider(slider, {
			slidesPerView: 8,
			spaceBetween: 8,
			navigation: {
				prev: slider.closest('.friends__slider').querySelector('.prev_btn'),
				next: slider.closest('.friends__slider').querySelector('.next_btn')
			},
			speed:700
		}).init()
	}

	setHeroPosition(startPosition = undefined){
		let position = startPosition ? points[startPosition] : points[0]
		this.position = startPosition || 0
		if (!startPosition) {
			this.hero.style.left = position.x + 'px'
			this.hero.style.top = position.y + 'px'
		}

	}



	jump(newPosition) {
		console.log(newPosition)
		const tl = gsap.timeline()
		const oldPosition = this.points[newPosition - 1]
		const position = this.points[newPosition]
		this.position = newPosition

		tl
			// .from(this.hero, {left: oldPosition.x + 'px', top: oldPosition.y + 'px', yPercent: -100})
			// .to(this.hero,{ y: '-110%'})
			.to(this.hero,{  keyframes: {
					"0%":   { left: oldPosition.x + 'px', top: oldPosition.y + 'px'},
					"50%":  { translateY: '-120%', scale: 1.2}, // finetune with individual eases
					"100%": { left: position.x + 'px', top: position.y + 'px',translateY: '-100%', scale:1 },
				},})
			// .to(this.hero,{left: position.x + 'px', top: position.y + 'px', translateY: ['-100%','-110%','-100%']}, '<')
	}

	renderMap() {
		this.points.forEach((item, index) => {
			const pointsContainer = document.querySelector('.points')
			const point = document.createElement('div')
			point.classList.add('point')
			if (item.isStartPoint) {
				point.classList.add('start')
			} else if (item.isStartEtap) {
				point.classList.add('startEtap')
			} else if (index === points.length -1) {
				point.classList.add('finish')
			}
			point.style.left = `${item.x}px`
			point.style.top = `${item.y}px`
			pointsContainer.appendChild(point)
		})

	}
}

class Slider {

	track
	slides
	options = {
		slidesPerView: 1,
		slidesPerGroup:1,
		spaceBetween: 0,
		navigation: {},
		speed: 500

	}
	trackPosition = 0
	constructor(elem, options ={}){
		this.slider = typeof elem === 'string' ? document.querySelector(elem) : elem
		this.track = this.slider.querySelector('.slider-track')
		this.slides = this.slider.querySelectorAll('.slide')
		this.options = {...this.options, ...options}


	}

	init(){
		const viewSlides = this.options.slidesPerView
		const sliderWidth = this.slider.getBoundingClientRect().width - (this.options.spaceBetween * (viewSlides - 1))
		const slideWidth = sliderWidth / viewSlides
		this.slides.forEach((slide, index) =>{
			if (index < this.slides.length - 1) {
				slide.style.marginRight = this.options.spaceBetween + 'px'

			}
			slide.style.width = slideWidth + 'px'
		})
		this.options.navigation.prev.addEventListener('click', ()=>{
			this.slidePrev()
		})
		this.options.navigation.next.addEventListener('click', ()=>{
			this.slideNext()
		})
	}

	slideNext(){
		const tl = gsap.timeline()
		const viewSlides = this.options.slidesPerView
		const sliderWidth = this.slider.getBoundingClientRect().width - (this.options.spaceBetween * (viewSlides - 1))
		const slideWidth = sliderWidth / viewSlides
		const translateWidth = slideWidth + this.options.spaceBetween
		this.trackPosition -= translateWidth
		tl.to(this.track, {translateX: this.trackPosition, duration: this.options.speed / 1000
		})
	}
	slidePrev(){
		const tl = gsap.timeline()
		const viewSlides = this.options.slidesPerView
		const sliderWidth = this.slider.getBoundingClientRect().width - (this.options.spaceBetween * (viewSlides - 1))
		const slideWidth = sliderWidth / viewSlides
		const translateWidth = slideWidth + this.options.spaceBetween
		this.trackPosition += translateWidth
		tl.to(this.track, {translateX: this.trackPosition, duration: this.options.speed / 1000
		})
	}
}

export const points = [
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
]


