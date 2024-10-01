import * as builder from '../vendors/builder.js';

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
			car_image = builder.image(null, 'vicles_car_image', this.#car.cover)
		this.component = builder.block(null, 'vicles_car', [toolBar, car_image])
	}
}