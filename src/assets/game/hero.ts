import {gsap} from "gsap";
import type {Point} from "../model/types";

type Position = {
	x:number
	y:number
}
export class Hero {

	hero:HTMLElement
	position:Position
	points:Point[]
	isAnimating:boolean
	constructor(points:Point[]){
		this.points = points

	}

	create(){
		const elem = document.createElement('div')
		elem.classList.add('hero')
		const heroImg = document.createElement('img')
		heroImg.src = '/static/images/hero.png'
		elem.appendChild(heroImg)
		this.hero = elem

		this.setPosition()
	}


	setPosition(position:Position|null = null){
		let newPosition = position ? position : this.points[0]
		if (!position) {
			this.hero.style.left = newPosition.x + 'px'
			this.hero.style.top = newPosition.y + 'px'
			this.position = newPosition
		} else {
			const tl = gsap.timeline()
			this.isAnimating = true
			tl
				.to(this.hero, {
					keyframes: {
						"0%": {left: this.position.x + 'px', top: this.position.y + 'px'},
						"50%": {translateY: '-120%', scale: 1.2}, // finetune with individual eases
						"100%": {left: newPosition.x + 'px', top: newPosition.y + 'px', translateY: '-100%', scale: 1},
					},
				}).then(()=>{
				this.position = newPosition
				this.isAnimating = false
			})
		}

	}

	jump() {
		if (this.isAnimating) return
		const oldPosition = this.points.findIndex(item=>item.x === this.position.x && item.y === this.position.y)
		const newPosition = this.points[oldPosition + 1]
		this.setPosition(newPosition)
	}
}