import * as builder from '../vendors/builder.js';
import IconedButton from './IconedButton.js';
import IconField from './IconField.js';
import _window from './Window.js';
import Toast from './toast.js';
import waitScreen from './waitScreen.js';

export default class carInfo extends builder.Component
{
	#car
	#mode
	#windowMode
	constructor(mode = 'create', implementationPoint = null, car = undefined)
	{
		super()
		this.#mode = mode
		if (mode === 'create')
		{
			this.path = '/add'
			this.#windowMode = 'history'
		}
		else if (mode === 'edit')
		{
			this.path = '/edit'
			this.hasQueryParams = true
			this.#windowMode = 'modal'
		}
		this.#car = car
		this.implementationPoint = implementationPoint
		this.create()
	}


	#buildConditionsObject()
    {
        let conditions = {};

        conditions.plate = (field)=>{
            const regex = /^\d{1,6}-[A-Za-z]-\d{1,3}$/;
            return regex.test(field.value);
        }

		conditions.model_year = (field)=>{
			return parseInt(field.value) >= 1940 && parseInt(field.value) <= new Date().getFullYear() + 1
		}

		conditions.price = (field)=>{
			return parseFloat(field.value) >= 100 && parseFloat(field.value) <= 50000
		}

		conditions.seats = (field)=>{
			return parseInt(field.value) >= 1 && parseInt(field.value) <= 10
		}

		conditions.miles = (field)=>{
			return parseInt(field.value) >= 0 && parseInt(field.value) <= 1000000
		}

		conditions.trunc = (field)=>{
			return parseInt(field.value) >= 5 && parseInt(field.value) <= 1000
		}
		
		

        return conditions
    }

	#createCar(fd, btn)
	{
		btn.disabled = true;
		builder.brdige('/agency/addCar', 'POST', fd, (data)=>{
			data = JSON.parse(data)
			btn.disabled = false;
			if (data.hasOwnProperty('code') && data.code === -1)
			{
				history.back()
				this.rerender()
				const toast = new Toast('Erreur lors de l\'ajout de la voiture', 3000, 'error_toast')
				toast.show()
			}
			else if (data.hasOwnProperty('code') && data.code === 5)
			{
				const toast = new Toast('Matricule déjà utilisé', 3000, 'error_toast')
				toast.show()
			}
			else
			{
				history.back()
				this.rerender()
				const toast = new Toast('Voiture ajoutée avec succès', 3000, 'success_toast')
				this.connectedComponents.car_factory.rerender()
				toast.show()
			}
		}, ()=>{})
	}

	#editeCar(fd, btn)
	{
		btn.disabled = true;
		builder.brdige('/agency/updateCar', 'POST', fd, (data)=>{
			data = JSON.parse(data)
			btn.disabled = false;
			if (data.hasOwnProperty('code') && data.code === -1)
			{
				this.component.parentNode.removeChild(this.component)
				const toast = new Toast('Erreur lors de la mise à jours de la voiture', 3000, 'error_toast')
				toast.show()
			}
			else if (data.hasOwnProperty('code') && data.code === 5)
			{
				const toast = new Toast('Matricule déjà utilisé', 3000, 'error_toast')
				toast.show()
			}
			else
			{
				this.component.parentNode.removeChild(this.component)
				const toast = new Toast('Voiture mise à jour avec succès', 3000, 'success_toast')
				toast.show()
				this.connectedComponents.car_factory.rerender()
			}
		}, ()=>{})
	}

