import * as builder from '../vendors/builder.js';
import IconedButton from './IconedButton.js';
import IconField from './IconField.js';
import _window from './Window.js';

export default class carInfo extends builder.Component
{
	#car
	constructor(mode = 'create', implementationPoint, car = undefined)
	{
		super()
		if (mode === 'create')
			this.path = '/add'
		else if (mode === 'edit')
			this.path = '/edit'
		this.#car = car
		this.implementationPoint = implementationPoint
		this.create()
	}

	create()
	{
		let win = new _window('<i class="ri-add-large-line"></i>', 'Ajouter une voiture', 'v_vicles_carInfo'),
			car_brand = new builder.Dropdown(null, 'v_vicles_fields', '', [], ()=>{}),
			car_model = new builder.Dropdown(null, 'v_vicles_fields', '', [], ()=>{}),
			car_brand_model_container = builder.block(null, 'v_vicles_car_brand_model_container', [car_brand.getHTML(), car_model.getHTML()]),
			car_information = builder.block(null, 'v_vicles_carInfo_left', [car_brand_model_container]),
			car_images = builder.block(null, 'v_vicles_carInfo_right', []),
			zone = win.appZone;
		zone.append(car_information, car_images)
		this.component = win.getHTML();
	}
}