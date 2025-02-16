import {gsap} from "gsap";


type SliderOptions = {
	slidesPerView?: number,
	slidesPerGroup?:number,
	spaceBetween?: number,
	navigation?: {
		prev: HTMLElement
		next: HTMLElement
	},
	speed?: number
}
export class Slider {
	track:HTMLElement
	slides:  NodeListOf<Element>
	slider:HTMLElement
	options :SliderOptions = {
		slidesPerView: 1,
		slidesPerGroup:1,
		spaceBetween: 0,
		speed: 500
	}
	trackPosition = 0
	constructor(elem: string | HTMLElement, options:SliderOptions ={}){
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
				(slide as HTMLElement).style.marginRight = this.options.spaceBetween + 'px'

			}
			(slide as HTMLElement).style.width = slideWidth + 'px'
		})
		this.options.navigation.prev?.addEventListener('click', ()=>{
			this.slidePrev()
		})
		this.options.navigation.next?.addEventListener('click', ()=>{
			this.slideNext()
		})
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