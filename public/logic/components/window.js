import * as builder from '../vendors/builder.js';

export default class _window extends builder.Component
{
	#title
	#icon
	#styleClass
	appZone
	constructor(icon, title, windowStyle='')
	{
		super()
		this.#icon = icon
		this.#title = title
		this.#styleClass = windowStyle
		this.create()
		
	}

	create()
	{
		let icon = builder.button(null, 'v_vicles_window_icon', null, this.#icon),
			title = builder.label('v_vicles_window_title', this.#title),
			close = builder.button(null, 'v_vicles_window_close', null, '<i class="ri-close-circle-line"></i>'),
			topbar = builder.block(null, 'v_vicles_window_titlebar', [icon, title, close]),
			zone = builder.block(null, 'v_vicles_window_zone', []),
			window = builder.block(null, 'v_vicles_window ' + this.#styleClass, [topbar, zone]),
			background = builder.block(null, 'v_vicles_window_background', []);
		
			
		this.appZone = zone
		this.component = builder.block(null, 'v_vicles_window_platform', [background, window]);

		background.onclick = ()=>{
			history.back()
		}

		close.onclick = ()=>{
			history.back()
		}
	}
}