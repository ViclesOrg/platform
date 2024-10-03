import * as builder from '../vendors/builder.js';
import carInfo from './carInfo.js';

export default class Car extends builder.Component
{
	#car;
	/**
	 * @param {Object} car
	 */
	constructor(car)
	{
		super()
		this.#car = car
		this.create()
	}

	create()
	{
		let remove = builder.button(null, 'vicles_car_button vicles_car_delete', null, '<i class="ri-delete-bin-line"></i>'),
			modify = builder.button(null, 'vicles_car_button vicles_car_modify', null, '<i class="ri-edit-box-line"></i>'),
			toolBar = builder.block(null, 'vicles_car_toolBar', [remove, modify]),
			car_image = builder.image(null, 'vicles_car_image', this.#car.cover),
			car_info = new carInfo('edit', null, this.#car),
			car_brand_model_container = builder.block(null, 'vicles_car_brand_model_container', [builder.label('vicles_car_brand', this.#car.cbrand), builder.label('vicles_car_model', this.#car.cmodel)]),
			plate = builder.label('vicles_car_plate', this.#car.plate.replaceAll("-", " | "))
		
		this.component = builder.block(null, 'vicles_car', [toolBar, car_image, car_brand_model_container, plate])

		modify.onclick = ()=>{
			builder.app.append(car_info.getHTML())
		}
	}
}