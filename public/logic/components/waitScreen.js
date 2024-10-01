import * as builder from '../vendors/builder.js';

export default class waitScreen extends builder.Component
{
	constructor()
	{
		super()
		this.create()
	}

	create()
	{
		this.component = builder.block(null, 'waitScreen', [builder.block(null, 'waitScreen_content', [])])
	}
}