import * as builder from '../vendors/builder.js';

export default class rangeSlider
{
	constructor(id, min, max, options)
	{
		this.id = id;
		this.min = min;
		this.max = max;
		this.currentMin = min;
		this.currentMax = max;
		if (options.min !== undefined)
			this.currentMin = options.min;
		if (options.max !== undefined)
			this.currentMax = options.max;
		this.maxLeft = 0;
		this.minLeft = 0;
		this.maxCurrent = 0;
		this.minCurrent = 0;
		this.options = options;
		this.refMin = 0;
		this.width = 0;
		this.ballRadius = 0;
		this.baseMax = this.currentMax;
		this.baseMin = this.currentMin;
	}

	#calcMinBallPostion(rail, value)
	{
		let width = rail.getBoundingClientRect().width,
			percent = 100*value/Math.abs(this.max - this.min),
			position = width*percent/100;
		return position;
	}
	#setValues(rail, minBoundBall)
	{
		if (this.maxLeft === 0)
		{
			this.width = rail.getBoundingClientRect().width,
			this.ballRadius = (minBoundBall.getBoundingClientRect().width/2);
			this.maxLeft = this.width - (this.ballRadius);
			this.minLeft = -this.ballRadius;
			this.width = Math.abs(this.maxLeft - this.minLeft);
			this.minCurrent = this.minLeft;
			this.maxCurrent = this.maxLeft;
			this.refMin = this.minCurrent;

		}
	}
	#smallestMult(value, multiple, min)
	{
		for(let i = value; i >= min; i--)
		{
			if (i % multiple === 0)
				return i;
		}
		return false;
	}
	getHTML()
	{
		let minBoundValue = builder.label('sliderBoundValue', this.currentMin),
			maxBoundValue = builder.label('sliderBoundValue', this.currentMax),
			minBoundBall = builder.block(null, 'sliderBoundBall left', null),
			maxBoundBall = builder.block(null, 'sliderBoundBall right', null),
			maxBoundContainer = builder.block(null, "sliderBoundContainer max", [maxBoundValue]),
			minBoundContainer = builder.block(null, "sliderBoundContainer min", [minBoundValue]),
			rail = builder.block("sliderRail", "sliderRail", null),
			container = builder.block(this.id, "rangeSlider", [rail, minBoundBall, minBoundContainer]),
			x,
			mousedownLeft = false,
			mousedownRight = false;

		if (this.options.rangeSelection !== undefined && this.options.rangeSelection === true)
			container.append(maxBoundContainer, maxBoundBall);
		
		let int = setInterval(()=>{
			if (container.parentNode !== undefined && this.options.min !== undefined)
			{
				minBoundBall.style.left = this.#calcMinBallPostion(rail, this.options.min) + 'px';
				clearInterval(int)
			}
		}, 10);

		minBoundBall.addEventListener("mousedown", ((e)=>{
			this.#setValues(rail, minBoundBall)
			mousedownLeft = true; 
			x = minBoundBall.offsetLeft - e.clientX; 

		}).bind(this), true)

		minBoundBall.addEventListener("mouseup", function(){
			mousedownLeft = false; 
		}, true)

		minBoundBall.addEventListener("mousemove", ((e)=>{
			if (mousedownLeft)
				this.minCurrent = e.clientX + x;
			if (mousedownLeft && (this.options.rangeSelection === undefined || this.options.rangeSelection === false) &&
			this.minCurrent <= this.maxCurrent && this.minCurrent >= this.minLeft)
			{
				minBoundBall.style.left = this.minCurrent + 'px'; 
			}
			else if (mousedownLeft && this.minCurrent >= this.minLeft && this.minCurrent <= this.maxCurrent - (this.ballRadius * 4))
			{
				minBoundBall.style.left = this.minCurrent + 'px'; 
			}
			let curMin = (100*(this.minCurrent - this.refMin)/this.width)/100;
			curMin = Math.floor(this.min + Math.abs(this.max - this.min)*curMin);
			curMin = this.#smallestMult(curMin, this.options.step, this.min);
			if (curMin !== false && curMin % this.options.step === 0 && curMin <= this.currentMax && curMin >= this.min)
			{
				this.currentMin = curMin;
				minBoundValue.textContent = this.currentMin;
			}
		}), true)

		maxBoundBall.addEventListener("mousedown", ((e)=>{
			this.#setValues(rail, minBoundBall)
			mousedownRight = true; 
			x = maxBoundBall.offsetLeft - e.clientX; 

		}).bind(this), true)

		maxBoundBall.addEventListener("mouseup", function(){
			mousedownRight = false; 
		}, true)

		maxBoundBall.addEventListener("mousemove", ((e)=>{
			if (mousedownRight)
				this.maxCurrent = e.clientX + x;
			if (mousedownRight && this.maxCurrent <= this.maxLeft && this.maxCurrent >= this.minCurrent + this.ballRadius * 4)
			{
				maxBoundBall.style.left = this.maxCurrent + 'px'; 
				let curMax = (100*(this.maxCurrent - this.refMin)/this.width)/100;
				curMax = Math.floor(this.min + Math.abs(this.max - this.min)*curMax);
				curMax = this.#smallestMult(curMax, this.options.step, this.min);
				if (curMax % this.options.step === 0 && curMax <= this.max && curMax >= this.currentMin)
				{
					this.currentMax = curMax;
					maxBoundValue.textContent = this.currentMax;
				}
			}
		}), true)

		
		return container;
	}
	getMax()
	{
		return this.currentMax;
	}
	getMin()
	{
		return this.currentMin;
	}

	onChange(callback)
	{
		setInterval((()=>{
			if (this.baseMin !== this.currentMin || this.baseMax !== this.currentMax)
			{
				let value = {};
				this.baseMax = this.currentMax;
				this.baseMin = this.currentMin;
				value.min = this.getMin();
				if (this.options.rangeSelection !== undefined && this.options.rangeSelection === true)
					value.max = this.getMax();
				callback(value);
			}
		}), 250)
	}
}