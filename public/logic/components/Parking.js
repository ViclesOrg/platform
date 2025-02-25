import * as builder from '../vendors/builder.js';
import carInfo from './carInfo.js';
import IconedButton from './IconedButton.js';
import IconField from './IconField.js';
import CarFactory from './carFactory.js';

export default class Parking extends builder.Component
{
    #addCar;
    constructor(activity) {
        super();
        this.implementationPoint = activity
        this.path = '/parking'
        this.#addCar = new carInfo('create', activity)
        this.addSubroute(this.#addCar)
        this.create()
    }

    create() {
        this.component = builder.block(null, 'v_vicles_activity', [])
        let search = new IconField('<i class="ri-search-2-line"></i>', "Recherche", 'text', [], 'v_parking_search'),
            filter = new IconedButton(null, 'v_parking_regular_btn v_parking_pos1', '<i class="ri-filter-2-line"></i>', 'Filtrer', ()=>{}),
            _import = new IconedButton(null, 'v_parking_regular_btn v_parking_pos2', '<i class="ri-import-line"></i>', 'Importer', ()=>{}),
            _export = new IconedButton(null, 'v_parking_regular_btn v_parking_pos3', '<i class="ri-export-line"></i>', 'Exporter', ()=>{}),
            add = new IconedButton(null, 'v_parking_main_btn v_parking_pos4', '<i class="ri-add-large-line"></i>', 'Ajouter', ()=>{}),
            toAddCar = builder.toRoute('/parking/add', 'add'),
            buttons_container = builder.block(null, 'v_parking_controls_buttons', [filter.getHTML(), _import.getHTML(), _export.getHTML(), add.getHTML()]),
            parking_controls = builder.block(null, 'v_parking_controls', [search.getHTML(), buttons_container]),
            car_factory = new CarFactory(this.component);

        this.#addCar.connectedComponents.car_factory = car_factory

        search.getField().addEventListener('keyup', () => {
            this.debounceSearch(search.getField().value);
        });

        add.getHTML().onclick = ()=>{
            toAddCar.click()
        }
        this.component.append(parking_controls, car_factory.getHTML())
        
    }

    debounceSearch(value) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        
        this.searchTimeout = setTimeout(() => {
            this.performSearch(value);
        }, 300);
    }

    performSearch(value) {
        this.component.dispatchEvent(new CustomEvent('search', { 
            detail: { searchTerm: value.trim() },
            bubbles: true
        }));
    }
}