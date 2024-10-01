import * as builder from '../vendors/builder.js';
import Car from './car.js';
import waitScreen from './waitScreen.js';

export default class CarFactory extends builder.Component
{
	constructor()
	{
		super()
		this.create()
	}


	#factory(data)
	{
		const cars = []
		for (const car of data)
		{
			cars.push((new Car(car)).getHTML())
		}
		console.log(cars)
		return cars
	}

	create()
	{
		let wait_screen = new waitScreen(),
			empty_message = builder.label('empty_message', 'Aucune voiture trouvée dans cette agence'),
			fd = new FormData();
		
		const user = JSON.parse(builder.prefs.get('user'))
		fd.append('agency', user.id)

		this.component = builder.block(null, 'carFactoryInitial', [wait_screen.getHTML()])

		builder.brdige("/agency/getAllCars", "GET", fd, (res)=>{
			res = JSON.parse(res)
			console.log(res)
			if  (res.hasOwnProperty('code') && (res.code == 3 || res.code == -1))
			{
				this.component.innerHTML = ''
				this.component.appendChild(empty_message)
			}
			else
			{
				this.component.innerHTML = ''
				this.component.className = 'carFactoryGrid'
				this.component.append(...this.#factory(res))
			}
		}, ()=>{})
	}
}