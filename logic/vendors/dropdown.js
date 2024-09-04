import * as builder from '../vendors/builder.js';

export default class dropdown
{
	
	constructor(id=null, items=[], value=null, classname=null)
	{
		this.id = id;
		this.items = items;
		this.index = this.#findValuesIndex(value);
		this.value = items[this.index].value;
		this.closed = true;
		this.classname = classname;
		this.refValue = items[this.index];
		this.currentValue = items[this.index];
		this.dropButton = null;
		this.list = null;
		this.container = null;
	}

	#findValuesIndex(value)
	{
		if (value !== null)
		{
			for (let i = 0; i < this.items.length; i++) {
				const element = this.items[i];
				if (element.value === value)
				{
					return i;
				}
			}
		}
		return 0;
	}
	setItems(items=[], value=null)
	{
		this.items = items;
		this.index = this.#findValuesIndex(this.value);
		this.value = items[this.index].value;
	}
	addItems(item)
	{
		this.items.push(item);
	}
	setValue(value)
	{
		this.index = this.#findValuesIndex(value);
		this.value = this.items[this.index].value;
		this.currentValue = this.items[this.index];
		this.rerender();
	}
	#dropRoutine()
	{
		if (this.closed === true)
		{
			this.list.className = "dropOpen";
			this.closed = false;
		}
		else if(this.closed === false)
		{
			this.list.className = "dropClose";
			this.closed = true;
		}
	}
	enable()
	{
		this.dropButton.onclick = ()=>{
			this.#dropRoutine();
		}
	}
	disable()
	{
		this.dropButton.onclick = ()=>{}
	}

	getHTML()
	{
		let Item = builder.block(null, "selectedItemText", null),
			dropButton =  builder.button(null, "itemDown", null, '<i class="far fa-caret-down"></i>'),
			selectedItem = builder.block(null, "selectedItem", [Item, dropButton]),
			list = builder.block(null, "dropClose", null),
			container = builder.block(this.id, 'dropdown', [selectedItem, list]);

		this.container = container;
		this.dropButton = dropButton;
		this.list = list;
		if (this.classname)
		{
			container.className += " " +this.classname;
		}
		dropButton.onclick = (()=>{
			this.#dropRoutine();
		})
		Item.textContent = this.items[this.index].text;
		for(let i = 0; i < this.items.length; i++)
		{
			let item = builder.label("dropitem", [this.items[i].text]);
			list.append(item)
			item.onclick = (()=>{
				Item.textContent = this.items[i].text
				this.value = this.items[i].value;
				this.currentValue = this.items[i];
				list.className = "dropClose"
				this.closed = true;
			})
		}
		return container;
	}
	rerender()
	{
		let parent = this.container.parentNode,
			old = this.container;
		parent.insertBefore(this.getHTML(), old);
		parent.removeChild(old);
	}
	onChange(callback)
	{
		setInterval(()=>{
			if(this.refValue !== this.currentValue)
			{
				this.refValue = this.currentValue;
				callback(this.currentValue);
			}
		}, 100)
	}
}