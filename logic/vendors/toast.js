import * as builder from './builder.js';

export default class toast
{
	#message;
	#type;
	#duration;

	constructor(message, type, duration)
	{
		this.#message = message;
		this.#type = type;
		this.#duration = duration;
	}

	getHTML()
	{
		builder.insertStyle('styles/toast.css');
		let toast;
		if (this.#type === 'info')
		{
			toast = builder.label('builder_infoToast', this.#message);
		}
		else if (this.#type === 'warn')
		{
			toast = builder.label('builder_warnToast', this.#message);
		}
		else if (this.#type === 'danger')
		{
			toast = builder.label('builder_dangerToast', this.#message);
		}

		builder.app.append(toast);

		setTimeout(()=>
		{
			builder.app.removeChild(toast);
		}, this.#duration);
	}
}