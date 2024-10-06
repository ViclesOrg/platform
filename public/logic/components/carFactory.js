import * as builder from '../vendors/builder.js';
import Car from './car.js';
import waitScreen from './waitScreen.js';

export default class CarFactory extends builder.Component {
    constructor() {
        super();
        this.currentPage = 1;
        this.pageSize = 1; // You can adjust this value as needed
        this.totalPages = 1;
        this.create();
    }

    #factory(data) {
        const cars = [];
        for (const car of data) {
            cars.push((new Car(car, this)).getHTML());
        }
        return cars;
    }

    #createPaginationControls() {
        const paginationContainer = builder.block(null, 'pagination-controls', []);
        
        const prevButton = builder.button(null ,'pagination_button', null, '<i class="ri-arrow-left-circle-fill"></i>');
		prevButton.onclick = () => {this.component.className = 'carFactoryInitial'; this.changePage(this.currentPage - 1)}
        prevButton.disabled = this.currentPage === 1;
        
        const nextButton = builder.button(null, 'pagination_button', null, '<i class="ri-arrow-right-circle-fill"></i>');
		nextButton.onclick = () => {this.component.className = 'carFactoryInitial'; this.changePage(this.currentPage + 1)}
        nextButton.disabled = this.currentPage === this.totalPages;
        
        const pageInfo = builder.label('page-info', `Page ${this.currentPage} of ${this.totalPages}`);
        
        paginationContainer.append(prevButton, pageInfo, nextButton);
        return paginationContainer;
    }

    changePage(newPage) {
        if (newPage >= 1 && newPage <= this.totalPages) {
            this.currentPage = newPage;
            this.loadCars();
        }
    }

    loadCars() {
        let wait_screen = new waitScreen();
        let empty_message = builder.label('empty_message', 'Aucune voiture trouvée dans cette agence');
        let fd = new FormData();
        
        const user = JSON.parse(builder.prefs.get('user'));
        fd.append('agency', user.id);
        fd.append('page', this.currentPage);
        fd.append('pageSize', this.pageSize);

        this.component.innerHTML = '';
        this.component.appendChild(wait_screen.getHTML());

        builder.brdige("/agency/getAllCars", "GET", fd, (res) => {
            res = JSON.parse(res);
            this.component.innerHTML = '';

            if (res.hasOwnProperty('code') && (res.code == 3 || res.code == -1)) {
                this.component.appendChild(empty_message);
            } else {
				this.component.className = 'carFactoryFinal'
                this.totalPages = res.pagination.totalPages;
                this.component.append(builder.block(null, "carFactoryGrid", [...this.#factory(res.cars)]));
                this.component.appendChild(this.#createPaginationControls());
            }
        }, () => {});
    }

    create() {
        this.component = builder.block(null, 'carFactoryInitial');
        this.loadCars();
    }
}