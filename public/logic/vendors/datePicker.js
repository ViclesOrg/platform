import * as builder from './builder.js';

/**
 * 
 * @param {Object} options - Containing all the specs of the datetime picker
 * @returns It returns an object with two methods [getHTML()] and [getDate()]
 */
export default class datePicker {

	constructor(id, options={
		rangeSelection: false,
		unselectableDates:[],
		startDate: "01/01/2000",
		endDate: "12/31/2030",
		sun: "Dim",
		mon: "Lun",
		tue: "Mar",
		wed: "Mer",
		thu: "Jeu",
		fri: "Ven",
		sat: "Sam",
		months : ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
		currentDate: "10/30/2022"
	}) {
		this.id = id;
		this.options = options;
		this.current = null;
		this.end = null;
		this.begin = null;
		this.baseValue = {begin:{year: null, month: null, date: null},
						end:{year: null, month: null, date: null}};
		this.calendar = null;
		this.token = '.begin';
		this.state = 'load';
	}

	getHTML() {
		let startDate = new Date(this.options.startDate),
			endDate = new Date(this.options.endDate),
			currentDate = (this.options.currentDate !== undefined ? (new Date(this.options.currentDate)) : new Date()),
			currentMonth = builder.label("monthsLabel", this.options.months[currentDate.getMonth()]),
			leftMonthNav = builder.button(null, 'monthsNav left', null, '<i class="fal fa-caret-left"></i>'),
			rightMonthNav = builder.button(null, 'monthsNav right', null, '<i class="fal fa-caret-right"></i>'),
			months = builder.block(null, "months", [leftMonthNav, currentMonth, rightMonthNav]),
			years = builder.select("select", "years", []),
			sun = builder.label("dayLabel", this.options.sun),
			mon = builder.label("dayLabel", this.options.mon),
			tue = builder.label("dayLabel", this.options.tue),
			wed = builder.label("dayLabel", this.options.wed),
			thu = builder.label("dayLabel", this.options.thu),
			fri = builder.label("dayLabel", this.options.fri),
			sat = builder.label("dayLabel", this.options.sat),
			daysRow = builder.block(null, 'daysRow', [sun, mon, tue, wed, thu, fri, sat]),
			dateContainer = builder.block(null, "dateContainer", [years, months, daysRow]),
			container = builder.block(null, "datetimepicker", [dateContainer]);

		if (this.options.rangeSelection !== undefined) {
			if (this.options.rangeSelection === true) {
				let daba = new Date(currentDate);
				daba.setDate(daba.getDate() + 6);
				this.end = { year: daba.getFullYear(), month: daba.getMonth(), date: daba.getDate() }
				daba = null;
			}
		}

		this.current = { year: currentDate.getFullYear(), month: currentDate.getMonth(), date: currentDate.getDate() }
		this.begin = { year: currentDate.getFullYear(), month: currentDate.getMonth(), date: currentDate.getDate() }
		this.calendar = this.#createMonthCalendar(this.#getMothsFirstDaysDayOfTheWeek(currentDate), this.#getMothsLastDay(currentDate));
		container.append(this.calendar);
		container.id = this.id;
		if (this.options.hasOwnProperty("startDate") && this.options.hasOwnProperty("endDate")) {
			for (let i = startDate.getFullYear(); i <= endDate.getFullYear(); i++) {
				years.append(builder.Option(i, i));
			}
		}
		years.value = currentDate.getFullYear() + '';

		this.#copyValues(this.baseValue.begin, this.begin);
		if (this.options.rangeSelection !== undefined && this.options.rangeSelection === true)
			this.#copyValues(this.baseValue.end, this.end);
		years.onchange = (()=>{
			this.current.year = parseInt(years.value);
			currentDate.setFullYear(this.current.year, this.current.month, this.current.date);
			container.removeChild(this.calendar);
			this.calendar = this.#createMonthCalendar(this.#getMothsFirstDaysDayOfTheWeek(currentDate), this.#getMothsLastDay(currentDate))
			container.append(this.calendar)
		})
		rightMonthNav.onclick =  (()=> {
			let m = this.current.month + 1;
			currentDate.setDate(1);
			currentDate.setMonth((m) % 12);
			this.current.month = currentDate.getMonth();
			if (this.current.date <= this.#getMothsLastDay(currentDate))
				currentDate.setDate(this.current.date)
			else
				this.current.date = currentDate.getDate();
			this.current.month = currentDate.getMonth();
			currentMonth.textContent = this.options.months[this.current.month];
			container.removeChild(this.calendar);
			this.calendar = this.#createMonthCalendar(this.#getMothsFirstDaysDayOfTheWeek(currentDate), this.#getMothsLastDay(currentDate))
			container.append(this.calendar)	
		})
		leftMonthNav.onclick = (()=>{
			let m = this.current.month - 1;
			currentDate.setDate(1);
			currentDate.setMonth((m) % 12);
			this.current.month = currentDate.getMonth();
			if (this.current.date <= this.#getMothsLastDay(currentDate))
				currentDate.setDate(this.current.date)
			else
				this.current.date = currentDate.getDate();
			this.current.month = currentDate.getMonth();
			currentMonth.textContent = this.options.months[this.current.month];
			container.removeChild(this.calendar);
			this.calendar = this.#createMonthCalendar(this.#getMothsFirstDaysDayOfTheWeek(currentDate), this.#getMothsLastDay(currentDate))
			container.append(this.calendar)
		})
		this.state = 'done';
		return container 
	}
	getDate() { return new Date((this.begin.month + 1) + "/" + this.begin.date + "/" + this.begin.year) }
	getRange() {
		if (this.options.rangeSelection !== undefined && this.options.rangeSelection === true)
			return {
				begin: new Date((this.begin.month + 1) + "/" + this.begin.date + "/" + this.begin.year),
				end: new Date((this.end.month + 1) + "/" + this.end.date + "/" + this.end.year)
			}
		else
			return new Date((this.begin.month + 1) + "/" + this.begin.date + "/" + this.begin.year);
	}
	onChange(callback)
	{
		setInterval((()=>{
			if (this.state === 'done')
			{
				if (this.options.rangeSelection !== undefined && this.options.rangeSelection === true)
				{
					if (!this.#compareValues(this.baseValue.begin, this.begin) || !this.#compareValues(this.baseValue.end, this.end))
					{
						this.#copyValues(this.baseValue.begin, this.begin);
						this.#copyValues(this.baseValue.end, this.end);
						callback(this.getRange())
					}
				}		
				else if (!this.#compareValues(this.baseValue.begin, this.begin))
				{
					callback(this.getDate());
					this.#copyValues(this.baseValue.begin, this.begin);
				}
				
			}
		}), 250)
	}
	#getMothsFirstDaysDayOfTheWeek(date) {
		date.setDate(1);
		return date.getDay();
	}

	#getMothsLastDay(date) {
		date.setMonth(date.getMonth() + 1)
		date.setDate(0);
		return date.getDate();
	}

	#isSelectableDate(date)
	{
		if (this.options.unselectableDates !== undefined && this.options.unselectableDates !== null)
		{
			if (this.options.rangeSelection !== undefined && this.options.rangeSelection === true)
			{
				for (let i = 0; i < this.options.unselectableDates.length; i++) {
					let d = this.options.unselectableDates[i]
					if (d.begin <= date && d.end >= date)
					{
						return false;
					}
				}
			}
			else
			{
				for (let i = 0; i < this.options.unselectableDates.length; i++) {
					let d = this.options.unselectableDates[i]
					if (d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear())
					{
						return false;
					}
				}
			}
		}
		return true;
	}
	#createDay(date, styleClass) {
		let dayValue = builder.label(styleClass, date),
			dayBtn = builder.block(null, "dayOfWeekContainer", [dayValue]);

		if (styleClass !== "unselectableDay")
		dayBtn.onclick = (()=>{
			if (this.options.rangeSelection !== undefined && this.options.rangeSelection !== false)
			{
				if (new Date(this.current.year, this.current.month, date) > new Date(this.end.year, this.end.month, this.end.date) 
					&& !dayValue.className.includes("currentDay end"))
				{
					let currentDay = document.querySelector(".end");
					this.#copyValues(this.end, this.current)
					this.end.date = date;
					dayValue.className = "currentDay end";
					if (currentDay)
						currentDay.className = "dayOfWeek";
				}
				else if (new Date(this.current.year, this.current.month, date) < new Date(this.end.year, this.end.month, this.end.date)
						&& new Date(this.current.year, this.current.month, date) > new Date(this.begin.year, this.begin.month, this.begin.date))
				{
					let currentDay = document.querySelector(this.token);
					dayValue.className = "currentDay "+this.token;
					if (currentDay)
						currentDay.className = "dayOfWeek";
					if (this.token === '.end')
					{
						this.#copyValues(this.end, this.current)
						this.end.date = date;
						this.token = ".begin"
					}
					else if (this.token === '.begin')
					{
						this.#copyValues(this.begin, this.current)
						this.begin.date = date;
						this.token = ".end"
					}
				}
				else if (new Date(this.current.year, this.current.month, date) < new Date(this.begin.year, this.begin.month, this.begin.date)
						 && !dayValue.className.includes("currentDay begin"))
				{
					let currentDay = document.querySelector(".begin");
					this.#copyValues(this.begin, this.current)
					this.begin.date = date;
					dayValue.className = "currentDay begin";
					if (currentDay)
						currentDay.className = "dayOfWeek";
				}
			}
			else if (dayValue.className !== "currentDay") {
				let currentDay = document.querySelector(".begin");
				this.#copyValues(this.begin, this.current)
				this.begin.date = date;
				dayValue.className = "currentDay begin";
				if (currentDay)
						currentDay.className = "dayOfWeek";
			}
			let beginDate = new Date(this.current.year, this.current.month, 1),
				cp = this.calendar.parentNode;
			cp.removeChild(this.calendar)
			this.calendar = this.#createMonthCalendar(this.#getMothsFirstDaysDayOfTheWeek(beginDate), this.#getMothsLastDay(beginDate))
			cp.append(this.calendar)
		})
		return dayBtn;
	}

	#createMonthCalendar(firstDayOfTheWeek, numberOfDays) {
		let calendar = builder.block(null, "calendar", null),
			numbberOfWeeks = (Math.ceil(numberOfDays / 7) * 7 - (7 - (7 - firstDayOfTheWeek)) > numberOfDays ? Math.ceil(numberOfDays / 7) : Math.ceil(numberOfDays / 7) + 1),
			day = 1,
			remainingDaysOfTheWeek = 7;
		for (let i = 0; i < numbberOfWeeks; i++) {
			let week = builder.block(null, "daysRowCalendar", null)
			for (let j = 0; j < 7; j++) {
				if (day === 1 && j < firstDayOfTheWeek) {
					week.append(builder.label("dayLabelInvisivle", "1"))
				}
				else if (day <= numberOfDays) {
					if (!this.#isSelectableDate(new Date(this.current.year, this.current.month, day)))
						week.append(this.#createDay(day, "unselectableDay"))
					else if (day === this.begin.date && this.#isSameMonth(this.begin, this.current))
						week.append(this.#createDay(day, "currentDay begin", this.begin.date))
					else if (this.end !== null)
					{
						let cur = new Date(this.current.year, this.current.month, day),
							beg = new Date(this.begin.year, this.begin.month, this.begin.date),
							en = new Date(this.end.year, this.end.month, this.end.date);
						if (day === this.end.date && this.#isSameMonth(this.end, this.current))
							week.append(this.#createDay(day, "currentDay end"))
						else if (cur > beg && cur < en)
							week.append(this.#createDay(day, "betweenDays"))
						else
							week.append(this.#createDay(day, "dayOfWeek"))
					}
					else
						week.append(this.#createDay(day, "dayOfWeek"))
					day++;
					remainingDaysOfTheWeek = j + 1;
				}
			}
			if (remainingDaysOfTheWeek < 7) {
				for (let i = remainingDaysOfTheWeek; i < 7; i++) {
					week.append(builder.label("dayLabelInvisivle", "1"))
				}
			}
			calendar.append(week);
		}

		return calendar;
	}

	#copyValues(dest, src) {
		dest.year = src.year;
		dest.month = src.month;
		dest.date = src.date;
	}

	#compareValues(baseValue, changeable) {
		if (baseValue.year !== changeable.year || baseValue.month !== changeable.month || baseValue.date !== changeable.date)
			return false;
		return true;
	}
	#isSameMonth(lhv, rhv)
	{
		if (lhv.year !== rhv.year || lhv.month !== rhv.month)
			return false;
		return true;
	}
}