	create()
	{
		let win = new _window('<i class="ri-add-large-line"></i>', 'Ajouter une voiture', 'v_vicles_carInfo', this.#windowMode),	
			car_brand_model_container = builder.block(null, 'v_vicles_car_brand_model_container', []),
			plate_number = new IconField('<i class="ri-hashtag"></i>', 'Matricule', 'text', ['Champs obligatoire', 'Format: 12345-A-123'], 'v_vicles_carInfo_inputs', 'plate'),
			model_year = new IconField('<i class="ri-calendar-schedule-line"></i>', 'Année du model', 'number', ['Champs obligatoire', 'Entre 1940 et ' + (new Date().getFullYear() + 1)], 'v_vicles_carInfo_inputs', 'model_year'),
			price = new IconField('<i class="ri-money-dollar-circle-line"></i>', 'Prix par jour', 'number', ['Champs obligatoire', 'Entre 100 et 50000'], 'v_vicles_carInfo_inputs', 'price'),
			seats = new IconField('<i class="ri-sofa-line"></i>', 'Nombre de places', 'number', ['Champs obligatoire', 'Entre entre 1 et 10'], 'v_vicles_carInfo_inputs', 'seats'),
			miles = new IconField('<i class="ri-speed-up-fill"></i>', 'Kilométrage', 'number', ['Champs obligatoire', 'Entre 0 et 1000000'], 'v_vicles_carInfo_inputs', 'miles'),
			trunc = new IconField('<i class="ri-luggage-deposit-line"></i>', 'Volume du  coffre', 'number', ['Champs obligatoire', 'Entre 5 et 1000'], 'v_vicles_carInfo_inputs', 'trunc'),
			gear = new builder.Dropdown(null, 'v_vicles_fields', '<i class="ri-arrow-drop-down-line"></i>', [{id:'-1', name:'Boite à vitesse'}, {id:'2', name:'Automatique'}, {id:'1', name:'Manuelle'}], (item)=>{
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
			fuel = new builder.Dropdown(null, 'v_vicles_fields', '<i class="ri-arrow-drop-down-line"></i>', [{id:'-1', name:'Carburant'}, {id:'1', name:'Diesel'}, {id:'2', name:'Essence'}, {id:'3', name:'Hybride'}, {id:'4', name:'Electrique'}], (item)=>{
				let brand = builder.label('v_vicles_dropdown', item.name),
					container = builder.block(null, 'dropDownItem', [brand]);

				if (builder.isArabic(item.text))
					lang.style.direction = 'rtl';

				container.setAttribute('itemValue', item.id);
				return container;
			}),
			car_fuel_container = builder.block(null, 'v_vicles_car_brand_model_container', [fuel.getHTML()]),
			car_information = builder.block(null, 'v_vicles_carInfo_left', [car_brand_model_container, plate_number.getHTML(),
				model_year.getHTML(), price.getHTML(), seats.getHTML(), miles.getHTML(), trunc.getHTML(), car_gear_ac_container, car_fuel_container]),
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
			add_car_button = builder.button(null, 'v_small_button_main', this.#mode === "create"?'Ajouter':'Modifer', null),
			cancel_add_car_button = builder.button(null, 'v_small_button_black', 'Annuler', null),
			buttons_container = builder.block(null, 'v_vicles_carInfo_buttons', [add_car_button, cancel_add_car_button]),
			car_images = builder.block(null, 'v_vicles_carInfo_right', [drop_images, fileInput, scrollable_car_images, buttons_container]),
			zone = win.appZone,
			model_id = -1, ac_id = -1, fuel_id = -1, gear_id = -1, small_image_id = 0, cover = null, images = [],
			car_brand = new builder.Dropdown(null, 'v_vicles_fields', '<i class="ri-arrow-drop-down-line"></i>', [{id:'-1', name:'Sélectionner une marque'}], (item)=>{
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
			
		model_year.getField().min = 1940
		model_year.getField().max = new Date().getFullYear() + 1
		price.getField().min = 100
		price.getField().max = 50000
		seats.getField().min = 1
		seats.getField().max = 10
		miles.getField().min = 0
		miles.getField().max = 1000000
		trunc.getField().min = 5
		trunc.getField().max = 1000

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
				images = []
				scrollable_car_images.innerHTML = ''
			}
			for(const file of e.target.files) 
			{
				const reader = new FileReader();
				reader.onload = (e) => {
					const image = builder.image(null, 'v_vicles_car_small_miniature', e.target.result)
					images.push(e.target.result)
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

		function handleFile(file) 
		{
			if (file && file.type.startsWith('image/')) {
				const reader = new FileReader();
				reader.onload = (e) => {
					drop_images.innerHTML = `<img src="${e.target.result}" alt="Cover image" class="v_vicles_drop_image_cover_image">`;
					cover = e.target.result
				};
				reader.readAsDataURL(file);
			}
			else
				drop_images.classList.add('circle_over_danger')
		}
		cancel_add_car_button.onclick = ()=>{
			if (this.#mode === 'edit')
				this.component.parentNode.removeChild(this.component)
			else if (this.#mode === 'create')
				history.back()
		}

		if (this.#mode === 'edit')
		{
			drop_images.innerHTML = `<img src="${this.#car.cover}" alt="Cover image" class="v_vicles_drop_image_cover_image">`;
			if (this.#car.images.length > 0)
			{
				scrollable_car_images.innerHTML = ''
				for(const link of this.#car.images) 
				{
					const image = builder.image(null, 'v_vicles_car_small_miniature', link.link)
					scrollable_car_images.append(image)
				};
			}
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
			if (fileInput.files.length === 0 && this.#mode === 'create')
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
			if (valid)
			{
				const fd = new FormData()
				fd.append('cover', cover === null ? this.#car.cover : cover);
				fd.append('images', (images.length === 0 && (this.#car !== undefined && this.#car.images.length > 0)) ?  JSON.stringify(this.#car.images) : JSON.stringify(images));
				fd.append('model', parseInt(model_id));
				fd.append('gear', parseInt(gear_id));
				fd.append('ac', parseInt(ac_id));
				fd.append('fuel', parseInt(fuel_id));
				fd.append('price', parseFloat(price.getValue()));
				fd.append('miles', parseInt(miles.getValue()));
				fd.append('trunc', parseInt(trunc.getValue()));
				fd.append('plate', plate_number.getValue());
				fd.append('model_year', parseInt(model_year.getValue()));
				fd.append('seats', parseInt(seats.getValue()));
				fd.append('agency', JSON.parse(builder.prefs.get("user")).id);
				if (this.#mode === 'edit')
					fd.append('id', this.#car.id);

				if (this.#mode === "create")
					this.#createCar(fd, add_car_button)
				else if (this.#mode === "edit")
					this.#editeCar(fd, add_car_button)
			}
			else
			{
				const toast = new Toast('Tous les champs sont obligatoires', 3000, 'warning_toast')
				toast.show()
			}
		}
		
		builder.brdige('/agency/brands', 'GET', new FormData(), (data)=>{
			data = JSON.parse(data)
			
			car_brand.updateItems([{id:'-1', name:'Sélectionner une marque'}, ...data])
			
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
					if (this.#mode === 'edit')
					{
						car_model.setValue(this.#car.moid)
					}
				}, ()=>{})
			}
			if (this.#mode === 'edit')
			{
				car_brand.setValue(this.#car.brid)
				plate_number.setValue(this.#car.plate)
				model_year.setValue(this.#car.year)
				price.setValue(this.#car.price)
				seats.setValue(this.#car.seats)
				miles.setValue(this.#car.miles)
				trunc.setValue(this.#car.trunk_size)
				gear.setValue(this.#car.gear)
				ac.setValue(Number(this.#car.ac).toString())
				fuel.setValue(this.#car.fuel)
			}
			zone.innerHTML = ''
			zone.append(car_information, car_images)
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
		zone.append((new waitScreen()).getHTML())
		this.component = win.getHTML();
	}
}