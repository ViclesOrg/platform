import * as builder from '../vendors/builder.js';
import IconedButton from './IconedButton.js';
import IconField from './IconField.js';
import window from './Window.js';

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
		let win = new window('<i class="ri-add-large-line"></i>', 'Ajouter une voiture');
		this.component = win.getHTML();
	}
}