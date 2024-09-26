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


	#buildConditionsObject()
    {
        let conditions = {};

        conditions.plate = (field)=>{
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(field.value.toLowerCase());
        }

        return conditions
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
			drop_images = builder.block(null, 'v_vicles_car_drop_images', [
					builder.button(null, 'v_vicles_drop_image_icon', null, '<i class="ri-image-add-line"></i>'),
					builder.label('v_vicles_drop_image_text', 'Déposez ou cliquez pour télécharger l\'image de couverture', 'v_vicles_drop_image_text')
			]),
			fileInput = builder.textBox(null, 'Déposez ou cliquez pour télécharger l\'image de couverture', 'file', 'v_vicles_drop_file_input'),
			small_image_drop = builder.block(null, 'v_vicles_car_small_images', [builder.button(null, 'v_vicles_drop_image_icon', null, '<i class="ri-image-add-line"></i>')]),
			small_image_miniature1 = builder.block(null, 'v_vicles_car_small_miniature', []),
			small_image_miniature2 = builder.block(null, 'v_vicles_car_small_miniature', []),
			fileInput_small_image = builder.textBox(null, 'Déposez ou cliquez pour télécharger l\'image de couverture', 'file', 'v_vicles_drop_file_input'),
			scrollable_car_images = builder.block(null, 'v_vicles_car_scrollable_images', [small_image_drop, small_image_miniature1, small_image_miniature2, fileInput_small_image]),
			add_car_button = builder.button(null, 'v_small_button_main', 'Ajouter', null),
			cancel_add_car_button = builder.button(null, 'v_small_button_black', 'Annuler', null),
			buttons_container = builder.block(null, 'v_vicles_carInfo_buttons', [add_car_button, cancel_add_car_button]),
			car_images = builder.block(null, 'v_vicles_carInfo_right', [drop_images, fileInput, scrollable_car_images, buttons_container]),
			zone = win.appZone,
			model_id = -1, ac_id = -1, fuel_id = -1, gear_id = -1, small_image_id = 0;
			
			fileInput_small_image.setAttribute('multiple', '')
			drop_images.addEventListener('click', () => fileInput.click());
			scrollable_car_images.addEventListener('click', () => fileInput_small_image.click());
			fileInput_small_image.addEventListener('change', (e) => {
				if (e.target.files.length === 0)
				{
					small_image_drop.classList.add('circle_over_danger')
					return
				}
				else
				{
					scrollable_car_images.innerHTML = ''
				}
				for(const file of e.target.files) 
				{
					const reader = new FileReader();
					reader.onload = (e) => {
						const image = builder.image(null, 'v_vicles_car_small_miniature', e.target.result)
						scrollable_car_images.append(image)
					}
					reader.readAsDataURL(file);
				};
			});
			drop_images.addEventListener('dragover', (e) => {
				e.preventDefault();
				drop_images.classList.add('dragover');
			});
			drop_images.addEventListener('dragleave', () => {
				drop_images.classList.remove('dragover');
			});
			drop_images.addEventListener('drop', (e) => {
				e.preventDefault();
				drop_images.classList.remove('dragover');
				handleFile(e.dataTransfer.files[0]);
			});
			fileInput.addEventListener('change', (e) => {
				handleFile(e.target.files[0]);
			});

			function handleFile(file) {
				if (file && file.type.startsWith('image/')) {
					const reader = new FileReader();
					reader.onload = (e) => {
						drop_images.innerHTML = `<img src="${e.target.result}" alt="Cover image" class="v_vicles_drop_image_cover_image">`;
					};
					reader.readAsDataURL(file);
				}
				else
					drop_images.classList.add('circle_over_danger')
			}
		cancel_add_car_button.onclick = ()=>{
			history.back()
		}
		const car_info_validator = new builder.Validator(car_information, (i, t)=>{
			// i.parentNode.getElementsByClassName('invisible')[0].className.replace('invisible', 'red')
			const target = i.parentNode.getElementsByClassName('v_fieldIcon_R')[0];
			target.className = target.className.replace('invisible', 'red')
		}, (i, t)=>{
			// i.parentNode.getElementsByClassName('invisible')[0].className.replace('invisible', 'red')
			const target = i.parentNode.getElementsByClassName('v_fieldIcon_R')[0];
			target.className = target.className.replace('red', 'invisible')
		}, false, this.#buildConditionsObject());

		add_car_button.onclick = ()=>{
			let valid = true;
			if (small_image_id === -1)
			{
				small_image_drop.classList.add('circle_over_danger')
				valid = false;
			}
			else
				small_image_drop.classList.remove('circle_over_danger')
			if (fileInput.files.length === 0)
			{
				drop_images.classList.add('circle_over_danger')
				valid = false;
			}
			else
				drop_images.classList.remove('circle_over_danger')
			if (model_id === -1)
			{
				car_brand_model_container.childNodes.forEach(node => {
					node.classList.add('circle_over_danger');
				});
				valid = false;
			}
			else
				car_brand_model_container.childNodes.forEach(node => {
					node.classList.remove('circle_over_danger');
				});
			if (gear_id === -1)
			{
				gear.getHTML().classList.add('circle_over_danger')
				valid = false;
			}
			else
				gear.getHTML().classList.remove('circle_over_danger')
			if (ac_id === -1)
			{
				ac.getHTML().classList.add('circle_over_danger')
				valid = false;
			}
			else
				ac.getHTML().classList.remove('circle_over_danger')
			if (fuel_id === -1)
			{
				fuel.getHTML().classList.add('circle_over_danger')
				valid = false;
			}
			else
				fuel.getHTML().classList.remove('circle_over_danger')
			if (!car_info_validator.validate())
				valid = false;
		}
		
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
			car_model.onChange = (model, modelName)=>{
				model_id = parseInt(model)
			}

			car_brand.onChange = (brand, name)=>{
				if (brand === '-1')
				{
					car_model.updateItems([{id:'-1', name:'Sélectionner un model'}])
					car_model.onChange = (model, modelName)=>{}
					model_id = -1
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