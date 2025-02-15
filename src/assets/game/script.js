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
			speed:500
		}).init()
		document.addEventListener('click', function (e){
			const tl = gsap.timeline()
			if (e.target.closest('.rating_btn')) {
				tl.to('.popup', {
					opacity:1, visibility: 'visible'
				})
					.to('#rating', {
						y: 0
					}, '<')
			}

			if (e.target.closest('.btn_close')) {
				tl
					.to('#rating', {
						y: '-150px'
					})
					.to('.popup', {
					opacity: 0, delay:.2
				},'<')
					.to('.popup', {
						 visibility: 'hidden'
					})
			}



		})
		this.parseRating()
	}

	setHeroPosition(startPosition = undefined){
		let position = startPosition ? points[startPosition] : points[0]
		this.position = startPosition || 0
		if (!startPosition) {
			this.hero.style.left = position.x + 'px'
			this.hero.style.top = position.y + 'px'
		}

	}

	async getUsers(){
		try {
			const response = await fetch('./static/data/data.json',{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			})
			const data = await response.json()
			return data
		} catch (e) {
			console.log(e.message)
		}
	}

	async parseRating(){
		const {rating, friends} = await this.getUsers()
		const ratingList = document.querySelector('.rating__list')
		rating.sort((a, b) => b.points - a.points)
		rating.forEach((item, index) => {
			const ratingItem = document.createElement('div')
			ratingItem.classList.add('rating__item')
			if (friends.findIndex(el=>el.id === item.id) !== -1) {
				ratingItem.classList.add('is_friend')
			}
			const ratingNum = document.createElement('div')
			ratingNum.classList.add('rating__item_num')
			ratingNum.textContent = index + 1
			const ratingPlayer = document.createElement('div')
			ratingPlayer.classList.add('rating__item_player')
			const ratingPlayerIcon = document.createElement('div')
			ratingPlayerIcon.classList.add('icon')
			const icon = document.createElement('img')
			icon.src = item.img
			const ratingPlayerName = document.createElement('span')
			ratingPlayerName.textContent = `${item.name} ${item.lastName}`
			ratingPlayer.appendChild(ratingPlayerIcon)
			ratingPlayer.appendChild(ratingPlayerName)

			const ratingExperience = document.createElement('div')
			ratingExperience.classList.add('rating__item_experience')
			ratingExperience.textContent = item.points

			ratingItem.appendChild(ratingNum)
			ratingItem.appendChild(ratingPlayer)
			ratingItem.appendChild(ratingExperience)
			ratingList.appendChild(ratingItem)
		})
		// const rating
	}

	jump(newPosition) {
		const tl = gsap.timeline()
		const oldPosition = this.points[newPosition - 1]

		const position = this.points[newPosition]
		if (position) {
			this.position = newPosition

			tl
				.to(this.hero, {
					keyframes: {
						"0%": {left: oldPosition.x + 'px', top: oldPosition.y + 'px'},
						"50%": {translateY: '-120%', scale: 1.2}, // finetune with individual eases
						"100%": {left: position.x + 'px', top: position.y + 'px', translateY: '-100%', scale: 1},
					},
				})
		}
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
		console.log(this)
	}

	slideNext(){
		const tl = gsap.timeline()
		const viewSlides = this.options.slidesPerView
		const sliderWidth = this.slider.getBoundingClientRect().width - (this.options.spaceBetween * (viewSlides - 1))
		const trackWidth = this.track.getBoundingClientRect().width
		const slideWidth = sliderWidth / viewSlides
		const translateWidth = slideWidth + this.options.spaceBetween
		if (Math.abs(this.trackPosition - translateWidth) > trackWidth - this.slider.getBoundingClientRect().width) {

			this.trackPosition = 0
		}else {
			this.trackPosition -= translateWidth
		}
		tl.to(this.track, {translateX: this.trackPosition, duration: this.options.speed / 1000
		})
	}
	slidePrev(){
		const tl = gsap.timeline()
		const viewSlides = this.options.slidesPerView
		const sliderWidth = this.slider.getBoundingClientRect().width - (this.options.spaceBetween * (viewSlides - 1))
		const slideWidth = sliderWidth / viewSlides
		const translateWidth = slideWidth + this.options.spaceBetween
		if (this.trackPosition + translateWidth > 0) return
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


