import * as builder from '../vendors/builder.js';

export default class Splash extends builder.Component
{
	constructor()
	{
		super()
		this.create()
	}

	create()
	{
		const logo = builder.heading(1, 'v_logo v_spalsh_animation', "Vicles");

		this.component = builder.block(null, 'v_splash', [logo])
	}

}