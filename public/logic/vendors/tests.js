import * as builder from './builder.js'
import datePicker from './datePicker.js';
import rangeSlider from './rangeSlider.js';
import checkbox from './checkbox.js';
import dropdown from './dropdown.js';

builder.entrypoit(function(){
	let datepicker = new datePicker("datepicker",{
		rangeSelection: false,
		unselectableDates:[
			new Date(2022, 9, 23),
			new Date(2022, 9, 29),
			// {begin:new Date(2022, 11, 5),end:new Date(2022, 11, 10)},
			// {begin:new Date(2022, 10, 1),end:new Date(2022, 10, 22)}
		],
		startDate: "03/01/2000",
		endDate: "12/31/2030",
		sun: "Dim",
		mon: "Lun",
		tue: "Mar",
		wed: "Mer",
		thu: "Jeu",
		fri: "Ven",
		sat: "Sam",
		months : ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
		// currentDate: "07/17/2022"
	});
	// cb = new checkbox("checkBox", {checked: true, textContent: "hey"}),
	// range = new rangeSlider("rangeSlider", 0, 1000,{
	// 	// rangeSelection: true,
	// 	step: 50,
	// 	min: 150
	// });
	// drop = new dropdown("carsBrands", [
	// 	{value: null, text: "Séléctioner une marque"},
	// 	{value: 1, text: "Mercedes-Benz"},
	// 	{value: 2, text: "BMW"},
	// 	{value: 3, text: "Audi"},
	// ],1);

	// builder.app.append(drop.getHTML());
	// builder.app.append(range.getHTML());
	// cb.onChange(function(){
	// 	console.log(cb.isChecked());
	// })
	// range.onChange(function (value)
	// {
	// })
	// builder.app.append(range.getHTML());
	builder.app.append(datepicker.getHTML());
	datepicker.onChange(function(date){
		console.log(date);
	})

})