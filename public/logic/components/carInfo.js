import * as builder from '../vendors/builder.js';
import IconedButton from './IconedButton.js';
import IconField from './IconField.js';
import _window from './Window.js';

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
		let win = new _window('<i class="ri-add-large-line"></i>', 'Ajouter une voiture', 'v_vicles_carInfo'),	
			car_brand_model_container = builder.block(null, 'v_vicles_car_brand_model_container', []),
			plate_number = new IconField('<i class="ri-hashtag"></i>', 'Matricule', 'text', [], 'v_vicles_carInfo_inputs'),
			model_year = new IconField('<i class="ri-calendar-schedule-line"></i>', 'Année du model', 'number', [], 'v_vicles_carInfo_inputs'),
			seats = new IconField('<i class="ri-sofa-line"></i>', 'Nombre de places', 'number', [], 'v_vicles_carInfo_inputs'),
			miles = new IconField('<i class="ri-speed-up-fill"></i>', 'Kilométrage', 'number', [], 'v_vicles_carInfo_inputs'),
			trunc = new IconField('<i class="ri-luggage-deposit-line"></i>', 'Volume du  coffre', 'number', [], 'v_vicles_carInfo_inputs'),
			gear = new builder.Dropdown(null, 'v_vicles_fields', '<i class="ri-arrow-drop-down-line"></i>', [{id:'-1', name:'Boite à vitesse'}, {id:'0', name:'Automatique'}, {id:'1', name:'Manuelle'}], (item)=>{
				let brand = builder.label('v_vicles_dropdown', item.name),
					container = builder.block(null, 'dropDownItem', [brand]);

				if (builder.isArabic(item.text))
					lang.style.direction = 'rtl';

				container.setAttribute('itemValue', item.id);
				return container;
			}),
			ac = new builder.Dropdown(null, 'v_vicles_fields', '<i class="ri-arrow-drop-down-line"></i>', [{id:'-1', name:'Climatisation'}, {id:'0', name:'OUI'}, {id:'1', name:'NON'}], (item)=>{
				let brand = builder.label('v_vicles_dropdown', item.name),
					container = builder.block(null, 'dropDownItem', [brand]);

				if (builder.isArabic(item.text))
					lang.style.direction = 'rtl';

				container.setAttribute('itemValue', item.id);
				return container;
			}),
			car_gear_ac_container = builder.block(null, 'v_vicles_car_brand_model_container', [gear.getHTML(), ac.getHTML()]),
			fuel = new builder.Dropdown(null, 'v_vicles_fields', '<i class="ri-arrow-drop-down-line"></i>', [{id:'-1', name:'Carburant'}, {id:'0', name:'Diesel'}, {id:'1', name:'Essence'}, {id:'2', name:'Hybride'}, {id:'4', name:'Electrique'}], (item)=>{
				let brand = builder.label('v_vicles_dropdown', item.name),
					container = builder.block(null, 'dropDownItem', [brand]);

				if (builder.isArabic(item.text))
					lang.style.direction = 'rtl';

				container.setAttribute('itemValue', item.id);
				return container;
			}),
			car_fuel_container = builder.block(null, 'v_vicles_car_brand_model_container', [fuel.getHTML()]),
			car_information = builder.block(null, 'v_vicles_carInfo_left', [car_brand_model_container, plate_number.getHTML(),
				model_year.getHTML(), seats.getHTML(), miles.getHTML(), trunc.getHTML(), car_gear_ac_container, car_fuel_container]),
			drop_images = builder.block(null, 'v_vicles_car_drop_images', []),
			car_images = builder.block(null, 'v_vicles_carInfo_right', [drop_images]),
			zone = win.appZone,
			model_id, ac_id, fuel_id, gear_id;
		
		builder.brdige('/agency/brands', 'GET', new FormData(), (data)=>{
			data = JSON.parse(data)
			
			const	car_brand = new builder.Dropdown(null, 'v_vicles_fields', '<i class="ri-arrow-drop-down-line"></i>', [{id:'-1', name:'Sélectionner une marque'}, ...data], (item)=>{
				let brand = builder.label('v_vicles_dropdown', item.name),
					container = builder.block(null, 'dropDownItem', [brand]);

				if (builder.isArabic(item.text))
					lang.style.direction = 'rtl';

				container.setAttribute('itemValue', item.id);
				return container;
			}), 
			car_model = new builder.Dropdown(null, 'v_vicles_fields', '<i class="ri-arrow-drop-down-line"></i>', [{id:'-1', name:'Sélectionner un model'}], (item)=>{
				let brand = builder.label('v_vicles_dropdown', item.name),
					container = builder.block(null, 'dropDownItem', [brand]);

				if (builder.isArabic(item.text))
					lang.style.direction = 'rtl';

				container.setAttribute('itemValue', item.id);
				return container;
			});
			
			car_brand_model_container.append(car_brand.getHTML(), car_model.getHTML())
			car_model.onChange = (model, modelName)=>{}

			car_brand.onChange = (brand, name)=>{
				if (brand === '-1')
				{
					car_model.updateItems([{id:'-1', name:'Sélectionner un model'}])
					car_model.onChange = (model, modelName)=>{}
					return false
				}
				const fd = new FormData()
				fd.append('brand', parseInt(brand));
				builder.brdige('/agency/models', 'GET', fd, (models)=>{
					models = JSON.parse(models)
					car_model.updateItems([{id:'-1', name:'Sélectionner un model'}, ...models])
					car_model.onChange = (model)=>{
						model_id = parseInt(model)
					}
				}, ()=>{})
				
			}
		}, ()=>{})

		ac.onChange = (id)=>{
			ac_id = parseInt(id)
		}

		gear.onChange = (id)=>{
			gear_id = parseInt(id)
		}

		fuel.onChange = (id)=>{
			fuel_id = parseInt(id)
		}

		zone.append(car_information, car_images)
		this.component = win.getHTML();
	}
}