import "../styles/style.scss";
import {gsap} from'gsap'
import {Slider} from "./slider";
import {Hero} from "./hero";
import {Friend, Point, Rating} from "../model/types";

export class Game {

	friends:unknown
	points:Point[]
	hero:Hero
	app:HTMLElement
	constructor(points:Point[]){
		this.points = points
		this.hero = new Hero(points)
	}
	start(){
		this.renderMap()

		const slider = document.querySelector('.friends__slider_wrapper')
		this.friends = new Slider((slider as HTMLElement), {
			slidesPerView: 8,
			spaceBetween: 8,
			navigation: {
				prev: slider.closest('.friends__slider').querySelector('.prev_btn'),
				next: slider.closest('.friends__slider').querySelector('.next_btn')
			},
			speed:500
		}).init()
		this.parseRating()

		document.addEventListener('click', (e)=>{
			const tl = gsap.timeline()
			if ((e.target as Element).closest('.rating_btn')) {
				tl.to('.popup', {
					opacity:1, visibility: 'visible'
				})
					.to('#rating', {
						y: 0
					}, '<')
			}

			if ((e.target as Element).closest('.btn_close')) {
				tl
					.to('#rating', {
						y: '-100px'
					})
					.to('.popup', {
						opacity: 0, delay:.1
					},'<')
					.to('.popup', {
						visibility: 'hidden'
					})
			}

			if ((e.target as Element).closest('.play_btn')) {

				this.hero.jump()
			}

		})
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
		rating.sort((a:Rating, b:Rating) => +b.points - +a.points)
		rating.forEach((item:Rating, index:number) => {
			const ratingItem = document.createElement('div')
			ratingItem.classList.add('rating__item')
			if (friends.findIndex((el:Friend)=>el.id === item.id) !== -1) {
				ratingItem.classList.add('is_friend')
			}
			const ratingNum = document.createElement('div')
			ratingNum.classList.add('rating__item_num')
			ratingNum.textContent = (index + 1).toString()
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
	}

	renderMap() {
		const app = document.getElementById('wrapper')
		const mapBg = document.createElement('div')
		mapBg.classList.add('game__bg')
		const pointsContainer = document.createElement('div')
		pointsContainer.classList.add('points')

		this.points.forEach((item, index) => {

			const point = document.createElement('div')
			point.classList.add('point')
			if (item.isStartPoint) {
				point.classList.add('start')
			} else if (item.isStartEtap) {
				point.classList.add('startEtap')
			} else if (index === this.points.length -1) {
				point.classList.add('finish')
			}
			point.style.left = `${item.x}px`
			point.style.top = `${item.y}px`
			pointsContainer.appendChild(point)
		})

		mapBg.appendChild(pointsContainer)
		app.appendChild(mapBg)
		this.hero.create()
		app.appendChild(this.hero.hero)
	}
}






