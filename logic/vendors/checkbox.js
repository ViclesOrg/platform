import * as builder from '../vendors/builder.js';

export default class checkbox
{
	constructor(id, options = {checked : false, textContent : null})
	{
		this.id = id;
		this.checked = options.checked;
		this.textContent = options.textContent;
		this.refValue = this.checked;
	}

	#togleState(checkbox, checkball)
	{
		if (this.checked === true)
		{
			this.checked = false;
			checkball.className = "b_checkball left"
			checkbox.className = "b_checkbox unchecked"
		}
		else if (this.checked === false)
		{
			this.checked = true;
			checkball.className = "b_checkball right"
			checkbox.className = "b_checkbox checked"
		}
	}
	getHTML()
	{
		let text = null,
			checkball = builder.block(null, 'b_checkball', null),
			checkbox = builder.block(null, "b_checkbox", [checkball]),
			container = builder.block(this.id, "bcb_container", [checkbox]);
		if (this.checked === false)
		{
			checkball.className += " left"
			checkbox.className += " unchecked"
		}
		else if (this.checked === true)
		{
			checkball.className += " right"
			checkbox.className += " checked"
		}
		if (this.textContent !== null)
		{
			text = builder.label("b_checkbox_text", this.textContent);
			container.append(text);
		}

		checkbox.onclick = (()=>{
			this.#togleState(checkbox, checkball)
		})
		return container;
	}

	isChecked()
	{
		return this.checked;
	}

	onChange(callback)
	{
		setInterval((()=>{
			if (this.refValue !== this.checked)
			{
				this.refValue = this.checked;
				callback(this.checked);
			}
		}), 250)
	}
}