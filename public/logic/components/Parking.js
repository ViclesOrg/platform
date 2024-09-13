import * as builder from '../vendors/builder.js';
import carInfo from './carInfo.js';
import IconedButton from './IconedButton.js';
import IconField from './IconField.js';

export default class Parking extends builder.Component
{
    constructor(activity) {
        super();
        this.implementationPoint = activity
        this.addSubroute(new carInfo('create', activity))
        this.path = '/parking'
        this.create()
    }

    create() {
        let search = new IconField('<i class="ri-search-2-line"></i>', "Recherche", 'text', [], 'v_parking_search'),
            filter = new IconedButton(null, 'v_parking_regular_btn v_parking_pos1', '<i class="ri-filter-2-line"></i>', 'Filtrer', ()=>{}),
            _import = new IconedButton(null, 'v_parking_regular_btn v_parking_pos2', '<i class="ri-import-line"></i>', 'Importer', ()=>{}),
            _export = new IconedButton(null, 'v_parking_regular_btn v_parking_pos3', '<i class="ri-export-line"></i>', 'Exporter', ()=>{}),
            add = new IconedButton(null, 'v_parking_main_btn v_parking_pos4', '<i class="ri-add-large-line"></i>', 'Ajouter', ()=>{}),
            toAddCar = builder.toRoute('/parking/add', 'add'),
            buttons_container = builder.block(null, 'v_parking_controls_buttons', [filter.getHTML(), _import.getHTML(), _export.getHTML(), add.getHTML()]),
            parking_controls = builder.block(null, 'v_parking_controls', [search.getHTML(), buttons_container]);


        add.getHTML().onclick = ()=>{
            toAddCar.click()
        }
        this.component = builder.block(null, 'v_vicles_activity', [parking_controls])
    }
}